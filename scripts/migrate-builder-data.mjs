// Phase 4 migration: old v1 Sanity export -> new builder data.
//
// Commands (run from the CMS repo, Node 22+):
//   node scripts/migrate-builder-data.mjs generate [--export-dir <dir>]
//       Part 1. Reads the old data.ndjson and writes builder-import.ndjson next to it
//       (threadColor x63, blankColor x14, grip x28). No network, no writes to Sanity.
//   node scripts/migrate-builder-data.mjs patch-series [--export-dir <dir>] [--dry-run]
//       Part 2. Patches builder fields onto existing rodSeries docs (needs SANITY_WRITE_TOKEN).
//   node scripts/migrate-builder-data.mjs pricing [--export-dir <dir>] [--dry-run]
//       Part 3. Writes Pricing Rules onto the customBuilderPage singleton (needs SANITY_WRITE_TOKEN).
//
// The old export holds customer orders and contact submissions. This script only ever reads
// the document types listed in WANTED_TYPES and never logs anything else.

import fs from 'node:fs'
import path from 'node:path'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const CMS_ROOT = path.resolve(HERE, '..')
const DEFAULT_EXPORT_PARENT = 'C:/LatzWebDesign/INFO/Clients/Active/2026/c-and-j/cj-export/extracted-full'

const PROJECT_ID = 'vx4e4v7t'
const DATASET = 'production'

const WANTED_TYPES = new Set([
  'threadWrapColors',
  'iceRodBlankColor',
  'iceRodGrips',
  'openWaterRodGrips',
  'iceRodSeries',
  'openWaterRodSeries',
  'openWaterApplication',
])

// ---------- blank colors ----------

// No photos for these two yet, so the hex is a guess. Chris/Alyssa to confirm.
const NEW_BLANKS = [
  {name: 'Seafoam', hex: '#7FD1B9'},
  {name: 'Titanium Chrome', hex: '#8D9094'},
]

// Display order for the 14 blanks. Black first, since every series has it.
const BLANK_ORDER = [
  'Black',
  'White',
  'Hot Pink',
  'Neon Orange',
  'Neon Green',
  'Chartreuse Yellow',
  'Glow',
  'Metallic Blue',
  'Metallic Green',
  'Metallic Purple',
  'Metallic Red',
  'Metallic Gun Metal',
  'Seafoam',
  'Titanium Chrome',
]

// Target blank lists (Aug changelog), per old series slug. Not the old live lists.
// "Pink / Green / Orange / Blue" assumed to be Hot Pink / Neon Green / Neon Orange / Metallic Blue.
const TARGET_BLANKS = {
  'hole-hog': ['Black', 'Seafoam', 'Chartreuse Yellow', 'Glow'],
  'hog-whip': ['Black', 'Hot Pink', 'Neon Green', 'Neon Orange'],
  'panfish-carbon': ['Black', 'Metallic Blue'],
  'eyece-commander': ['Black', 'Titanium Chrome'],
}
const OPEN_WATER_BLANKS = ['Black']

// Old slug -> candidate slugs in the new project (first match wins).
const SLUG_CANDIDATES = {
  'panfish-carbon': ['carbon-crush', 'panfish-carbon'],
}

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const blankId = (name) => `blankColor-${slugify(name)}`

// ---------- thread categories (GUESS) ----------
// The old data has no category. Rule fitted to the expected 35 warm / 23 cool / 5 neutral split:
//   neutral: saturation < 0.07 or lightness < 0.10
//   warm:    hue <= 96 or hue >= 279 (reds, oranges, yellows, browns, olive/moss, pinks, purples)
//   cool:    everything else (greens, teals, blues, blue-violets)
// Replace with the real list from rod-builder-prototype-singlepage.html when it turns up.

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const mx = Math.max(r, g, b)
  const mn = Math.min(r, g, b)
  const l = (mx + mn) / 2
  const d = mx - mn
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  let h = 0
  if (d) {
    if (mx === r) h = ((g - b) / d + 6) % 6
    else if (mx === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
  }
  return {h, s, l}
}

function guessCategory(hex) {
  const {h, s, l} = hexToHsl(hex)
  if (s < 0.07 || l < 0.1) return 'neutral'
  if (h <= 96 || h >= 279) return 'warm'
  return 'cool'
}

// ---------- helpers ----------

