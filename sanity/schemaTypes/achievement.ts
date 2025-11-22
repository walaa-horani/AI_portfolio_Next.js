import { defineField, defineType } from "sanity";

export default defineType({
  name: "achievement",
  title: "Achievements & Awards",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Achievement Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
            { title: "Built a Full Project", value: "project" },
            { title: "Solved a Major Bug", value: "bug-fix" },
            { title: "Completed a Coding Course", value: "course" },
            { title: "Contributed to Open Source", value: "open-source" },
            { title: "Published a Technical Article", value: "article" },
            { title: "Won a Coding Competition", value: "competition" },
            { title: "Reached a Learning Milestone", value: "milestone" },
            { title: "Got a Certificate", value: "certificate" },
            { title: "Gave a Tech Talk or Workshop", value: "talk" },
            { title: "Improved Project Performance", value: "performance" },
            { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "issuer",
      title: "Issuing Organization",
      type: "string",
      description: "Who awarded this?",
    }),
    defineField({
      name: "date",
      title: "Date Achieved",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    
   
    defineField({
      name: "featured",
      title: "Featured Achievement",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "issuer",
      type: "type",
    },
    prepare(selection) {
      const { title, subtitle, type } = selection;
      return {
        title: title,
        subtitle: `${type} - ${subtitle}`,
        media: null,
      };
    },
  },
  
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Newest First",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});