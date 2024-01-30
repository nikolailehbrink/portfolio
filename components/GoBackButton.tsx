"use client";

import { useRouter } from "next/navigation";
import ArrowCircleLeft from "@/public/icons/arrow-circle-left.svg";
import { cn } from "@/lib/utils";

export default function GoBackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={cn("flex gap-2", className)}
    >
      <ArrowCircleLeft className="size-6" />
      Go back
    </button>
  );
}
