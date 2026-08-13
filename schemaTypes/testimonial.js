export default {
  name: 'testimonial',
  type: 'document',
  title: 'Testimonial',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Angler Name',
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      description: 'Optional — catch photo or angler photo.',
      options: {hotspot: true},
    },
    {
      name: 'pullQuote',
      type: 'string',
      title: 'Pull Quote',
      description: 'Short headline quote — used on the Reviews grid and the product-page testimonial banner.',
    },
    {
      name: 'body',
      type: 'array',
      title: 'Full Review',
      description: 'Broken into paragraphs for the Reviews page detail view.',
      of: [{type: 'text', rows: 4}],
    },
    {
      name: 'seriesTag',
      type: 'string',
      title: 'Series Tag (optional)',
      description:
        'Matches a Rod Series "Series Tag" value exactly (e.g. "panfish-spinning"). When set, this testimonial shows on that series product pages instead of the default.',
    },
    {
      name: 'isDefault',
      type: 'boolean',
      title: 'Default / Fallback Testimonial',
      description:
        'Shown on the Contact page banner, and on any product page with no matching series testimonial. Only one testimonial should be marked default.',
      initialValue: false,
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
    select: {title: 'name', subtitle: 'pullQuote', media: 'photo'},
  },
}
