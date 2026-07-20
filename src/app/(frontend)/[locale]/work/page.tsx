import { getTranslations, setRequestLocale } from 'next-intl/server'

import { getAllPortfolio } from '@/lib/portfolio'
import { routing, type Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/metadata'
import { WorkTile } from '../../components/WorkTile'

export const revalidate = 300

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'work' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    ...localeAlternates(locale, '/work'),
  }
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('work')
  const entries = await getAllPortfolio(locale as Locale)

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <p className="eyebrow">
            <span className="eyebrow__dot"></span>
            {t('eyebrow')}
          </p>
          <h1 className="phead__title">{t('title')}</h1>
          <p className="phead__sub">{t('subtitle')}</p>
        </div>
      </section>

      <div className="stitch"></div>

      <section className="work">
        <div className="wrap">
          {entries.length === 0 ? (
            <p className="work__empty">{t('empty')}</p>
          ) : (
            <div className="work__grid">
              {entries.map((entry, i) => (
                <WorkTile key={entry.id} entry={entry} modifier={i % 3 === 0 ? 'tile--dark' : ''} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
