import type { CollectionConfig } from 'payload'

import { publishedOrAuthenticated } from '../access'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedDate', 'updatedAt'],
  },
  access: {
    read: publishedOrAuthenticated,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      // Freeform rather than a select, so new tags don't need a code change.
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Type to add. No deploy needed for new tags.',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'seo',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
      ],
    },
  ],
}
