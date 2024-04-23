import UserCircle from "@/assets/icons/unicons/user-circle.svg";
import ProfileImage from "@/components/shared/ProfileImage";
import { urlForImage } from "@/sanity/lib/utils";
import type { ChatPayload } from "@/types/sanity";
import Image from "next/image";

export default function ChatAvatar({
  role,
  logo,
  name,
}: { role: string } & Partial<Pick<ChatPayload, "logo" | "name">>) {
  if (role === "user" && logo) {
    const src = urlForImage(logo)?.size(50, 50).quality(100).url();
    return (
      src && (
        <Image
          width={42.5}
          height={42.5}
          className="size-10 rounded-full border-2 border-sky-500"
          src={src}
          alt={`Logo ${name}`}
          placeholder={logo.lqip ? "blur" : "empty"}
          blurDataURL={logo.lqip}
        />
      )
    );
  } else if (role === "user") {
    return (
      <div
        className="flex size-10 shrink-0 select-none items-center justify-center
          rounded-full border-2 border-sky-500"
      >
        <UserCircle className="size-8" />
      </div>
    );
  } else {
    return (
      <ProfileImage className="size-10 rounded-full border-2 border-orange-500" />
    );
  }
}
