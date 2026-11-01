/**
 * Booking formats — the single place for Cal.com links and prices.
 *
 * Links open Cal.com in a new tab; nothing from Cal.com is embedded or loaded
 * on our pages (see the Datenschutzerklärung, "Terminbuchung über Cal.com").
 * Prices are whole units; /de shows EUR, every other locale shows USD.
 */
export const BOOKING = {
  free: { url: 'https://cal.com/novusfy/15min' },
  strategy: { url: 'https://cal.com/novusfy/strategy-session', usd: 150, eur: 140 },
  program: { url: 'https://cal.com/novusfy/momentum-program-kickoff', usd: 600, eur: 550 },
} as const

type Priced = { usd: number; eur: number }

export function formatPrice(locale: string, item: Priced): string {
  const currency = locale === 'de' ? 'EUR' : 'USD'
  const amount = currency === 'EUR' ? item.eur : item.usd
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
