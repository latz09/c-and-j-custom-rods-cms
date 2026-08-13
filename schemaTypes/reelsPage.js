import {seoField} from './partials/seoField'

export default {
  name: 'reelsPage',
  type: 'document',
  title: 'Shop — Reels',
  groups: [
    {name: 'hero', title: '① Hero'},
    {name: 'seo', title: '🔍 SEO'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Reels',
    },

    // ─── 1. HERO ───────────────────────────────────────────────
    // No Figma design exists yet — hero copy below is placeholder
    // pulled from the wireframe. Product grid is Shopify-driven.
    {
      name: 'hero',
      type: 'object',
      title: 'Hero',
      group: 'hero',
      fields: [
        {name: 'heading', type: 'string', title: 'Heading', initialValue: 'Reels'},
        {
          name: 'body',
          type: 'text',
          title: 'Body',
          rows: 3,
          initialValue: 'Quality reels to pair with your custom rod.',
        },
        {
          name: 'image',
          type: 'image',
          title: 'Hero Image',
          options: {hotspot: true},
        },
      ],
    },

    ...seoField,
  ],

  preview: {
    select: {title: 'title'},
  },
}
