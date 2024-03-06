import type { SanityChat } from "@/types/sanity/sanityChat";
import UserCircle from "@/assets/icons/unicons/user-circle.svg";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import AvatarImage from "@/components/AvatarImage";

export default function ChatAvatar({
  role,
  logo,
  name,
}: { role: string } & Partial<Pick<SanityChat, "logo" | "name">>) {
  if (role === "user" && logo) {
    return (
      <Image
        width={42.5}
        height={42.5}
        className="size-10 rounded-full border-2 border-blue"
        src={urlFor(logo).size(50, 50).quality(100).url()}
        alt={`Logo ${name}`}
      />
    );
  } else if (role === "user") {
    return (
      <div className="flex size-10 shrink-0 select-none items-center justify-center rounded-full border-2 border-blue ">
        <UserCircle className="size-8" />
      </div>
    );
  } else {
    return (
      <AvatarImage className="size-10 rounded-full border-2 border-orange" />
    );
  }
}
