import notion from '@/lib/api/notion'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end('Method not allowed')
    return
  }

  try {
    const slug = req.query.slug as string
    const post = await notion.getPage(slug)

    return res.json(post)
  } catch (error) {
    return res.status(500).json(error)
  }
}
