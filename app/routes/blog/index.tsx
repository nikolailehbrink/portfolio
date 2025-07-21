import { getBlogCategories, getPosts } from "@/lib/posts.server";
import type { Route } from "./+types";
import PostTeaser from "@/components/PostTeaser";
import { Badge } from "@/components/ui/badge";
import { Form, useSearchParams } from "react-router";
import { mergeRouteModuleMeta } from "@/lib/mergeMeta";
import NewsletterForm from "@/components/NewsletterForm";
import { track } from "@vercel/analytics/server";

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  if (category) {
    await track("blog-category-filtered", {
      category,
    });
  }
  const posts = await getPosts({ category });
  const categories = await getBlogCategories();
  return { posts, categories, category };
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts, categories, category: filterCategory } = loaderData;
  const [searchParams] = useSearchParams();
  const hasCategoryFilter = filterCategory !== null;
  return (
    <div className="flex flex-col gap-4 sm:items-center">
      <h1 className="text-3xl font-bold sm:text-center sm:text-4xl">Blog</h1>
      <p className="max-w-prose text-muted-foreground sm:text-center">
        A collection of my thoughts, ideas, and experiences. I write about
        various topics, including web development, technology, and personal
        topics.
      </p>
      <NewsletterForm showText={false} className="max-w-2xl"></NewsletterForm>
      <div
        className="relative mt-4 grid max-w-xl overflow-hidden rounded-lg border
          border-border bg-neutral-900 offset-border"
      >
        <div
          className="absolute inset-y-0 right-0 w-2 rounded-e-lg bg-linear-to-r
            from-transparent to-neutral-900"
        ></div>
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto p-2">
          <Form className="snap-end scroll-mr-2">
            <Badge
              asChild
              className="cursor-pointer"
              variant={hasCategoryFilter ? "secondary" : "default"}
            >
              <button type="submit">All</button>
            </Badge>
          </Form>
          {categories.map((category) => {
            const isActive = searchParams.get("category") === category;
            return (
              <Form key={category} className="snap-end scroll-mr-2">
                <Badge asChild variant={isActive ? "default" : "secondary"}>
                  <button
                    {...(!isActive
                      ? { name: "category", value: category }
                      : {})}
                    type="submit"
                    className="cursor-pointer"
                  >
                    {category}
                  </button>
                </Badge>
              </Form>
            );
          })}
        </div>
      </div>
      <ul
        className="mt-2 grid grid-cols-1 gap-4 rounded-md md:grid-cols-2
          lg:max-w-5xl"
      >
        {posts.length > 0 ? (
          posts.map(({ slug, metadata }, index) => (
            <PostTeaser
              key={slug}
              slug={slug}
              metadata={metadata}
              style={{
                animationDuration: `${300 + index * 300}ms`,
              }}
              className="animate-in slide-in-from-bottom-25 fade-in"
            />
          ))
        ) : (
          <p
            className="col-span-2 rounded-lg bg-neutral-900 p-4 py-3 text-center
              text-muted-foreground"
          >
            No posts were found{" "}
            {filterCategory ? `for ${filterCategory}.` : "."} <br />
          </p>
        )}
      </ul>
    </div>
  );
}

export const meta: Route.MetaFunction = mergeRouteModuleMeta(
  ({ data, matches }) => {
    if (!data) {
      return [];
    }
    const { origin } = matches[0].data;
    const { posts } = data;
    const title = "Blog | Nikolai Lehbrink";
    const description =
      "A collection of my thoughts, ideas, and experiences in web development, technology, and personal topics.";
    return [
      { title },
      {
        name: "description",
        content: description,
      },
      {
        property: "og:title",
        content: title,
      },
      { property: "og:description", content: description },
      {
        "script:ld+json": {
          "@context": "https://schema.org/",
          "@type": "Blog",
          name: title,
          description,
          publisher: {
            "@type": "Person",
            name: "Nikolai Lehbrink",
          },
          blogPost: posts.map(({ slug, metadata }) => ({
            "@type": "BlogPosting",
            mainEntityOfPage: `${origin}${slug}`,
            headline: metadata.title,
            description: metadata.description,
            datePublished: metadata.publicationDate,
            ...(metadata.modificationDate && {
              dateModified: metadata.modificationDate,
            }),
            author: metadata.authors.map((author) => ({
              "@type": "Person",
              name: author,
            })),
            ...(metadata.cover && {
              image: {
                "@type": "ImageObject",
                url: origin + metadata.cover,
              },
            }),
            url: `${origin}${slug}`,
            keywords: metadata.tags,
          })),
        },
      },
    ];
  },
);
