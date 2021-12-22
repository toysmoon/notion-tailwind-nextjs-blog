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
    return this.client.databases
      .query({
        database_id: this.databaseId,
        filter: {
          property: 'published',
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            timestamp: 'created_time',
            direction: 'descending',
          },
        ],
      })
      .then(getPosts)
  }

  get tags() {
    return this.posts
      .then((posts) => posts.map((post) => post.tags))
      .then((tags) => tags.reduce((pre, tag) => [...pre, ...tag], []))
      .then(getTagsCount)
      .then((tags) => tags.sort((a, b) => a.count - b.count))
  }

  public async getPage(slug: string) {
    const [page, blocks] = await Promise.all([
      this.client.blocks.retrieve({ block_id: slug }),
      this.client.blocks.children.list({ block_id: slug }),
    ])

    return { page, blocks }
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
      title: properties.Name?.plain_text,
      summary: properties.summary?.plain_text,
      tags: properties.tags.map((tag: Tag) => tag.name),
    }
  })
}

function getPlainProperties(properties: any) {
  const result: any = {}
  for (const key in properties) {
    const property = properties[key]
    const type = property.type
    if (type === 'multi_select') {
      result[key] = property[type] ?? []
    } else {
      result[key] = property[type][0]
    }
  }

  return result
}

function getTagsCount(tags: string[]) {
  return tags.reduce<{ label: string; count: number }[]>((result, label) => {
    const tag = result.find((t) => t.label === label)
    if (!tag) {
      return [...result, { label, count: 1 }]
    }

    tag.count++
    return result
  }, [])
}
