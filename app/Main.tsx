import Link from '@/components/Link'
import TextPostList from '@/components/TextPostList'
import PhotoTileGrid from '@/components/PhotoTileGrid'
import categories from '@/data/categories'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

const TEXT_PREVIEW = 3
const PHOTO_PREVIEW = 6

interface Props {
  posts: CoreContent<Blog>[]
}

export default function Home({ posts }: Props) {
  return (
    <div className="space-y-16 pb-12">
      {categories.map((category) => {
        const categoryPosts = posts.filter((p) => p.category === category.slug)
        const limit = category.type === 'photo' ? PHOTO_PREVIEW : TEXT_PREVIEW
        const preview = categoryPosts.slice(0, limit)
        const hasMore = categoryPosts.length > limit

        return (
          <section key={category.slug}>
            <div className="flex items-baseline justify-between border-b-[1.2px] border-gray-200 pb-3 dark:border-gray-700">
              <h2 className="text-sm font-normal tracking-wide text-gray-900 dark:text-gray-100">
                <Link
                  href={`/${category.slug}`}
                  className="hover:text-primary-500 dark:hover:text-primary-400"
                >
                  {category.title}
                </Link>
              </h2>
              {hasMore && (
                <Link
                  href={`/${category.slug}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-xs"
                  aria-label={`View all ${category.title} posts`}
                >
                  View all &rarr;
                </Link>
              )}
            </div>
            <div className="pt-6">
              {category.type === 'photo' ? (
                <PhotoTileGrid posts={preview} />
              ) : (
                <TextPostList posts={preview} />
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
