import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function slugify(slug: string) {
  return slug.trim().toLowerCase().replace(/\s+/g, "-");
}

/**
 * Derive a blog post's id/slug from its path relative to the content base: the
 * folder name is the slug, unless the folder is prefixed with `_`, in which case
 * the file name is used. Shared by the content loader (`content.config.ts`) and
 * the sitemap `lastmod` lookup so both derive the same URLs.
 */
export function generateBlogId(entry: string) {
  let slug = entry;
  const lastFolderIndex = entry.lastIndexOf("/");
  if (lastFolderIndex !== -1) {
    slug = entry.substring(0, lastFolderIndex);
    if (slug.includes("_")) {
      slug = entry.substring(lastFolderIndex + 1);
    }
  }
  const extension = entry.substring(entry.lastIndexOf("."));
  return slugify(slug.replace(extension, ""));
}
