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
    title: 'Datenschutzerklärung — Novusfy',
    alternates: { canonical: '/datenschutz' },
  }
}

export default async function DatenschutzPage({
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
          <h1 className="phead__title">Datenschutzerklärung</h1>
        </div>
      </section>

      <div className="stitch"></div>

      <section className="legal">
        <div className="wrap">
          <div className="prose legal__body">
            <h3>1. Verantwortlicher</h3>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung
              (DSGVO) ist:
            </p>
            <p>
              <strong>Novusfy</strong>
              <br />
              Karwan Jameel
              <br />
              Im Staadergarten 15
              <br />
              78343 Gaienhofen OT Horn
              <br />
              Deutschland
            </p>
            <p>
              E-Mail:{' '}
              <a href="mailto:info@novusfy.com">info@novusfy.com</a>
              <br />
              Telefon:{' '}
              <a href="tel:+491793412853" dir="ltr">
                +49 179 3412853
              </a>
            </p>

            <hr />

            <h3>2. Allgemeines zur Datenverarbeitung</h3>
            <p>
              Wir verarbeiten personenbezogene Daten unserer Nutzer
              grundsätzlich nur, soweit dies zur Bereitstellung einer
              funktionsfähigen Website sowie unserer Inhalte und Leistungen
              erforderlich ist. Die Verarbeitung personenbezogener Daten
              erfolgt regelmäßig nur nach Einwilligung des Nutzers (Art. 6
              Abs. 1 lit. a DSGVO) oder soweit die Verarbeitung zur
              Vertragserfüllung bzw. vorvertraglichen Maßnahmen (Art. 6
              Abs. 1 lit. b DSGVO) oder zur Wahrung berechtigter Interessen
              (Art. 6 Abs. 1 lit. f DSGVO) erforderlich ist.
            </p>

            <hr />

            <h3>3. Hosting und technische Infrastruktur</h3>
            <p>
              Diese Website wird über folgende externe Dienstleister
              betrieben. Beim Aufruf der Website werden automatisch
              technische Daten (u.&nbsp;a. IP-Adresse, Datum und Uhrzeit
              des Zugriffs, aufgerufene Seite, Browsertyp) durch diese
              Dienstleister verarbeitet, um die Website auszuliefern.
            </p>

            <h4>Hosting: Vercel Inc.</h4>
            <p>
              Unsere Website wird bei Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, USA, gehostet. Vercel verarbeitet in diesem
              Zusammenhang Server-Logdaten. Die Verarbeitung erfolgt auf
              Grundlage unseres berechtigten Interesses an einer
              zuverlässigen und performanten Bereitstellung unseres
              Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO). Da Vercel Inc.
              ein US-amerikanisches Unternehmen ist, kann eine
              Datenübermittlung in die USA erfolgen; dies erfolgt auf
              Grundlage von EU-Standardvertragsklauseln (Art. 46 DSGVO),
              sofern zwischen uns und Vercel vereinbart.
            </p>

            <h4>Datenbank: Neon (Neon, Inc.)</h4>
            <p>
              Inhaltsdaten der Website (u.&nbsp;a. Texte,
              Portfolio-Einträge) werden in einer von Neon, Inc.
              bereitgestellten PostgreSQL-Datenbank gespeichert. Die
              Datenbank wird im Rechenzentrum AWS Europe Central 1
              (Frankfurt am Main, Deutschland) betrieben, sodass die Daten
              innerhalb der EU verbleiben.
            </p>

            <h4>Objektspeicher: Cloudflare R2 (Cloudflare, Inc.)</h4>
            <p>
              Von uns hochgeladene Bilddateien (z.&nbsp;B.
              Fallstudien-Fotos) werden über Cloudflare R2 gespeichert. Der
              genutzte Speicher-Bucket ist auf die Jurisdiktion Europäische
              Union festgelegt, sodass die gespeicherten Dateien innerhalb
              der EU verbleiben. Cloudflare, Inc. selbst ist ein
              US-amerikanisches Unternehmen; die Verarbeitung erfolgt auf
              Grundlage unseres berechtigten Interesses an einer
              performanten und sicheren Bereitstellung von Medieninhalten
              (Art. 6 Abs. 1 lit. f DSGVO).
            </p>

            <hr />

            <h3>4. Kontaktformular</h3>
            <p>
              Wenn Sie uns über das Kontaktformular Anfragen zukommen
              lassen, werden Ihre Angaben aus dem Anfrageformular — Name,
              E-Mail-Adresse, optionales Betreff-Feld und Nachrichtentext —
              zum Zwecke der Bearbeitung Ihrer Anfrage und für den Fall von
              Anschlussfragen bei uns gespeichert.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Die Verarbeitung dieser
              Daten erfolgt auf Grundlage unseres berechtigten Interesses
              an der Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f
              DSGVO), bzw. sofern Ihre Anfrage auf den Abschluss eines
              Vertrags gerichtet ist, zur Durchführung vorvertraglicher
              Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).
            </p>

            <h4>E-Mail-Versand: Resend</h4>
            <p>
              Der Versand der über das Kontaktformular ausgelösten E-Mails
              erfolgt über den Dienst Resend (Resend, Inc., USA). Dabei
              werden die von Ihnen eingegebenen Daten sowie technische
              Metadaten der E-Mail (Zeitstempel, Zustellstatus) durch
              Resend verarbeitet. Da Resend, Inc. ein US-amerikanisches
              Unternehmen ist, kann eine Datenübermittlung in die USA
              erfolgen; dies erfolgt auf Grundlage von
              EU-Standardvertragsklauseln (Art. 46 DSGVO), sofern zwischen
              uns und Resend vereinbart.
            </p>

            <p>
              <strong>Speicherdauer:</strong> Die über das Kontaktformular
              übermittelten Daten verbleiben bei uns, bis Sie uns zur
              Löschung auffordern, Ihre Einwilligung zur Speicherung
              widerrufen oder der Zweck für die Datenspeicherung entfällt.
              Zwingende gesetzliche Aufbewahrungsfristen bleiben unberührt.
            </p>

            <hr />

            <h3>5. Google Maps</h3>
            <p>
              Auf unserer Kontaktseite verwenden wir den Kartendienst
              „Google Maps" des Anbieters Google Ireland Limited, Gordon
              House, Barrow Street, Dublin 4, Irland.
            </p>
            <p>
              <strong>
                Diese Karte wird nicht automatisch beim Seitenaufruf
                geladen.
              </strong>{' '}
              Stattdessen wird zunächst nur eine statische
              Platzhalter-Grafik angezeigt. Erst wenn Sie aktiv auf die
              Schaltfläche „Karte laden" klicken, wird die eigentliche
              Google-Maps-Karte eingebunden und geladen. Mit diesem Klick
              willigen Sie in die Übertragung Ihrer Daten (insbesondere
              Ihrer IP-Adresse) an Google ein.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Ihre Einwilligung durch
              aktives Klicken (Art. 6 Abs. 1 lit. a DSGVO). Sie können
              diese Einwilligung jederzeit für die Zukunft widerrufen,
              indem Sie die Karte nicht laden bzw. die Seite ohne
              Kartenaufruf verlassen. Alternativ steht Ihnen ein Link
              „Route planen" zur Verfügung, der Sie direkt zu Google Maps
              weiterleitet, ohne dass die Karte auf unserer Seite
              eingebettet wird.
            </p>
            <p>
              Weitere Informationen zum Umgang mit Nutzerdaten durch Google
              finden Sie in der Datenschutzerklärung von Google:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
            </p>

            <hr />

            <h3>6. Cookies</h3>
            <p>
              Diese Website verwendet derzeit <strong>keine Cookies</strong>{' '}
              zu Tracking- oder Analysezwecken. Es werden keine
              Cookie-Banner benötigt, da keine einwilligungspflichtigen
              Cookies gesetzt werden.
            </p>

            <hr />

            <h3>7. Ihre Rechte als betroffene Person</h3>
            <p>
              Ihnen stehen gegenüber uns hinsichtlich Ihrer
              personenbezogenen Daten folgende Rechte zu:
            </p>
            <ul>
              <li>
                <strong>Recht auf Auskunft</strong> (Art. 15 DSGVO)
              </li>
              <li>
                <strong>Recht auf Berichtigung oder Löschung</strong>{' '}
                (Art. 16, 17 DSGVO)
              </li>
              <li>
                <strong>
                  Recht auf Einschränkung der Verarbeitung
                </strong>{' '}
                (Art. 18 DSGVO)
              </li>
              <li>
                <strong>
                  Recht auf Widerspruch gegen die Verarbeitung
                </strong>{' '}
                (Art. 21 DSGVO)
              </li>
              <li>
                <strong>Recht auf Datenübertragbarkeit</strong> (Art. 20
                DSGVO)
              </li>
            </ul>
            <p>
              Sie haben zudem das Recht, sich bei einer
              Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
              personenbezogenen Daten durch uns zu beschweren. Die für uns
              zuständige Aufsichtsbehörde ist:
            </p>
            <p>
              <strong>
                Der Landesbeauftragte für den Datenschutz und die
                Informationsfreiheit Baden-Württemberg
              </strong>
              <br />
              Lautenschlagerstraße 20
              <br />
              70173 Stuttgart
              <br />
              <a
                href="https://www.baden-wuerttemberg.datenschutz.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.baden-wuerttemberg.datenschutz.de
              </a>
            </p>

            <hr />

            <h3>8. SSL-/TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
              Sie daran, dass die Adresszeile des Browsers von „http://" auf
              „https://" wechselt.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
