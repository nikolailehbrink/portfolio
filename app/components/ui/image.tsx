import { cn } from "@/lib/utils";
import { Image as UnpicImage, type ImageProps } from "@unpic/react";

export default function Image({
  caption,
  className,
  ...props
}: ImageProps & { caption?: string }) {
  const image = (
    <UnpicImage
      className={cn(
        "rounded-lg object-cover",
        { "saturate-[1.2]": import.meta.env.PROD },
        className,
      )}
      loading="lazy"
      {...props}
      {...(import.meta.env.PROD ? { cdn: "vercel" } : {})}
    />
  );

  return caption ? (
    <figure>
      {image}
      <figcaption className="flex justify-center text-center">
        {caption}
      </figcaption>
    </figure>
  ) : (
    image
  );
}
