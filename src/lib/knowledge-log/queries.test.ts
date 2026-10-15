import { expect, test } from "vitest";

import { groupEntriesByDay, type KnowledgeEntry } from "./queries";

function entry(id: string, publishedAt: string): KnowledgeEntry {
  return {
    id,
    type: "learning",
    title: id,
    content: id,
    summary: id,
    tags: [],
    sourceUrl: null,
    createdAt: new Date(publishedAt),
    publishedAt: new Date(publishedAt),
    metadata: null,
    sourceMessageId: null,
  };
}

test("buckets entries into calendar days and keeps their order", () => {
  const groups = groupEntriesByDay([
    entry("c", "2026-07-29T18:00:00.000Z"),
    entry("b", "2026-07-29T08:00:00.000Z"),
    entry("a", "2026-07-27T21:00:00.000Z"),
  ]);

  expect(
    groups.map(({ date, entries }) => [
      date.toISOString(),
      entries.map(({ id }) => id),
    ]),
  ).toEqual([
    ["2026-07-29T00:00:00.000Z", ["c", "b"]],
    ["2026-07-27T00:00:00.000Z", ["a"]],
  ]);
});

test("falls back to createdAt for an entry without a publish date", () => {
  const draft = {
    ...entry("draft", "2026-07-25T10:00:00.000Z"),
    publishedAt: null,
  };
  const [group] = groupEntriesByDay([draft]);

  expect(group.date.toISOString()).toBe("2026-07-25T00:00:00.000Z");
});
