import { getBlogCategories, getPosts } from "@/lib/posts.server";
import type { Route } from "./+types";
import PostTeaser from "@/components/PostTeaser";
import { Badge } from "@/components/ui/badge";
import { Form } from "react-router";
import { mergeRouteModuleMeta } from "@/lib/mergeMeta";
import NewsletterForm from "@/components/NewsletterForm";
import { track } from "@vercel/analytics/server";

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const categories = await getBlogCategories();
  const filteredCategory = categories.find(({ slug }) => slug === category);
  const posts = await getPosts({ category: filteredCategory?.name });

  if (filteredCategory) {
    await track("blog-category-filtered", {
      category: filteredCategory.name,
    });
  }

  return { posts, categories, filteredCategory };
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts, categories, filteredCategory } = loaderData;
  const hasCategoryFilter = filteredCategory !== undefined;

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
        <Form className="flex snap-x snap-mandatory gap-2 overflow-x-auto p-2">
          <Badge
            asChild
            className="cursor-pointer snap-end scroll-mr-2"
            variant={hasCategoryFilter ? "secondary" : "default"}
          >
            <button type="submit">All</button>
          </Badge>
          {categories.map(({ name, slug }) => {
            const isActive = filteredCategory?.slug === slug;
            return (
              <Badge
                key={name}
                className="cursor-pointer snap-end scroll-mr-2"
                asChild
                variant={isActive ? "default" : "secondary"}
              >
                <button
                  {...(!isActive ? { name: "category", value: slug } : {})}
                  type="submit"
                >
                  {name}
                </button>
              </Badge>
            );
          })}
        </Form>
      </div>
      <ul
        className="mt-2 grid grid-cols-1 gap-4 rounded-md md:grid-cols-2
          lg:max-w-5xl"
      >
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <PostTeaser
              key={post.slug}
              className="animate-in slide-in-from-bottom-25 fade-in"
              style={{
                animationDuration: `${300 + index * 300}ms`,
              }}
              {...post}
            />
          ))
        ) : (
          <p
            className="col-span-2 rounded-lg bg-neutral-900 p-4 py-3 text-center
              text-muted-foreground"
          >
            No posts were found{" "}
            {filteredCategory ? `for ${filteredCategory.name}.` : "."} <br />
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
