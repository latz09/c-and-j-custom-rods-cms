// Open water rod application (a length / power / action combo with its own upcharge).
// An inline object used in rodSeries.applications[], not a standalone document.
// Field names match the v1 `openWaterApplication` docs so migration is a straight copy.
export default {
  name: 'application',
  type: 'object',
  title: 'Application',
  fields: [
    {
      name: 'length',
      type: 'string',
      title: 'Length',
      description: 'e.g. 7\'0"',
    },
    {
      name: 'powerAction',
      type: 'string',
      title: 'Power / Action',
      description: 'e.g. "Medium/Fast"',
    },
    {
      name: 'lineWeight',
      type: 'string',
      title: 'Line Weight',
      description: 'e.g. "8-14"',
    },
    {
      name: 'lureWeight',
      type: 'string',
      title: 'Lure Weight',
      description: 'e.g. "1/8-3/8"',
    },
    {
      name: 'upcharge',
      type: 'number',
      title: 'Upcharge ($)',
      description: 'Added to the series base price when this application is picked. 0 for none.',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    },
    {
      name: 'usage',
      type: 'string',
      title: 'Usage',
      description: 'What it is for, e.g. "Ned Rig, Spinners, Shakey Head".',
    },
  ],
  preview: {
    select: {length: 'length', powerAction: 'powerAction', upcharge: 'upcharge'},
    prepare: ({length, powerAction, upcharge}) => ({
      title: [length, powerAction].filter(Boolean).join(' · ') || 'Application',
      subtitle: upcharge ? `+$${upcharge}` : 'No upcharge',
    }),
  },
}
