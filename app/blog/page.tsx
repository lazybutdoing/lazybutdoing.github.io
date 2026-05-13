import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayout'

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  return <ListLayout posts={posts} />
}
