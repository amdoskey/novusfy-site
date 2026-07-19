import type { CollectionConfig } from 'payload'

import { publishedOrAuthenticated } from '../access'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'accessType', 'featured', 'updatedAt'],
  },
  access: {
    read: publishedOrAuthenticated,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // `admin.condition` only hides price in the UI — clear it for real so a
        // stale value can't survive a paid → free switch and reach Stripe later.
        if (data?.accessType === 'free') {
          data.price = null
        }
        return data
      },
    ],
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
      name: 'category',
      type: 'relationship',
      relationTo: 'course-categories',
      hasMany: false,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short teaser used on course cards.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Full pack description.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'accessType',
      type: 'select',
      required: true,
      options: [
        { label: 'Free', value: 'free' },
        { label: 'Paid', value: 'paid' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        condition: (data) => data?.accessType === 'paid',
      },
    },
    {
      name: 'downloadFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Gated behind Stripe purchase later — no access logic yet.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Include in homepage / Learning Hub previews.',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Manual sort control.',
      },
    },
  ],
}
