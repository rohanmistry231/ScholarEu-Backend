// sanity/schemas/successStories.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'successStories',
  title: 'Success Stories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Student Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'smallDescription',
      title: 'Small Description',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'text',
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: 'image',
      title: 'Student Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});