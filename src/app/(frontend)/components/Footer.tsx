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
          <h4>{t('company')}</h4>
          <Link href="/about">{t('about')}</Link>
          <Link href="/services">{t('services')}</Link>
          <Link href="/work">{t('work')}</Link>
        </div>
        <div className="foot__col">
          <h4>{t('explore')}</h4>
          <Link href="/learning-hub">{t('learningHub')}</Link>
          <Link href="/contact">{t('contact')}</Link>
          {/* TODO: point at /datenschutz once the German legal pages land (CLAUDE.md §7) */}
          <Link href="#">{t('privacy')}</Link>
        </div>
        <div className="foot__col">
          <h4>{t('reachUs')}</h4>
          <a href="mailto:info@novusfy.com">info@novusfy.com</a>
          <a href="#">{t('locations')}</a>
          <a href="#">novusfy.com</a>
        </div>
      </div>
      <div className="wrap foot__base">
        <span>{t('copyright')}</span>
        <span>{t('tagline')}</span>
      </div>
    </footer>
  )
}
