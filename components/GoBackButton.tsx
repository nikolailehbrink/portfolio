"use client";

import { useRouter } from "next/navigation";
import ArrowCircleLeft from "@/public/icons/arrow-circle-left.svg";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex gap-2 lg:sticky lg:top-24"
    >
      <ArrowCircleLeft className="size-6" />
      Go back
    </button>
  );
}
