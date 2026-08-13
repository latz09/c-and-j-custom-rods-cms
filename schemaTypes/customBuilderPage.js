import {seoField} from './partials/seoField'

export default {
  name: 'customBuilderPage',
  type: 'document',
  title: 'Shop — Custom Rod Builder',
  groups: [
    {name: 'hero', title: '① Hero'},
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
    // The configurator itself is out of scope for this build phase —
    // this page schema is hero + SEO only. No Figma design exists yet,
    // so hero copy below is placeholder pulled from the wireframe.
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

    ...seoField,
  ],

  preview: {
    select: {title: 'title'},
  },
}
