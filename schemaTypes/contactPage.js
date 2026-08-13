import {seoField} from './partials/seoField'

export default {
  name: 'contactPage',
  type: 'document',
  title: 'Contact Page',
  groups: [
    {name: 'hero', title: '① Hero'},
    {name: 'businessInfo', title: '② Business Info'},
    {name: 'seo', title: '🔍 SEO'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Contact Page',
    },

    // ─── 1. HERO ───────────────────────────────────────────────
    {
      name: 'hero',
      type: 'object',
      title: 'Hero',
      group: 'hero',
      fields: [
        {name: 'headline', type: 'string', title: 'Headline', initialValue: 'Get In Touch'},
        {
          name: 'subheadline',
          type: 'string',
          title: 'Subheadline',
          initialValue:
            "Whether you're looking for a custom rod, have a question, or just want to say hi — drop us a message.",
        },
      ],
    },

    // ─── 2. BUSINESS INFO ────────────────────────────────────────
    // NOTE: email/phone/location/hours left without initialValue —
    // the Figma mockup used placeholder data that doesn't match the
    // real contact info on file. Confirm with Chris before publishing.
    {
      name: 'businessInfo',
      type: 'object',
      title: 'Business Info',
      group: 'businessInfo',
      fields: [
        {name: 'heading', type: 'string', title: 'Section Heading', initialValue: 'Business Info'},
        {name: 'email', type: 'string', title: 'Email', description: 'Renders as click-to-email'},
        {
          name: 'phone',
          type: 'string',
          title: 'Phone Number',
          description: 'Renders as click-to-call on mobile — e.g. (715) 555-0100',
        },
        {name: 'location', type: 'string', title: 'Location', description: 'City, State — e.g. Waupaca, WI'},
        {name: 'hours', type: 'string', title: 'Hours', description: 'e.g. 8am–4pm M–F'},
      ],
    },

    ...seoField,
  ],

  preview: {
    select: {title: 'title'},
  },
}
