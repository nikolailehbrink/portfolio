import { tool, type InferUITools } from "ai";
import { z } from "zod";
import { getPosts } from "./posts";

export const chatTools = {
  searchPosts: tool({
    description:
      "Search Nikolai's blog posts by topic or keyword. Only use this when the visitor explicitly asks about his blog, articles, or writing, or wants to read more about a topic from his posts. Do NOT use it for biographical, personal, or opinion questions (e.g. 'what got you into web dev?') - answer those from the knowledge base.",
    inputSchema: z.object({
      query: z
        .string()
        .describe("The topic or keywords to search for, e.g. 'astro seo'"),
    }),
    async execute({ query }) {
      const posts = await getPosts();
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

      const scored = posts
        .map((post) => {
          const haystack = [
            post.data.title,
            post.data.description,
            ...(post.data.tags ?? []),
          ]
            .join(" ")
            .toLowerCase();
          const score = terms.reduce(
            (sum, term) => sum + (haystack.includes(term) ? 1 : 0),
            0,
          );
          return { post, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ post }) => post);

      // Only return real matches - never fall back to recent posts, or an
      // off-topic query would surface irrelevant cards.
      const results = scored.slice(0, 4);

      return results.map(({ data, id }) => ({
        title: data.title,
        description: data.description,
        slug: id,
        tags: data.tags ?? [],
      }));
    },
  }),
};

export type ChatTools = InferUITools<typeof chatTools>;

// The tool's inferred output - the same type the UI receives on the tool part -
// so the rendering UI stays in sync with what the tool produces.
export type SearchPostsResult = ChatTools["searchPosts"]["output"];
