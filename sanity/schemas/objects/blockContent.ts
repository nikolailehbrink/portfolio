import { supportedLanguages } from "@/lib/helpers";
import { toPlainText } from "next-sanity";
import { defineArrayMember, defineType } from "sanity";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: "image",
      options: { hotspot: true, metadata: ["lqip"] },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineArrayMember({
      type: "code",
      title: "Code Block",
      options: {
        theme: "dracula",
        language: "javascript",
        languageAlternatives: supportedLanguages,
        withFilename: true,
      },
    }),
    defineArrayMember({
      title: "Alert",
      name: "alert",
      type: "object",
      fields: [
        {
          title: "Heading",
          name: "heading",
          type: "string",
        },
        {
          title: "Message",
          name: "message",
          type: "array",
          of: [{ type: "block" }],
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Type",
          name: "type",
          type: "string",
          initialValue: "info",
          options: {
            list: [
              { title: "Info", value: "info" },
              { title: "Warning", value: "warning" },
              { title: "Error", value: "error" },
              { title: "Success", value: "success" },
              { title: "Tip", value: "tip" },
              { title: "Question", value: "question" },
            ],
          },
        },
      ],
      preview: {
        select: {
          message: "message",
          type: "type",
        },
        prepare({ message, type }) {
          return {
            title: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
            subtitle: toPlainText(message),
          };
        },
      },
    }),
  ],
});
