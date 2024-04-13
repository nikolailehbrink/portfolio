import { client } from "@/sanity/lib/client";
import type { Image as ImageType } from "@/types/sanity";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

interface Props {
  image?: ImageType & { alt?: string };
}

export default function ImageBox({ image = {} }: Props) {
  const imageProps = useNextSanityImage(client, image, {
    imageBuilder: (image) => image.fit("max").quality(100),
  });
  const { src, height, width } = imageProps || {};

  return (
    src && (
      <Image
        width={width}
        height={height}
        src={src}
        className="w-full rounded-lg"
        placeholder="blur"
        blurDataURL={image.lqip}
        alt={image.alt ?? "Post image"}
        sizes="
          (max-width: 768px) 95vw,
          (max-width: 1200px) 60vw,
          40vw"
      />
    )
  );
}
