import type { SanityPost } from "@/types/sanity/sanityPost";
import PostTeaser from "./PostTeaser";
import { cn } from "@/lib/utils";

export default function Posts({ posts }: { posts: SanityPost[] }) {
  const firstPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      {firstPost && <PostTeaser post={firstPost} priority />}

      {remainingPosts?.length > 0 && (
        <div
          className={cn(
            "grid gap-8 lg:grid-cols-2 xl:grid-cols-3",
            remainingPosts.length < 3 && "xl:grid-cols-2",
          )}
        >
          {remainingPosts.map((post) => (
            <PostTeaser key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
