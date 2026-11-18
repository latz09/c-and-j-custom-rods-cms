export default {
  name: 'rodSeries',
  type: 'document',
  title: 'Rod Series',
  // Existing fields stay ungrouped (they show under "All fields"); only the builder fields
  // are grouped so the Rod Builder tab shows just those.
  groups: [{name: 'builder', title: '🎣 Rod Builder'}],
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
      title: 'Hero Image',
      description: 'Full-width banner shown at the top of this series\' landing page (/shop/rods/[slug]).',
      options: {hotspot: true},
    },
    {
      name: 'previewImage',
      type: 'image',
      title: 'Card Preview Image',
      description: 'Isolated rod shot used on the In-Stock Rods hub grid card. Should be a clean, transparent/light-background product photo — not the hero banner.',
      options: {hotspot: true},
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
    },

    // ─── ROD BUILDER ───────────────────────────────────────────
    // Powers /shop/custom and /shop/custom/[series]. The base price is NOT stored here:
    // it lives on the Shopify "Custom Rod Build" variant for this series.
    {
      name: 'builderStatus',
      type: 'string',
      title: 'Builder Status',
      group: 'builder',
      description:
        'Live: appears on the builder and can be built. Coming soon: shows a card with no link. Hidden: not shown anywhere on the builder.',
      options: {
        list: [
          {title: 'Live', value: 'live'},
          {title: 'Coming soon', value: 'comingSoon'},
          {title: 'Hidden', value: 'hidden'},
        ],
        layout: 'radio',
      },
      initialValue: 'hidden',
    },
    {
      name: 'builderCardBlurb',
      type: 'text',
      title: 'Builder Card Blurb',
      group: 'builder',
      description: 'One or two sentences for the card on the builder landing page.',
      rows: 3,
      validation: (Rule) => Rule.max(220).warning('Keep it to one or two sentences.'),
    },
    {
      name: 'builderImage',
      type: 'image',
      title: 'Builder Image',
      group: 'builder',
      description: 'Rod image for the builder card and page. Falls back to the Card Preview Image if empty.',
      options: {hotspot: true},
    },
    {
      name: 'builderBlankColors',
      type: 'array',
      title: 'Available Blank Colors',
      group: 'builder',
      description: 'Blank colors a customer can pick for this series.',
      of: [{type: 'reference', to: [{type: 'blankColor'}]}],
      validation: (Rule) => Rule.unique(),
    },
    {
      name: 'applications',
      type: 'array',
      title: 'Applications',
      group: 'builder',
      description: 'Open water only: the length / power / action options with their upcharges.',
      of: [{type: 'application'}],
      hidden: ({document}) => document?.applicationType === 'ice',
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
    select: {title: 'name', subtitle: 'slug', media: 'previewImage'},
  },
}