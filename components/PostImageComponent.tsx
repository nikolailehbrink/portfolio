import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";

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
  const { width, height } = getImageDimensions(value);

  return (
    <Image
      className="w-full rounded-lg"
      src={urlFor(value).auto("format").fit("max").url()}
      alt={value.alt || "No alt-tag provided"}
      width={900}
      height={900 * (height / width)}
      sizes="
            (max-width: 768px) 95vw,
            (max-width: 1200px) 60vw,
            40vw"
    />
  );
}
