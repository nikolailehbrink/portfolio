---
name: write-blog-post
description: >-
  Write a new blog post for this portfolio in Nikolai's voice. Use when the user
  wants to draft, outline, or write a blog article/post for the site (e.g. "let's
  write a post about X", "new blog article", "draft a blog post"). Handles the full
  flow: folder + frontmatter, outline, section-by-section drafting, MDX components,
  and the house writing style.
---

# Write a blog post

Help draft a new MDX blog post for this portfolio that reads like Nikolai wrote it
himself. Work **interactively, step by step** - never dump a whole article at once.
The author wants to steer the outline and tone as it comes together.

## Workflow

Follow these phases in order. Stop and confirm with the author between each one.

### 1. Understand the topic

Ask for (or infer from what the user gave you):

- The **core problem or task** the post solves - the "I ran into this" moment.
- Any **code, config, or commands** that should appear.
- **Screenshots/metrics** that exist or should be captured (before/after, results).
- The **target framework/tech** (so tags and links are accurate).

If the topic is thin, ask 2-3 sharp questions before writing anything.

### 2. Propose folder + frontmatter

Create the folder `src/content/blog/<slug>/` and an `article.mdx` inside it. The
folder name is the URL slug (kebab-case, descriptive, not too long). Images live
in the same folder.

Draft the frontmatter and confirm it before continuing:

```yaml
---
title: "How to do something useful in <Tech>"
description: "Learn how to do X with Y for better Z."
publicationDate: "2026-06-02T12:00:00Z"
tags: ["React Router 7", "SEO", "Tips and Tricks"]
cover: "./cover-image.webp"
---
```

- `title` is capitalized naturally and specific (often "How to..." or a benefit).
- `description` is one sentence, search-friendly, starts with a verb where it fits.
- `publicationDate` uses ISO 8601 with time. Default to the current date.
- Add `draft: true` while writing - remove it only when the author says it's ready.
- `tags` are capitalized naturally (e.g. "React Router 7", "Tips and Tricks", "SEO").
  Reuse existing tags from other posts when they fit; don't invent near-duplicates.
- `cover` is optional but expected for most posts. `modificationDate` only when
  updating an already-published post. `showComments: false` only for personal /
  non-technical posts.

### 3. Propose the outline

Suggest the H2/H3 structure (these populate the table of contents) plus where the
intro, newsletter form, and any alerts/images go. Get a thumbs-up before drafting.

A typical shape:

- Intro (no heading) - the hook, 1-3 short paragraphs.
- 2-5 `##` sections, optionally with `###` subsections.
- `<NewsletterForm client:visible />` placed once, around the middle.
- A short closing paragraph (no "Conclusion" heading - see style rules).

### 4. Draft section by section

Write **one section at a time**, in the voice described below. After each, pause so
the author can react before you continue. Read 1-2 recent posts in
`src/content/blog/` first if you need to re-anchor on the voice.

### 5. Final pass

Once the body is done: re-read the whole thing for voice consistency, check links
resolve, confirm exactly one newsletter form, verify code blocks have the right meta
options, and remind the author to drop in real screenshots and remove `draft: true`.

## Writing style (the house voice)

This is Nikolai's voice as distilled from the existing posts. Match it.

### Voice & person

- Conversational and direct, like explaining something to a fellow developer.
- **First person "I"** for your own decisions, experience, and opinions
  ("In my opinion...", "I ran into this when...", "Here's how I set it up").
- **"you"** to address the reader for instructions ("You can now use this function").
- **"we"** only for a real team context (a work story) or didactically when walking
  through steps together ("so let's darken the border").
- Contractions always - don't, it's, you're, that's, isn't.

### Openings

Never open with a textbook definition. Start with a personal or temporal hook, then
say what's coming. Proven patterns:

- "Recently, we needed to..." / "Recently I added..."
- "Ever since I began using..., I've been looking for..."
- "One of my first tasks at my current job was..."
- "I ran into this when..." / "I encountered this when trying to..."
- Often followed by: "In this article, I'll walk through..."

### Paragraphs & rhythm

- Very short paragraphs - often 1-3 sentences, sometimes a single-sentence bridge
  ("So what was going on?").
- Bridge phrases the author actually uses: _"Here's how..."_, _"Let's..."_,
  _"Now, ..."_, _"This approach..."_, _"At first glance..."_, and sentences that
  start with _However_, _But_, or _So_.

### Headings

- **Sentence case** - only the first word capitalized.
  `## Install the necessary package`, `## Take lighting into account`.
- Mostly imperative and descriptive ("Register the route", "Configure the MDX
  plugin"). Question-style belongs in `<Alert type="question">` titles, not headings.

### Code blocks

- Introduce nearly every block with a sentence ending in a **colon**:
  "Deno provides a clean API for accessing environment variables:" then the code.
- After the block, explain what it does, usually starting with _"This..."_
  ("This approach eliminates the need for...", "This gives you an object with...").
- Use inline code with Shiki annotations in prose: `codeToHtml(){:tsx}`,
  `@font-face{:css}`, `npm install{:shell}`.
- Use meta options liberally: `filename="..."`, `showLineNumbers`,
  `showLineNumbers=8` (continue numbering), `highlight={6-8}`, `add={8-12}` /
  `remove={3-5}` for diffs. Shorten long blocks with `// ...`.

### Evidence & links

- Link generously - MDN for web concepts, official docs (Vite, React Router,
  Tailwind, etc.), GitHub repos, and even specific issues/commits as proof.
- Cross-link your own related posts with **relative paths**
  (e.g. `[sitemap generation guide](/blog/sitemap-react-router-7)`), including
  anchors where useful.
- Back claims with concrete numbers in **bold**: _**23.1 kB of bandwidth**_,
  _**37k+ emails sent**_, _**a single spam email**_. Pair with before/after
  screenshots that have long, descriptive alt text.

### Endings

- **Keep it short - no "Conclusion" heading.** Close with a brief result statement,
  often "You now have a fully automated... for your MDX blog posts." A short closing
  thought or a pointer to tools/docs is fine. Avoid heavy wrap-up sections.

### Emphasis & punctuation

- Bold (`**...**`) for key terms and metrics. Italics (`_word_`) for introducing a
  term or field name. Nested `_**bold italic**_` for the single strongest takeaway
  in a sentence.
- Dashes are always a hyphen with spaces ` - `, **never** an em dash `—`.
- Reach for `(e.g., ...)` to make things concrete - the author uses it a lot.
- Favorite words that fit the voice and may stay: _pretty_, _quite_, _subtle_,
  _straightforward_, _out of the box_. Don't overuse them in a single post.

### Language quality

Write clean, correct English while keeping the relaxed tone. Specifically avoid the
small slips that crept into older posts:

- No comma before "that" in restrictive clauses ("I think it's safe to say that...").
- Watch real typos the author has made: "address" (not "adress"), "built" (not
  "build" as past participle), no doubled "By as default".

## MDX components reference

Common imports (only import what the post actually uses):

```mdx
import Alert from "@/components/Alert.astro";
import NewsletterForm from "@/components/react/NewsletterForm";
import ProfileBadge from "@/components/ProfileBadge.astro";
import Video from "@/components/Video.astro";
```

- **`<Alert>`** - the main teaching device. Pick the type deliberately:
  - `type="tip"` - best practices, pointers to your own repo/commits.
  - `type="info"` - extra technical facts and clarifications.
  - `type="warning"` - gotchas and things that trip people up.
  - `type="question"` - FAQ-style aside, almost always with a question in `title`
    (e.g. `title="Why not use autocomplete=off?"`).
- **`<NewsletterForm client:visible />`** - exactly **once** per post, around the
  middle, often placed right under a heading. The `client:visible` directive is
  required or the form 405s on static pages.
- **`<ProfileBadge>`** - inline links to GitHub profiles/repos
  (`<ProfileBadge handle="antfu" platform="GitHub">Anthony Fu</ProfileBadge>`).
- **`<Video>`** - for Mux-hosted video embeds.

## Quick checklist before publishing

- [ ] Folder is `src/content/blog/<slug>/` with `article.mdx`
- [ ] Frontmatter complete; `publicationDate` set; tags reused where possible
- [ ] Opens with a personal/temporal hook, not a definition
- [ ] Headings in sentence case, TOC reads well
- [ ] Exactly one `<NewsletterForm client:visible />` around the middle
- [ ] Code blocks introduced with a colon, explained after with "This..."
- [ ] Links resolve; own posts cross-linked with relative paths
- [ ] Metrics in bold; screenshots have descriptive alt text
- [ ] Short ending, no "Conclusion" heading
- [ ] Dashes are ` - `, never `—`; clean English, no known typos
- [ ] `draft: true` removed only when the author confirms it's ready
