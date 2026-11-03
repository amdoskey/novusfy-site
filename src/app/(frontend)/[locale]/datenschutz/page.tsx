import React from 'react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import { legalMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  return legalMetadata('Datenschutzerklärung — Novusfy', '/datenschutz')
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
            <h2>1. Verantwortlicher</h2>
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

            <h2>2. Allgemeines zur Datenverarbeitung</h2>
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

            <h2>3. Hosting und technische Infrastruktur</h2>
            <p>
              Diese Website wird über folgende externe Dienstleister
              betrieben. Beim Aufruf der Website werden automatisch
              technische Daten (u.&nbsp;a. IP-Adresse, Datum und Uhrzeit
              des Zugriffs, aufgerufene Seite, Browsertyp) durch diese
              Dienstleister verarbeitet, um die Website auszuliefern.
            </p>

            <h3>Hosting: Vercel Inc.</h3>
            <p>
              Unsere Website wird bei Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, USA, gehostet. Vercel verarbeitet in diesem
              Zusammenhang Server-Logdaten. Die Verarbeitung erfolgt auf
              Grundlage unseres berechtigten Interesses an einer
              zuverlässigen und performanten Bereitstellung unseres
              Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <p>
              Wir haben mit Vercel einen Auftragsverarbeitungsvertrag gemäß
              Art. 28 DSGVO geschlossen. Die Übermittlung personenbezogener
              Daten in die USA erfolgt auf Grundlage dieses
              Auftragsverarbeitungsvertrags und der
              EU-Standardvertragsklauseln. Vercel ist zudem nach dem EU-US
              Data Privacy Framework zertifiziert; die Übermittlung stützt
              sich damit auch auf den Angemessenheitsbeschluss der
              EU-Kommission vom 10. Juli 2023.
            </p>

            <h3>Server-Logfiles</h3>
            <p>
              Beim Aufruf dieser Website erhebt unser Hosting-Anbieter Vercel
              automatisch Informationen, die Ihr Browser übermittelt:
              IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite
              bzw. Datei, Referrer-URL, Browsertyp und -version sowie
              Betriebssystem. Eine Zusammenführung mit anderen Datenquellen
              findet nicht statt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
              DSGVO; unser berechtigtes Interesse liegt in der sicheren,
              stabilen und fehlerfreien Bereitstellung der Website. Die
              Logfiles werden in der Regel nach spätestens 30 Tagen gelöscht.
              Daten, deren weitere Aufbewahrung zu Beweiszwecken erforderlich
              ist (z.&nbsp;B. bei Sicherheitsvorfällen), sind bis zur
              endgültigen Klärung des Vorfalls von der Löschung ausgenommen.
            </p>

            <h3>Datenbank: Neon (Neon, Inc.)</h3>
            <p>
              Die Inhalte dieser Website (z.&nbsp;B. Texte und
              Projektbeschreibungen) sowie die Zugangsdaten der
              Redaktionskonten werden in einer Datenbank der Neon, Inc. (USA)
              gespeichert, deren Server sich in Frankfurt am Main befinden.
              Wir haben mit Neon einen Auftragsverarbeitungsvertrag gemäß
              Art. 28 DSGVO geschlossen; Übermittlungen in die USA stützen
              sich auf das EU-US Data Privacy Framework. Über die Formulare übermittelte Nachrichten werden nicht in dieser
              Datenbank gespeichert.
            </p>

            <h3>Objektspeicher: Cloudflare R2 (Cloudflare, Inc.)</h3>
            <p>
              Bilder und andere Mediendateien dieser Website werden im
              Speicherdienst R2 der Cloudflare, Inc. (USA) gespeichert; der
              Speicher ist der EU-Datenregion zugeordnet. Die Dateien werden
              ausschließlich über unseren eigenen Server ausgeliefert. Beim
              Laden von Bildern wird Ihre IP-Adresse daher nicht an
              Cloudflare übermittelt. Wir haben mit Cloudflare einen
              Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO geschlossen.
              Soweit ein Zugriff aus den USA nicht ausgeschlossen werden
              kann, erfolgt dieser auf Grundlage der
              EU-Standardvertragsklauseln; Cloudflare ist zudem nach dem
              EU-US Data Privacy Framework zertifiziert. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO (Interesse an einer zuverlässigen
              Speicherung der Website-Inhalte).
            </p>

            <hr />

            <h2>4. Kontakt- und Interessensformular</h2>
            <p>
              Wenn Sie uns über das Kontaktformular oder über das
              Interessensformular auf der Seite „Weiterbildung" Anfragen
              zukommen lassen, verarbeiten wir Ihre Angaben — Name,
              E-Mail-Adresse und Nachrichtentext, beim Kontaktformular
              zusätzlich ein optionales Betreff-Feld, beim
              Interessensformular das gewünschte Thema und Format (die
              Nachricht ist dort optional) — zum Zwecke der Bearbeitung
              Ihrer Anfrage.
            </p>
            <p>
              Die Nachricht wird per E-Mail an unser Postfach
              info@novusfy.com übermittelt und dort gespeichert.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an der Beantwortung Ihrer Anfrage) bzw. Art. 6 Abs. 1
              lit. b DSGVO, sofern Ihre Anfrage auf den Abschluss eines
              Vertrags gerichtet ist. Die Daten werden gelöscht, sobald die
              Anfrage abschließend bearbeitet ist, spätestens nach 6 Monaten,
              sofern kein Vertrag zustande kommt und keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
            </p>

            <h3>E-Mail-Versand: Resend</h3>
            <p>
              Für den Versand der über die Formulare übermittelten Nachrichten nutzen wir den Dienst Resend (Resend, Inc., USA).
              Der Versand erfolgt über Server in der EU (Irland). Wir haben
              mit Resend einen Auftragsverarbeitungsvertrag gemäß Art. 28
              DSGVO geschlossen. Soweit Daten in die USA übermittelt werden,
              erfolgt dies auf Grundlage dieses Auftragsverarbeitungsvertrags
              und der EU-Standardvertragsklauseln; Resend ist zudem nach dem
              EU-US Data Privacy Framework zertifiziert.
            </p>

            <h3>E-Mail-Postfach</h3>
            <p>
              Unser E-Mail-Postfach wird bei der Verpex Limited, 87 North
              Road, Poole, Dorset BH14 0LT, Vereinigtes Königreich,
              betrieben; die Server befinden sich in Frankfurt am Main
              (Deutschland). Wir haben mit dem Anbieter einen
              Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO geschlossen.
              Für das Vereinigte Königreich besteht ein
              Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO).
            </p>

            <h3>Terminbuchung über Cal.com</h3>
            <p>
              Für die Buchung von Terminen verlinken wir auf den Dienst
              Cal.com (Cal.com, Inc., USA). Auf unserer Website werden keine
              Inhalte von Cal.com geladen; eine Verbindung entsteht erst,
              wenn Sie den Link anklicken. Bei der Buchung verarbeitet
              Cal.com in unserem Auftrag die von Ihnen eingegebenen Daten
              (z.&nbsp;B. Name, E-Mail-Adresse, Termin, Nachricht).
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
              (vorvertragliche Maßnahmen). Wir haben mit Cal.com einen
              Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO geschlossen.
              Die Daten werden auf Servern in den USA verarbeitet. Die
              Übermittlung erfolgt auf Grundlage der
              EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO), die
              Bestandteil des Auftragsverarbeitungsvertrags mit Cal.com sind. Die Daten werden
              gelöscht, sobald sie für die Durchführung des Termins nicht
              mehr erforderlich sind und keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
            </p>

            <hr />

            <h2>5. Google Maps</h2>
            <p>
              Auf unserer Kontaktseite verwenden wir den Kartendienst
              „Google Maps" des Anbieters Google Ireland Limited, Gordon
              House, Barrow Street, Dublin 4, Irland.
            </p>
            <p>
              Die Karte wird erst geladen, wenn Sie auf „Karte laden" klicken
              (Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1
              TDDDG). Erst dann wird eine Verbindung zu Servern von Google
              hergestellt und u.&nbsp;a. Ihre IP-Adresse übermittelt. Vor dem
              Klick werden keine Daten an Google übermittelt; der Platzhalter
              ist Bestandteil unserer Website. Ihre Einwilligung gilt nur für
              den aktuellen Seitenaufruf und wird nicht gespeichert; beim
              nächsten Besuch ist die Karte wieder blockiert. Google kann
              Daten in die USA übermitteln; Google LLC ist nach dem EU-US
              Data Privacy Framework zertifiziert. Die Links „Route planen"
              öffnen Google Maps erst nach Anklicken.
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

            <h2>6. Cookies</h2>
            <p>
              Diese Website setzt keine Cookies und speichert keine
              Informationen in Ihrem Browser (z.&nbsp;B. Local Storage oder
              Session Storage). Lediglich im passwortgeschützten
              Redaktionsbereich werden für angemeldete Mitarbeitende
              technisch notwendige Cookies gesetzt (§ 25 Abs. 2 Nr. 2
              TDDDG).
            </p>

            <hr />

            <h2>7. Ihre Rechte als betroffene Person</h2>
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
              <li>
                <strong>Recht auf Widerruf Ihrer Einwilligung</strong>{' '}
                (Art. 7 Abs. 3 DSGVO): Eine erteilte Einwilligung können Sie
                jederzeit mit Wirkung für die Zukunft widerrufen. Die
                Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung
                bleibt unberührt.
              </li>
            </ul>

            <div className="legal__box">
              <h3>Widerspruchsrecht gemäß Art. 21 DSGVO</h3>
              <p>
                Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1
                lit. f DSGVO erfolgt, haben Sie jederzeit das Recht, aus
                Gründen, die sich aus Ihrer besonderen Situation ergeben,
                gegen die Verarbeitung Ihrer personenbezogenen Daten
                Widerspruch einzulegen. Legen Sie Widerspruch ein,
                verarbeiten wir Ihre Daten nicht mehr, es sei denn, wir
                können zwingende schutzwürdige Gründe für die Verarbeitung
                nachweisen, die Ihre Interessen, Rechte und Freiheiten
                überwiegen, oder die Verarbeitung dient der Geltendmachung,
                Ausübung oder Verteidigung von Rechtsansprüchen. Den
                Widerspruch können Sie formlos an{' '}
                <a href="mailto:info@novusfy.com">info@novusfy.com</a>{' '}
                richten.
              </p>
            </div>

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

            <h2>8. SSL-/TLS-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
              Sie daran, dass die Adresszeile des Browsers von „http://" auf
              „https://" wechselt.
            </p>

            <hr />

            <h2>9. Automatisierte Entscheidungsfindung</h2>
            <p>
              Eine automatisierte Entscheidungsfindung einschließlich
              Profiling gemäß Art. 22 DSGVO findet nicht statt.
            </p>

            <p className="legal__stand">Stand: November 2026</p>
          </div>
        </div>
      </section>
    </>
  )
}
