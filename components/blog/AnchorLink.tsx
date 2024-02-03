"use client";

import Link from "next/link";
import LinkAlt from "@/assets/icons/unicons/link-alt.svg";
import { toast } from "sonner";

const copyLinkToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied link to clipboard!");
  } catch (error) {
    toast.error("Failed to copy link to clipboard!");
  }
};

type Props = { slug: string };
export default function AnchorLink({ slug }: Props) {
  return (
    <Link
      href={`#${slug}`}
      className=" lg:absolute lg:-left-7"
      aria-hidden="true"
      tabIndex={-1}
      onClick={() => copyLinkToClipboard(location.href)}
    >
      <LinkAlt className="w-5" />
    </Link>
  );
}
