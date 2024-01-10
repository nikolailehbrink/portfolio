import { createClient } from "@sanity/client/stega";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});
