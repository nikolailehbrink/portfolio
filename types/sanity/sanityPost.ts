import type { SanityDocument } from "next-sanity";
import type { Image, Reference, Slug } from "./sanity";
import type { PortableTextBlock } from "@portabletext/types";

export type SanityPost = SanityDocument & {
  headings: PortableTextBlock[];
  author: {
    name: string;
    slug: Slug;
    image: { asset: { _id: string; metadata: { lqip: string } }; alt: string };
    bio: string | null;
  };
  categories: {
    _id: string;
    title: string;
    description: string;
  }[];
  body: Body[];
  excerpt?: string;
  mainImage: Image;
  slug: Slug;
  title: string;
};

export type Body = {
  _key: string;
  _type: string;
  children?: Child[];
  markDefs?: MarkDef[];
  style?: string;
  alt?: string;
  asset?: Reference;
  code?: string;
  filename?: string;
  highlightedLines?: number[];
  language?: string;
};

export type Child = {
  _key: string;
  _type: ChildType;
  marks: string[];
  text: string;
};

export enum ChildType {
  Span = "span",
}

export type MarkDef = {
  _key: string;
  _type: string;
  href: string;
};
