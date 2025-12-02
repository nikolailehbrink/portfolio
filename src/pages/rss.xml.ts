import { getEntry } from "astro:content";
import rss, { type RSSFeedItem } from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import type { APIRoute } from "astro";
import { getPosts } from "@/lib/posts";

export const GET: APIRoute = async ({ url }) => {
  const { origin } = url;
  const posts = await getPosts();
  const items = await Promise.all(
    posts.map(async ({ data, id }) => {
      const {
        authors: authorsReferences,
        showComments,
        description,
        tags,
        title,
        publicationDate,
      } = data;
      const author = await getEntry(authorsReferences[0]);

      return {
        author: author.data.email,
        title,
        pubDate: publicationDate,
        description,
        categories: tags,
        commentsUrl: showComments ? `/blog/${id}#comments` : undefined,
        link: `/blog/${id}`,
      } satisfies RSSFeedItem;
    }),
  );
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: origin,
    items,
  });
};
