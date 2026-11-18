import {seoField} from './partials/seoField'

// Grip upcharge table for one water type: one price per material + style. 0 = included.
const gripPriceFields = (defaults) => [
  {name: 'corkSplit', type: 'number', title: 'Cork, Split ($)', initialValue: defaults[0]},
  {name: 'corkStraight', type: 'number', title: 'Cork, Straight ($)', initialValue: defaults[1]},
  {name: 'evaSplit', type: 'number', title: 'EVA Foam, Split ($)', initialValue: defaults[2]},
  {name: 'evaStraight', type: 'number', title: 'EVA Foam, Straight ($)', initialValue: defaults[3]},
]

// Plain text field with a default, used for the builder labels.
const labelField = (name, title, initialValue, description) => ({
  name,
  type: 'string',
  title,
  initialValue,
  ...(description && {description}),
})

export default {
  name: 'customBuilderPage',
  type: 'document',
  title: 'Shop — Custom Rod Builder',
  groups: [
    {name: 'hero', title: '① Hero'},
    {name: 'seriesPicker', title: '② Series Picker'},
    {name: 'builderCopy', title: '③ Builder Copy'},
    {name: 'pricing', title: '④ Pricing Rules'},
    {name: 'seo', title: '🔍 SEO'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Custom Rod Builder',
    },

    // ─── 1. HERO ───────────────────────────────────────────────
    // Hero copy below is placeholder pulled from the wireframe.
    {
      name: 'hero',
      type: 'object',
      title: 'Hero',
      group: 'hero',
      description: 'Placeholder copy from the wireframe — confirm once the design phase covers this page.',
      fields: [
        {name: 'headline', type: 'string', title: 'Headline', initialValue: 'Build Your Own Rod'},
        {
          name: 'subheadline',
          type: 'string',
          title: 'Subheadline',
          initialValue: 'Create a custom rod tailored to your fishing style.',
        },
        {
          name: 'image',
          type: 'image',
          title: 'Hero Image',
          options: {hotspot: true},
        },
      ],
    },

    // ─── 2. SERIES PICKER (/shop/custom) ───────────────────────
    {
      name: 'seriesPicker',
      type: 'object',
      title: 'Series Picker',
      group: 'seriesPicker',
      description: 'Text around the series cards on the builder landing page.',
      fields: [
        labelField('sectionHeading', 'Section Heading', 'Category and series'),
        labelField('iceTabLabel', 'Ice Tab Label', 'Ice Rods'),
        labelField('openWaterTabLabel', 'Open Water Tab Label', 'Open Water Rods'),
        labelField(
          'comingSoonLabel',
          'Coming Soon Label',
          'Coming Soon',
          'Shown on cards for series set to "Coming soon".',
        ),
      ],
    },

    // ─── 3. BUILDER COPY (/shop/custom/[series]) ───────────────
    {
      name: 'builderCopy',
      type: 'object',
      title: 'Builder Copy',
      group: 'builderCopy',
      description: 'Section labels and helper text on the builder page.',
      fields: [
        labelField('applicationLabel', 'Application Label', 'Application'),
        labelField('blankColorLabel', 'Blank Color Label', 'Blank Color'),
        labelField('lengthLabel', 'Length Label', 'Length'),
        labelField('primaryThreadLabel', 'Primary Thread Label', 'Primary Thread Color'),
        labelField('accentThreadLabel', 'Accent Thread Label', 'Accent Thread Color (Optional)'),
        labelField('gripLabel', 'Grip Label', 'Grip'),
        labelField('stickerLabel', 'Sticker Label', 'Personalized Sticker (Optional)'),
        {
          name: 'accentHelperText',
          type: 'string',
          title: 'Accent Helper Text',
          description: 'Short note under the accent thread picker (price, what it does).',
        },
        {
          name: 'stickerHelperText',
          type: 'string',
          title: 'Sticker Helper Text',
          description: 'Short note under the sticker input.',
        },
        {
          name: 'leadTimeNote',
          type: 'text',
          title: 'Lead Time Note',
          rows: 2,
          description: 'How long a custom build takes. Leave empty until Chris confirms.',
        },
      ],
    },

    // ─── 4. PRICING RULES ──────────────────────────────────────
    // Base prices live in Shopify (Custom Rod Build variants), not here.
    // Open water application upcharges live on each series (rodSeries.applications).
    {
      name: 'pricingRules',
      type: 'object',
      title: 'Pricing Rules',
      group: 'pricing',
      description:
        'Add-on prices used by the live total and by the server when a build is added to the cart.',
      fields: [
        {
          name: 'iceLengths',
          type: 'array',
          title: 'Ice Rod Lengths (inches)',
          description: 'Lengths offered on ice rods. Default is 20" to 36" in 2" steps.',
          of: [{type: 'number'}],
          initialValue: [20, 22, 24, 26, 28, 30, 32, 34, 36],
        },
        {
          name: 'iceGripPrices',
          type: 'object',
          title: 'Ice Grip Upcharges',
          options: {columns: 2},
          fields: gripPriceFields([15, 10, 5, 0]),
        },
        {
          name: 'openWaterGripPrices',
          type: 'object',
          title: 'Open Water Grip Upcharges',
          options: {columns: 2},
          fields: gripPriceFields([40, 30, 10, 0]),
        },
        {
          name: 'accentPrice',
          type: 'number',
          title: 'Accent Thread Price ($)',
          initialValue: 10,
        },
        {
          name: 'stickerPrice',
          type: 'number',
          title: 'Personalized Sticker Price ($)',
          initialValue: 10,
        },
        {
          name: 'stickerMaxCharacters',
          type: 'number',
          title: 'Sticker Max Characters',
          description: 'Longest text a customer can enter. Waiting on Chris.',
          validation: (Rule) => Rule.integer().min(1),
        },
      ],
    },

    ...seoField,
  ],

  preview: {
    select: {title: 'title'},
  },
}
