import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap";
import type { Route } from "./+types/sitemap.xml";
import { href } from "react-router";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { routes } = await import("virtual:react-router/server-build");
  // TODO: Remove this temporary fix, once the issue with duplicated urls is resolved
  // https://github.com/forge-42/seo-tools/issues/12
  const filteredRoutes = Object.values(routes).filter(
    (route) => !(route?.path === undefined && route?.parentId !== "root"),
  );
  const { origin } = new URL(request.url);
  const sitemap = await generateRemixSitemap({
    domain: origin,
    ignore: [
      href("/api/chat"),
      href("/api/newsletter/signup"),
      href("/api/newsletter/verification"),
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
