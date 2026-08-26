import {seoField} from './partials/seoField'

export default {
  name: 'inStockRodsPage',
  type: 'document',
  title: 'Shop — In-Stock Rods',
  groups: [
    {name: 'hero', title: '① Hero'},
    {name: 'bySeries', title: '② By Series'},
    {name: 'fullGrid', title: '③ Full Grid'},
    {name: 'seo', title: '🔍 SEO'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'In-Stock Rods',
    },
    {
      name: 'season',
      type: 'string',
      title: 'Current Season',
      description:
        'Controls which filter is shown/selected first on page load — switch this seasonally as ice/open-water fishing comes into or out of season.',
      options: {
        list: [
          {title: 'Open Water', value: 'open-water'},
          {title: 'Ice Fishing', value: 'ice'},
        ],
        layout: 'radio',
      },
      initialValue: 'open-water',
    },

    // ─── 1. HERO ───────────────────────────────────────────────
    {
      name: 'hero',
      type: 'object',
      title: 'Hero',
      group: 'hero',
      fields: [
        {name: 'headline', type: 'string', title: 'Headline', initialValue: 'In-Stock Rods'},
        {
          name: 'subheadline',
          type: 'string',
          title: 'Subheadline',
          initialValue: 'Explore all of our in-stock rods.',
        },
        {
          name: 'image',
          type: 'image',
          title: 'Hero Image',
          options: {hotspot: true},
        },
        {
          name: 'ctaSeries',
          type: 'object',
          title: 'CTA 1 — Jump to Series',
          fields: [
            {name: 'label', type: 'string', title: 'Label', initialValue: 'Explore by Rod Series'},
            {
              name: 'url',
              type: 'string',
              title: 'Anchor ID',
              description: 'In-page anchor — read-only in practice',
              initialValue: '#by-series',
            },
          ],
        },
        {
          name: 'ctaAllRods',
          type: 'object',
          title: 'CTA 2 — Jump to Full Grid',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              initialValue: 'Explore All In-Stock Rods',
            },
            {
              name: 'url',
              type: 'string',
              title: 'Anchor ID',
              description: 'In-page anchor — read-only in practice',
              initialValue: '#all-rods',
            },
          ],
        },
      ],
    },

    // ─── 2. BY SERIES ────────────────────────────────────────────
    {
      name: 'bySeries',
      type: 'object',
      title: 'By Series Section',
      group: 'bySeries',
      description:
        'Section heading only — series cards and product data are pulled live from Sanity (rodSeries) + Shopify tags.',
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
          initialValue: 'In-Stock Rods by Series',
        },
        {
          name: 'subheading',
          type: 'string',
          title: 'Subheading',
          initialValue: 'Select open water or ice fishing to view its respective series.',
        },
      ],
    },

    // ─── 3. FULL GRID ────────────────────────────────────────────
    {
      name: 'fullGrid',
      type: 'object',
      title: 'Full Grid Section',
      group: 'fullGrid',
      description: 'Section heading only — the product grid itself is pulled live from Shopify.',
      fields: [
        {name: 'heading', type: 'string', title: 'Heading', initialValue: 'Our In-Stock Rods'},
      ],
    },

    ...seoField,
  ],

  preview: {
    select: {title: 'title'},
  },
}
