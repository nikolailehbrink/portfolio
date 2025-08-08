export function formatDate(
  date: number | string | Date,
  options?: Intl.DateTimeFormatOptions,
) {
  options ??= {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  if (typeof date === "string" || typeof date === "number") {
    date = new Date(date);
  }

  if (isNaN(date.getDate())) {
    throw new Error("Invalid date provided");
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}

const locale = "en-US";
