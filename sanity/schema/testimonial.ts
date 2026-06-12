import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Mumbai, Delhi, New York',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1 to 5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(1000),
    }),
    defineField({
      name: 'productCategory',
      title: 'Product Category',
      type: 'string',
      description: 'The category of product they purchased',
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      description: 'Toggle on to display this testimonial on the website',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'rating',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: `⭐ ${subtitle} Stars`,
      };
    },
  },
});
