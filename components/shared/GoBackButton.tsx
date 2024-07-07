"use client";

import ArrowCircleLeft from "@/assets/icons/unicons/arrow-circle-left.svg";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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
        "group/back z-10 inline-flex justify-start gap-2 justify-self-start",
        className,
      )}
    >
      <ArrowCircleLeft className="size-6" />
      <span
        className="border-b-2 border-transparent group-hover/back:border-white"
      >
        {text}
      </span>
    </button>
  );
}
