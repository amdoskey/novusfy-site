import React from 'react'

import BodyAttributes from './components/BodyAttributes'
import Footer from './components/Footer'
import Interactions from './components/Interactions'
import Nav from './components/Nav'
import { ROUTE_THEME } from './components/routeTheme'
import ScrollReveal from './components/ScrollReveal'
import { jakarta, jetbrainsMono, nexa } from './fonts'
import './styles.css'

// Runs during HTML parsing, before the nav paints, so body[data-hero]/[data-page]
// are already correct on first frame — no flash of the wrong nav theme. Kept in
// sync with BodyAttributes via the shared ROUTE_THEME map.
const bodyThemeScript = `(function(){try{var m=${JSON.stringify(
  ROUTE_THEME,
)};var c=m[location.pathname];if(c){document.body.setAttribute('data-page',c.page);if(c.hero)document.body.setAttribute('data-hero',c.hero);}}catch(e){}})();`

export const metadata = {
  metadataBase: new URL('https://novusfy.com'),
  title: 'Novusfy — Your Next Begins Now',
  description:
    'Novusfy helps businesses, startups, and ambitious professionals grow, launch, and reinvent through strategy, marketing, digital systems, and practical learning.',
  openGraph: {
    title: 'Novusfy — Your Next Begins Now',
    description:
      'Strategy, marketing, digital systems, and practical learning — one partner for your next move.',
    url: 'https://novusfy.com',
    siteName: 'Novusfy',
    // Placeholder slot — drop the final artwork in public/og-image.png (1200x630).
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Novusfy — Your Next Begins Now' }],
  },
  icons: {
    icon: '/icon-blue.png',
    apple: '/icon-blue.png',
  },
}

export const viewport = {
  themeColor: '#0A0A0F', // midnight, globally — matches the brand's dark sections
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="en"
      className={`scroll-smooth ${nexa.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: bodyThemeScript }} />
        <BodyAttributes />
        <Nav />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
        <Interactions />
      </body>
    </html>
  )
}
