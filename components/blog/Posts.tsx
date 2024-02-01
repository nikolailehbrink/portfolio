import type { SanityPost } from "@/types/sanity/sanityPost";
import GoBackButton from "../GoBackButton";
import PostTeaser from "./PostTeaser";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Posts({ posts }: { posts: SanityPost[] }) {
  const firstPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <main className="container mx-auto my-8 grid grid-cols-1 space-y-8">
      <GoBackButton />
      <header className="prose mx-auto dark:prose-invert md:text-center">
        <h1 className="my-3 text-5xl">Blog</h1>
        <p>
          Thanks for visiting my blog. Here I share my thoughts on web
          development, design and other topics that interest me. If you have any
          questions, comments or post ideas please feel free to{" "}
          <Link href="/#contact">reach out to me.</Link>
        </p>
      </header>
      {firstPost && <PostTeaser post={firstPost} priority />}
      {otherPosts?.length > 0 ? (
        <div
          className={cn(
            "grid gap-8 lg:grid-cols-2 xl:grid-cols-3",
            otherPosts.length < 3 && "xl:grid-cols-2",
          )}
        >
          {otherPosts.map((post) => (
            <PostTeaser key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="p-4 text-red-500">No posts found</div>
      )}
    </main>
  );
}
