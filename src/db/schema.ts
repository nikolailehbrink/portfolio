import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Matches the table previously created by @astrojs/db so existing rows are reused.
export const viewCount = sqliteTable("ViewCount", {
  pathname: text("pathname").primaryKey(),
  views: integer("views").notNull().default(1),
});
