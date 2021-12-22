import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getNotionPage } from '@/lib/mdx'
import { notionContentToMDX } from '@/lib/notion-mdx'
import getPostBySlug from '@/lib/notion/getPostBySlug'
import getPosts from '@/lib/notion/getPosts'
import { NextPage } from 'next'

const Post: NextPage<any> = ({ notion }) => {
  const { frontMatter, toc, mdxSource } = notion
  return <div>1234</div>
  return (
    <MDXLayoutRenderer
      layout={'PostLayout'}
      toc={toc}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const { post, content } = await getPostBySlug(slug)
  const notion = await getNotionPage({
    slug,
    content: notionContentToMDX(content.results),
    title: post.child_page.title,
  })

  return {
    props: { post, notion, content },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const paths = await getPosts().then((posts) =>
    posts.map(({ slug }) => ({ params: { slug } }))
  )

  return {
    paths,
    fallback: false,
  }
}

export default Post
