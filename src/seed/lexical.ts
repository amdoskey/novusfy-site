/**
 * Minimal Markdown -> Lexical converter for the portfolio seed.
 *
 * Deliberately handles only the subset used by assets/content/portfolio-seed-data.md:
 *   **Bold line**   -> h3 heading
 *   *Italic line*   -> h4 heading
 *   - item          -> bullet list
 *   > quote         -> blockquote (consecutive lines joined with linebreaks)
 *   anything else   -> paragraph, with inline **bold** preserved
 *
 * One-off seeding utility — not a general-purpose Markdown parser.
 */

type Node = { [k: string]: unknown; type: string; version: number }

export type LexicalRoot = {
  [k: string]: unknown
  root: {
    type: string
    children: Node[]
    direction: 'ltr' | 'rtl' | null
    format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
    indent: number
    version: number
  }
}

const IS_BOLD = 1

const textNode = (text: string, format = 0): Node => ({
  type: 'text',
  text,
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  version: 1,
})

const lineBreak = (): Node => ({ type: 'linebreak', version: 1 })

const block = (type: string, children: Node[], extra: Record<string, unknown> = {}): Node => ({
  type,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  ...extra,
})

/** Splits a line on **bold** spans, emitting formatted text nodes. */
function inlineNodes(raw: string): Node[] {
  const nodes: Node[] = []
  const pattern = /\*\*(.+?)\*\*/g
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(raw)) !== null) {
    if (match.index > cursor) nodes.push(textNode(raw.slice(cursor, match.index)))
    nodes.push(textNode(match[1], IS_BOLD))
    cursor = match.index + match[0].length
  }
  if (cursor < raw.length) nodes.push(textNode(raw.slice(cursor)))

  return nodes.length > 0 ? nodes : [textNode('')]
}

export function markdownToLexical(markdown: string): LexicalRoot {
  const lines = markdown.trim().split('\n')
  const children: Node[] = []

  let listBuffer: string[] = []
  let quoteBuffer: string[] = []

  const flushList = () => {
    if (listBuffer.length === 0) return
    const items = listBuffer.map((item, i) =>
      block('listitem', inlineNodes(item), { value: i + 1 }),
    )
    children.push(block('list', items, { listType: 'bullet', tag: 'ul', start: 1 }))
    listBuffer = []
  }

  const flushQuote = () => {
    if (quoteBuffer.length === 0) return
    const inner: Node[] = []
    quoteBuffer.forEach((line, i) => {
      if (i > 0) inner.push(lineBreak())
      inner.push(...inlineNodes(line))
    })
    children.push(block('quote', inner))
    quoteBuffer = []
  }

  const flushAll = () => {
    flushList()
    flushQuote()
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line === '') {
      flushAll()
      continue
    }

    if (line.startsWith('- ')) {
      flushQuote()
      listBuffer.push(line.slice(2).trim())
      continue
    }

    if (line.startsWith('> ')) {
      flushList()
      quoteBuffer.push(line.slice(2).trim())
      continue
    }

    flushAll()

    // A whole line wrapped in ** ** is a section heading, not a bold paragraph.
    const boldHeading = line.match(/^\*\*(.+)\*\*$/)
    if (boldHeading) {
      children.push(block('heading', [textNode(boldHeading[1])], { tag: 'h3' }))
      continue
    }

    // A whole line wrapped in single * * is a sub-heading.
    const italicHeading = line.match(/^\*([^*].*)\*$/)
    if (italicHeading) {
      children.push(block('heading', [textNode(italicHeading[1])], { tag: 'h4' }))
      continue
    }

    children.push(block('paragraph', inlineNodes(line), { textFormat: 0, textStyle: '' }))
  }

  flushAll()

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
