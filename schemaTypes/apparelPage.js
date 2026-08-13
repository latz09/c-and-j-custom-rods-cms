import {seoField} from './partials/seoField'

export default {
  name: 'apparelPage',
  type: 'document',
  title: 'Shop — Apparel',
  groups: [
    {name: 'hero', title: '① Hero'},
    {name: 'seo', title: '🔍 SEO'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Apparel',
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
        {name: 'heading', type: 'string', title: 'Heading', initialValue: 'Apparel'},
        {
          name: 'body',
          type: 'text',
          title: 'Body',
          rows: 3,
          initialValue: 'Branded clothing & merchandise.',
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
