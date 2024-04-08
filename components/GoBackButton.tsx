"use client";

import { UimArrowCircleLeft } from "@iconscout/react-unicons-monochrome";
import { useRouter } from "next/navigation";

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
        className
      )}
    >
      <UimArrowCircleLeft className="size-6 text-orange" />
      <span className="group-hover/back:underline group-hover/back:underline-offset-4">
        {text}
      </span>
    </button>
  );
}
