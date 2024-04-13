import Logo from "@/app/icon.svg";

export default function Loading() {
  return (
    <div className="flex grow items-center justify-center">
      <Logo className="size-16 animate-pulse rounded-full lg:size-24" />
    </div>
  );
}
