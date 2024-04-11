import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/utils";
import type { Image as ImageType } from "@/types/sanity";

interface Props {
  image?: ImageType & { alt?: string };
}

export default function ImageBox({ image = {} }: Props) {
  const imageProps = useNextSanityImage(client, image, {
    imageBuilder: (image) => image.fit("max").quality(100),
  });

  return (
    imageProps.src && (
      <Image
        width={imageProps.width}
        height={imageProps.height}
        src={imageProps.src}
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
