import { RobotIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "chat",
  title: "Chat",
  type: "document",
  icon: RobotIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 20,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      initialValue: "company",
      options: {
        list: [
          { title: "Company", value: "company" },
          { title: "Person", value: "person" },
        ],
      },
    }),
    defineField({
      name: "messageTemplates",
      title: "Message Templates",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.max(20).required(),
            }),
            defineField({
              name: "message",
              title: "Message",
              type: "string",
              validation: (Rule) => Rule.max(50).required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "addtionalData",
      title: "Additional Data",
      type: "text",
    }),
  ],
});
