import type { SanityDocument } from "next-sanity";
import type { Image, Reference, Slug } from "./sanity";

export type SanityPost = SanityDocument & {
  author: Reference;
  body: Body[];
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
