import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import { flatRoutes } from "remix-flat-routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/index.tsx"),
    ...prefix("blog", [
      index("routes/blog/index.tsx"),
      layout("routes/blog/layout.tsx", [
        ...(await remixRoutesOptionAdapter((defineRoutes) => {
          return flatRoutes("routes/blog/posts", defineRoutes, {
            ignoredRouteFiles: ["**/.*"],
          });
        })),
      ]),
    ]),
    ...prefix("newsletter", [
      route("confirmation", "routes/newsletter/confirmation.tsx"),
    ]),
    layout("routes/legal/layout.tsx", [
      route("privacy-policy", "./routes/legal/privacy-policy.md"),
      route("legal-notice", "routes/legal/legal-notice.md"),
    ]),
  ]),
  ...prefix("chat", [
    layout("routes/chat/layout.tsx", [index("routes/chat/index.tsx")]),
  ]),
  ...prefix("api", [
    route("chat", "routes/api/chat.ts"),
    ...prefix("newsletter", [
      route("verification", "routes/api/newsletter/verification.ts"),
      route("signup", "routes/api/newsletter/signup.ts"),
    ]),
    route("og", "routes/api/og/index.tsx"),
  ]),
  route("sitemap.xml", "routes/sitemap.xml.ts"),
  route("robots.txt", "routes/robots.txt.ts"),
] satisfies RouteConfig;
