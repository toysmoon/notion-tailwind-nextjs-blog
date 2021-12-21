import getPost from '@/lib/api/posts/getPost'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Post: NextPage<any> = ({ post }) => {
  console.log(post)
  const router = useRouter()
  const slug = router.query.slug as string

  return <div>{slug}</div>
}

Post.getInitialProps = async (ctx) => {
  const slug = ctx.query.slug as string
  const post = await getPost(slug)
  return { post }
}

export default Post
