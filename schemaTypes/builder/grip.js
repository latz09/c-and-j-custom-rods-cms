// One grip finish for the custom rod builder.
// Ice and open water use separate photo sets, so each doc has exactly one water type.
// Upcharges live in customBuilderPage Pricing Rules (per water type + material + style), not here.
export default {
  name: 'grip',
  type: 'document',
  title: 'Grip',
  fields: [
    {
      name: 'waterType',
      type: 'string',
      title: 'Water Type',
      options: {
        list: [
          {title: 'Ice', value: 'ice'},
          {title: 'Open Water', value: 'open-water'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'material',
      type: 'string',
      title: 'Material',
      options: {
        list: [
          {title: 'Cork', value: 'cork'},
          {title: 'EVA Foam', value: 'eva'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'style',
      type: 'string',
      title: 'Style',
      options: {
        list: [
          {title: 'Split', value: 'split'},
          {title: 'Straight', value: 'straight'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'finishName',
      type: 'string',
      title: 'Finish Name',
      description:
        'Shown in the build summary and on the order (grip is listed as material - style - finish). Until real names exist, use "Cork Split 1", "Cork Split 2", and so on.',
    },
    {
      name: 'legacyReferenceId',
      type: 'string',
      title: 'Legacy Reference ID',
      description: 'ID from the old site, e.g. "cork-split-7". Used for migration only.',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Grip Photo',
      options: {hotspot: true},
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
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
    select: {
      finishName: 'finishName',
      legacy: 'legacyReferenceId',
      waterType: 'waterType',
      material: 'material',
      style: 'style',
      media: 'image',
    },
    prepare: ({finishName, legacy, waterType, material, style, media}) => ({
      title: finishName || legacy || 'Untitled grip',
      subtitle: [waterType, material, style].filter(Boolean).join(' · '),
      media,
    }),
  },
}
