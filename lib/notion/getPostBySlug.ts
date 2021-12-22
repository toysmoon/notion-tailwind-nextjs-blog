import { defaultHeader, NOTION_API_URL } from '.'

export default function getPostBySlug(slug: string) {
  const post = fetch(
    `${NOTION_API_URL}/blocks/${slug}`,
    fetchOptions
  ).then((res) => res.json())

  const content = fetch(
    `${NOTION_API_URL}/blocks/${slug}/children?page_size=100`,
    fetchOptions
  ).then((res) => res.json())

  return Promise.all([post, content]).then(([post, content]) => ({
    post,
    content,
  }))
}

const fetchOptions = {
  headers: defaultHeader,
}
