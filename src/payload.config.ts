import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { CourseCategories } from './collections/CourseCategories'
import { Courses } from './collections/Courses'
import { Portfolio } from './collections/Portfolio'
import { Articles } from './collections/Articles'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, CourseCategories, Courses, Portfolio, Articles],
  // Keep in sync with routing.locales in src/i18n/routing.ts.
  localization: {
    locales: ['en', 'de', 'ar'],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    /**
     * Cloudflare R2 via the S3-compatible API.
     *
     * 🔴 REQUIRED, not an optimisation. `upload: true` alone writes to local
     * disk, which on Vercel is the read-only, ephemeral Lambda bundle at
     * /var/task — uploads fail and existing files 404/500. See §2 gotcha 13.
     *
     * `region: 'auto'` is R2's required literal, not an env var.
     *
     * Payload access control is left ON (no `disablePayloadAccessControl`), so
     * the bucket stays private and files serve through /api/media/file/... —
     * which keeps the existing `images.localPatterns` in next.config.ts valid.
     * Making the bucket public would change Media urls to absolute and require
     * `remotePatterns` instead.
     */
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        endpoint: process.env.R2_ENDPOINT || '',
        region: 'auto',
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
