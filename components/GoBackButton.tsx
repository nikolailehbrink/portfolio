"use client";

import { useRouter } from "next/navigation";

// import ArrowCircleLeft from "@/assets/icons/unicons/arrow-circle-left.svg";
import { cn } from "@/lib/utils";

export default function GoBackButton({
  className,
  text = "Go back",
}: {
  className?: string;
  text?: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={cn(
        "group/back inline-flex justify-start gap-2 justify-self-start",
        className,
      )}
    >
      {/* <ArrowCircleLeft className="size-6" /> */}
      <span className="group-hover/back:underline group-hover/back:underline-offset-4">
        {text}
      </span>
    </button>
  );
}
