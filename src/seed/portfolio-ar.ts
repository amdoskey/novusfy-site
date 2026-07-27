/**
 * One-off: writes the Arabic locale values onto the 5 existing Portfolio docs.
 *
 *   SEED_DRY=1 npm run payload run src/seed/portfolio-ar.ts   (preview, no writes)
 *   npm run payload run src/seed/portfolio-ar.ts              (write)
 *
 * `payload run` strips CLI args, hence the env var. It also exits as soon as the
 * module finishes loading, so this uses top-level await — a floating promise
 * gets killed at the first await and the script silently no-ops (CLAUDE.md §2
 * gotchas 8 + 9).
 *
 * Updates only the `ar` locale: EN and DE are untouched because Payload writes
 * localized fields per-locale. The `results` array is NOT localized (only its
 * `label` subfield is), so existing row IDs are read from the doc and passed
 * back — omitting them would make Payload recreate the rows and drop the other
 * locales' labels (CLAUDE.md §6 schema notes).
 *
 * NOTE: writes to the shared Neon DB, which is production. Snapshot first.
 */

import { getPayload } from 'payload'

import config from '../payload.config'
import { markdownToLexical } from './lexical'
import { portfolioEntriesAr } from './portfolio-data-ar'

const DRY_RUN = process.env.SEED_DRY === '1'

const payload = await getPayload({ config })

console.log(`\nPortfolio AR translation — ${DRY_RUN ? 'DRY RUN (no writes)' : 'LIVE'}\n`)

let updated = 0
let skipped = 0

for (const entry of portfolioEntriesAr) {
  // Read the English doc: we need its id and, for GAV TV, the results row ids.
  const existing = await payload.find({
    collection: 'portfolio',
    where: { slug: { equals: entry.slug } },
    limit: 1,
    locale: 'en',
    draft: true,
  })

  const doc = existing.docs[0]
  if (!doc) {
    console.log(`  SKIP  ${entry.slug} — not found`)
    skipped++
    continue
  }

  const existingResults = doc.results ?? []
  let results: { id?: string | null; label: string; value: string }[] | undefined

  if (entry.resultLabels) {
    if (entry.resultLabels.length !== existingResults.length) {
      console.log(
        `  SKIP  ${entry.slug} — ${entry.resultLabels.length} AR labels vs ` +
          `${existingResults.length} existing rows; refusing to guess alignment`,
      )
      skipped++
      continue
    }
    results = existingResults.map((row, i) => ({
      id: row.id,
      label: entry.resultLabels![i],
      value: row.value,
    }))
  }

  if (DRY_RUN) {
    console.log(`  WOULD UPDATE  ${entry.slug} (id ${doc.id})`)
    console.log(`      title   : ${entry.title}`)
    console.log(`      summary : ${entry.summary.slice(0, 60)}…`)
    console.log(`      content : ${entry.content.length} chars of Markdown`)
    if (results) {
      results.forEach((r) => console.log(`      result  : ${r.label} = ${r.value}`))
    }
    continue
  }

  await payload.update({
    collection: 'portfolio',
    id: doc.id,
    locale: 'ar',
    data: {
      title: entry.title,
      summary: entry.summary,
      content: markdownToLexical(entry.content),
      ...(results ? { results } : {}),
    },
  })

  console.log(`  OK    ${entry.slug} — ar locale written`)
  updated++
}

if (DRY_RUN) {
  console.log(`\n${portfolioEntriesAr.length} entries would be updated.\n`)
} else {
  console.log(`\nDone: ${updated} updated, ${skipped} skipped.\n`)
}

process.exit(0)
