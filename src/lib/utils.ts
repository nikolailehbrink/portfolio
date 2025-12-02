import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

// TODO: Needs enhancement and tests
export function slugify(slug: string) {
  return slug.trim().toLowerCase().replaceAll(" ", "-");
}
