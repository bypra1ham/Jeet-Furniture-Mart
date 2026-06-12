import { defineField, defineType } from 'sanity';

export const getThemeZone = (category: string | undefined): 'spiritual' | 'modern' | 'artistic' => {
  if (!category) return 'modern';
  if (
    [
      'wooden-swing',
      'wooden-stand-jhula',
      'wooden-mandir',
      'wooden-deco-mandir',
      'korean-mandir',
    ].includes(category)
  ) {
    return 'spiritual';
  }
  if (['cnc-2d', 'cnc-3d'].includes(category)) {
    return 'artistic';
  }
  return 'modern';
};

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          // Spiritual / Classic
          { title: 'Wooden Swing (Jhula)', value: 'wooden-swing' },
          { title: 'Wooden Stand Jhula', value: 'wooden-stand-jhula' },
          { title: 'Wooden Mandir', value: 'wooden-mandir' },
          { title: 'Wooden Deco Mandir', value: 'wooden-deco-mandir' },
          { title: 'Korean Mandir', value: 'korean-mandir' },
          // Modern / Minimal
          { title: 'Sofa', value: 'sofa' },
          { title: 'Chair', value: 'chair' },
          { title: 'Bed', value: 'bed' },
          { title: 'TV Unit', value: 'tv-unit' },
          { title: 'Wardrobe', value: 'wardrobe' },
          { title: 'Modular Others', value: 'modular-others' },
          // Artistic / Craft
          { title: 'CNC 2D', value: 'cnc-2d' },
          { title: 'CNC 3D', value: 'cnc-3d' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'themeZone',
      title: 'Theme Zone',
      type: 'string',
      description: 'Derived automatically based on the chosen category (Spiritual, Modern, or Artistic)',
      readOnly: true,
      options: {
        list: [
          { title: 'Spiritual & Classical', value: 'spiritual' },
          { title: 'Modern & Minimal', value: 'modern' },
          { title: 'Artistic & Craft', value: 'artistic' },
        ],
      },
      // Automatically compute themeZone based on category on save/display
      // Sanity allows initialValue or components, but we will also compute it dynamically in the queries and frontend to be robust.
      initialValue: 'modern',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      description: 'The price of the product in INR',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g., 6ft x 4ft x 2ft',
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
      description: 'e.g., Teak Wood, Korean Acrylic, MDF',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
    },
  },
});
