import {defineType, defineField} from 'sanity';

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
  ],
});
