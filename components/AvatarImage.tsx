import type { ImageProps } from "next/image";
import Image from "next/image";

type AvatarImageProps = Omit<ImageProps, "src" | "alt"> & { alt?: string };

export default function AvatarImage({
  alt = "GitHub profile image of Nikolai Lehbrink",
  ...props
}: AvatarImageProps) {
  return (
    <Image
      alt={alt}
      width={460}
      height={460}
      {...props}
      src={"https://avatars.githubusercontent.com/u/38915700?v=4"}
    />
  );
}
