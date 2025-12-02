import { defineCollection, reference, z } from "astro:content";
import { file, glob } from "astro/loaders";
import { slugify } from "./lib/utils";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.{md,mdx}",
    generateId({ entry }) {
      // TODO: This function needs enhancement and tests. Having two articles in one folder without a "_" results in unexpected id generation etc.
      let slug = entry;
      const lastFolderIndex = entry.lastIndexOf("/");
      if (lastFolderIndex !== -1) {
        slug = entry.substring(0, lastFolderIndex);
        if (slug.includes("_")) {
          slug = entry.substring(lastFolderIndex + 1);
        }
      }
      const extension = entry.substring(entry.lastIndexOf("."));
      return slugify(slug.replace(extension, ""));
    },
  }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        draft: z.boolean().default(false),
        publicationDate: z.coerce.date(),
        modificationDate: z.coerce.date().optional(),
        cover: image().optional(),
        tags: z.array(z.string().min(1)).optional(),
        showComments: z.boolean().default(true),
        authors: z
          .array(reference("authors"))
          .min(1)
          .default(["nikolailehbrink"]),
      })
      .strict(),
});

const authors = defineCollection({
  loader: file("src/data/authors.json"),
  schema: ({ image }) =>
    z
      .object({
        name: z.string(),
        image: image().optional(),
        email: z.string().email().optional(),
        x: z
          .string()
          .url()
          .refine((arg) => arg.includes("x.com"), {
            message: "URL must contain x.com",
          })
          .optional(),
        github: z
          .string()
          .url()
          .refine((arg) => arg.includes("github.com"), {
            message: "URL must contain github.com",
          })
          .optional(),
        linkedin: z
          .string()
          .url()
          .refine((arg) => arg.includes("linkedin.com"), {
            message: "URL must contain linkedin.com",
          })
          .optional(),
      })
      .strict(),
});

const career = defineCollection({
  loader: file("src/data/career.json"),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        logo: image(),
        website: z.string().url().optional(),
        type: z.enum(["work", "education"]),
      })
      .strict(),
});

const projects = defineCollection({
  loader: file("src/data/projects.json"),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        image: image(),
        link: z.string().url().optional(),
        github: z.string().url().optional(),
        tags: z.array(z.string().min(1)),
      })
      .strict(),
});

export const collections = { blog, authors, career, projects };
