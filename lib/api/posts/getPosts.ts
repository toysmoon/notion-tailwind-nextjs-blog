import { PostListItem } from '@/types/Post'
import { URLS } from '..'

export default async function getPosts() {
  const data = await fetch(URLS.POSTS)
  const posts = (await data.json()) as PostListItem[]

  return posts
}
