import type { SearchPostsResult } from "@/lib/chat-tools";

// Renders the output of the `searchPosts` chat tool as compact, clickable
// cards so visitors can jump straight into the matching articles.
export default function PostResults({ posts }: { posts: SearchPostsResult }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="not-prose mt-2 mb-3 flex flex-col gap-3">
      {posts.map(({ title, description, slug }) => (
        <a
          key={slug}
          href={`/blog/${slug}`}
          className="flex flex-col gap-1 rounded-lg border border-border
            bg-muted/50 p-3 transition-colors hover:bg-muted"
        >
          <span className="flex items-center gap-1 font-semibold">{title}</span>
          <span className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </span>
        </a>
      ))}
    </div>
  );
}
