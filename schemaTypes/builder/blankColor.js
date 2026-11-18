// Rod blank color for the custom rod builder.
// Replaces the misnamed v1 `iceRodBlankColor`. Used by both ice and open water series.
export default {
  name: 'blankColor',
  type: 'document',
  title: 'Blank Color',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Color Name',
      description: 'e.g. "Metallic Blue". Shown in the build summary and on the order.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hex',
      type: 'string',
      title: 'Swatch Hex',
      description:
        'Swatch color, e.g. #1A2B3C. Sampled from the blank photo during migration; check it by eye. Used as the swatch fallback when there is no photo.',
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {name: 'hex color'}).error(
          'Use a 6-digit hex like #1A2B3C',
        ),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Blank Photo',
      description: 'Real photo of the blank in this color.',
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
    select: {title: 'name', subtitle: 'hex', media: 'image'},
  },
}
