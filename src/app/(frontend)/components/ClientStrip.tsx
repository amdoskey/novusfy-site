import { getTranslations } from 'next-intl/server'
import React from 'react'

import { CLIENTS, MARQUEE_MIN, type Client } from '@/config/clients'

function Logo({ client }: { client: Client }) {
  return (
    <li className="clients__item">
      {client.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={client.logo} alt={client.name} className="clients__logo" />
      ) : (
        <span className="clients__word">{client.name}</span>
      )}
    </li>
  )
}

/**
 * "Trusted by" strip. Pure CSS, no links, no hover states.
 * With enough logos it loops as a marquee (the list is rendered twice and the
 * track slides by half its width); otherwise it is a static centered row.
 * Reduced motion always gets the static row (styles.css).
 */
export default async function ClientStrip() {
  const t = await getTranslations('home.clients')
  const isMarquee = CLIENTS.length >= MARQUEE_MIN

  return (
    <section className="clients" aria-label={t('label')}>
      <div className="wrap">
        <p className="clients__label">{t('label')}</p>
      </div>
      {isMarquee ? (
        <div className="clients__viewport">
          <div className="clients__track">
            <ul className="clients__list">
              {CLIENTS.map((c) => (
                <Logo key={c.name} client={c} />
              ))}
            </ul>
            <ul className="clients__list clients__list--dup" aria-hidden="true">
              {CLIENTS.map((c) => (
                <Logo key={c.name} client={c} />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="wrap">
          <ul className="clients__list clients__list--static">
            {CLIENTS.map((c) => (
              <Logo key={c.name} client={c} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
