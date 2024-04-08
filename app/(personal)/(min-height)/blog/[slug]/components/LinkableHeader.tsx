import type { PortableTextComponentProps } from "@portabletext/react";
import { toPlainText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import slugify from "slugify";

import AnchorLink from "./AnchorLink";

const LinkableHeader = ({
  children,
  value,
}: PortableTextComponentProps<PortableTextBlock>) => {
  const HeadingTag = value.style as keyof JSX.IntrinsicElements;
  const slug = slugify(toPlainText(value));

  return (
    <HeadingTag
      id={slug}
      className="relative flex scroll-mt-4 items-center gap-2 lg:scroll-mt-24"
    >
      <AnchorLink slug={slug} />
      {children}
    </HeadingTag>
  );
};
export default LinkableHeader;
