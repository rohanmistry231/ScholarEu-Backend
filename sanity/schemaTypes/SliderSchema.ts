import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sliderImage',
  title: 'Slider Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
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
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Position in the slider (lower numbers appear first)',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'URL to open when the slide is clicked (e.g., https://example.com)',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      media: 'image',
    },
  },
});