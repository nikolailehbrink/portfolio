import { text, sqliteTable, int } from "drizzle-orm/sqlite-core";

export const postCounter = sqliteTable("postCounter", {
  slug: text("slug").primaryKey().unique(),
  views: int("views").notNull().default(0),
});
