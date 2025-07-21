import { generateRobotsTxt } from "@forge42/seo-tools/robots";
import { href } from "react-router";
import type { Route } from "./+types/robots.txt";

export async function loader({ request }: Route.LoaderArgs) {
  const isVercelProductionDeployment = process.env.VERCEL_ENV === "production";
  const { origin } = new URL(request.url);
  const robotsTxt = generateRobotsTxt([
    {
      userAgent: "*",
      ...(isVercelProductionDeployment
        ? {
            disallow: ["/api/"],
            allow: ["/api/og/"],
          }
        : {
            disallow: ["/"],
          }),
      sitemap: [origin + href("/sitemap.xml")],
    },
  ]);

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
