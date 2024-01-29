import type { Image, Slug } from "./sanity";
import type { SanityDocument } from "next-sanity";

export type SanityService = SanityDocument & {
  description: string;
  image: Image;
  slug: Slug;
  title: string;
};
