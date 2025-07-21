import { MDXProvider } from "@mdx-js/react";
import { href, Link, Outlet } from "react-router";
import CodeBlock from "@/components/CodeBlock";
import LinkedHeading from "@/components/LinkedHeading";
import Giscus from "@giscus/react";

import { getNextPost, getPost } from "@/lib/posts.server";
import { mergeRouteModuleMeta } from "@/lib/mergeMeta";
import type { Route } from "./+types/layout";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Avatar from "@/components/Avatar";
import { SOCIAL_MEDIA_PROFILES } from "@/data/socialProfiles";
import { track } from "@vercel/analytics/react";
import { formatDate } from "@/lib/format";
import { Pencil } from "@phosphor-icons/react";

export async function loader({ request }: Route.LoaderArgs) {
  const { url } = request;
  const { metadata } = await getPost(url);
  const formattedPublicationDate = formatDate(metadata.publicationDate);
  const formattedModificationDate = metadata.modificationDate
    ? formatDate(metadata.modificationDate)
    : null;
  const nextPost = await getNextPost(url);
  return {
    metadata,
    nextPost,
    formattedPublicationDate,
    formattedModificationDate,
  };
}

export default function PostLayout({ loaderData }: Route.ComponentProps) {
  const {
    metadata: {
      cover,
      title,
      description,
      tags,
      publicationDate,
      readingTime,
      modificationDate,
      draft,
    },
    nextPost,
    formattedPublicationDate,
    formattedModificationDate,
  } = loaderData;

  const isDraft = import.meta.env.DEV && draft;
  return (
    <article className="flex w-full flex-col gap-12">
      <header
        className={cn(
          "mx-auto prose w-full prose-neutral dark:prose-invert",
          cover !== undefined ? "sm:text-center" : "",
        )}
      >
        <LinkedHeading className="leading-tight" level={1}>
          {title}
        </LinkedHeading>
        <div className="not-prose inline-flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 text-sm">
            <Avatar className="size-10 rounded-full" />
            <div className="space-y-1">
              <p>Nikolai Lehbrink</p>
              <div className="flex items-center gap-2">
                {SOCIAL_MEDIA_PROFILES.map(({ href, logo: Logo, name }) => {
                  return (
                    <Link
                      key={name}
                      to={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() =>
                        track("post-author-social-link", {
                          name,
                        })
                      }
                    >
                      <span className="sr-only">Link to {name} profile</span>
                      <Logo weight="duotone" size={20} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <span>•</span>
          <div className="inline-flex gap-2 text-sm">
            <time dateTime={publicationDate.toISOString()}>
              {formattedPublicationDate}
            </time>
            {readingTime ? (
              <>
                <span>•</span>
                <span>{readingTime} min read</span>
              </>
            ) : null}
          </div>
          {isDraft && (
            <Badge className="dark:bg-orange-500/20 dark:text-orange-400">
              <Pencil size={16} weight="duotone" />
              Draft
            </Badge>
          )}
        </div>
        {description && <p className="text-muted-foreground">{description}</p>}
        {tags && tags.length > 0 ? (
          <div className="inline-flex flex-wrap gap-2">
            {tags.map((tag) => {
              return (
                <Badge key={tag} asChild variant="secondary">
                  <Link
                    className="no-underline"
                    target="_blank"
                    rel="noreferrer"
                    to={`/blog?category=${tag}`}
                  >
                    {tag}
                  </Link>
                </Badge>
              );
            })}
          </div>
        ) : null}
      </header>

      {cover && (
        <div
          className="relative mx-auto aspect-video w-full max-w-[1200px]
            overflow-hidden rounded-2xl sm:border sm:p-2"
        >
          <img
            src={cover}
            alt="Post Thumbnail"
            className="absolute aspect-video size-full object-cover blur-3xl"
          />
          <img
            src={cover}
            alt="Post Thumbnail"
            className="relative aspect-video size-full rounded-xl object-cover
              sm:border"
          />
        </div>
      )}
      <section
        className="mx-auto prose w-full prose-neutral dark:prose-invert
          prose-a:decoration-sky-500 prose-a:underline-offset-4"
      >
        {formattedModificationDate ? (
          <Badge
            asChild
            variant="secondary"
            className="bg-sky-500/20 text-sky-400"
          >
            <time dateTime={modificationDate?.toISOString()}>
              Last updated: {formattedModificationDate}
            </time>
          </Badge>
        ) : null}
        <MDXProvider
          components={{
            pre: CodeBlock,
            a: ({ href, ...props }) => {
              const isExternalLink = href?.startsWith("http");
              return (
                <Link
                  to={href ?? ""}
                  prefetch={isExternalLink ? "none" : "viewport"}
                  target={isExternalLink ? "_blank" : "_self"}
                  rel={isExternalLink ? "noreferrer" : "noopener"}
                  {...props}
                />
              );
            },
            h1: (props) => <LinkedHeading level={1} {...props} />,
            h2: (props) => <LinkedHeading level={2} {...props} />,
            h3: (props) => <LinkedHeading level={3} {...props} />,
            h4: (props) => <LinkedHeading level={4} {...props} />,
            h5: (props) => <LinkedHeading level={5} {...props} />,
            h6: (props) => <LinkedHeading level={6} {...props} />,
          }}
        >
          <Outlet />
        </MDXProvider>
      </section>

      <div className="flex justify-center *:max-w-6xl">
        <Giscus
          id="comments"
          repo="nikolailehbrink/portfolio"
          repoId="R_kgDOLDU6NA"
          category="Announcements"
          categoryId="DIC_kwDOLDU6NM4CrKfK"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="noborder_gray"
          lang="en"
          loading="lazy"
        />
      </div>
      {nextPost && (
        <footer className="flex flex-col items-end">
          <div
            className="flex flex-col rounded-lg border bg-neutral-900 p-4
              max-sm:text-end"
          >
            <span className="text-sm text-muted-foreground">Next up:</span>
            <Link to={nextPost.slug}>{nextPost.metadata.title}</Link>
          </div>
        </footer>
      )}
    </article>
  );
}

export const meta: Route.MetaFunction = mergeRouteModuleMeta(
  ({ data, location, matches }) => {
    if (!data) {
      return [];
    }

    const { metadata } = data;
    const { origin } = matches[0].data;
    const { pathname: currentPath } = location;

    const {
      title,
      description,
      publicationDate,
      modificationDate,
      authors,
      cover: coverImagePath,
      tags,
    } = metadata;

    const fullPageUrl = origin + currentPath;
    const pageTitle = `${title} | Nikolai Lehbrink`;
    const coverImageUrl = coverImagePath ? origin + coverImagePath : undefined;

    const dynamicOgImageUrl = new URL(href("/api/og"), origin);
    dynamicOgImageUrl.searchParams.append("title", title);
    dynamicOgImageUrl.searchParams.append("description", description);

    const publishedTimestamp = publicationDate.toISOString();
    const modifiedTimestamp = modificationDate?.toISOString();
    const hasNewerModificationDate =
      modifiedTimestamp && modifiedTimestamp > publishedTimestamp;

    // Determine final image URL (prefer cover image over dynamic OG image)
    const finalImageUrl = coverImageUrl ?? dynamicOgImageUrl;
    const primaryTag = tags?.[0] ?? "";

    return [
      { title: pageTitle },
      { name: "description", content: description },
      { property: "og:title", content: pageTitle },
      { property: "og:url", content: fullPageUrl },
      { property: "og:description", content: description },
      { property: "og:image", content: finalImageUrl },
      { property: "og:type", content: "article" },
      ...(authors.length > 0
        ? authors.map((authorName) => ({
            property: "article:author",
            content: authorName,
          }))
        : []),
      ...(tags && tags.length > 0
        ? tags.map((tag) => ({
            property: "article:tag",
            content: tag,
          }))
        : []),
      { property: "article:section", content: primaryTag },
      { property: "og:article:published_time", content: publishedTimestamp },
      ...(hasNewerModificationDate
        ? [{ property: "og:article:modified_time", content: modifiedTimestamp }]
        : []),
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description,
          datePublished: publishedTimestamp,
          dateModified: modifiedTimestamp,
          author: authors.map((name) => ({
            "@type": "Person",
            name,
          })),
          image: finalImageUrl,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": fullPageUrl,
          },
          publisher: {
            "@type": "Person",
            name: "Nikolai Lehbrink",
          },
          keywords: tags,
        },
      },
    ];
  },
);
