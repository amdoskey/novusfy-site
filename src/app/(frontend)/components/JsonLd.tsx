import React from 'react'

/**
 * Server-rendered JSON-LD. A `type="application/ld+json"` script is a data
 * block, which React 19 renders without the "scripts are never executed"
 * error that rules out executable <script> tags here (§3 gotcha 15).
 * `<` is escaped so page copy can never close the script element.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
