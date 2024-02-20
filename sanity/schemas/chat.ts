import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "chat",
  title: "Chat",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
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
      title: "Typ",
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
      name: "examples",
      title: "Chat Examples",
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
      name: "additionalInformation",
      title: "System Message",
      type: "text",
    }),
  ],
});
