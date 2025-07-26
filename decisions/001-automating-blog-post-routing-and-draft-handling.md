# Automating Blog Post Routing and Draft Handling

## Context

Previously, creating or publishing a blog post involved multiple manual steps:

- Manually declaring each route in [`routes.ts`](../app/routes.ts)
- Setting `draft: true` in the exported handle of the MDX file when starting a draft and remembering to remove it once it should be published
- Manually updating the [`prerender`](../react-router.config.ts) function once the post was ready to be published

These repetitive tasks were easy to forget, often causing build-time errors or missing prerendered pages.

## Decision

Switch to a file-based routing setup using [`remix-flat-routes`](https://github.com/kiliman/remix-flat-routes/discussions/158#discussioncomment-13736572), enabling automatic post route generation based on the file system.

- Drafts are placed under `posts/drafts/`

  - The path of the post then includes `/drafts/`, allowing to filter out drafts inside the `prerender` function

- Published posts live in `posts/_published/`

  - The `_` prefix prevents remix-flat-routes from including it in the URL
  - Published posts are served under `/blog/...`

This removes the need to manually edit route configs or draft flags. Only the file’s location determines its state.

## Consequences

- Fewer manual steps when drafting or publishing posts
- Eliminates class of build errors related to mismatched draft/prerender config
- Enables clean URLs and a more reliable workflow

## Outcome

Writing or publishing a post now only requires moving a file. This simplifies the authoring process and improves reliability across builds.
