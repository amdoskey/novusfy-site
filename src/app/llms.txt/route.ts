import { BOOKING } from '@/config/booking'
import { EMAIL, OFFICE_ERBIL, OFFICE_GERMANY, SITE_URL, SOCIAL_URLS } from '@/config/site'
import en from '../../../messages/en.json'

/**
 * /llms.txt — a plain Markdown summary for AI assistants and crawlers
 * (llmstxt.org). Built from messages/en.json and src/config/booking.ts at
 * build time, so it changes whenever the site copy or prices do.
 */
export const dynamic = 'force-static'

const usd = (n: number) => `$${n}`
const eur = (n: number) => `€${n}`
const address = (o: { streetAddress: string; postalCode?: string; addressLocality: string }) =>
  [o.streetAddress, [o.postalCode, o.addressLocality].filter(Boolean).join(' ')].join(', ')

function build(): string {
  const s = en.services
  const b = en.booking
  const l = en.learning
  const services = ([1, 2, 3, 4, 5, 6] as const).map(
    (i) => `- **${s[`s${i}Title`]}**: ${s[`s${i}Body`]}`,
  )
  const topics = ([1, 2, 3, 4, 5, 6] as const).map((i) => l[`cat${i}Title`]).join(', ')

  return `# Novusfy

> ${en.meta.home.description}

${en.about.subtitle} Offices in Germany and Erbil, Iraq. The site is available in English, German and Arabic. Every engagement starts with a free 15-minute consultation.

## Expertise

${services.join('\n')}

## Consultation formats

- **${b.freeTitle}** — free, 15 minutes. ${b.freeBody} Book: ${BOOKING.free.url}
- **${b.strategyTitle}** — ${usd(BOOKING.strategy.usd)} (${eur(BOOKING.strategy.eur)} in Germany), 45 minutes. ${b.strategyBody} Request: ${BOOKING.strategy.url}
- **${b.programTitle}** — ${usd(BOOKING.program.usd)} (${eur(BOOKING.program.eur)} in Germany), 4 × 60 minutes over about a month. ${b.programBody} Request: ${BOOKING.program.url}

${b.note} ${b.vatNote}

## Learning

${l.subtitle}

Topics: ${topics}.

## Locations

- Germany (legal seat): ${address(OFFICE_GERMANY)}, Germany · ${OFFICE_GERMANY.telephone}
- Iraq: ${address(OFFICE_ERBIL)}, Iraq · ${OFFICE_ERBIL.telephone}

## Contact

- Email: ${EMAIL}
- Instagram: ${SOCIAL_URLS.instagram}
- Facebook: ${SOCIAL_URLS.facebook}
- LinkedIn: ${SOCIAL_URLS.linkedin}

## Key pages

- [Home](${SITE_URL}/): ${en.meta.home.description}
- [About](${SITE_URL}/about): ${en.meta.about.description}
- [Expertise](${SITE_URL}/expertise): ${en.meta.expertise.description}
- [Consultation](${SITE_URL}/consultation): ${en.meta.consultation.description}
- [Learning](${SITE_URL}/learning): ${en.meta.learning.description}
- [Contact](${SITE_URL}/contact): ${en.meta.contact.description}
- German site: ${SITE_URL}/de · Arabic site: ${SITE_URL}/ar
- [Impressum](${SITE_URL}/impressum) · [Datenschutz](${SITE_URL}/datenschutz)
`
}

export function GET() {
  return new Response(build(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
