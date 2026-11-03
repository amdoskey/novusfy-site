import { useTranslations } from 'next-intl'
import React from 'react'

import { Link } from '@/i18n/navigation'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="foot">
      <div className="wrap foot__inner">
        <div className="foot__brand">
          <Link className="brand" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand__mark" src="/icon-white.png" alt="" />
            <span className="brand__word brand__word--invert">Novusfy</span>
          </Link>
          <p className="foot__slogan">{t('slogan')}</p>
          <SocialLinks className="foot__social" />
        </div>
        <div className="foot__col">
          <h2>{t('company')}</h2>
          <Link href="/about">{t('about')}</Link>
          <Link href="/expertise">{t('expertise')}</Link>
          <Link href="/consultation">{t('consultation')}</Link>
        </div>
        <div className="foot__col">
          <h2>{t('explore')}</h2>
          <Link href="/learning">{t('learning')}</Link>
          <Link href="/contact">{t('contact')}</Link>
          <Link href="/datenschutz">{t('privacy')}</Link>
          <Link href="/impressum">{t('impressum')}</Link>
        </div>
        <div className="foot__col">
          <h2>{t('reachUs')}</h2>
          <a href="mailto:info@novusfy.com" dir="ltr">info@novusfy.com</a>
          <a href="#">{t('locations')}</a>
          <a href="#" dir="ltr">novusfy.com</a>
        </div>
      </div>
      <div className="wrap foot__base">
        <span>{t('copyright')}</span>
        <span>{t('tagline')}</span>
      </div>
    </footer>
  )
}
