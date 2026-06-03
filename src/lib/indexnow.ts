import type { AstroIntegration } from "astro";

// IndexNow lets us push URLs to participating engines (Bing, Yandex, and a
// growing set of AI search crawlers) the moment a build ships, instead of
// waiting to be crawled. The key below must match the file served at
// `/<key>.txt` in `public/` so the engines can verify ownership.
const INDEXNOW_KEY = "580812276e9ca20e223ca31a4b3369af";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/** Only the content routes worth re-crawling; assets/api/feeds are skipped. */
function isSubmittablePage(pathname: string): boolean {
  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return false; // og.png, rss.xml, robots.txt, llms.txt, ...
  }
  return !pathname.includes("/newsletter/");
}

export function indexNow(): AstroIntegration {
  return {
    name: "indexnow",
    hooks: {
      "astro:build:done": async ({ pages, logger }) => {
        // Production builds only — preview/local deploys must never ping.
        if (!process.env.VERCEL || process.env.VERCEL_ENV !== "production") {
          return;
        }

        const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
        if (!host) {
          logger.warn("IndexNow skipped: production host is unknown.");
          return;
        }

        const origin = `https://${host}`;
        const urlList = pages
          .map(({ pathname }) => `/${pathname}`.replace(/\/{2,}/g, "/"))
          .filter(isSubmittablePage)
          .map((pathname) => new URL(pathname, origin).href);

        if (urlList.length === 0) {
          return;
        }

        try {
          const response = await fetch(INDEXNOW_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
              host,
              key: INDEXNOW_KEY,
              keyLocation: `${origin}/${INDEXNOW_KEY}.txt`,
              urlList,
            }),
          });
          logger.info(
            `IndexNow submitted ${urlList.length} URLs (status ${response.status}).`,
          );
        } catch (error) {
          logger.warn(`IndexNow submission failed: ${String(error)}`);
        }
      },
    },
  };
}
