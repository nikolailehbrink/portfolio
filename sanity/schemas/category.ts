import { defineField, defineType } from "sanity";
import TagAlt from "@/assets/icons/unicons/tag-alt.svg";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagAlt,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
