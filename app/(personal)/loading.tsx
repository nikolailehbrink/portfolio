import Logo from "@/app/icon.svg";

export default function Loading() {
  return (
    <div className="grow flex items-center justify-center">
      <Logo className="size-16 lg:size-24 animate-pulse rounded-full" />
    </div>
  );
}
