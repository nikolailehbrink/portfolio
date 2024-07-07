import * as Sentry from "@sentry/nextjs";

export const sentrySharedOptions:
  | Sentry.NodeOptions
  | Sentry.EdgeOptions
  | Sentry.BrowserOptions = {
  dsn: "https://536617f0e4f3e44d7b01bb7b640406bb@o4506721770733568.ingest.us.sentry.io/4506721773223936",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  enabled: !(process.env.NODE_ENV === "development"),
};

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({ ...sentrySharedOptions });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({ ...sentrySharedOptions });
  }
}
