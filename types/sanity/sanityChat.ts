import type { SanityDocument } from "next-sanity";

export type SanityChat = SanityDocument & {
  additionalInformation: string;
  examples: {
    _key: string;
    heading: string;
    message: string;
  }[];
  logo: {
    _id: string;
    metadata: {
      lqip: string;
    };
  };
  name: string;
  type: string;
};
