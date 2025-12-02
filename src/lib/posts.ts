import { getCollection } from "astro:content";
import { slugify } from "./utils";
import type { MarkdownHeading } from "astro";
import { estimateReadingTime } from "./readingTime";

export async function getPosts(options?: {
  take?: number;
  tag?: string | null;
}) {
  let posts = (
    await getCollection("blog", ({ data }) =>
      import.meta.env.PROD ? data.draft !== true : true,
    )
  ).map((post) => ({
    ...post,
    readingTime: estimateReadingTime(post.body),
  }));

  const { tag, take } = options || {};

  if (tag) {
    posts = posts.filter((post) => post.data.tags?.includes(tag));
  }

  if (posts.length > 1) {
    posts = posts.sort((a, b) => {
      return (
        b.data.publicationDate.getTime() - a.data.publicationDate.getTime()
      );
    });
  }

  if (take && take > 0) {
    posts = posts.slice(0, take);
  }

  return posts;
}

export async function getBlogTags() {
  const posts = await getCollection("blog");
  const tags = new Set<string>();
  posts.forEach(({ data }) => {
    data.tags?.forEach((tag) => tags.add(tag));
  });
  const tagList = [...tags]
    .sort((a, b) => a.localeCompare(b))
    .map((tag) => ({
      name: tag,
      slug: slugify(tag),
    }));
  return tagList;
}

export type TocEntry = MarkdownHeading & { children: Array<TocEntry> };

function diveChildren(item: TocEntry, depth: number): Array<TocEntry> {
  if (depth === 1) {
    return item.children;
  } else {
    // e.g., 2
    return diveChildren(item.children[item.children.length - 1], depth - 1);
  }
}

function generateNestedHeadings(
  headings: Array<MarkdownHeading>,
  options?: { maxDepth?: number },
) {
  headings = headings.filter(
    ({ depth }) => depth > 1 && depth <= (options?.maxDepth || 3),
  );

  const toc: Array<TocEntry> = [];

  for (const heading of headings) {
    if (toc.length === 0) {
      toc.push({
        ...heading,
        children: [],
      });
    } else {
      const lastItemInToc = toc[toc.length - 1];
      if (heading.depth < lastItemInToc.depth) {
        throw new Error(`Orphan heading found: ${heading.text}.`);
      }
      if (heading.depth === lastItemInToc.depth) {
        // same depth
        toc.push({
          ...heading,
          children: [],
        });
      } else {
        // higher depth
        // push into children, or children' children alike
        const gap = heading.depth - lastItemInToc.depth;
        const target = diveChildren(lastItemInToc, gap);
        target.push({
          ...heading,
          children: [],
        });
      }
    }
  }
  return toc;
}

export function generatePostHeadings(
  headings: Array<MarkdownHeading>,
): Array<TocEntry> {
  const sanitizedHeadings = headings.map((heading) =>
    heading.text.startsWith("#")
      ? { ...heading, text: heading.text.substring(1) }
      : heading,
  );
  return generateNestedHeadings(sanitizedHeadings);
}
