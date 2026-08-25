import {seoField} from './partials/seoField'

export default {
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  groups: [
    {name: 'hero', title: '① Hero'},
    {name: 'featuredProduct', title: '② Featured Product'},
    {name: 'shopCollections', title: '③ Shop Collections'},
    {name: 'aboutBlurb', title: '④ About Blurb'},
    {name: 'seo', title: '🔍 SEO'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Home Page',
    },

    // ─── 1. HERO ───────────────────────────────────────────────
   // ─── 1. HERO ───────────────────────────────────────────────
{
  name: 'hero',
  type: 'object',
  title: 'Hero',
  group: 'hero',
  fields: [
    {
      name: 'headline',
      type: 'string',
      title: 'Headline',
      initialValue: 'Handcrafted Custom Fishing Rods',
    },
    {
      name: 'subheadline',
      type: 'string',
      title: 'Subheadline',
      initialValue: 'Your passion meets our craftsmanship.',
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Hero Background Image',
      description: 'Full-width background — water/lifestyle scene',
      options: {hotspot: true},
    },
    {
      name: 'rodImage',
      type: 'image',
      title: 'Hero Rod Image',
      description: 'Foreground rod product shot layered over the background',
      options: {hotspot: true},
    },
    {
      name: 'ctaPrimary',
      type: 'object',
      title: 'CTA 1 — Custom Rod Builder',
      fields: [
        {name: 'label', type: 'string', title: 'Label', initialValue: 'Build Your Custom Rod'},
        {
          name: 'url',
          type: 'string',
          title: 'URL',
          description: 'Fixed destination — read-only in practice',
          initialValue: '/shop/custom',
        },
      ],
    },
    {
      name: 'ctaSecondary',
      type: 'object',
      title: 'CTA 2 — In-Stock Rods',
      fields: [
        {name: 'label', type: 'string', title: 'Label', initialValue: 'Shop In-Stock Rods'},
        {
          name: 'url',
          type: 'string',
          title: 'URL',
          description: 'Fixed destination — read-only in practice',
          initialValue: '/shop/rods',
        },
      ],
    },
  ],
},

    // ─── 2. FEATURED PRODUCT ────────────────────────────────────
    {
      name: 'featuredProduct',
      type: 'object',
      title: 'Featured Product',
      fields: [
        {name: 'eyebrow', type: 'string', title: 'Eyebrow Text'},
        {name: 'productHandle', type: 'string', title: 'Shopify Product Handle'},
        {
          name: 'category',
          type: 'string',
          title: 'Product Category',
          description: 'Determines which shop section this links to.',
          options: {
            list: [
              {title: 'Rod', value: 'rods'},
              {title: 'Reel', value: 'reels'},
              {title: 'Apparel', value: 'apparel'},
            ],
            layout: 'radio',
          },
        },
      ],
    },

    // ─── 3. SHOP COLLECTIONS ─────────────────────────────────────
    {
      name: 'shopCollections',
      type: 'object',
      title: 'Shop Collections',
      group: 'shopCollections',
      description:
        'Four entry-point cards. Labels and URLs are editable but destinations are fixed by design.',
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Section Heading',
          initialValue: 'Shop Our Collections',
        },
        {
          name: 'items',
          type: 'array',
          title: 'Collection Cards',
          validation: (Rule) => Rule.min(4).max(4),
          of: [
            {
              type: 'object',
              fields: [
                {name: 'image', type: 'image', title: 'Card Image', options: {hotspot: true}},
                {name: 'label', type: 'string', title: 'Title'},
                {
                  name: 'url',
                  type: 'string',
                  title: 'URL',
                  description: 'Fixed destination — read-only in practice',
                },
              ],
              preview: {
                select: {title: 'label', subtitle: 'url', media: 'image'},
              },
            },
          ],
          initialValue: [
            {label: 'In-Stock Rods', url: '/shop/rods'},
            {label: 'Custom Rods', url: '/shop/custom'},
            {label: 'Reels', url: '/shop/reels'},
            {label: 'Apparel', url: '/shop/apparel'},
          ],
        },
      ],
    },

    // ─── 4. ABOUT BLURB ──────────────────────────────────────────
    {
      name: 'aboutBlurb',
      type: 'object',
      title: 'About Blurb',
      group: 'aboutBlurb',
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
          initialValue: 'Crafted for Anglers, Built for Performance',
        },
        {
          name: 'body',
          type: 'text',
          title: 'Body',
          rows: 4,
          initialValue:
            "At C and J Custom Rods, we don't just build rods—we craft experiences. What started as two friends in a garage has grown into a passion for designing custom and pre-built fishing rods that bring precision, performance, and personalization to anglers everywhere.",
        },
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {hotspot: true},
        },
        {
          name: 'cta',
          type: 'object',
          title: 'CTA — About Page',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              initialValue: "See Who's Behind the Craft",
            },
            {
              name: 'url',
              type: 'string',
              title: 'URL',
              description: 'Fixed destination — read-only in practice',
              initialValue: '/about',
            },
          ],
        },
      ],
    },

    ...seoField,
  ],

  preview: {
    select: {title: 'title'},
  },
}
