import Giscus from "@giscus/react";
import { MDXProvider } from "@mdx-js/react";
import { ListNumbersIcon, PencilIcon } from "@phosphor-icons/react";
import { track } from "@vercel/analytics/react";
import { href, Link, Outlet } from "react-router";

import Avatar from "@/components/Avatar";
import CodeBlock from "@/components/CodeBlock";
import LinkedHeading from "@/components/LinkedHeading";
import TableOfContents from "@/components/TableOfContents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SOCIAL_MEDIA_PROFILES } from "@/data/socialProfiles";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatDate } from "@/lib/format";
import { mergeRouteModuleMeta } from "@/lib/mergeMeta";
import { getNextPost, getPost } from "@/lib/posts.server";
import { cn, slugify } from "@/lib/utils";

import type { Route } from "./+types/layout";

export async function loader({ request }: Route.LoaderArgs) {
  const { url } = request;
  const { isDraft, metadata, tableOfContents } = await getPost(url);
  const formattedPublicationDate = formatDate(metadata.publicationDate);
  const formattedModificationDate = metadata.modificationDate
    ? formatDate(metadata.modificationDate)
    : null;
  const nextPost = await getNextPost(url);

  return {
    formattedModificationDate,
    formattedPublicationDate,
    isDraft,
    metadata,
    nextPost,
    tableOfContents,
  };
}

export default function PostLayout({ loaderData }: Route.ComponentProps) {
  const {
    formattedModificationDate,
    formattedPublicationDate,
    isDraft,
    metadata: {
      cover,
      description,
      modificationDate,
      publicationDate,
      readingTime,
      tags,
      title,
    },
    nextPost,
    tableOfContents,
  } = loaderData;

  // Equal to sm:..
  const isTablet = useMediaQuery("(width >= 40rem)");

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
                      className="text-muted-foreground hover:text-primary"
                      key={name}
                      onClick={() =>
                        track("post-author-social-link", {
                          name,
                        })
                      }
                      rel="noreferrer"
                      target="_blank"
                      to={href}
                    >
                      <span className="sr-only">Link to {name} profile</span>
                      <Logo size={20} weight="duotone" />
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
              <PencilIcon size={16} weight="duotone" />
              Draft
            </Badge>
          )}
        </div>
        {description && <p className="text-muted-foreground">{description}</p>}
        {tags && tags.length > 0 ? (
          <div className="inline-flex flex-wrap gap-2">
            {tags.map((tag) => {
              return (
                <Badge asChild key={tag} variant="secondary">
                  <Link
                    className="no-underline"
                    to={`${href("/blog")}?category=${slugify(tag)}`}
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
            alt="Post Thumbnail"
            className="absolute aspect-video size-full object-cover blur-3xl"
            src={cover}
          />
          <img
            alt="Post Thumbnail"
            className="relative aspect-video size-full rounded-xl object-cover
              sm:border"
            src={cover}
          />
        </div>
      )}
      <div
        className="relative grid grid-cols-1 items-start justify-end gap-8
          md:grid-cols-[1fr_auto_1fr]"
      >
        <section
          className="prose prose-neutral md:col-start-2 dark:prose-invert
            prose-a:decoration-sky-500 prose-a:underline-offset-4"
        >
          {formattedModificationDate ? (
            <Badge
              asChild
              className="bg-sky-500/20 text-sky-400"
              variant="secondary"
            >
              <time dateTime={modificationDate?.toISOString()}>
                Last updated: {formattedModificationDate}
              </time>
            </Badge>
          ) : null}
          <MDXProvider
            components={{
              a: ({ href, ...props }) => {
                const isExternalLink = href?.startsWith("http");
                return (
                  <Link
                    prefetch={isExternalLink ? "none" : "viewport"}
                    rel={isExternalLink ? "noreferrer" : "noopener"}
                    target={isExternalLink ? "_blank" : "_self"}
                    to={href ?? ""}
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
              pre: CodeBlock,
            }}
          >
            <Outlet />
          </MDXProvider>
        </section>
        {tableOfContents.length > 0 ? (
          isTablet ? (
            <TableOfContents
              className="rounded-xl border bg-neutral-900 bg-linear-to-b
                shadow-xl offset-border max-xl:order-first md:col-start-2
                xl:sticky xl:top-16 xl:col-start-3
                xl:max-h-[calc(100dvh_-_--spacing(24))] xl:max-w-xs
                xl:overflow-y-auto"
              maxDepth={3}
              outline={tableOfContents}
            />
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  className="sticky bottom-4 size-12 justify-self-end
                    bg-sky-950"
                  onClick={() => track("open-toc-drawer")}
                  size="icon"
                >
                  <ListNumbersIcon
                    className="text-sky-400"
                    size={28}
                    weight="duotone"
                  />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerClose asChild>
                  <TableOfContents
                    className=""
                    maxDepth={3}
                    outline={tableOfContents}
                  />
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          )
        ) : null}
      </div>

      <div className="flex justify-center *:max-w-6xl">
        <Giscus
          category="Announcements"
          categoryId="DIC_kwDOLDU6NM4CrKfK"
          emitMetadata="0"
          id="comments"
          inputPosition="bottom"
          lang="en"
          loading="lazy"
          mapping="pathname"
          reactionsEnabled="1"
          repo="nikolailehbrink/portfolio"
          repoId="R_kgDOLDU6NA"
          theme="noborder_gray"
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
      authors,
      cover: coverImagePath,
      description,
      modificationDate,
      publicationDate,
      tags,
      title,
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
      { content: description, name: "description" },
      { content: pageTitle, property: "og:title" },
      { content: fullPageUrl, property: "og:url" },
      { content: description, property: "og:description" },
      { content: finalImageUrl, property: "og:image" },
      { content: "article", property: "og:type" },
      ...(authors.length > 0
        ? authors.map((authorName) => ({
            content: authorName,
            property: "article:author",
          }))
        : []),
      ...(tags && tags.length > 0
        ? tags.map((tag) => ({
            content: tag,
            property: "article:tag",
          }))
        : []),
      { content: primaryTag, property: "article:section" },
      { content: publishedTimestamp, property: "og:article:published_time" },
      ...(hasNewerModificationDate
        ? [{ content: modifiedTimestamp, property: "og:article:modified_time" }]
        : []),
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          author: authors.map((name) => ({
            "@type": "Person",
            name,
          })),
          dateModified: modifiedTimestamp,
          datePublished: publishedTimestamp,
          description,
          headline: title,
          image: finalImageUrl,
          keywords: tags,
          mainEntityOfPage: {
            "@id": fullPageUrl,
            "@type": "WebPage",
          },
          publisher: {
            "@type": "Person",
            name: "Nikolai Lehbrink",
          },
        },
      },
    ];
  },
);
