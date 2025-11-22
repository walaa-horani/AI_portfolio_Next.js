import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
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
      name: "icon",
      title: "Icon/Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Icon or illustration representing the service",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Brief one-liner",
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed description of the service",
    }),
    
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
    }),
   
  
    defineField({
      name: "featured",
      title: "Featured Service",
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
      media: "icon",
      featured: "featured",
    },
    prepare(selection) {
      const { title, media, featured } = selection;
      return {
        title: featured ? `⭐ ${title}` : title,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});