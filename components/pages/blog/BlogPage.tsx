import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import Link from "next/link";

import GoBackButton from "@/components/GoBackButton";
import { ProjectListItem } from "@/components/pages/home/ProjectListItem";
import PostTeaser from "@/components/PostTeaser";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { Header } from "@/components/shared/Header";
import { cn } from "@/lib/utils";
import { resolveHref } from "@/sanity/lib/utils";
import type { BlogPagePayload, HomePagePayload } from "@/types/sanity";

export interface BlogPageProps {
  data: BlogPagePayload | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function BlogPage({ data, encodeDataAttribute }: BlogPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { blog: { title = "", overview = [] } = {}, posts = [] } = data ?? {};
  const firstPost = posts[0];
  const remainingPosts = posts.slice(1);
  return (
    <main className="container mx-auto my-8 space-y-8">
      <GoBackButton />
      <header className="prose mx-auto dark:prose-invert md:text-center">
        <h1 className="my-3 text-5xl">{title}</h1>

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
            remainingPosts.length < 3 && "xl:grid-cols-2"
          )}
        >
          {remainingPosts.map((post) => (
            <PostTeaser key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
    // <div className="space-y-20">
    //   <p>{title}</p>

    //   {posts && posts.length > 0 && (
    //     <div className="mx-auto max-w-[100rem] rounded-md border">
    //       {posts.map((post, key) => {
    //         const href = resolveHref(post?._type, post?.slug)
    //         if (!href) {
    //           return null
    //         }
    //         return (
    //           <Link
    //             key={key}
    //             href={href}
    //             data-sanity={encodeDataAttribute?.([
    //               'showcaseProjects',
    //               key,
    //               'slug',
    //             ])}
    //           >
    //             <ProjectListItem project={post} odd={key % 2} />
    //           </Link>
    //         )
    //       })}
    //     </div>
    //   )}
    // </div>
  );
}

export default BlogPage;
