import type { SanityPost } from "@/types/sanity/sanityPost";
import Link from "next/link";

export default function Posts({ posts }: { posts: SanityPost[] }) {
  return (
    <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
      {/* <pre>{JSON.stringify(posts[0].title, null, 2)}</pre> */}
      {posts?.length > 0 ? (
        posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}>
            <h2 className="p-4 hover:bg-blue-50">{post.title}</h2>
          </Link>
        ))
      ) : (
        <div className="p-4 text-red-500">No posts found</div>
      )}
    </main>
  );
}
