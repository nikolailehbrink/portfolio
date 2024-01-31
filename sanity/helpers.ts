import type { Body } from "@/types/sanity/sanityPost";

export function getSanityBodyText(body: Body[]) {
  const postText = body
    .filter(({ _type }) => _type === "block")
    .map(({ children }) => children?.map(({ text }) => text))
    .join(" ");
  const postCode = body
    .filter(({ _type }) => _type === "code")
    .map(({ code }) => code?.split("\n"))
    .join("");

  return postText + postCode;
}
