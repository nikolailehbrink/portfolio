import type { ImageProps } from "next/image";
import Image from "next/image";

type AvatarImageProps = Omit<ImageProps, "src" | "alt"> & { alt?: string };

export default function AvatarImage({
  alt = "GitHub profile image of Nikolai Lehbrink",
  ...props
}: AvatarImageProps) {
  const imageUrl = "https://avatars.githubusercontent.com/u/38915700?v=4";

  return <Image alt={alt} width={120} height={120} {...props} src={imageUrl} />;
}
