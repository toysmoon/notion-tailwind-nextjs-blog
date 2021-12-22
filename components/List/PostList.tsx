import { PostListItem } from 'types/Post'
import PostItem from './PostItem'

export default function PostList({ posts }: { posts: PostListItem[] }) {
  const listClassName = 'divide-y divide-gray-200 dark:divide-gray-700'

  if (!posts.length) {
    return (
      <ul className={listClassName}>{!posts.length && 'No posts found.'}</ul>
    )
  }

  return (
    <ul className={listClassName}>
      {!posts.length && 'No posts found.'}
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  )
}
