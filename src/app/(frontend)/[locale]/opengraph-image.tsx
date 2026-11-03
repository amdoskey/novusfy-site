import { ogImageMetadata, renderOgImage } from '@/lib/og'

// Share image for this page — rendered by the shared card in src/lib/og.tsx.
type Props = { params: Promise<{ locale: string }> }

export async function generateImageMetadata({ params }: Props) {
  return ogImageMetadata(params, 'home')
}

export default async function Image({ params }: Props) {
  return renderOgImage(params, 'home')
}
