// @sanity/icons v5+ no longer re-exports every icon from the package root —
// each icon lives at its own subpath. Import per-icon, not from '@sanity/icons'.
import {HomeIcon} from '@sanity/icons/Home'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {CogIcon} from '@sanity/icons/Cog'
import {PackageIcon} from '@sanity/icons/Package'
import {RocketIcon} from '@sanity/icons/Rocket'
import {TrolleyIcon} from '@sanity/icons/Trolley'
import {ImageIcon} from '@sanity/icons/Image'
import {CommentIcon} from '@sanity/icons/Comment'
import {TagsIcon} from '@sanity/icons/Tags'
import {StarIcon} from '@sanity/icons/Star'
import {LaunchIcon} from '@sanity/icons/Launch'

const singletonTypes = [
  'homePage',
  'inStockRodsPage',
  'customBuilderPage',
  'reelsPage',
  'apparelPage',
  'aboutPage',
  'reviewsPage',
  'contactPage',
  'navigation',
  'globalCta',
  'seoSettings',
]

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Navigation')
        .icon(EarthGlobeIcon)
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.listItem()
        .title('Home Page')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('In-Stock Rods')
        .icon(PackageIcon)
        .child(S.document().schemaType('inStockRodsPage').documentId('inStockRodsPage')),
      S.listItem()
        .title('Custom Rod Builder')
        .icon(RocketIcon)
        .child(S.document().schemaType('customBuilderPage').documentId('customBuilderPage')),
      S.listItem()
        .title('Reels')
        .icon(TrolleyIcon)
        .child(S.document().schemaType('reelsPage').documentId('reelsPage')),
      S.listItem()
        .title('Apparel')
        .icon(ImageIcon)
        .child(S.document().schemaType('apparelPage').documentId('apparelPage')),
      S.listItem()
        .title('About Page')
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem()
        .title('Reviews')
        .icon(CommentIcon)
        .child(S.document().schemaType('reviewsPage').documentId('reviewsPage')),
      S.listItem()
        .title('Contact Page')
        .icon(EnvelopeIcon)
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.divider(),
      S.listItem()
        .title('Rod Series')
        .icon(TagsIcon)
        .child(
          S.documentTypeList('rodSeries')
            .title('Rod Series')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Testimonials')
        .icon(StarIcon)
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('Global CTA Banners')
        .icon(LaunchIcon)
        .child(S.document().schemaType('globalCta').documentId('globalCta')),
      S.divider(),
      S.listItem()
        .title('Form Submissions')
        .icon(EnvelopeIcon)
        .child(
          S.documentTypeList('contactForm')
            .title('Form Submissions')
            .defaultOrdering([{field: 'sentAt', direction: 'desc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('SEO Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('seoSettings').documentId('seoSettings')),
    ])

export const singletonActions = (input, context) => {
  if (singletonTypes.includes(context.schemaType)) {
    return input.filter(
      ({action}) => action && !['unpublish', 'delete', 'duplicate'].includes(action),
    )
  }
  return input
}

export const singletonNewDocument = (prev) =>
  prev.filter((item) => !singletonTypes.includes(item.templateId))