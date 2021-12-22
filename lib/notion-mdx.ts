export function notionContentToMDX(content: any[]) {
  return content.map((block) => getMDXFromBlock(block)).join('\n')
}

enum BLOCK_TYPE {
  HEADING_1 = 'heading_1',
  HEADING_2 = 'heading_2',
  HEADING_3 = 'heading_3',
  PARAGRAPH = 'paragraph',
}

type Block = any

function getMDXFromBlock(block: Block) {
  const { type } = block
  const text = block[type].text[0]?.plain_text ?? null

  if (text === null) {
    return '\n'
  }

  switch (type) {
    case BLOCK_TYPE.HEADING_1:
      return `# ${text}`
    case BLOCK_TYPE.HEADING_2:
      return `## ${text}`
    case BLOCK_TYPE.HEADING_3:
      return `### ${text}`
    case BLOCK_TYPE.PARAGRAPH:
      return `${text}`
    default:
      return ''
  }
}