function parseArgs(argv) {
  const args = {_: []}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dry-run') args.dryRun = true
    else if (a === '--export-dir') args.exportDir = argv[++i]
    else args._.push(a)
  }
  return args
}

function findExportDir(explicit) {
  if (explicit) return path.resolve(explicit)
  const hit = fs
    .readdirSync(DEFAULT_EXPORT_PARENT)
    .filter((n) => n.startsWith('production-export-'))
    .sort()
    .pop()
  if (!hit) throw new Error(`No production-export-* folder in ${DEFAULT_EXPORT_PARENT}`)
  return path.join(DEFAULT_EXPORT_PARENT, hit)
}

// Streams the ndjson and keeps only the types this script needs.
function readOldDocs(exportDir) {
  const file = path.join(exportDir, 'data.ndjson')
  const docs = []
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) continue
    const doc = JSON.parse(line)
    if (WANTED_TYPES.has(doc._type)) docs.push(doc)
  }
  return docs
}

const ofType = (docs, t) => docs.filter((d) => d._type === t)

function imageRef(img) {
  const ref = img?._sanityAsset
  if (!ref) return undefined
  return {_type: 'image', _sanityAsset: ref}
}

function imageFilePath(exportDir, img) {
  const ref = img?._sanityAsset
  if (!ref) return null
  return path.join(exportDir, ref.replace('image@file://./', ''))
}

async function loadSharp() {
  try {
    return (await import('sharp')).default
  } catch {
    // The CMS repo has no image library. The frontend repo has sharp (a Next.js dependency).
    const req = createRequire(path.join(CMS_ROOT, '..', 'code', 'package.json'))
    return req('sharp')
  }
}

// Main color of a blank: mean RGB of opaque pixels, trimmed to the middle 50% by brightness so
// highlights and shadow edges on the glossy tube don't skew it.
async function sampleHex(sharp, file) {
  const {data, info} = await sharp(file)
    .resize({width: 600, withoutEnlargement: true})
    .ensureAlpha()
    .raw()
    .toBuffer({resolveWithObject: true})
  const px = []
  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i + 3] < 250) continue
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    px.push([r, g, b, 0.299 * r + 0.587 * g + 0.114 * b])
  }
  if (!px.length) throw new Error(`No opaque pixels in ${file}`)
  px.sort((a, b) => a[3] - b[3])
  const lo = Math.floor(px.length * 0.25)
  const hi = Math.ceil(px.length * 0.75)
  const band = px.slice(lo, hi)
  const mean = [0, 1, 2].map((c) => Math.round(band.reduce((n, p) => n + p[c], 0) / band.length))
  return '#' + mean.map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

// ---------- generate (part 1) ----------

const GRIP_ARRAYS = [
  ['corkSplitGrips', 'cork', 'split'],
  ['corkStraightGrips', 'cork', 'straight'],
  ['evaFoamSplitGrips', 'eva', 'split'],
  ['evaFoamStraightGrips', 'eva', 'straight'],
]
const MATERIAL_LABEL = {cork: 'Cork', eva: 'EVA'}
const STYLE_LABEL = {split: 'Split', straight: 'Straight'}

