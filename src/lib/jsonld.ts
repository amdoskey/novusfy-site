import { getTranslations } from 'next-intl/server'

import { BOOKING } from '@/config/booking'
import {
  EMAIL,
  OFFICE_ERBIL,
  OFFICE_GERMANY,
  SITE_NAME,
  SITE_URL,
  SOCIAL_URLS,
} from '@/config/site'
import { localizedUrl, PAGE_PATHS, type PageKey } from '@/lib/metadata'

/**
 * schema.org structured data, rendered server-side as JSON-LD (<JsonLd />).
 * Factual only: no ratings, reviews or aggregate scores.
 *
 * Nodes reference each other by stable @id URLs, so the site-wide graph
 * (Organization, WebSite, Erbil LocalBusiness) and the per-page nodes
 * (Services, Offers, BreadcrumbList) join into one entity in search engines.
 */
type Node = Record<string, unknown>

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const ERBIL_ID = `${SITE_URL}/#erbil-office`
const LOGO = `${SITE_URL}/icon-blue.png`

const postalAddress = (o: {
  streetAddress: string
  postalCode?: string
  addressLocality: string
  addressCountry: string
}): Node => ({ '@type': 'PostalAddress', ...o })

/** Organization + WebSite + the Erbil LocalBusiness — rendered on every page. */
export async function siteGraph(locale: string): Promise<Node> {
  const t = await getTranslations({ locale, namespace: 'meta' })
  const contact = await getTranslations({ locale, namespace: 'contact' })

  const organization: Node = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: LOGO, width: 150, height: 154 },
    description: t('home.description'),
    email: EMAIL,
    telephone: OFFICE_GERMANY.telephone,
    // Legal seat, as in the Impressum.
    address: postalAddress(OFFICE_GERMANY),
    location: {
      '@type': 'Place',
      name: `${SITE_NAME} ${contact('officeErbil')}`,
      address: postalAddress(OFFICE_ERBIL),
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: OFFICE_GERMANY.telephone,
        email: EMAIL,
        areaServed: 'DE',
        availableLanguage: ['en', 'de'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: OFFICE_ERBIL.telephone,
        email: EMAIL,
        areaServed: 'IQ',
        availableLanguage: ['en', 'ar'],
      },
    ],
    sameAs: Object.values(SOCIAL_URLS),
  }

  const website: Node = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: ['en', 'de', 'ar'],
    publisher: { '@id': ORG_ID },
  }

  // The Erbil office only — the German address is the legal seat, not a walk-in business.
  const erbil: Node = {
    '@type': 'LocalBusiness',
    '@id': ERBIL_ID,
    name: `${SITE_NAME} ${contact('officeErbil')}`,
    url: localizedUrl(locale, '/contact'),
    image: LOGO,
    email: EMAIL,
    telephone: OFFICE_ERBIL.telephone,
    address: postalAddress(OFFICE_ERBIL),
    parentOrganization: { '@id': ORG_ID },
  }

  return { '@context': 'https://schema.org', '@graph': [organization, website, erbil] }
}

/** Home → page. Names are the footer link labels, as visitors see them. */
export async function breadcrumbs(locale: string, page: Exclude<PageKey, 'home'>): Promise<Node> {
  const nav = await getTranslations({ locale, namespace: 'nav' })
  const footer = await getTranslations({ locale, namespace: 'footer' })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: nav('home'), item: localizedUrl(locale, '/') },
      {
        '@type': 'ListItem',
        position: 2,
        name: footer(page),
        item: localizedUrl(locale, PAGE_PATHS[page]),
      },
    ],
  }
}

/** /expertise — the six service lines. */
export async function expertiseServices(locale: string): Promise<Node> {
  const t = await getTranslations({ locale, namespace: 'services' })
  const url = localizedUrl(locale, '/expertise')
  const n = [1, 2, 3, 4, 5, 6] as const
  return {
    '@context': 'https://schema.org',
    '@graph': n.map((i) => ({
      '@type': 'Service',
      '@id': `${url}#service-${i}`,
      name: t(`s${i}Title`),
      description: t(`s${i}Body`),
      serviceType: t(`s${i}Title`),
      url,
      provider: { '@id': ORG_ID },
      areaServed: ['DE', 'IQ'],
    })),
  }
}

/**
 * /consultation — the three booking formats as Offers. Prices come from
 * src/config/booking.ts: EUR on /de, USD elsewhere (same rule as the cards).
 */
export async function consultationOffers(locale: string): Promise<Node> {
  const t = await getTranslations({ locale, namespace: 'booking' })
  const page = await getTranslations({ locale, namespace: 'consultation' })
  const currency = locale === 'de' ? 'EUR' : 'USD'
  const price = (p: { usd: number; eur: number }) => (currency === 'EUR' ? p.eur : p.usd)
  const url = localizedUrl(locale, '/consultation')

  const offer = (key: 'free' | 'strategy' | 'program', amount: number): Node => ({
    '@type': 'Offer',
    '@id': `${url}#offer-${key}`,
    name: t(`${key}Title`),
    description: t(`${key}Body`),
    url: BOOKING[key].url,
    price: amount,
    priceCurrency: currency,
    availability: 'https://schema.org/InStock',
    seller: { '@id': ORG_ID },
    itemOffered: {
      '@type': 'Service',
      name: t(`${key}Title`),
      provider: { '@id': ORG_ID },
    },
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${url}#formats`,
    name: page('eyebrow'),
    url,
    itemListElement: [
      offer('free', 0),
      offer('strategy', price(BOOKING.strategy)),
      offer('program', price(BOOKING.program)),
    ],
  }
}
