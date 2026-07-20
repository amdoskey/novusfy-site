import {
  RichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/**
 * Renders Portfolio.content using Payload's own Lexical -> JSX converters,
 * with headings mapped down a level (the page already owns the h1/h2) and
 * brand classNames attached.
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
})

export function CaseStudyBody({ data }: { data: SerializedEditorState }) {
  return (
    <div className="prose">
      <RichText data={data} converters={converters} />
    </div>
  )
}
