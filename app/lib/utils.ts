import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isDraft(path?: string): boolean {
  return path?.includes("/drafts/") ?? false;
}

// TODO: Needs enhancement?!
export function slugify(slug: string) {
  return slug.trim().toLowerCase().replaceAll(" ", "-");
}
