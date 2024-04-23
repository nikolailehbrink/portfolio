import PostTeaser from "@/components/pages/blog/PostTeaser";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import GoBackButton from "@/components/shared/GoBackButton";
import { cn } from "@/lib/utils";
import type { BlogPagePayload } from "@/types/sanity";

export interface BlogPageProps {
  data: BlogPagePayload | null;
}

export function BlogPage({ data }: BlogPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { blog: { title = "", overview = [] } = {}, posts = [] } = data ?? {};
  const firstPost = posts[0];
  const remainingPosts = posts.slice(1);
  return (
    <main className="container mx-auto my-4 mb-8 space-y-4 xl:space-y-8">
      <GoBackButton />
      <header
        className="prose prose-neutral mx-auto dark:prose-invert md:text-center"
      >
        <h1 className="my-3 text-balance text-5xl">{title}</h1>

        {overview && overview.length > 0 && (
          <div className="prose-lg">
            <CustomPortableText value={overview} />
          </div>
        )}
      </header>

      {firstPost && <PostTeaser post={firstPost} priority />}

      {remainingPosts && remainingPosts.length > 0 && (
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
    </main>
  );
}

export default BlogPage;
