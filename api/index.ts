const isDevelopment = process.env.NODE_ENV === 'development'

export const URLS = {
  POSTS: getURL('posts'),
}

function getURL(url: string) {
  return isDevelopment ? `http://localhost:3000/api/${url}` : `https://sungjung.dev/api/${url}`
}
