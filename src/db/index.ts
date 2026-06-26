import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from "astro:env/server";

import * as schema from "./schema";

// Local development uses a local libSQL file so we never touch the remote
// (preview) Turso instance. Production connects to the Turso database, whose
// credentials come from `astro:env/server` (reads `.env` in dev, the runtime
// environment on Vercel in prod) - not `process.env`, which Astro does not
// populate in the dev server.
function createDbClient() {
  if (import.meta.env.DEV) {
    return createClient({ url: "file:local.db" });
  }
  if (!TURSO_DATABASE_URL) {
    throw new Error("TURSO_DATABASE_URL must be set in production.");
  }
  return createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  });
}

export const db = drizzle(createDbClient(), { schema });
