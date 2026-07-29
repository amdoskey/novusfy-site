import React from 'react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  return {
    title: 'Impressum — Novusfy',
    alternates: { canonical: '/impressum' },
  }
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <p className="eyebrow">
            <span className="eyebrow__dot"></span>
            Rechtliches
          </p>
          <h1 className="phead__title">Impressum</h1>
        </div>
      </section>

      <div className="stitch"></div>

      <section className="legal">
        <div className="wrap">
          <div className="prose legal__body">
            <h3>Angaben gemäß § 5 DDG</h3>

            <p>
              <strong>Novusfy</strong>
              <br />
              Inhaber: Karwan Jameel
            </p>
            <p>
              Im Staadergarten 15
              <br />
              78343 Gaienhofen OT Horn
              <br />
              Deutschland
            </p>

            <h4>Kontakt</h4>
            <p>
              Telefon:{' '}
              <a href="tel:+491793412853" dir="ltr">
                +49 179 3412853
              </a>
              <br />
              E-Mail:{' '}
              <a href="mailto:info@novusfy.com">info@novusfy.com</a>
            </p>

            <h4>Umsatzsteuer</h4>
            <p>
              Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine
              Umsatzsteuer berechnet und ausgewiesen.
            </p>

            <h4>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h4>
            <p>
              Karwan Jameel
              <br />
              (Anschrift wie oben)
            </p>

            <h4>Registereintrag</h4>
            <p>
              Gewerbeanmeldung bei der Gemeinde Gaienhofen
              <br />
              Anmeldedatum: 05.06.2026
            </p>

            <hr />

            <h3>EU-Streitschlichtung</h3>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit, die Sie hier finden:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <hr />

            <h3>Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
              möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend
              entfernen.
            </p>

            <h3>Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir
              für diese fremden Inhalte auch keine Gewähr übernehmen. Für
              die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
            <p>
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
              mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
              waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
              permanente inhaltliche Kontrolle der verlinkten Seiten ist
              jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
              nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Links umgehend entfernen.
            </p>

            <h3>Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke
              auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
              der schriftlichen Zustimmung des jeweiligen Autors bzw.
              Erstellers.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
