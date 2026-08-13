export default {
  name: 'globalCta',
  type: 'document',
  title: 'Global CTA Banners',
  groups: [
    {name: 'triple', title: '① Multi-CTA Banner'},
    {name: 'single', title: '② Product-Page Banner'},
  ],
  fields: [
    // ─── 1. MULTI-CTA BANNER (Home / About / Reviews) ────────────
    {
      name: 'tripleCtaBanner',
      type: 'object',
      title: 'Multi-CTA Banner',
      group: 'triple',
      description: 'Shown on Home, About, and Reviews.',
      fields: [
        {name: 'heading', type: 'string', title: 'Heading', initialValue: 'Find Your Perfect Rod'},
        {
          name: 'body',
          type: 'text',
          title: 'Body',
          rows: 3,
          initialValue:
            "Choose from a custom built rod or shop or in-stock rods, today. Unsure where to start? Send us a message, we're happy to help you find the perfect rod for your next fishing adventure.",
        },
        {
          name: 'ctaCustom',
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
          name: 'ctaInStock',
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
        {
          name: 'ctaContact',
          type: 'object',
          title: 'CTA 3 — Contact',
          fields: [
            {name: 'label', type: 'string', title: 'Label', initialValue: 'Contact Us'},
            {
              name: 'url',
              type: 'string',
              title: 'URL',
              description: 'Fixed destination — read-only in practice',
              initialValue: '/contact',
            },
          ],
        },
      ],
    },

    // ─── 2. PRODUCT-PAGE BANNER ───────────────────────────────────
    {
      name: 'productCtaBanner',
      type: 'object',
      title: 'Product-Page Banner',
      group: 'single',
      description: 'Shown at the bottom of every product detail page.',
      fields: [
        {name: 'heading', type: 'string', title: 'Heading', initialValue: "Can't Find the Right Rod for You?"},
        {
          name: 'body',
          type: 'text',
          title: 'Body',
          rows: 3,
          initialValue:
            "Build your own custom rod. Unsure where to start? Send us a message, we're happy to help you find the perfect rod for your next fishing adventure.",
        },
        {
          name: 'ctaCustom',
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
          name: 'ctaContact',
          type: 'object',
          title: 'CTA 2 — Contact',
          fields: [
            {name: 'label', type: 'string', title: 'Label', initialValue: 'Contact Us'},
            {
              name: 'url',
              type: 'string',
              title: 'URL',
              description: 'Fixed destination — read-only in practice',
              initialValue: '/contact',
            },
          ],
        },
      ],
    },
  ],

  preview: {
    prepare() {
      return {title: 'Global CTA Banners'}
    },
  },
}
