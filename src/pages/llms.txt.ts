import type { APIRoute } from "astro";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import { getPosts } from "@/lib/posts";

// Generates an llms.txt file (https://llmstxt.org/): a curated, Markdown entry
// point that lets LLMs and AI search engines discover the site's key content
// without crawling and parsing the full HTML. Regenerates from the blog
// collection on every build, so it stays in sync with published posts.
export const GET: APIRoute = async ({ url }) => {
  const { origin } = url;
  const posts = await getPosts();

  const postLines = posts
    .map(({ data, id }) => {
      const postUrl = new URL(`/blog/${id}`, origin).href;
      return `- [${data.title}](${postUrl}): ${data.description}`;
    })
    .join("\n");

  const body = `# ${SITE_TITLE}

> ${SITE_DESCRIPTION}

Personal portfolio and technical blog by Nikolai Lehbrink, a Full Stack Developer and Frontend Engineer based in Munich. The blog covers web development with a focus on Astro, React, TypeScript, and Tailwind CSS.

## Blog posts

${postLines}

## Key pages

- [Home](${new URL("/", origin).href}): About Nikolai, projects, skills, and work experience
- [Blog](${new URL("/blog", origin).href}): All articles
- [Chat](${new URL("/chat", origin).href}): AI assistant that answers questions about Nikolai, his projects, and his blog posts
- [RSS feed](${new URL("/rss.xml", origin).href}): Full-text feed of new posts
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
