import { generateRobotsTxt } from "@forge42/seo-tools/robots";
import { href } from "react-router";
import type { Route } from "./+types/robots.txt";

export async function loader({ request }: Route.LoaderArgs) {
  const isProductionDeployment = process.env.VERCEL_ENV === "production";
  const { origin } = new URL(request.url);
  const robotsTxt = generateRobotsTxt([
    {
      userAgent: "*",

      [isProductionDeployment ? "allow" : "disallow"]: ["/"],
      ...(isProductionDeployment
        ? {
            disallow: ["/api/"],
          }
        : {}),
      sitemap: [origin + href("/sitemap.xml")],
    },
  ]);

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
