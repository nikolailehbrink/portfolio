import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap";
import { href } from "react-router";

import { isDraft } from "@/lib/utils";

import type { Route } from "./+types/sitemap.xml";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { routes } = await import("virtual:react-router/server-build");

  const filteredRoutes = Object.values(routes)
    // TODO: Remove this temporary fix, once the issue with duplicated urls is resolved
    // https://github.com/forge-42/seo-tools/issues/12
    // I believe only the home index route has no path, which is why we want to include it
    // All other duplicates "/" routes get filtered out
    .filter((route) => !(route?.path === undefined && route?.index !== true))
    .filter((route) => !isDraft(route?.path));

  const { origin } = new URL(request.url);
  const sitemap = await generateRemixSitemap({
    domain: origin,
    ignore: [
      href("/api/chat"),
      href("/api/newsletter/signup"),
      href("/api/newsletter/verification"),
      href("/newsletter/confirmation"),
      href("/api/og"),
    ],
    // @ts-expect-error Type mismatch, maybe related to a stricter type mentioned in release notes for v.7.0.0
    // https://github.com/forge-42/seo-tools/issues/8
    routes: filteredRoutes,
  });

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
