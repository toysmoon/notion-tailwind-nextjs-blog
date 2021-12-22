import Link from '@/components/Link'
import PostList from '@/components/List/PostList'
import NewsletterForm from '@/components/NewsletterForm'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import getPosts from '@/lib/notion/getPosts'
import { NextPage } from 'next'
import { PostListItem } from 'types/Post'

const MAX_DISPLAY = 5

const Home: NextPage<{ posts: PostListItem[] }> = ({ posts = [] }) => {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
        </div>
        <PostList posts={posts.slice(0, MAX_DISPLAY)} />
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()
  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

export default Home
