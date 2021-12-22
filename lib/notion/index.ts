export const NOTION_API_URL = `https://api.notion.com/v1`

const notionKey: string = process.env.NOTION_KEY ?? ''
export const defaultHeader = {
  Authorization: `Bearer ${notionKey}`,
  'Notion-Version': '2021-08-16',
  'Content-Type': 'application/json',
}
