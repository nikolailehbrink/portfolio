import "server-only";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { groq } from "next-sanity";

// Used in `generateStaticParams`
export function generateStaticSlugs(type: string) {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token,
      perspective: "published",
      useCdn: false,
      stega: false,
    })
    .fetch<string[]>(
      groq`*[_type == $type && defined(slug.current)]{"slug": slug.current}`,
      { type },
      {
        next: {
          tags: [type],
        },
      },
    );
}
