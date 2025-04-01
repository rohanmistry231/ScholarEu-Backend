import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'features',
  title: 'Features',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Feature Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'description',
      title: 'Feature Description',
      type: 'text',
      validation: (Rule) => Rule.required().min(10),
    }),
  ],
});
