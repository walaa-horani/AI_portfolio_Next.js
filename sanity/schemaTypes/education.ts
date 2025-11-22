import { defineField, defineType } from "sanity";

export default defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({
      name: "institution",
      title: "Institution Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "degree",
      title: "Degree",
      type: "string",
      description:
        "E.g., 'Bachelor of Science', 'Master of Computer Science'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fieldOfStudy",
      title: "Field of Study",
      type: "string",
      description: "E.g., 'Computer Science', 'Software Engineering'",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave blank if currently enrolled",
    }),
    defineField({
      name: "current",
      title: "Currently Enrolled",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Notable courses, achievements, or activities",
    }),
    defineField({
      name: "achievements",
      title: "Achievements & Honors",
      type: "array",
      of: [{ type: "string" }],
      description: "Dean's List, Scholarships, Awards, etc.",
    }),
  ],

  preview: {
    select: {
      title: "degree",
      subtitle: "institution",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
        media: null, // ما في شعار أو صورة
      };
    },
  },

  orderings: [
    {
      title: "Newest First",
      name: "dateDesc",
      by: [{ field: "endDate", direction: "desc" }],
    },
  ],
});
