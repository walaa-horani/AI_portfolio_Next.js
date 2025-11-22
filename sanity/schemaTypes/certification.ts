import { defineField, defineType } from "sanity";

export default defineType({
  name: "certification",
  title: "Certifications",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Certification Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuing Organization",
      type: "string",
      description: "E.g., 'AWS', 'Google Cloud', 'Microsoft'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issueDate",
      title: "Issue Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "What skills or knowledge this certification represents",
    }),
    defineField({
      name: "skills",
      title: "Related Skills",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "issuer",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
        media: null, // لأنه ما عندك صورة
      };
    },
  },

  orderings: [
    {
      title: "Newest First",
      name: "dateDesc",
      by: [{ field: "issueDate", direction: "desc" }],
    },
  ],
});
