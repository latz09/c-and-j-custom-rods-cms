// Thread wrap color for the custom rod builder (primary and accent pickers).
// 63 colors, shared by every series. Codes are strings: "001" to "059", "501" to "504".
export default {
  name: 'threadColor',
  type: 'document',
  title: 'Thread Color',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Color Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'code',
      type: 'string',
      title: 'Thread Code',
      description: 'Reference number kept as text so leading zeros survive, e.g. "001".',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hex',
      type: 'string',
      title: 'Swatch Hex',
      description: 'e.g. #1A2B3C',
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {name: 'hex color'}).error(
          'Use a 6-digit hex like #1A2B3C',
        ),
    },
    {
      name: 'category',
      type: 'string',
      title: 'Picker Group',
      description: 'Which dropdown the color appears in on the builder.',
      options: {
        list: [
          {title: 'Warm', value: 'warm'},
          {title: 'Cool', value: 'cool'},
          {title: 'Neutral / No color', value: 'neutral'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
    },
  ],
  orderings: [
    {
      title: 'Thread Code',
      name: 'codeAsc',
      by: [{field: 'code', direction: 'asc'}],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', code: 'code', category: 'category'},
    prepare: ({title, code, category}) => ({
      title: code ? `${code} · ${title}` : title,
      subtitle: category,
    }),
  },
}
