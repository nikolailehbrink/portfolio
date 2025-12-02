import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `\
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ url }) => {
  url.pathname = "sitemap-index.xml";
  return new Response(getRobotsTxt(url));
};
