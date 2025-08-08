import type { Toc } from "@stefanprobst/rehype-extract-toc";

import { z } from "zod/v4";

import { isDraft, slugify } from "./utils";

export const postHandleSchema = z.object({
  authors: z.array(z.string()).min(1),
  cover: z.string().optional(),
  description: z.string().min(60, {
    message: "Description must be at least 60 characters long.",
  }),
  featured: z.boolean().optional(),
  modificationDate: z.coerce.date().optional(),
  publicationDate: z.coerce.date(),
  readingTime: z.number().optional(),
  tags: z.array(z.string()).optional(),
  title: z.string().min(30, {
    message: "Title must be at least 30 characters long.",
  }),
});

export type Post = Awaited<ReturnType<typeof getPosts>>[number];
export type PostHandle = z.infer<typeof postHandleSchema>;

const postModules = import.meta.glob<{
  handle: unknown;
  tableOfContents: Toc;
}>("../routes/blog/**/*.mdx", {
  eager: true,
});

export async function getBlogCategories() {
  const posts = await getPosts();
  const categories = new Set<string>();
  posts.forEach((post) => {
    post.metadata.tags?.forEach((tag) => categories.add(tag));
  });
  const categoryList = [...categories]
    .sort((a, b) => a.localeCompare(b))
    .map((category) => ({
      name: category,
      slug: slugify(category),
    }));
  return [...categoryList];
}

export async function getNextPost(url: string) {
  const posts = await getPosts();
  const index = posts.findIndex(({ slug }) => url.endsWith(slug));
  if (index === -1 || index === posts.length - 1) return null;
  return posts[index + 1];
}

export async function getPost(url: string) {
  const { pathname } = new URL(url);
  const posts = await getPosts();
  const post = posts.find(({ slug }) => pathname.endsWith(slug));
  if (!post)
    throw new Response(`No post found for ${url}`, {
      status: 404,
    });
  return post;
}

export async function getPosts(options?: {
  category?: string | null;
  take?: number;
}) {
  const { routes } = await import("virtual:react-router/server-build");
  let files = Object.entries(postModules).map(
    ([path, { handle, tableOfContents }]) => {
      const metadata = postHandleSchema.parse(handle);
      const id = path.replace("../", "").replace(/\.mdx$/, "");
      const slug = routes[id]?.path;
      if (slug === undefined) throw new Error(`No route for ${id}`);

      return {
        isDraft: isDraft(slug),
        metadata,
        slug: `/${slug}`,
        tableOfContents,
      };
    },
  );

  if (import.meta.env.PROD) {
    files = files.filter(({ isDraft }) => !isDraft);
  }

  const { category, take } = options || {};

  if (category) {
    files = files.filter((file) => file.metadata.tags?.includes(category));
  }
  if (files.length > 1) {
    files = files.sort((a, b) => {
      return (
        b.metadata.publicationDate.getTime() -
        a.metadata.publicationDate.getTime()
      );
    });
  }

  if (take && take > 0) {
    files = files.slice(0, take);
  }

  return files;
}
