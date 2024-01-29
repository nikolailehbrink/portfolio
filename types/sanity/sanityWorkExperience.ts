import type { SanityDocument } from "next-sanity";
import type { Image } from "./sanity";

export type SanityWorkExperience = SanityDocument & {
  company: {
    logo: Image;
    name: string;
    url: string;
  };
  description: string;
  period: {
    from: string;
    to: string;
  };
  title: string;
};
