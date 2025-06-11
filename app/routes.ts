import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/index.tsx"),
    route("chat", "routes/chat/index.tsx"),
    ...prefix("blog", [
      index("routes/blog/index.tsx"),
      layout("routes/blog/layout.tsx", [
        route(
          "batch-mails-deno-postmark",
          "./routes/blog/batch-mails-deno-postmark/post.mdx",
        ),
        route("tailwind-css-tips", "./routes/blog/tailwind-css-tips/post.mdx"),
        route(
          "syntax-highlighting-shiki-next-js",
          "./routes/blog/syntax-highlighting-shiki-next-js/post.mdx",
        ),
      ]),
    ]),
    layout("routes/legal/layout.tsx", [
      route("privacy-policy", "./routes/legal/privacy-policy.md"),
      route("legal-notice", "routes/legal/legal-notice.md"),
    ]),
    ]),
    ...prefix("api", [route("chat", "routes/api/chat.ts")]),
    route("sitemap.xml", "routes/sitemap.xml.ts"),
    route("robots.txt", "routes/robots.txt.ts"),
] satisfies RouteConfig;