async function generate(exportDir) {
  const old = readOldDocs(exportDir)
  const out = []
  const summary = {threadsByCategory: {warm: [], cool: [], neutral: []}, blanks: [], grips: []}

  // Thread colors
  const threads = ofType(old, 'threadWrapColors')
    .map((d) => ({code: String(d.referenceNumber).trim(), name: d.title.trim(), hex: d.hexColor.trim().toUpperCase()}))
    .sort((a, b) => a.code.localeCompare(b.code))
  threads.forEach((t, i) => {
    const category = guessCategory(t.hex)
    summary.threadsByCategory[category].push(`${t.code} ${t.name} ${t.hex}`)
    out.push({
      _id: `threadColor-${t.code}`,
      _type: 'threadColor',
      name: t.name,
      code: t.code,
      hex: t.hex,
      category,
      order: i + 1,
    })
  })

  // Blank colors
  const sharp = await loadSharp()
  const oldBlanks = ofType(old, 'iceRodBlankColor')
  const blanks = []
  for (const d of oldBlanks) {
    const file = imageFilePath(exportDir, d.image)
    if (!file || !fs.existsSync(file)) throw new Error(`Missing photo for blank ${d.title}`)
    blanks.push({name: d.title.trim(), hex: await sampleHex(sharp, file), image: imageRef(d.image), sampled: true})
  }
  for (const n of NEW_BLANKS) blanks.push({name: n.name, hex: n.hex, sampled: false})
  for (const b of blanks) {
    const order = BLANK_ORDER.indexOf(b.name)
    if (order < 0) throw new Error(`Blank "${b.name}" missing from BLANK_ORDER`)
    b.order = order + 1
  }
  blanks.sort((a, b) => a.order - b.order)
  for (const b of blanks) {
    const doc = {_id: blankId(b.name), _type: 'blankColor', name: b.name, hex: b.hex, order: b.order}
    if (b.image) doc.image = b.image
    out.push(doc)
    summary.blanks.push({name: b.name, hex: b.hex, source: b.sampled ? 'sampled from photo' : 'GUESS, no photo'})
  }

  // Grips
  for (const [type, waterType] of [
    ['iceRodGrips', 'ice'],
    ['openWaterRodGrips', 'open-water'],
  ]) {
    const single = ofType(old, type)
    if (single.length !== 1) throw new Error(`Expected one ${type} doc, found ${single.length}`)
    let order = 0
    for (const [key, material, style] of GRIP_ARRAYS) {
      ;(single[0][key] || []).forEach((item, i) => {
        order += 1
        // Old descriptions (3 ice cork split grips) become the finish name; the rest are numbered.
        const desc = item.description?.trim()
        const finishName = desc
          ? desc.charAt(0).toUpperCase() + desc.slice(1)
          : `${MATERIAL_LABEL[material]} ${STYLE_LABEL[style]} ${i + 1}`
        const doc = {
          _id: `grip-${waterType}-${item.referenceId}`,
          _type: 'grip',
          waterType,
          material,
          style,
          finishName,
          legacyReferenceId: item.referenceId,
          order,
        }
        const image = imageRef(item.image)
        if (image) doc.image = image
        out.push(doc)
        summary.grips.push({waterType, id: doc._id, finishName, legacy: item.referenceId, note: item.description})
      })
    }
  }

  // Safety: nothing but the three new types, unique ids.
  const allowed = new Set(['threadColor', 'blankColor', 'grip'])
  const ids = new Set()
  for (const d of out) {
    if (!allowed.has(d._type)) throw new Error(`Unexpected type ${d._type}`)
    if (ids.has(d._id)) throw new Error(`Duplicate _id ${d._id}`)
    ids.add(d._id)
  }

  const outFile = path.join(exportDir, 'builder-import.ndjson')
  fs.writeFileSync(outFile, out.map((d) => JSON.stringify(d)).join('\n') + '\n')

  const counts = {}
  for (const d of out) counts[d._type] = (counts[d._type] || 0) + 1
  console.log(JSON.stringify({outFile, counts, total: out.length}, null, 2))
  console.log('\nBlanks:')
  for (const b of summary.blanks) console.log(`  ${b.name.padEnd(20)} ${b.hex}  (${b.source})`)
  console.log('\nThread categories (GUESS):')
  for (const [k, v] of Object.entries(summary.threadsByCategory)) {
    console.log(`  ${k}: ${v.length}`)
    console.log('    ' + v.join('\n    '))
  }
  console.log('\nGrips:')
  for (const g of summary.grips) {
    console.log(`  ${g.id.padEnd(40)} ${g.finishName}${g.note ? `   [old note: ${g.note}]` : ''}`)
  }
}

// ---------- Sanity client (parts 2 and 3) ----------

async function getClient() {
  const envFile = path.join(CMS_ROOT, '.env.local')
  if (fs.existsSync(envFile)) process.loadEnvFile(envFile)
  const token = process.env.SANITY_WRITE_TOKEN
  if (!token) throw new Error('SANITY_WRITE_TOKEN not found in the environment or cms/.env.local')
  const {createClient} = await import('@sanity/client')
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2025-02-19',
    token,
    useCdn: false,
    perspective: 'raw',
  })
}

// ---------- patch-series (part 2) ----------

