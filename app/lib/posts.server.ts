import { z } from "zod";

const postHandleSchema = z.object({
  title: z.string(),
  description: z.string(),
  publicationDate: z.string().date(),
  featured: z.boolean().optional(),
  authors: z.array(z.string()).min(1),
  readingTime: z.number().optional(),
  tags: z.array(z.string()).optional(),
  cover: z.string().optional(),
  modificationDate: z.string().date().optional(),
  draft: z.boolean().optional(),
});

export type PostHandle = z.infer<typeof postHandleSchema>;

const postModules = import.meta.glob("../routes/blog/**/*.mdx", {
  eager: true,
  import: "handle",
});

export async function getPosts(options?: {
  take?: number;
  category?: string | null;
}) {
  const { routes } = await import("virtual:react-router/server-build");
  let files = Object.entries(postModules).map(([path, handle]) => {
    const metadata = postHandleSchema.parse(handle);
    const id = path.replace("../", "").replace(/\.mdx$/, "");
    const slug = routes[id]?.path;
    if (slug === undefined) throw new Error(`No route for ${id}`);

    return { slug: `/${slug}`, metadata };
  });

  if (import.meta.env.PROD) {
    files = files.filter(({ metadata: { draft } }) => !draft);
  }

  const { category, take } = options || {};

  if (category) {
    files = files.filter((file) => file.metadata.tags?.includes(category));
  }
  if (files.length > 1) {
    files = files.sort((a, b) => {
      return (
        new Date(b.metadata.publicationDate).getTime() -
        new Date(a.metadata.publicationDate).getTime()
      );
    });
  }

  if (take && take > 0) {
    files = files.slice(0, take);
  }

  return files;
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

export async function getBlogCategories() {
  const posts = await getPosts();
  const categories = new Set<string>();
  posts.forEach((post) => {
    post.metadata.tags?.forEach((tag) => categories.add(tag));
  });
  return [...categories].sort((a, b) => a.localeCompare(b));
}

export async function getNextPost(url: string) {
  const posts = await getPosts();
  const index = posts.findIndex(({ slug }) => url.endsWith(slug));
  if (index === -1 || index === posts.length - 1) return null;
  return posts[index + 1];
}
