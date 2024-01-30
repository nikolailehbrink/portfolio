import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";

type PostImageProps = {
  _key: string;
  asset: {
    _ref: string;
    _type: string;
    metadata: {
      lqip: string;
    };
  };
  _type: string;
  alt: string;
};
export default function PostImageComponent({
  value,
}: {
  value: PostImageProps;
}) {
  const imageProps = useNextSanityImage(client, value, {
    imageBuilder: (image) => image.fit("max"),
  });

  return (
    <Image
      width={imageProps.width}
      height={imageProps.height}
      src={imageProps.src}
      className="w-full rounded-lg"
      placeholder="blur"
      blurDataURL={value.asset.metadata.lqip}
      alt={value.alt || "No alt-tag provided"}
      sizes="
            (max-width: 768px) 95vw,
            (max-width: 1200px) 60vw,
            40vw"
    />
  );
}
