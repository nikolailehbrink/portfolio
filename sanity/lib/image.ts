import urlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const imageUrlBuilder = urlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlFor = (source: Image) => {
  return imageUrlBuilder.image(source);
};
