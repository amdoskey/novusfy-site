import { createNavigation } from 'next-intl/navigation'

import { routing } from './routing'

/**
 * Locale-aware replacements for next/link and next/navigation.
 *
 * Use these for internal links so the `/de` prefix is applied automatically —
 * a raw next/link href="/about" would drop a German visitor back to English.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
