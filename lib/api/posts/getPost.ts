import { URLS } from '..'

export default async function getPost(slug: string) {
  const data = await fetch(`${URLS.POSTS}/${slug}`)
  const post = await data.json()

  return post
}
