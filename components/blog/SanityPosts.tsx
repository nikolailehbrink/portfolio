import { draftMode } from "next/headers";

import Posts from "@/components/blog/Posts";
import PostsPreview from "@/components/blog/PostsPreview";
import { loadQuery } from "@/sanity/lib/store";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import type { SanityPost } from "@/types/sanity/sanityPost";

export default async function SanityPosts() {
  const initial = await loadQuery<SanityPost[]>(
    POSTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? "previewDrafts" : "published",
    },
  );

  return draftMode().isEnabled ? (
    <PostsPreview initial={initial} />
  ) : (
    <Posts posts={initial.data} />
  );
}
