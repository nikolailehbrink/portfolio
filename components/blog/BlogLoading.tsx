import PostTeaserSkeleton from "@/components/blog/PostTeaserSkeleton";

export default function BlogLoading() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <PostTeaserSkeleton className="lg:col-span-2" />
    </div>
  );
}
