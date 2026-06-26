import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from "astro:env/server";

import * as schema from "./schema";

// Server-only module. Credentials come from `astro:env/server`, which reads
// from `.env` in dev and from the runtime environment (Vercel) in production -
// unlike `process.env`, which Astro does not populate in the dev server.
const client = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
