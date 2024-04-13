import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDev = process.env.NODE_ENV === "development";

export async function copyToClipboard(
  text: string,
  {
    success,
    error,
    finish,
  }: {
    success?: () => void;
    error?: (e?: unknown) => void;
    finish?: () => void;
  } = {},
) {
  try {
    await navigator.clipboard.writeText(text);
    if (success) {
      success();
    }
  } catch (e) {
    if (error) {
      error(e);
    }
  } finally {
    if (finish) {
      finish();
    }
  }
}
