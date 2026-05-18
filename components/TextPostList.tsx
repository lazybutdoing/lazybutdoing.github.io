import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

interface Props {
  posts: CoreContent<Blog>[]
}

export default function TextPostList({ posts }: Props) {
  if (posts.length === 0) {
    return <p className="text-sm font-light text-gray-500 dark:text-gray-400">No posts yet.</p>
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {posts.map((post) => {
        const { path, date, title, summary } = post
        return (
          <li key={path} className="py-8">
            <article className="space-y-2">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-xs leading-6 font-normal tracking-wide text-gray-500 dark:text-gray-400">
                  <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                </dd>
              </dl>
              <div className="space-y-3">
                <h3 className="text-base leading-7 font-normal tracking-normal">
                  <Link
                    href={`/${path}`}
                    className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </Link>
                </h3>
                {summary && (
                  <p className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</p>
                )}
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
