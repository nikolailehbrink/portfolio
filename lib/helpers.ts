import { PortableTextBlock } from "next-sanity";

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
