import { defineField, defineType } from "sanity";
import Diary from "@/assets/icons/unicons/diary.svg";

export default defineType({
  name: "experience",
  title: "Work Experience",
  type: "document",
  icon: Diary,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "object",
      fields: [
        defineField({
          name: "from",
          type: "date",
          title: "From",
          options: { dateFormat: "YYYY-MM" },
        }),
        defineField({
          name: "to",
          type: "date",
          title: "To",
          options: { dateFormat: "YYYY-MM" },
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
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
});
