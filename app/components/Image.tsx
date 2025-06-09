import { Image as UnpicImage, type ImageProps } from "@unpic/react";

export default function Image(props: ImageProps) {
  return (
    <UnpicImage
      alt="Image"
      {...(import.meta.env.PROD ? { cdn: "vercel" } : {})}
      {...props}
    />
  );
}
