const BLOG_DOMAIN = process.env.NEXT_PUBLIC_BLOG_DOMAIN

export const URLS = {
  POSTS: getURL('posts'),
}

function getURL(url: string) {
  return `${BLOG_DOMAIN}/api/${url}`
}
