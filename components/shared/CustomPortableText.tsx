import AnchorHeading from "@/components/pages/blog/AnchorHeading";
import ImageBox from "@/components/shared/ImageBox";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import { Suspense } from "react";
import type { Image } from "sanity";
import Alert from "../pages/blog/Alert";
import IconLink from "../pages/blog/IconLink";
import { Skeleton } from "../ui/skeleton";
import Code from "./Code";
import CodeBlock from "./CodeBlock";

export function CustomPortableText({ value }: { value: PortableTextBlock[] }) {
  const components: PortableTextComponents = {
    block: {
      h2: AnchorHeading,
      h3: AnchorHeading,
      h4: AnchorHeading,
      h5: AnchorHeading,
      h6: AnchorHeading,
    },
    marks: {
      code: ({ children }) => <Code>{children}</Code>,
      link: IconLink,
    },
    types: {
      code: ({ value }) => {
        return (
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            <CodeBlock {...value} />
          </Suspense>
        );
      },
      image: ({ value }: { value: Image & { alt?: string } }) => {
        return <ImageBox image={value} />;
      },
      alert: ({ value }) => {
        const { type, message, heading } = value || {};
        return (
          <Alert
            className="not-prose"
            type={type}
            message={message}
            heading={heading}
          />
        );
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
