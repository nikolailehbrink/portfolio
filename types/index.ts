import type { PortableTextBlock } from "next-sanity";
import type { Image as OriginalImage } from "sanity";

export interface Image extends OriginalImage {
  lqip?: string;
}

export interface MenuItem {
  _type: string;
  slug?: string;
  title?: string;
}

export interface MilestoneItem {
  description?: string;
  duration?: {
    start?: string;
    end?: string;
  };
  image?: OriginalImage;
  tags?: string[];
  title?: string;
}

export interface ShowcaseProject {
  _type: string;
  coverImage?: Image;
  overview?: PortableTextBlock[];
  slug?: string;
  tags?: string[];
  title?: string;
}

// Page payloads

export interface HomePagePayload {
  overview?: PortableTextBlock[];
  showcaseProjects?: ShowcaseProject[];
  title?: string;
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

export interface ProjectPayload {
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

export interface SettingsPayload {
  footer?: PortableTextBlock[];
  menuItems?: MenuItem[];
  ogImage?: Image;
}

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
  _rev: string;
  _updatedAt: string;
};

export type Author = {
  name?: string;
  slug?: string;
  image?: Image & { alt?: string };
  bio?: string;
};
