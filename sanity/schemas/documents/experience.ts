import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Work Experience",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "duration",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "string",
      hidden: true,
    }),
    defineField({
      title: "Company",
      name: "company",
      type: "object",
      fields: [
        defineField({ name: "name", type: "string", title: "Name" }),
        defineField({ name: "url", type: "string", title: "Link" }),
        defineField({ name: "logo", type: "image", title: "Logo" }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Start, New",
      name: "startDateDesc",
      by: [{ field: "duration.start", direction: "desc" }],
    },
    {
      title: "End, New",
      name: "endDateDesc",
      by: [{ field: "duration.end", direction: "desc" }],
    },
  ],
});
