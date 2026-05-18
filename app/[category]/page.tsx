import { notFound } from 'next/navigation'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import categories, { categoryBySlug } from '@/data/categories'
import TextPostList from '@/components/TextPostList'
import PhotoTileGrid from '@/components/PhotoTileGrid'
import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'

export const generateStaticParams = async () => categories.map((c) => ({ category: c.slug }))

interface Props {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params
  const category = categoryBySlug(slug)
  if (!category) return {}
  return genPageMetadata({ title: category.title })
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params
  const category = categoryBySlug(slug)
  if (!category) notFound()

  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts).filter((p) => p.category === category.slug)

  return (
    <div className="space-y-16 pb-12">
      <section>
        <div className="flex items-baseline justify-between border-b-[1.2px] border-gray-200 pb-3 dark:border-gray-700">
          <h1 className="text-sm font-normal tracking-wide text-gray-900 dark:text-gray-100">
            {category.title}
          </h1>
        </div>
        <div className="pt-6">
          {category.type === 'photo' ? (
            <PhotoTileGrid posts={posts} />
          ) : (
            <TextPostList posts={posts} />
          )}
        </div>
      </section>
    </div>
  )
}
