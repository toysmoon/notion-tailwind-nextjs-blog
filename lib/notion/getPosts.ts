import { PostListItem, Tag } from '@/types/Post'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { defaultHeader, NOTION_API_URL } from '.'

const databaseId: string = process.env.NOTION_DATABASE_ID ?? ''

export default function getPosts() {
  return fetch(`${NOTION_API_URL}/databases/${databaseId}/query`, {
    method: 'POST',
    headers: defaultHeader,
    body: JSON.stringify(allPostOptions),
  })
    .then((res) => res.json())
    .then(getPostsFromData)
}

function getPostsFromData(database: QueryDatabaseResponse): PostListItem[] {
  const posts = database.results as any[]

  return posts.map((page) => {
    const properties = getPlainProperties(page.properties)
    return {
      slug: page.id,
      date: page.created_time,
      title: properties.Name?.plain_text,
      summary: properties.summary?.plain_text ?? null,
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

const allPostOptions = {
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
}

// get tags() {
//   return this.allPosts
//     .then((posts) => posts.map((post) => post.tags))
//     .then((tags) => tags.reduce((pre, tag) => [...pre, ...tag], []))
//     .then(getTagsCount)
//     .then((tags) => tags.sort((a, b) => a.count - b.count))
// }

// function getTagsCount(tags: string[]) {
//   return tags.reduce<{ label: string; count: number }[]>((result, label) => {
//     const tag = result.find((t) => t.label === label)
//     if (!tag) {
//       return [...result, { label, count: 1 }]
//     }

//     tag.count++
//     return result
//   }, [])
// }
