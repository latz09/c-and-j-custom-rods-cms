
import { structure, singletonActions, singletonNewDocument } from './structure'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'


import CustomLayout from './components/CustomLayout.jsx'
import clientLogo from './components/clientLogo.jsx'
import {theme as themerTheme} from 'https://themer.sanity.build/api/hues?default=64748b;lightest:f8fafc;darkest:0f172a&primary=18a1ad;lightest:ecfeff;darkest:0a4f56&transparent=64748b;lightest:f8fafc;darkest:0f172a&positive=16a34a;lightest:f0fdf4;darkest:14532d&caution=f59e0b;400;lightest:fffbeb;darkest:78350f&critical=dc2626;lightest:fef2f2;darkest:7f1d1d'

const brandFont = `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`

const theme = {
  ...themerTheme,
  fonts: {
    ...themerTheme.fonts,
    heading: {...themerTheme.fonts.heading, family: brandFont},
    text:    {...themerTheme.fonts.text,    family: brandFont},
    label:   {...themerTheme.fonts.label,   family: brandFont},
    code:    {...themerTheme.fonts.code,    family: `'JetBrains Mono', monospace`},
  },
}


export default defineConfig({
name: 'default',
  title: 'C and J Custom Rods',
  subtitle: 'Powered by Latz Web Design',
  icon: clientLogo,
  projectId: 'vx4e4v7t',
  dataset: 'production',
  theme: theme,
  releases: {
    enabled: false,
  },
  plugins: [
    structureTool({
      title: 'Manage Content',
      // TODO: uncomment once structure.js is set up
      structure,
    }),
  //  visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
  // TODO: uncomment once structure.js is set up
  document: {
    actions: singletonActions,
    newDocumentOptions: singletonNewDocument,
  },
  studio: {
    components: {
      
layout: (props) => <CustomLayout {...props} cmsGuideUrl="" />,
    },
  },
})