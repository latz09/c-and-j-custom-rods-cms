import {seoField} from './partials/seoField'

export default {
  name: 'reviewsPage',
  type: 'document',
  title: 'Reviews Page',
  groups: [
    {name: 'hero', title: '① Hero'},
    {name: 'seo', title: '🔍 SEO'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Reviews',
    },

    // ─── 1. HERO ───────────────────────────────────────────────
    {
      name: 'hero',
      type: 'object',
      title: 'Hero',
      group: 'hero',
      description: 'Testimonial cards below are pulled live from the Testimonial collection — not stored here.',
      fields: [
        {name: 'headline', type: 'string', title: 'Headline', initialValue: 'Angler Feedback'},
        {
          name: 'subheadline',
          type: 'string',
          title: 'Subheadline',
          initialValue: 'Precision-crafted fishing rods. Unmatched sensitivity, strength, and customization.',
        },
      ],
    },

    ...seoField,
  ],

  preview: {
    select: {title: 'title'},
  },
}
