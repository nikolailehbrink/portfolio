import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Matches the table previously created by @astrojs/db so existing rows are reused.
export const viewCount = sqliteTable("ViewCount", {
  pathname: text("pathname").primaryKey(),
  views: integer("views").notNull().default(1),
});

// Single source of truth for the entry types: the Drizzle column, the Zod
// schema the LLM is constrained to (`src/lib/knowledge-log/definitions.ts`) and
// the UI labels all derive from this array.
export const KNOWLEDGE_ENTRY_TYPES = [
  "learning",
  "resource",
  "idea",
  "insight",
  "question",
] as const;

export type KnowledgeEntryType = (typeof KNOWLEDGE_ENTRY_TYPES)[number];

/**
 * Provenance of an entry. Kept in a JSON column because it is only ever read as
 * a whole (never filtered on) and the shape differs per input type - a voice
 * note carries its raw transcript, a text message its unedited original.
 */
export type KnowledgeEntryMetadata = {
  source: "whatsapp";
  inputType: "text" | "audio";
  /** The unedited message text or raw transcript, before the LLM cleaned it up. */
  originalText: string;
  /** Audio only: what the transcription model reported. */
  transcriptLanguage?: string;
  audioDurationInSeconds?: number;
};

export const knowledgeEntry = sqliteTable(
  "KnowledgeEntry",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    type: text("type", { enum: KNOWLEDGE_ENTRY_TYPES }).notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    summary: text("summary").notNull(),
    tags: text("tags", { mode: "json" })
      .$type<Array<string>>()
      .notNull()
      .default([]),
    sourceUrl: text("sourceUrl"),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    // Nullable so an entry can be pulled from the public timeline again without
    // deleting it.
    publishedAt: integer("publishedAt", { mode: "timestamp" }),
    metadata: text("metadata", {
      mode: "json",
    }).$type<KnowledgeEntryMetadata>(),
    // WhatsApp redelivers webhooks until it gets a 2xx, so the message id is the
    // idempotency key that keeps retries from creating duplicate entries.
    sourceMessageId: text("sourceMessageId").unique(),
  },
  (table) => [index("KnowledgeEntry_publishedAt_idx").on(table.publishedAt)],
);
