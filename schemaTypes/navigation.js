export default {
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  initialValue: {
    navLinks: [
      {label: 'Home', url: '/', isButton: false},
      {label: 'In-Stock Rods', url: '/shop/rods', isButton: false},
      {label: 'Custom Build', url: '/shop/custom', isButton: false},
      {label: 'Reels', url: '/shop/reels', isButton: false},
      {label: 'Apparel', url: '/shop/apparel', isButton: false},
      {label: 'About', url: '/about', isButton: false},
      {label: 'Reviews', url: '/reviews', isButton: false},
      {label: 'Contact', url: '/contact', isButton: true},
    ],
  },
  preview: {
    prepare() {
      return {title: 'Navigation'}
    },
  },
  fields: [
    {
      name: 'navLinks',
      type: 'array',
      title: 'Navigation Links',
      description: 'Main nav — flat list, no dropdown grouping.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
            },
            {
              name: 'url',
              type: 'string',
              title: 'URL',
              description: 'e.g. /shop/rods or /about',
            },
            {
              name: 'isButton',
              type: 'boolean',
              title: 'Show as CTA Button',
              initialValue: false,
            },
          ],
          preview: {
            select: {title: 'label', subtitle: 'url', isButton: 'isButton'},
            prepare({title, subtitle, isButton}) {
              return {
                title: isButton ? `${title} [CTA]` : title,
                subtitle,
              }
            },
          },
        },
      ],
    },
  ],
}
