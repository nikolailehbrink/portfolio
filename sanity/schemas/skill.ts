import { defineField, defineType } from "sanity";

export default defineType({
  hidden: true,
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
  ],
});