async function patchSeries(exportDir, dryRun) {
  const old = readOldDocs(exportDir)
  const client = await getClient()
  const newSeries = await client.fetch(
    `*[_type == "rodSeries" && !(_id in path("drafts.**"))]{_id, name, slug, applicationType}`,
  )
  const uploads = new Map() // file -> asset _id, so shared placeholder photos upload once
  const report = []

  const oldSeries = [...ofType(old, 'iceRodSeries'), ...ofType(old, 'openWaterRodSeries')]
  for (const s of oldSeries) {
    const oldSlug = s.slug?.current
    const candidates = SLUG_CANDIDATES[oldSlug] || [oldSlug]
    const target = newSeries.find((n) => candidates.includes(n.slug))
    if (!target) {
      report.push({series: oldSlug, result: `SKIPPED, no new rodSeries with slug ${candidates.join(' or ')}`})
      continue
    }
    const isIce = s._type === 'iceRodSeries'
    const blankNames = isIce ? TARGET_BLANKS[oldSlug] : OPEN_WATER_BLANKS
    if (!blankNames) throw new Error(`No target blank list for ${oldSlug}`)

    const set = {
      builderStatus: s.available ? 'live' : 'hidden',
      builderBlankColors: blankNames.map((n) => ({
        _type: 'reference',
        _key: slugify(n),
        _ref: blankId(n),
      })),
    }

    if (!isIce) {
      set.applications = ofType(old, 'openWaterApplication')
        .filter((a) => a.series?._ref === s._id)
        .map((a, i) => {
          const app = {_type: 'application', _key: `app${String(i + 1).padStart(2, '0')}`}
          for (const f of ['length', 'powerAction', 'lineWeight', 'lureWeight', 'usage']) {
            if (a[f] !== undefined && a[f] !== null) app[f] = String(a[f])
          }
          app.upcharge = Number(a.upcharge) || 0
          return app
        })
    }

    const file = imageFilePath(exportDir, s.mainImage)
    if (file && fs.existsSync(file)) {
      if (dryRun) {
        set.builderImage = `(would upload ${path.basename(file)})`
      } else {
        if (!uploads.has(file)) {
          const asset = await client.assets.upload('image', fs.createReadStream(file), {
            filename: path.basename(file),
          })
          uploads.set(file, asset._id)
        }
        set.builderImage = {_type: 'image', asset: {_type: 'reference', _ref: uploads.get(file)}}
      }
    }

    if (dryRun) {
      report.push({
        series: oldSlug,
        target: target._id,
        builderStatus: set.builderStatus,
        blanks: blankNames,
        applications: set.applications?.length,
        builderImage: set.builderImage,
      })
    } else {
      await client.patch(target._id).set(set).commit()
      report.push({series: oldSlug, target: target._id, result: 'patched', status: set.builderStatus})
    }
  }
  console.log(JSON.stringify(report, null, 2))
}

// ---------- pricing (part 3) ----------

async function pricing(exportDir, dryRun) {
  const old = readOldDocs(exportDir)
  const ice = ofType(old, 'iceRodGrips')[0]
  const ow = ofType(old, 'openWaterRodGrips')[0]
  const gripPrices = (g) => ({
    corkSplit: Number(g.corkSplitPrice),
    corkStraight: Number(g.corkStraightPrice),
    evaSplit: Number(g.evaSplitPrice),
    evaStraight: 0, // EVA straight is included in the base price
  })
  const rules = {
    iceLengths: [20, 22, 24, 26, 28, 30, 32, 34, 36],
    iceGripPrices: gripPrices(ice),
    openWaterGripPrices: gripPrices(ow),
    accentPrice: 10,
    stickerPrice: 10,
    // stickerMaxCharacters left unset: open question for Chris (#8)
  }
  console.log(JSON.stringify({customBuilderPage: {pricingRules: rules}}, null, 2))
  if (dryRun) return
  const client = await getClient()
  await client
    .patch('customBuilderPage')
    .setIfMissing({pricingRules: {}})
    .set(Object.fromEntries(Object.entries(rules).map(([k, v]) => [`pricingRules.${k}`, v])))
    .commit()
  console.log('Pricing Rules written.')
}

// ---------- main ----------

const args = parseArgs(process.argv.slice(2))
const cmd = args._[0]
const exportDir = findExportDir(args.exportDir)

if (cmd === 'generate') await generate(exportDir)
else if (cmd === 'patch-series') await patchSeries(exportDir, args.dryRun)
else if (cmd === 'pricing') await pricing(exportDir, args.dryRun)
else {
  console.error('Usage: node scripts/migrate-builder-data.mjs <generate|patch-series|pricing> [--export-dir <dir>] [--dry-run]')
  process.exit(1)
}
