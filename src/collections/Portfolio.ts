import type { CollectionConfig } from 'payload'

import { publishedOrAuthenticated } from '../access'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'clientName', 'industry', 'featured', 'completedDate'],
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
      name: 'clientName',
      type: 'text',
    },
    {
      name: 'industry',
      type: 'text',
      admin: {
        description: 'Freeform for now — may become a select once the real spread is known.',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Bento-tile teaser copy.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Full case study body.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'servicesProvided',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Branding', value: 'branding' },
        { label: 'Web Development', value: 'web-development' },
        { label: 'AI & Automation', value: 'ai-automation' },
        { label: 'Digital Strategy', value: 'digital-strategy' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Software Development', value: 'software-development' },
      ],
    },
    {
      name: 'results',
      type: 'array',
      admin: {
        description: 'e.g. label "Qualified reach increase", value "+X%".',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          // Not localized — figures like "+312%" read the same in every locale.
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'externalLink',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'completedDate',
      type: 'date',
    },
  ],
}
