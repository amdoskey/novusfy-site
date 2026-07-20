/**
 * One-off seed: creates the 5 Portfolio case studies as drafts.
 *
 *   SEED_DRY=1 npm run payload run src/seed/portfolio.ts   (preview, no writes)
 *   npm run payload run src/seed/portfolio.ts             (seed)
 *
 * `payload run` strips CLI args, hence the env var. It also exits as soon as
 * the module finishes loading, so this uses top-level await — a floating
 * promise gets killed at the first await and the script silently no-ops.
 *
 * Idempotent: skips any slug that already exists, so a re-run is safe.
 * NOTE: writes to the shared Neon DB, which is production. Snapshot first.
 */

import { getPayload } from 'payload'
import path from 'path'
import os from 'os'
import fs from 'fs'
import sharp from 'sharp'

import config from '../payload.config'
import { markdownToLexical } from './lexical'
import { portfolioEntries } from './portfolio-data'

const PLACEHOLDER_ALT = 'Placeholder — case study image coming soon'
const DRY_RUN = process.env.SEED_DRY === '1'

/** Finds the existing placeholder in Media, or generates and uploads one. */
async function resolvePlaceholderImage(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: PLACEHOLDER_ALT } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const doc = existing.docs[0]
    console.log(`  reusing existing placeholder media (id ${doc.id})`)
    return doc.id
  }

  const tmpPath = path.join(os.tmpdir(), `novusfy-placeholder-${Date.now()}.png`)
  await sharp({
    create: {
      width: 1600,
      height: 900,
      channels: 3,
      background: { r: 201, g: 203, b: 212 },
    },
  })
    .png()
    .toFile(tmpPath)

  const created = await payload.create({
    collection: 'media',
    data: { alt: PLACEHOLDER_ALT },
    filePath: tmpPath,
  })

  fs.unlinkSync(tmpPath)
  console.log(`  created placeholder media (id ${created.id})`)
  return created.id
}

async function seed() {
  const payload = await getPayload({ config })

  console.log(`\nPortfolio seed — ${DRY_RUN ? 'DRY RUN (no writes)' : 'LIVE'}\n`)

  if (DRY_RUN) {
    const sample = portfolioEntries[1] // GAV TV — longest, has results rows
    console.log(`Converted richText for "${sample.title}":\n`)
    console.log(JSON.stringify(markdownToLexical(sample.content), null, 2))
    console.log(`\n${portfolioEntries.length} entries would be created as drafts.`)
    process.exit(0)
  }

  const imageId = await resolvePlaceholderImage(payload)

  let created = 0
  let skipped = 0

  for (const entry of portfolioEntries) {
    const existing = await payload.find({
      collection: 'portfolio',
      where: { slug: { equals: entry.slug } },
      limit: 1,
      draft: true,
    })

    if (existing.docs.length > 0) {
      console.log(`  SKIP  ${entry.slug} — already exists (id ${existing.docs[0].id})`)
      skipped++
      continue
    }

    const doc = await payload.create({
      collection: 'portfolio',
      draft: true,
      data: {
        title: entry.title,
        slug: entry.slug,
        clientName: entry.clientName,
        industry: entry.industry,
        summary: entry.summary,
        content: markdownToLexical(entry.content),
        coverImage: imageId,
        gallery: [{ image: imageId }],
        servicesProvided: entry.servicesProvided,
        results: entry.results ?? [],
        externalLink: entry.externalLink ?? null,
        featured: entry.featured,
        completedDate: null,
      },
    })

    console.log(`  OK    ${entry.slug} — id ${doc.id} (_status: ${doc._status})`)
    created++
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped.\n`)
  process.exit(0)
}

try {
  await seed()
} catch (err) {
  console.error('\nSeed failed:', err)
  process.exit(1)
}
