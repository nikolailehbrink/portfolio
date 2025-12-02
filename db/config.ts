import { column, defineDb, defineTable } from "astro:db";

const ViewCount = defineTable({
  columns: {
    pathname: column.text({ unique: true, primaryKey: true }),
    views: column.number({ default: 1 }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    ViewCount,
  },
});
