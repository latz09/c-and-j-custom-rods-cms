import {seoField} from './partials/seoField'

export default {
  name: 'aboutPage',
  type: 'document',
  title: 'About Page',
  groups: [
    {name: 'hero', title: '① Hero'},
    {name: 'story', title: '② Our Story'},
    {name: 'successGallery', title: '③ Success on the Water'},
    {name: 'commitment', title: '④ Our Commitment'},
    {name: 'seo', title: '🔍 SEO'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'About Page',
    },

    // ─── 1. HERO ───────────────────────────────────────────────
    {
      name: 'hero',
      type: 'object',
      title: 'Hero',
      group: 'hero',
      fields: [
        {name: 'headline', type: 'string', title: 'Headline', initialValue: 'Who We Are'},
        {
          name: 'subheadline',
          type: 'string',
          title: 'Subheadline',
          initialValue: 'Your passion meets our craftsmanship.',
        },
        {
          name: 'image',
          type: 'image',
          title: 'Hero Image',
          description: 'Team / founders photo',
          options: {hotspot: true},
        },
      ],
    },

    // ─── 2. OUR STORY ────────────────────────────────────────────
    {
      name: 'story',
      type: 'object',
      title: 'Our Story',
      group: 'story',
      fields: [
        {name: 'heading', type: 'string', title: 'Heading', initialValue: 'Our Story'},
        {
          name: 'photo',
          type: 'image',
          title: 'Photo',
          options: {hotspot: true},
        },
        {
          name: 'body',
          type: 'array',
          title: 'Body Paragraphs',
          description: "2-4 paragraphs about C&J's history and craftsmanship.",
          of: [{type: 'text', rows: 5}],
          validation: (Rule) => Rule.min(2).max(4),
          initialValue: [
            "At C and J Custom Rods, we don't just build rods—we craft experiences. What started as two friends in a garage has grown into a passion for designing custom and pre-built fishing rods that bring precision, performance, and personalization to anglers everywhere.",
            'Our journey began with a simple question: Why settle for off-the-shelf rods when we can build something better? As lifelong anglers, we knew the right rod could mean the difference between a good day and a great one. So, we set out to create fishing rods that balance strength, sensitivity, and style—designed for those who take their time on the water seriously.',
            "From testing blanks and refining grip ergonomics to perfecting guide placements, we put everything we've learned into every rod we craft. Whether you need a fully custom rod tailored to your technique or a high-quality pre-built rod, we ensure each one is built to perform.",
          ],
        },
      ],
    },

    // ─── 3. SUCCESS ON THE WATER ─────────────────────────────────
    {
      name: 'successGallery',
      type: 'object',
      title: 'Success on the Water',
      group: 'successGallery',
      description: 'Customer catch-photo carousel, uploaded via Sanity.',
      fields: [
        {name: 'heading', type: 'string', title: 'Heading', initialValue: 'Success on the Water'},
        {
          name: 'images',
          type: 'array',
          title: 'Photos',
          of: [{type: 'image', options: {hotspot: true}}],
          validation: (Rule) => Rule.min(3),
        },
      ],
    },

    // ─── 4. OUR COMMITMENT ────────────────────────────────────────
    {
      name: 'commitment',
      type: 'object',
      title: 'Our Commitment',
      group: 'commitment',
      fields: [
        {name: 'heading', type: 'string', title: 'Heading', initialValue: 'Our Commitment'},
        {
          name: 'subheading',
          type: 'string',
          title: 'Subheading',
          initialValue: "We're committed to providing you with the highest quality and service.",
        },
        {
          name: 'items',
          type: 'array',
          title: 'Commitment Cards',
          validation: (Rule) => Rule.min(4).max(4),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  type: 'image',
                  title: 'Icon (SVG)',
                  description: 'Upload as SVG for a crisp line icon.',
                  options: {accept: 'image/svg+xml'},
                },
                {name: 'title', type: 'string', title: 'Title'},
                {name: 'description', type: 'text', title: 'Description', rows: 2},
              ],
              preview: {
                select: {title: 'title', subtitle: 'description', media: 'icon'},
              },
            },
          ],
          initialValue: [
            {title: 'Handcrafted Precision', description: 'Built by anglers, for anglers.'},
            {title: 'Premium Materials', description: 'Only the best blanks, guides, and components.'},
            {title: 'Tailor-Made Performance', description: 'Every rod is fine-tuned to your fishing style.'},
            {title: 'Real Angler Results', description: 'Trusted by passionate anglers who demand quality.'},
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
