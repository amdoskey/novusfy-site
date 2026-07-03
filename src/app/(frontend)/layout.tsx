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
  title: 'Novusfy — Your Next Begins Now',
  description:
    'Novusfy helps businesses, startups, and ambitious professionals grow, launch, and reinvent through strategy, marketing, digital systems, and practical learning.',
  icons: {
    icon: '/icon-blue.png',
  },
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
