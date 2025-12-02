import { locale } from "@/consts";

export function formatDate(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
) {
  options ??= {
    year: "numeric",
    day: "2-digit",
    month: "short",
  };

  if (typeof date === "string" || typeof date === "number") {
    date = new Date(date);
  }

  if (isNaN(date.getDate())) {
    throw new Error("Invalid date provided");
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}
