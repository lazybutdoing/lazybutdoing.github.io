import Link from '@/components/Link'
import Image from '@/components/Image'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

interface Props {
  posts: CoreContent<Blog>[]
}

export default function PhotoTileGrid({ posts }: Props) {
  const withThumb = posts.filter((p) => p.thumbnail)
  if (withThumb.length === 0) {
    return <p className="text-sm font-light text-gray-500 dark:text-gray-400">No posts yet.</p>
  }
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
      {withThumb.map((post) => (
        <li key={post.path}>
          <Link
            href={`/${post.path}`}
            aria-label={post.title}
            className="group relative block aspect-square overflow-hidden rounded-sm bg-gray-100 dark:bg-gray-900"
          >
            <Image
              src={post.thumbnail as string}
              alt={post.title}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
