import { defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Work Experience",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "period",
      title: "Period",
      type: "object",
      fields: [
        {
          name: "from",
          type: "date",
          title: "From",
          options: { dateFormat: "YYYY-MM" },
        },
        {
          name: "to",
          type: "date",
          title: "To",
          options: { dateFormat: "YYYY-MM" },
        },
      ],
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "skill",
      title: "Skill",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      title: "Company",
      name: "company",
      type: "object",
      fields: [
        { name: "name", type: "string", title: "Name" },
        { name: "url", type: "string", title: "Link" },
        { name: "logo", type: "image", title: "Logo" },
      ],
    },
  ],
});
