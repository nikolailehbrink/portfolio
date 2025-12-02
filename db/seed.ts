import { getPosts } from "@/lib/posts";
import { db, ViewCount } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  const posts = await getPosts();
  await db.insert(ViewCount).values(
    posts.map((post) => ({
      pathname: `/blog/${post.id}`,
      views: Math.ceil(Math.random() * 1000),
    })),
  );
}
