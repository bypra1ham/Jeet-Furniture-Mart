export default {
  name: 'siteAnalytics',
  title: 'Site Analytics',
  type: 'document',
  fields: [
    {
      name: 'globalViews',
      title: 'Global Website Views',
      type: 'number',
      initialValue: 0,
      description: 'Total number of website visits.',
    },
  ],
  preview: {
    select: {
      title: 'globalViews',
    },
    prepare(selection: any) {
      return {
        title: `Global Views: ${selection.title || 0}`,
      };
    },
  },
};
