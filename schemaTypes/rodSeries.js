export default {
  name: 'rodSeries',
  type: 'document',
  title: 'Rod Series',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Series Name',
      description: 'e.g. "Panfish Spinning"',
    },
    {
      name: 'slug',
      type: 'string',
      title: 'Series Tag',
      description:
        'Must exactly match the Shopify product tag for this series (e.g. "panfish-spinning"). This is a TAG VALUE, not a Shopify collection handle — there is no per-series collection in Shopify.',
    },
    {
      name: 'applicationType',
      type: 'string',
      title: 'Water Type Tag',
      options: {
        list: [
          {title: 'Open Water', value: 'open-water'},
          {title: 'Ice Fishing', value: 'ice'},
        ],
      },
      description: 'Paired with the series tag at query time — e.g. tag:open-water AND tag:panfish-spinning.',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Series Description',
      rows: 5,
    },
    {
      name: 'heroImage',
      type: 'image',
      title: 'Series Photo',
      options: {hotspot: true},
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'slug', media: 'heroImage'},
  },
}
