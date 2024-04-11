import type { PortableTextBlock } from "next-sanity";
import type { Image as OriginalImage } from "sanity";

export interface Image extends OriginalImage {
  lqip?: string;
}

export type HeadingBlock = PortableTextBlock & {
  subheadings: HeadingBlock[];
};

export type ShowcaseProject = Pick<
  ProjectPayload,
  "coverImage" | "overview" | "slug" | "tags" | "title" | "site" | "_type"
>;

// Page payloads

export interface HomePagePayload {
  projects?: ShowcaseProject[];
  services?: ServicePayload[];
  experiences?: ExperiencePayload[];
}

export interface BlogPagePayload {
  blog?: {
    title?: string;
    overview?: PortableTextBlock[];
  };
  posts?: PostPayload[];
}

export interface PagePayload {
  body?: PortableTextBlock[];
  name?: string;
  overview?: PortableTextBlock[];
  title?: string;
  slug?: string;
}

export interface ServicePayload {
  _id: string;
  _type: string;
  title?: string;
  slug?: string;
  description?: string;
  image?: Image;
}

export interface ExperiencePayload {
  _id: string;
  _type: string;
  title?: string;
  duration?: {
    start?: string;
    end?: string;
  };
  description?: string;
  company?: {
    name?: string;
    url?: string;
    logo?: Image;
  };
}

export interface ProjectPayload {
  _type: string;
  _id: string;
  client?: string;
  coverImage?: Image;
  description?: PortableTextBlock[];
  duration?: {
    start?: string;
    end?: string;
  };
  overview?: PortableTextBlock[];
  site?: string;
  slug: string;
  tags?: string[];
  title?: string;
}

export type ChatPayload = {
  addtionalData?: string;
  logo?: Image;
  messageTemplates?: {
    _key: string;
    heading: string;
    message: string;
  }[];
  name?: string;
  slug?: string;
  type?: string;
};

export type PostPayload = {
  _id: string;
  _type: string;
  title?: string;
  slug?: string;
  overview?: PortableTextBlock[];
  publishedAt?: string;
  author?: Author;
  coverImage?: Image & { alt?: string };
  tags?: string[];
  body?: PortableTextBlock[];
  headings?: PortableTextBlock[];
  _rev: string;
  _updatedAt: string;
};

export type Author = {
  name?: string;
  slug?: string;
  image?: Image & { alt?: string };
  bio?: string;
  url?: string;
};
