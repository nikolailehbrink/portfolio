import { desc, isNotNull } from "drizzle-orm";

import { db } from "@/db";
import { knowledgeEntry } from "@/db/schema";

export type KnowledgeEntry = typeof knowledgeEntry.$inferSelect;

// How long a cached read stays fresh. The CDN in front of the page uses the
// same window (see `KNOWLEDGE_LOG_CACHE_CONTROL`), so in practice the database
// is hit once per region per window at most.
const CACHE_TTL_MS = 5 * 60 * 1000;

// Sent on the timeline response: the CDN serves the cached HTML for five
// minutes and keeps serving it while it revalidates in the background, so a
// visitor never waits on the database.
export const KNOWLEDGE_LOG_CACHE_CONTROL =
  "public, max-age=0, s-maxage=300, stale-while-revalidate=86400";

let cache: { entries: Array<KnowledgeEntry>; expiresAt: number } | null = null;
// Concurrent requests hitting a cold instance share one query instead of each
// opening their own connection.
let inFlight: Promise<Array<KnowledgeEntry>> | null = null;

async function queryPublishedEntries() {
  return db
    .select()
    .from(knowledgeEntry)
    .where(isNotNull(knowledgeEntry.publishedAt))
    .orderBy(desc(knowledgeEntry.publishedAt));
}

/**
 * All published entries, newest first. Cached in the module scope, which
 * survives between invocations on Vercel's Fluid Compute because function
 * instances are reused - it is a best-effort cache, not a guarantee.
 */
export async function getPublishedKnowledgeEntries() {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.entries;
  }

  inFlight ??= queryPublishedEntries()
    .then((entries) => {
      cache = { entries, expiresAt: Date.now() + CACHE_TTL_MS };
      return entries;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}

/**
 * Drop the cached read after a write so the instance that created an entry
 * serves it immediately. Other instances and the CDN pick it up once their own
 * window expires.
 */
export function invalidateKnowledgeEntriesCache() {
  cache = null;
}

export type KnowledgeEntryGroup = {
  /** Start of the day the entries belong to, used for the `datetime` attribute. */
  date: Date;
  entries: Array<KnowledgeEntry>;
};

/**
 * Bucket entries into calendar days, preserving the incoming (newest first)
 * order. Grouping happens on the already sorted list rather than in SQL so the
 * cached read can be reused for any grouping the UI needs.
 */
export function groupEntriesByDay(
  entries: Array<KnowledgeEntry>,
): Array<KnowledgeEntryGroup> {
  const groups = new Map<string, KnowledgeEntryGroup>();

  for (const entry of entries) {
    const date = entry.publishedAt ?? entry.createdAt;
    const key = date.toISOString().slice(0, 10);
    const group = groups.get(key);
    if (group) {
      group.entries.push(entry);
      continue;
    }
    groups.set(key, {
      date: new Date(`${key}T00:00:00.000Z`),
      entries: [entry],
    });
  }

  return [...groups.values()];
}
