import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function slugify(slug: string) {
  return slug.trim().toLowerCase().replace(/\s+/g, "-");
}
