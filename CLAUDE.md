# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (https://www.nikolailehbr.ink/) built with Astro 5, React 19, TypeScript, and Tailwind CSS v4. Features a blog with MDX, an AI chatbot (LLamaIndex + Vercel AI SDK + OpenAI), newsletter system (Resend), and view counting (Astro DB).

## Commands

- **Dev server:** `pnpm dev` (opens browser, exposes on network)
- **Build:** `pnpm build` (uses `astro build --remote` for remote DB)
- **Preview:** `pnpm preview` (uses dotenv for env vars, Node adapter locally)
- **Lint:** `pnpm lint` (ESLint for ts/tsx/astro files)
- **Format:** `pnpm format` (Prettier with Astro, Tailwind, classnames plugins)
- **Test:** `pnpm test` (Vitest, runs in watch mode)
- **Unused deps:** `pnpm knip`
- **Email preview:** `pnpm dev:email` (React Email dev server)

## Git Workflow

- **Conventional commits** enforced via commitlint (`feat:`, `fix:`, `docs:`, etc.)
- **Pre-commit hook** runs lint-staged: ESLint + Prettier on staged `*.{js,jsx,ts,tsx,astro,json,svg,mdx}` files
- **Commit-msg hook** validates commit message format

## Architecture

### Content System

Content collections defined in `src/content.config.ts` with Zod schemas:
- **blog** — MDX files in `src/content/blog/`, glob loader with custom slug generation. Folders prefixed with `_` use the file name as slug; otherwise the folder name is the slug.
- **authors** — JSON file at `src/data/authors.json`, referenced by blog posts
- **career** — JSON file at `src/data/career.json` (work/education entries)
- **projects** — JSON file at `src/data/projects.json`

Blog posts have: title, description, draft flag, publicationDate, optional modificationDate, cover image, tags, authors (defaults to nikolailehbrink), showComments.

### Layouts & Pages

- `src/layouts/RootLayout.astro` — Base layout (navbar, footer, SEO head)
- `src/layouts/BlogPost.astro` — Blog post wrapper (metadata, TOC, reading time, view count)
- Pages in `src/pages/` follow Astro file-based routing
- API endpoints: `src/pages/api/chat/` (AI chat), `src/pages/api/newsletter/` (verification)

### Components

- `src/components/*.astro` — Static Astro components
- `src/components/react/` — Interactive React components (forms, chat, image zoom)
- `src/components/react/ui/` — shadcn/ui components (new-york style, neutral base color)
- `src/components/react/chat/` — AI chatbot UI components
- `src/components/react/emails/` — React Email templates

### Key Utilities

- `src/lib/utils.ts` — `cn()` for Tailwind class merging, `slugify()`
- `src/lib/posts.ts` — Blog collection queries, TOC generation
- `src/lib/shiki/` — Custom Shiki transformers for code blocks (line numbers, diff highlighting, meta highlights, file icons)
- `src/lib/og/` — Open Graph image generation
- `src/data/` — Static data (skills, navigation, socials, career, projects, authors)

### Database

Astro DB (SQLite) with a `ViewCount` table, configured in `db/config.ts`, seeded in `db/seed.ts`.

## Code Style

- Path alias: `@/*` maps to `./src/*`
- Use `type` keyword for TypeScript type definitions (not `interface`)
- Use `Array<T>` generic syntax (not `T[]`)
- Boolean props must start with `is`, `has`, `show`, or `as`
- Self-closing components and HTML elements enforced
- Strict equality (`===`) required, curly braces required for all blocks
- `no-console` warns (except `warn`, `error`, `info`)
- Prettier: double quotes, semicolons, 2-space indent

## Writing Blog Posts

### File Structure

Each blog post lives in its own folder under `src/content/blog/`. The folder name becomes the URL slug. The MDX file is named `article.mdx`, and images sit alongside it in the same folder.

```
src/content/blog/my-post-slug/
├── article.mdx
├── cover-image.webp
└── screenshot.png
```

Exception: folders prefixed with `_` (like `_tailwindcss-tips/`) contain multiple articles - in that case the file name becomes the slug.

### Frontmatter

```yaml
---
title: "How to do something useful in React Router 7"
description: "Learn how to do X with Y for better Z."
publicationDate: "2026-03-01T12:00:00Z"
tags: ["React Router 7", "SEO", "Tips and Tricks"]
cover: "./cover-image.webp"
---
```

- `draft: true` to hide from production
- `modificationDate` when updating an existing post
- `showComments: false` only for non-technical or personal posts
- Tags are capitalized naturally (e.g. "React Router 7", "Tips and Tricks", "SEO")

### Writing Style

The tone is conversational and direct - first person, as if explaining something to a fellow developer. Not overly formal, not overly casual. Sentences are concise but not robotic.

Key patterns:
- Open with a relatable problem or context, not a textbook definition
- Use "I" naturally (e.g. "I ran into this when...", "Here's how I set it up")
- Use "you" to address the reader directly (e.g. "You can now use this function")
- Contractions are fine and preferred (don't, isn't, you're, it's, that's)
- Keep paragraphs short - often 1-3 sentences
- Use `-` (hyphen/minus) for dashes, never `—` (em dash)
- Emphasis with `_**bold italic**_` for key takeaways (e.g. _**a single spam email**_)
- Italics with `_word_` for introducing terms or field names (e.g. _"company"_)
- Link to external resources generously, especially MDN, official docs, and GitHub repos
- Reference your own related posts with relative links (e.g. `[sitemap generation guide](/blog/sitemap-react-router-7)`)

### Structure

- `h2` (`##`) for main sections, `h3` (`###`) for subsections - these populate the table of contents
- Start with a brief intro (no heading) that sets context and motivation
- End naturally, often with a short closing thought or invitation for feedback - not a heavy "conclusion" section
- Include a `<NewsletterForm />` component roughly halfway through the post

### MDX Components

Common imports used across posts:

```mdx
import Alert from "@/components/Alert.astro";
import NewsletterForm from "@/components/react/NewsletterForm";
import ProfileBadge from "@/components/ProfileBadge.astro";
import Video from "@/components/Video.astro";
```

- `<Alert>` - for tips, warnings, info boxes, and questions. Types: `tip`, `warning`, `info`, `question`. Use `title` prop for custom headings.
- `<NewsletterForm />` - placed once per post, usually between sections around the middle
- `<ProfileBadge>` - for linking to GitHub repos/profiles inline
- `<Video>` - for Mux-hosted video embeds

### Code Blocks

Fenced code blocks support these meta options:
- `filename="path/to/file.ts"` - shows a file name header
- `showLineNumbers` - enables line numbers
- `showLineNumbers=8` - starts numbering at line 8
- `highlight={6-8}` or `{1,3}` - highlights specific lines
- `add={8-12}` / `remove={3-5}` - diff-style green/red highlighting
- `/pattern/` - inline regex highlighting within code
- Language after triple backticks (e.g. ` ```tsx `, ` ```bash `, ` ```json `)

## Adapter

Vercel adapter in production (`process.env.VERCEL`), Node adapter for local preview. The adapter is selected dynamically in `astro.config.ts`.
