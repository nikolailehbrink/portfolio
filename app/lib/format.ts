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
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export const locale = "en-US";
