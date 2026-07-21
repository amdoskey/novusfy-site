/**
 * German translations for the 5 seeded Portfolio case studies.
 *
 * First-pass translation (July 21, 2026) — formal "Sie" register, pending
 * review by a native speaker. Keyed by slug; `slug` itself is not localized.
 *
 * `content` keeps the same Markdown structure as portfolio-data.ts so it runs
 * through the existing markdownToLexical converter unchanged.
 *
 * `results[].value` is deliberately absent here — that field is not localized
 * (figures read the same in every locale); only `label` is translated.
 */

export type SeedEntryDe = {
  slug: string
  title: string
  summary: string
  content: string
  /** In source order — matched positionally against the existing rows. */
  resultLabels?: string[]
}

export const portfolioEntriesDe: SeedEntryDe[] = [
  {
    slug: 'erbil-hills',
    title: 'Erbil Hills',
    summary:
      'Eine ganzheitliche Marken- und Marketingpartnerschaft, die Erbil Hills als erstklassige Wohndestination positioniert hat — Immobilienmerkmale wurden zu Lifestyle-Wert, Interesse zu qualifizierter Käufernachfrage.',
    content: `**Herausforderung**

Erbil Hills stand vor folgenden Aufgaben:
- Positionierung als erstklassige Wohndestination in einem umkämpften Immobilienmarkt
- Steigerung von Markenbekanntheit und Glaubwürdigkeit bei Käufern und Investoren
- Generierung qualifizierter Leads und Anfragen
- Klare Vermittlung des Lifestyle-Werts, nicht nur der Objektmerkmale

**Unsere Rolle & Strategie**

Als Marketingagentur agierten wir als strategischer Partner, nicht als reiner Dienstleister.

*Markenpositionierung & Botschaft*
- Entwicklung einer klaren Markenerzählung mit Fokus auf Lifestyle, Gemeinschaft und langfristigen Wert
- Schärfung der Botschaft für Endnutzer und Investoren
- Konsistente Tonalität und visuelle Ausrichtung über alle Kanäle hinweg

*Entwicklung der Marketingstrategie*
- Konzeption einer Full-Funnel-Marketingstrategie (Aufmerksamkeit → Erwägung → Conversion)
- Identifikation der Kernzielgruppen: Familien, Professionals und Investoren
- Planung phasenweiser Kampagnen entlang der Projektmeilensteine

*Digitale Präsenz & Content*
- Entwicklung wirkungsstarker Marketinginhalte (Visuals, Texte, Layouts)
- Erstellung von Kampagneninhalten zu Masterplan- und Standortvorteilen, Lifestyle-Bildwelten sowie Vertrauen, Qualität und Wertentwicklung
- Optimierung der Inhalte für Social Media und digitale Werbung

*Performance-Marketing & Leadgenerierung*
- Planung und Steuerung digitaler Werbekampagnen
- Optimierung von Targeting, Creatives und Botschaften zur Gewinnung kaufbereiter Leads
- Fokus auf kosteneffiziente Leadgenerierung statt auf Vanity-Metriken

*Optimierung der Customer Journey*
- Strukturierung der Kommunikation vom Erstkontakt bis zur Anfrage
- Mehr Klarheit und Einfachheit in der Darstellung des Projekts gegenüber Interessenten
- Unterstützung des Vertriebs durch Abstimmung von Marketingbotschaft und Verkaufsgesprächen

**Ergebnisse & Erfolge**
- Starke Markenpräsenz im Immobilienmarkt von Erbil
- Mehr qualifizierte Anfragen und höheres Käuferinteresse
- Klare Differenzierung von Erbil Hills als erstklassige Lifestyle-Entwicklung
- Ein stimmiges, professionelles Marketingsystem, das das Vertriebswachstum getragen hat

**Zentrale Wirkung**
> Wir haben nicht einfach Immobilien vermarktet — wir haben ein Markenerlebnis geschaffen, das Erbil Hills sichtbar gemacht, Vertrauen aufgebaut und Interesse in echte Nachfrage verwandelt hat.`,
  },

  {
    slug: 'gav-tv',
    title: 'GAV TV — Digitale Transformation für ein Nachrichtenmedium',
    summary:
      'Ein vollständiger Plattform-Neubau auf Drupal Thunder, der die Ladezeiten um 87 % senkte, den organischen Traffic verdreifachte und einem nicht-technischen Redaktionsteam das Tempo gab, bei Eilmeldungen mitzuhalten.',
    content: `**Die Herausforderung**

GAV TV, eine führende Nachrichtenplattform in der Region Kurdistan, kämpfte mit gravierenden Problemen der digitalen Infrastruktur, die Reichweite und Wirkung begrenzten. Benötigt wurde eine Website, die hohen gleichzeitigen Traffic bei Eilmeldungen verkraftet, schnelles Publizieren ermöglicht, nicht-technische Redaktionsteams befähigt, starkes SEO und kurze Ladezeiten bietet — und mitwachsen kann. Die bestehende Seite war langsam, schwer zu pflegen, schlecht optimiert und Traffic-Spitzen nicht gewachsen. Das beeinträchtigte die Wettbewerbsfähigkeit gegenüber anderen regionalen Nachrichtenplattformen unmittelbar.

**Unser Ansatz**

Wir führten ein umfassendes Digital-Audit durch und entwickelten daraus eine maßgeschneiderte, datenbasierte Lösung.

*Strategische Plattformwahl*

Nach Evaluierung mehrerer CMS-Optionen entschieden wir uns für Drupal Thunder — eine Distribution, die speziell für professionelles Publishing entwickelt wurde und Performance, Skalierbarkeit und redaktionelle Flexibilität ausbalanciert.

*Individuelle Website-Entwicklung*
- Aufbau einer leichtgewichtigen, modularen Seitenstruktur mit Fokus auf Geschwindigkeit
- Responsives Design für Desktop, Tablet und Mobilgeräte
- Integration von Multimedia für Video, Fotogalerien und Livestreaming
- Eigene Inhaltstypen für Artikel, Eilmeldungen, Kommentare und multimediale Beiträge
- Automatisierte Publishing-Workflows mit redaktionellen Freigabeketten

*Performance-Optimierung*
- Fortgeschrittenes Caching (Redis, Varnish) für schnelle Ladezeiten
- Optimierung von Datenbankabfragen und Content-Auslieferung
- CDN-Konfiguration für globale Content-Distribution
- Komprimierung und Optimierung aller Bilder und Medien
- Minifizierung von CSS/JS und Lazy Loading

*Umfassende SEO-Strategie*
- Keyword-Recherche speziell für irakische und kurdische Nachrichtenthemen
- Implementierung strukturierter Daten (Schema.org)
- Optimierung von Meta-Titeln, Beschreibungen und URL-Strukturen
- Erstellung von XML-Sitemaps und Optimierung der robots.txt
- AMP-Implementierung für mobile Suchperformance
- Aufbau einer internen Verlinkungsarchitektur zur Stärkung der Seitenautorität

*Benutzerfreundliche Redaktionsoberfläche*
- Intuitives Redaktions-Dashboard für nicht-technische Mitarbeitende
- Drag-and-drop-Editoren für Inhalte
- Rollenbasierte Rechte für Reporter, Redakteure und Administratoren
- Schulungen, Dokumentation, automatisierte Backups und Versionierung

*Analytics & Monitoring*
- Integration von Google Analytics 4 mit eigenem Event-Tracking
- Echtzeit-Performance-Monitoring mit automatisierten Alerts
- Individuelle Dashboards für redaktionelle Leistungskennzahlen

**Redaktionelle Effizienz**
- Publikationszeit um 75 % reduziert (von 20 auf 5 Minuten pro Artikel)
- Das Redaktionsteam veröffentlicht mit gleicher Personalstärke dreimal so viele Inhalte
- Nach der Schulung keinerlei technische Support-Tickets zum Content-Management

**Geschäftlicher Effekt**
- Gestärkte Marktposition als führende digitale Nachrichtenquelle
- Höheres Werbeumsatzpotenzial durch mehr Traffic und Engagement
- Verbesserte Markenreputation durch bessere Nutzererfahrung und Sichtbarkeit in der Suche
- Zukunftssichere Infrastruktur, die mit dem Wachstum der Organisation skaliert

**Fazit**

Dieses Projekt zeigt unsere Expertise in effizienten, skalierbaren Digitallösungen für Medienplattformen in umkämpften, schnelllebigen Umfeldern. Durch die Kombination der spezialisierten Fähigkeiten von Drupal Thunder mit umfassender SEO- und Performance-Optimierung haben wir eine Lösung geliefert, die den unmittelbaren Bedarf von GAV TV deckt und das Unternehmen für nachhaltiges digitales Wachstum aufstellt.

**Kundenstimme**
> „Novusfy hat uns nicht einfach eine Website gebaut — sie haben unseren gesamten digitalen Betrieb transformiert. Die neue Plattform ist unglaublich schnell, unser Redaktionsteam liebt es, wie einfach das Publizieren geworden ist, und wir sehen Rekordwerte beim Traffic. Allein die SEO-Verbesserungen haben die Investition gerechtfertigt. Genau diesen Partner haben wir gebraucht."
> — Obeid Rashavei, damaliger Chefredakteur, GAV TV`,
    resultLabels: [
      'Reduzierung der Ladezeit',
      'Verfügbarkeit bei Traffic-Spitzen',
      'Kapazität gleichzeitiger Nutzer',
      'Mobile PageSpeed-Score',
      'Organischer Suchtraffic (6 Monate)',
      'Absprungrate',
    ],
  },

  {
    slug: 'korek-telecom',
    title: 'Korek Telecom',
    summary:
      'Als strategischer Digitalpartner haben wir Koreks Omnichannel-Roadmap, die Anbieterauswahl und die Umsetzungssteuerung verantwortet — und eine komplexe globale Technologieentscheidung in einen geordneten, vom Vorstand freigegebenen Rollout überführt.',
    content: `**Herausforderung**

Korek musste seine digitalen Plattformen (Website, Mobile App, digitale Touchpoints) modernisieren und vereinheitlichen, eine klare, an den Geschäftszielen ausgerichtete Omnichannel-Strategie etablieren, die richtigen globalen Technologiepartner für langfristige Skalierbarkeit auswählen und während der Umsetzung Transparenz, Steuerbarkeit und Risikominimierung auf Vorstandsebene sicherstellen.

**Unsere Rolle**

Wir agierten als strategischer Digitalpartner — sowohl auf Management- als auch auf Umsetzungsebene — und schlugen die Brücke zwischen Geschäftszielen und technischer Lieferung.

**Was wir getan haben**

*Digitales Plattformmanagement*
- Übernahme der End-to-End-Verantwortung für das digitale Plattformmanagement
- Ausrichtung digitaler Initiativen an Koreks kommerziellen, servicebezogenen und markenbezogenen Zielen
- Definition von Governance-Struktur, Rollen und Verantwortlichkeiten

*Omnichannel-Strategie & Planung*
- Entwicklung einer neuen Omnichannel-Vision und Roadmap
- Konzeption des Zusammenspiels von Website, Mobile App, CRM, Kundenservice und Marketingkanälen
- Definition der Customer Journeys über alle Touchpoints hinweg für Konsistenz und Effizienz

*Dokumentation für Website & Mobile App*
- Erstellung vollständiger Dokumentationspakete für die neue Website und die mobile Anwendung: funktionale Anforderungen, User Journeys und Flows, Inhaltsstruktur, technische Anforderungen, UX/UI-Richtlinien
- Sicherstellung, dass die Dokumente vergabereif und umsetzungssicher waren

*Recherche & Auswahl globaler Dienstleister*
- Weltweite Recherche zur Identifikation führender Digital- und Technologiedienstleister
- Bewertung der Anbieter nach technischen Fähigkeiten, Telekommunikationserfahrung, Skalierbarkeit, Sicherheit und Compliance sowie Kosten-Nutzen-Verhältnis

*Anbieterinterviews & Evaluation*
- Einzelgespräche mit den Anbietern der engeren Auswahl
- Bewertung der Angebote anhand eines strukturierten Scoring-Frameworks (Umfang und Methodik, Zeitplan und Liefermodell, Teamstruktur, kommerzielle Konditionen)
- Risikominimierung durch Due Diligence und klares Benchmarking

*Vorstandsreporting & Entscheidungsgrundlagen*
- Erstellung klarer, strukturierter Berichte für die Geschäftsleitung: Stärken und Schwächen jedes Anbieters, vergleichendes Scoring, strategische Empfehlungen
- Befähigung der Führungsebene zu sicheren, datenbasierten Entscheidungen

*Umsetzungssteuerung & Aufsicht*
- Steuerung und Überwachung der gesamten Umsetzungsphase
- Zentrale Koordinationsstelle zwischen den internen Teams von Korek und den ausgewählten Dienstleistern
- Sicherstellung von Scope-Treue, Qualitätskontrolle, Termindisziplin und Strategiekonformität

**Ergebnisse & Erfolge**
- Eine klare, auf Vorstandsebene freigegebene Omnichannel-Roadmap
- Erfolgreiche Auswahl des passenden globalen Dienstleisters
- Reduziertes Lieferrisiko durch starke Governance und Dokumentation
- Reibungslose Umsetzung dank kontinuierlicher Aufsicht und Qualitätssicherung
- Weiterentwicklung von Koreks digitalen Plattformen hin zu skalierbaren, kundenzentrierten Ökosystemen

**Zentrale Wirkung**
> Wir haben Komplexität in Klarheit übersetzt — und Korek befähigt, sein digitales Ökosystem mit Strategie, Struktur und belastbarer Umsetzungssteuerung selbstbewusst zu modernisieren.`,
  },

  {
    slug: 'ddtaj',
    title: 'DDTAJ — Eine Agentur von Grund auf aufgebaut',
    summary:
      'Kein Kundenprojekt — ein Unternehmen von null. Novusfy hat DDTAJ gegründet, gebrandet, mit Personal besetzt und systematisiert: heute eine voll funktionsfähige Agentur im Influencer-Marketing und in der Eventorganisation.',
    content: `**Herausforderung**

Statt ein Projekt für ein bestehendes Unternehmen zu liefern, begann dieses Mandat bei null: kein Unternehmen, keine Marke, kein Team, keine Systeme. Ziel war es, eine vollständig arbeitsfähige Agentur für Marketing und digitale Transformation von Grund auf aufzubauen — fähig, echte Kunden zu betreuen und eigenständig zu liefern.

**Unsere Rolle**

In den ersten sechs Monaten agierte Novusfy als Startup- und Geschäftsentwicklungsberatung für das, was später DDTAJ werden sollte — vom Konzept bis zur lieferfähigen Agentur.

**Was wir getan haben**

*Unternehmensgründung & Geschäftsentwicklung*
- Startup- und Geschäftsentwicklungsberatung über die ersten sechs Monate, inklusive Strukturierung des Unternehmens bis zur eigenständigen Lieferfähigkeit

*Markenidentität*
- Entwicklung des Namens DDTAJ, des Logos und der vollständigen Corporate Identity (Farbsystem, Typografie, Markenrichtlinien)
- Positionierung von DDTAJ auf einem klaren Wertversprechen: datengetriebene Marketingexzellenz und digitale Transformation

*Teamaufbau*
- Rekrutierung und Einstellung des Gründungsteams von DDTAJ, darunter vier zentrale Agenturrollen als spezialisiertes Kernteam

*Kernsysteme*
- Aufbau der DDTAJ-Website
- Einführung eines ERP-Systems für den internen Betrieb
- Einrichtung eines Kommunikationssystems für interne und kundenseitige Abläufe

*Konzeption der Leistungsbereiche*
- Strukturierung des vollständigen Leistungsangebots von DDTAJ: Research & Strategie, Kreation & Branding, Digitalmarketing, Social-Media-Management, Webentwicklung, KI-Automatisierung, Events & Aktivierungen sowie Influencer-Agentur

**Ergebnisse & Erfolge**
- DDTAJ startete als vollständig eigenständige, arbeitsfähige Agentur mit eigenem Team, eigenen Systemen und eigenem Kundenstamm
- Heute vor allem im Influencer-Marketing und in der Konferenz- und Eventorganisation aktiv
- Agiert unter eigener Marke auf ddtaj.com mit Sitz in Duhok

**Zentrale Wirkung**
> Wir haben nicht nur einen Marketingplan beraten — wir haben das Unternehmen selbst gebaut: die Marke, das Team und die Systeme, mit denen es eigenständig arbeitet.`,
  },

  {
    slug: 'aral-hope-medical-complex',
    title: 'Aral Hope Medical Complex (inkl. Lunava Pharmacy)',
    summary:
      'Ein vollständiger Markenlaunch mit fortlaufender digitaler Aktivierung, der Aral Hope Medical Complex und Lunava Pharmacy im Markt Duhok eingeführt hat — mit Vertrauen und Bekanntheit vom ersten Tag an.',
    content: `**Herausforderung**

Aral Hope Medical Complex startete als neue Gesundheitsdestination und musste die Marke klar und professionell im Markt Duhok einführen, vom ersten Tag an Vertrauen und Glaubwürdigkeit aufbauen, starke Sichtbarkeit über digitale Kanäle sicherstellen und eine konsistente, hochwertige Kommunikation für den Medizinkomplex und die Lunava Pharmacy gleichermaßen gewährleisten.

**Unsere Rolle**

Wir agierten als Marken- und Digitalmarketingpartner und verantworteten Launch, Aktivierung und die fortlaufende Markenkommunikation.

**Was wir getan haben**

*Markenlaunch & Branding*
- Verantwortung für den vollständigen Markenlaunch des Aral Hope Medical Complex
- Entwicklung einer Markenbotschaft mit Fokus auf Professionalität, Fürsorge und Vertrauen, Zugänglichkeit und moderne Medizin
- Abstimmung von Medizinkomplex und Lunava Pharmacy zu einem stimmigen Markenökosystem

*Digitale Aktivierung & Marktbekanntheit*
- Umsetzung einer digitalen Aktivierungsstrategie zur Einführung des Komplexes bei der Zielgruppe in Duhok
- Start zielgerichteter Awareness-Kampagnen und Veröffentlichung konsistenter, informativer und vertrauensbildender Inhalte
- Positionierung von Aral Hope als anerkannte medizinische Adresse in Duhok — nicht als bloße Neueröffnung

*Lokale Marktdurchdringung (Bekanntheit in Duhok)*
- Konzeption von Kampagnen mit Fokus auf Standortbekanntheit, Leistungen und Fachrichtungen sowie gemeinschaftsnahe Botschaften
- Aufbau von Vertrautheit und Wiedererkennung in kurzer Zeit nach dem Launch

*Social-Media-Management*
- Vollständige Verantwortung für das Social-Media-Management: Contentkalender, visuelle Ausrichtung, Text und Botschaft
- Balance zwischen medizinischer Professionalität und nahbarer, menschlicher Kommunikation

*Tägliche Markenkommunikation & Marketing*
- Steuerung der täglichen Markenkommunikation über alle digitalen Kanäle
- Sicherstellung einer konsistenten Markenstimme, zeitnaher Reaktionen und Updates sowie der Konformität mit medizinethischen Standards
- Unterstützung laufender Marketinginitiativen und Leistungsangebote

**Ergebnisse & Erfolge**
- Erfolgreicher Markenlaunch mit starker anfänglicher Bekanntheit
- Schnelle Wiedererkennung des Aral Hope Medical Complex in Duhok
- Klare, konsistente Markenpräsenz für den Medizinkomplex und die Lunava Pharmacy
- Nachhaltiges Engagement durch strukturierte Social-Media-Arbeit und tägliche Kommunikation
- Eine vertrauenswürdige, professionelle Gesundheitsmarke, von Grund auf aufgebaut

**Zentrale Wirkung**
> Wir haben nicht nur einen Medizinkomplex eröffnet — wir haben Bekanntheit, Vertrauen und eine kontinuierliche Kommunikation aufgebaut, die Aral Hope als verlässliche Gesundheitsadresse in Duhok etabliert haben.`,
  },
]
