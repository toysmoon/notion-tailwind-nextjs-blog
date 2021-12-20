import { PostListItem, Tag } from '@/types/Post'
import { Client } from '@notionhq/client'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

class Notion {
  client: Client

  private notionKey: string = process.env.NOTION_KEY ?? ''
  private databaseId: string = process.env.NOTION_DATABASE_ID ?? ''

  constructor() {
    this.client = new Client({
      auth: this.notionKey,
    })
  }

  get posts() {
    return this.client.databases.query({ database_id: this.databaseId }).then(getPosts)
  }
}

const notion = new Notion()
export default notion

function getPosts(database: QueryDatabaseResponse): PostListItem[] {
  const posts = database.results as any[]

  return posts.map((page) => {
    const properties = getPlainProperties(page.properties)

    return {
      slug: page.id,
      date: page.created_time,
      title: properties.Name.plain_text,
      summary: properties.summary.plain_text,
      tags: properties.tags.map((tag: Tag) => tag.name),
    }
  })
}

function getPlainProperties(properties: any) {
  const result: any = {}
  for (const key in properties) {
    const property = properties[key]
    const type = property.type
    result[key] = property[type].length === 1 ? property[type][0] : property[type]
  }

  return result
}
