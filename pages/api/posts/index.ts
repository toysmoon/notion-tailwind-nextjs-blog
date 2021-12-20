import notion from '@/api/notion'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end('Method not allowed')
    return
  }

  try {
    const posts = await notion.posts
    return res.json(posts)
  } catch (error) {
    return res.status(500).json(error)
  }
}
