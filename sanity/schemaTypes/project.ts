import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short one-liner about the project",
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
     
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "category",
      title: "Project Category",
      type: "string",
      options: {
        list: [
          { title: "Web Application", value: "web-app" },
          { title: "Mobile App", value: "mobile-app" },
          { title: "AI/ML Project", value: "ai-ml" },
          { title: "API/Backend", value: "api-backend" },
          { title: "Game", value: "game" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "liveDemo",
      title: "Live Demo",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
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
      media: "coverImage",
      category: "category",
      featured: "featured",
    },
    prepare(selection) {
      const { title, media, category, featured } = selection;
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: category || "Uncategorized",
        media,
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
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
