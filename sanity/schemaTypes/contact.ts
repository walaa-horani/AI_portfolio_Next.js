import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Form Submissions",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle,
      };
    },
  },

  orderings: [
    {
      title: "Newest First",
      name: "submittedDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});
