'use client'

import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

/**
 * Consent-gated Google Maps embed (CLAUDE.md §7).
 *
 * Auto-loading the iframe transmits the visitor's IP to Google before any
 * consent — a known German Abmahnung risk. The iframe carries NO src until the
 * visitor clicks: not hidden, not display:none, not loading="lazy". Any src in
 * the DOM triggers the request regardless of visibility, and lazy-loading only
 * defers it to scroll, still without consent.
 *
 * 🔴 The placeholder must stay request-free. Do NOT swap it for Google's Static
 * Maps API or a remote tile image — that leaks the IP exactly like the iframe,
 * just less visibly. It is pure CSS on purpose.
 *
 * Consent is ephemeral React state, deliberately not persisted. Storing it
 * would make this a consent-management surface with its own disclosure duties;
 * the site currently stores nothing client-side and that is worth keeping.
 */
export default function MapEmbed({ query, officeName }: { query: string; officeName: string }) {
  const t = useTranslations('contact')
  const [loaded, setLoaded] = useState(false)

  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
  // Plain href — no request fires until the visitor activates it.
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

  if (loaded) {
    return (
      <div className="office__map">
        <iframe
          src={embedSrc}
          title={t('mapTitle', { name: officeName })}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    )
  }

  return (
    <div className="office__map office__map--gated">
      <div className="mapgate" role="group" aria-label={t('mapTitle', { name: officeName })}>
        <div className="mapgate__art" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="mapgate__pin">
            <path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
        </div>
        <div className="mapgate__body">
          <p className="mapgate__notice">{t('mapNotice')}</p>
          <button
            type="button"
            className="btn btn--solid btn--sm"
            onClick={() => setLoaded(true)}
            aria-label={t('mapAria', { name: officeName })}
          >
            {t('mapLoad')}
          </button>
          <a
            className="mapgate__directions"
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('mapDirections')} ↗
          </a>
        </div>
      </div>
    </div>
  )
}
