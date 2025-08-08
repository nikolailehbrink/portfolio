import interLatin from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import { Analytics } from "@vercel/analytics/react";
import {
  href,
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";
import { Button } from "./components/ui/button";
import { SOCIAL_MEDIA_PROFILES } from "./data/socialProfiles";
import ogImage from "./og-image.webp";

export const links: Route.LinksFunction = () => {
  return [
    {
      as: "font",
      crossOrigin: "anonymous",
      href: interLatin,
      rel: "preload",
      type: "font/woff2",
    },
    { href: "/favicon.svg", rel: "icon", type: "image/svg+xml" },
    { href: "/favicon.ico", rel: "icon" },
    {
      href: "/apple-touch-icon.png",
      rel: "apple-touch-icon",
    },
    {
      href: "/site.webmanifest",
      rel: "manifest",
    },
  ];
};

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let [message, details] = ["Oops!", "An unexpected error occurred."];
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main
      className="container flex min-h-screen flex-col items-center
        justify-center gap-4 p-8"
    >
      <h1 className="text-6xl font-bold text-neutral-200">{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
      <Button asChild>
        <Link prefetch="intent" to={href("/")}>
          Go Home!
          <svg
            fill="currentColor"
            height="24"
            viewBox="0 0 256 256"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M216,116.69V216H152V152H104v64H40V116.69l82.34-82.35a8,8,0,0,1,11.32,0Z"
              opacity="0.2"
            ></path>
            <path d="M240,208H224V136l2.34,2.34A8,8,0,0,0,237.66,127L139.31,28.68a16,16,0,0,0-22.62,0L18.34,127a8,8,0,0,0,11.32,11.31L32,136v72H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM48,120l80-80,80,80v88H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48Zm96,88H112V160h32Z"></path>
          </svg>
        </Link>
      </Button>
    </main>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className="dark scroll-pt-20 scroll-smooth bg-white text-pretty
        scheme-light dark:bg-neutral-950 dark:text-neutral-400 dark:scheme-dark"
      lang="en"
    >
      <head>
        <meta content="#171717" name="theme-color"></meta>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Analytics />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function loader({ request }: Route.LoaderArgs) {
  const { origin } = new URL(request.url);
  return { origin };
}

export const meta: Route.MetaFunction = ({
  data,
  error,
  location: { pathname },
}) => {
  if (!data) {
    return [];
  }
  const { origin } = data;
  const currentUrl = origin + pathname;
  const ogImageUrl = origin + ogImage;
  const title =
    isRouteErrorResponse(error) && error.status === 404
      ? "Page not found | Nikolai Lehbrink"
      : "Nikolai Lehbrink";
  const description =
    "Passionate fullstack developer dedicated to creating beautiful and functional web applications.";
  return [
    {
      title,
    },
    {
      content: description,
      name: "description",
    },
    {
      content: "Nikolai Lehbrink",
      property: "og:site_name",
    },
    { href: currentUrl, rel: "canonical", tagName: "link" },
    {
      content: "website",

      property: "og:type",
    },
    {
      content: "en_US",
      property: "og:locale",
    },
    {
      content: title,
      property: "og:title",
    },
    { content: ogImageUrl, property: "og:image" },
    { content: title, property: "og:image:alt" },
    { content: currentUrl, property: "og:url" },
    { content: description, property: "og:description" },
    {
      content: "summary_large_image",
      property: "twitter:card",
    },
    {
      content: "@nikolailehbrink",
      property: "twitter:site",
    },
    {
      content: "@nikolailehbrink",
      property: "twitter:creator",
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        contactPoint: {
          "@type": "ContactPoint",
          email: "mail@nikolailehbr.ink",
        },
        description,
        name: "Nikolai Lehbrink",
        sameAs: SOCIAL_MEDIA_PROFILES.map((profile) => profile.href),
        url: origin,
      },
    },
  ];
};
