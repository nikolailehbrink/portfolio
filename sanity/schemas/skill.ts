import { defineField, defineType } from "sanity";
import Dumbbell from "@/assets/icons/unicons/dumbbell.svg";

export default defineType({
  hidden: true,
  name: "skill",
  title: "Skill",
  type: "document",
  icon: Dumbbell,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
  ],
});
