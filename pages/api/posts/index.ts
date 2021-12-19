import { Client } from '@notionhq/client'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'
import { PostListItem, Tag } from '@/types/Post'

const databaseId = process.env.NOTION_DATABASE_ID
const key = process.env.NOTION_KEY

const notion = new Client({
  auth: key,
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end('Method not allowed')
    return
  }

  try {
    const database = await notion.databases.query({ database_id: databaseId ?? '' })
    return res.json(getPosts(database))
  } catch (error) {
    return res.status(500).json(error)
  }
}

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
