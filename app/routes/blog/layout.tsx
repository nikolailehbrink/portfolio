import { MDXProvider } from "@mdx-js/react";
import { href, Link, Outlet } from "react-router";
import CodeBlock from "@/components/CodeBlock";
import LinkedHeading from "@/components/LinkedHeading";
import Giscus from "@giscus/react";

import { getNextPost, getPost } from "@/lib/posts.server";
import { mergeRouteModuleMeta } from "@/lib/mergeMeta";
import type { Route } from "./+types/layout";
import { Badge } from "@/components/ui/badge";
import { cn, slugify } from "@/lib/utils";
import Avatar from "@/components/Avatar";
import { SOCIAL_MEDIA_PROFILES } from "@/data/socialProfiles";
import { track } from "@vercel/analytics/react";
import { formatDate } from "@/lib/format";
import { ListNumbersIcon } from "@phosphor-icons/react/dist/ssr/ListNumbers";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr/Pencil";
import TableOfContents from "@/components/TableOfContents";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export async function loader({ request }: Route.LoaderArgs) {
  const { url } = request;
  const { metadata, tableOfContents, isDraft } = await getPost(url);
  const formattedPublicationDate = formatDate(metadata.publicationDate);
  const formattedModificationDate = metadata.modificationDate
    ? formatDate(metadata.modificationDate)
    : null;
  const nextPost = await getNextPost(url);

  return {
    metadata,
    tableOfContents,
    nextPost,
    formattedPublicationDate,
    formattedModificationDate,
    isDraft,
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
      showComments,
      showRelatedPosts,
    },
    nextPost,
    formattedPublicationDate,
    formattedModificationDate,
    tableOfContents,
    isDraft,
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
                <Badge key={tag} asChild variant="secondary">
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
                  onClick={() => track("open-toc-drawer")}
                  size="icon"
                  className="sticky bottom-4 size-12 justify-self-end
                    bg-sky-950"
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

      {showComments && (
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
      )}
      {showRelatedPosts && nextPost && (
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
