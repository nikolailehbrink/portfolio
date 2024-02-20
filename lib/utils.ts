import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDev = process.env.NODE_ENV === "development";

export const twConfig = resolveConfig(tailwindConfig);

export function getDateDifferenceInHours(date: Date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const hours = Math.abs(diff / (1000 * 60 * 60));
  if (hours < 1) {
    return hours.toFixed(1);
  }

  return Math.floor(hours);
}
