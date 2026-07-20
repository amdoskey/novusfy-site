import Image from 'next/image'
import Link from 'next/link'

import type { Portfolio } from '@/payload-types'
import { mediaFrom } from '@/lib/portfolio'

type Props = {
  entry: Portfolio
  /** Extra bento modifiers, e.g. "tile--xl" or "tile--dark". */
  modifier?: string
  /** First result row is surfaced as the corner stat when present. */
  showStat?: boolean
}

export function WorkTile({ entry, modifier = '', showStat = true }: Props) {
  const cover = mediaFrom(entry.coverImage)
  const stat = showStat ? entry.results?.[0] : undefined

  return (
    <Link href={`/work/${entry.slug}`} className={`tile ${modifier}`.trim()}>
      {cover?.url ? (
        <Image
          src={cover.url}
          alt={cover.alt ?? entry.title}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className="tile__img"
        />
      ) : (
        <div className="tile__ph" />
      )}

      {stat ? (
        <div className="tile__stat">
          <b>{stat.value}</b>
          <small>{stat.label}</small>
        </div>
      ) : null}

      <div className="tile__cap">
        {entry.clientName ? <p className="label">{entry.clientName}</p> : null}
        <h4>{entry.title}</h4>
      </div>
    </Link>
  )
}
