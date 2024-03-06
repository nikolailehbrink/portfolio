import GoBackButton from "@/components/GoBackButton";
import Link from "next/link";
import { Suspense } from "react";
import BlogLoading from "./components/BlogLoading";
import SanityPosts from "./components/SanityPosts";

export const metadata = {
  title: "Blog",
  description:
    "A collection of articles about my experiences and learnings in web development and design.",
};

export default function Page() {
  return (
    <main className="container mx-auto my-8 space-y-8">
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
      <Suspense fallback={<BlogLoading />}>
        <SanityPosts />
      </Suspense>
    </main>
  );
}
