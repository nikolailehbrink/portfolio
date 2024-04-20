import type { HeadingBlock } from "@/types/sanity";
import type { PortableTextBlock } from "next-sanity";

const get = (object: any, path: string[]) =>
  path.reduce((prev, curr) => prev[curr], object);
const getObjectPath = (path: number[]) =>
  path.length === 0
    ? path
    : ["subheadings"].concat(path.join(".subheadings.").split("."));

export const parseOutline = (headings: PortableTextBlock[]) => {
  const outline = { subheadings: [] };
  const path: number[] = [];
  let previousLevel = 0;

  headings.forEach((heading) => {
    const currentLevel = Number(heading.style?.slice(1));
    const nestedHeading: HeadingBlock = {
      ...heading,
      subheadings: [],
    };

    if (currentLevel < previousLevel) {
      for (let i = previousLevel; i >= currentLevel; i--) {
        path.pop();
      }
    } else if (currentLevel === previousLevel) {
      path.pop();
    }

    const currentOutlinePosition = get(
      outline,
      getObjectPath(path).map(String),
    );
    currentOutlinePosition.subheadings.push(nestedHeading);
    path.push(currentOutlinePosition.subheadings.length - 1);
    previousLevel = currentLevel;
  });

  return outline.subheadings;
};

export function getDateDifferenceInHours(date: Date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const hours = Math.abs(diff / (1000 * 60 * 60));
  if (hours < 1) {
    return hours.toFixed(1);
  }

  return Math.floor(hours);
}

export function getFormattedDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export const supportedLanguages = [
  { title: "TypeScript", value: "typescript" },
  { title: "JavaScript", value: "javascript" },
  { title: "TSX", value: "tsx" },
  { title: "JSON", value: "json" },
  { title: "CSS", value: "css" },
  { title: "HTML", value: "html" },
  { title: "Markdown", value: "markdown" },
  { title: "Terminal", value: "ansi" },
  { title: "Text", value: "text" },
  { title: "PostCSS", value: "postcss" },
  { title: "SCSS", value: "scss" },
];

export const facts = [
  "The First Computer Programmer Was Ada Lovelace: She wrote the first algorithm intended for a machine, the Analytical Engine, a mechanical general-purpose computer.",
  "The First Video Game Was Invented in 1958: Physicist William Higinbotham created a game called Tennis for Two, which was played on an oscilloscope.",
  "The First Computer Mouse Was Made of Wood: It was invented by Doug Engelbart in 1964 and was made of wood with two metal wheels.",
  "The First Website Went Live in 1991: It was created by Tim Berners-Lee and was dedicated to information on the World Wide Web project.",
  "The First Computer Virus Was Created in 1983: It was called the Elk Cloner and was created by Rich Skrenta as a prank.",
  "The First Domain Name Registered Was Symbolics.com: It was registered on March 15, 1985.",
  "The First Email Was Sent in 1971: It was sent by Ray Tomlinson, who is also credited with the use of the @ symbol in email addresses.",
  "The First Mobile Phone Call Was Made in 1973: It was made by Martin Cooper, a Motorola researcher and executive, who made the call to his rival at Bell Labs.",
  "The First Text Message Was Sent in 1992: It was sent by Neil Papworth, a 22-year-old engineer, to Richard Jarvis, a Vodafone director.",
  "The First Camera Phone Was Invented in 2000: It was the J-SH04, created by Sharp.",
];
