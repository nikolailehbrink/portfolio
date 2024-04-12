import BlogPage from "@/components/pages/blog/BlogPage";
import { studioUrl } from "@/sanity/lib/api";
import { loadBlogPage } from "@/sanity/loader/loadQuery";
import { type Metadata } from "next";
import { toPlainText } from "next-sanity";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import Link from "next/link";

const BlogPagePreview = dynamic(
  () => import("@/components/pages/blog/BlogPagePreview"),
);

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadBlogPage();
  return {
    title: data?.blog?.title,
    description: data?.blog?.overview && toPlainText(data?.blog?.overview),
  };
}

export default async function IndexRoute() {
  const initial = await loadBlogPage();

  if (draftMode().isEnabled) {
    return <BlogPagePreview initial={initial} />;
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{" "}
        <Link href={`${studioUrl}/desk/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    );
  }

  return <BlogPage data={initial.data} />;
}
