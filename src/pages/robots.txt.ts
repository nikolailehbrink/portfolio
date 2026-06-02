import type { APIRoute } from "astro";

// Explicitly named AI crawlers/assistants so there's no ambiguity about them
// being welcome to index and cite the site. The wildcard already allows them,
// but stating it directly is the clearest signal and future-proofs against
// stricter default behaviour.
const AI_USER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

const getRobotsTxt = (origin: string) => {
  const aiRules = AI_USER_AGENTS.map(
    (agent) => `User-agent: ${agent}\nAllow: /`,
  ).join("\n\n");

  return `\
User-agent: *
Allow: /

${aiRules}

Sitemap: ${new URL("sitemap-index.xml", origin).href}

# Curated entry point for LLMs and AI search
# ${new URL("llms.txt", origin).href}
`;
};

export const GET: APIRoute = ({ url }) =>
  new Response(getRobotsTxt(url.origin));
