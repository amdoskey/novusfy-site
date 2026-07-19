import type { Access } from 'payload'

/**
 * Public read for draft-enabled collections.
 *
 * Media uses a plain `read: () => true`, but that would expose unpublished
 * drafts once `versions.drafts` is on — so anonymous requests are narrowed to
 * published docs via a query constraint instead.
 */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true

  return {
    _status: { equals: 'published' },
  }
}

/** Matches Payload's default: any logged-in user. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)
