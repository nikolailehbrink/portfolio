import type { SanityDocument } from "next-sanity";
import type { Image, Slug } from "./sanity";

export type SanityProject = SanityDocument & {
  description: string;
  image: Image;
  link: string;
  slug: Slug;
  title: string;
};
