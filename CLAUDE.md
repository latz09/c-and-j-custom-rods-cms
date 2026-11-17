# C&J Custom Rods CMS: Claude Code Instructions

Sanity Studio (v6) for the C&J Custom Rods rebuild. Project `vx4e4v7t`, dataset `production`, branch `main`.

**The build plan, tracker and handoffs live in the frontend repo:** `../code/docs/build/` (full instructions in `../code/CLAUDE.md`). Normally sessions run from the frontend repo with this folder added via `/add-dir`. If a session starts here instead, read `../code/CLAUDE.md` and follow it.

Jordan is on Windows with Git Bash: use forward-slash paths (`/c/LatzWebDesign/...`) in shell commands.

## Schema conventions (match the existing files)

- One schema per file in `schemaTypes/`, default export object, registered in `schemaTypes/index.js`. Builder types go in `schemaTypes/builder/`.
- Page singletons: `title` field first, numbered groups with emoji titles (`① Hero`, `② ...`), SEO group last via `...seoField`, `preview: { select: { title: 'title' } }`. Images always `options: { hotspot: true }`.
- Singletons must be added to `singletonTypes` in `structure.js` and get a fixed `documentId`.
- `@sanity/icons` v5+: import each icon from its own subpath (`import {CogIcon} from '@sanity/icons/Cog'`), never from the package root.
- Prettier: no semicolons, single quotes, `bracketSpacing: false`, print width 100.
- `rodSeries.slug` is a **Shopify tag value**, not a slug object and not a collection handle.

## Rules

- Branch per phase (same name as the frontend branch). Never commit to `main`.
- Ask before `sanity deploy`, dataset imports, or any script that writes to the dataset. Those need Jordan's token and go-ahead.
- Never write to the old v1 project (`xov8qqkx`).
- Never open, print or commit `.env*` files or tokens.
- No em dashes in docs or messages.
