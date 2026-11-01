/**
 * Client logo strip on the home page.
 *
 * To use a real logo, drop the SVG in public/clients/ and set `logo`, e.g.
 * `logo: '/clients/erbil-hills.svg'`. Entries without `logo` render as a muted
 * text wordmark. The strip becomes a scrolling marquee once there are
 * MARQUEE_MIN entries; below that it is a static centered row.
 */
export type Client = { name: string; logo?: string }

export const CLIENTS: Client[] = [
  { name: 'Erbil Hills' },
  { name: 'GAV TV' },
  { name: 'Korek Telecom' },
  { name: 'Aral Hope Medical Complex' },
]

export const MARQUEE_MIN = 6
