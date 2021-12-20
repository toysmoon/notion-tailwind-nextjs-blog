const BLOG_DOMAIN = process.env.BLOG_DOMAIN ?? 'http://localhost:3000'

export const URLS = {
  POSTS: getURL('posts'),
}

function getURL(url: string) {
  return `${BLOG_DOMAIN}/api/${url}`
}
