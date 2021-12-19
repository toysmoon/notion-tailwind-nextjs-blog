export type PostListItem = {
  slug: string
  date: string
  title: string
  summary: string
  tags: Array<string>
}

export type Tag = {
  id: string
  name: string
  color: string
}
