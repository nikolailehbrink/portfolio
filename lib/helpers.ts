import { PortableTextBlock } from "next-sanity";
import { getHighlighter } from "shiki";

import { HeadingBlock } from "@/types";

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
      getObjectPath(path).map(String)
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
];
