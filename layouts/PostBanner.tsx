import { ReactNode } from 'react'
import Image from '@/components/Image'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import Tag from '@/components/Tag'
import TagNotice from '@/components/TagNotice'
import siteMetadata from '@/data/siteMetadata'
import tagNotices from '@/data/tagNotices'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { formatDate } from 'pliny/utils/formatDate'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  contextPosts?: CoreContent<Blog>[]
  children: ReactNode
}

export default function PostBanner({
  content,
  authorDetails,
  contextPosts,
  children,
}: LayoutProps) {
  const { path, slug, date, title, tags, images, category } = content
  const backHref = category ? `/${category}` : '/'
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  return (
    <>
      <ScrollTopAndComment />
      <article>
        <div>
          <header className="relative flex h-80 flex-col justify-end overflow-hidden border-b-[1.2px] border-gray-200 dark:border-gray-700">
            <Image src={displayImage as string} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-white/75 dark:bg-black/60" />
            <div className="relative space-y-4 px-8 pb-10">
              {tags && (
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              )}
              <PageTitle>{title}</PageTitle>
              <div className="flex flex-wrap items-center gap-x-2 text-xs font-normal tracking-wide text-gray-500 dark:text-gray-400">
                {authorDetails.map((author, index) => (
                  <div className="flex items-center gap-x-2" key={author.name}>
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={24}
                        height={24}
                        alt="avatar"
                        className="h-6 w-6 rounded-full"
                      />
                    )}
                    <Link
                      href="/about"
                      className="hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      {author.name}
                    </Link>
                    {index < authorDetails.length - 1 && <span>·</span>}
                  </div>
                ))}
                <span>·</span>
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </time>
              </div>
            </div>
          </header>
          <div className="pb-8">
            <div className="prose dark:prose-invert max-w-none pt-14 pb-14">{children}</div>
            {tags && Object.keys(tagNotices).filter((t) => tags.includes(t)).length > 0 && (
              <div className="space-y-4 pb-10">
                {Object.keys(tagNotices)
                  .filter((t) => tags.includes(t))
                  .map((t) => (
                    <TagNotice key={t} tag={t} notice={tagNotices[t]} />
                  ))}
              </div>
            )}
            <footer className="border-t-[1.2px] border-gray-200 pt-6 text-sm font-medium dark:border-gray-700">
              <div className="mt-8 rounded-lg border border-gray-200 px-6 py-5 dark:border-gray-700">
                <h2 className="mb-3 text-base font-medium text-gray-800 dark:text-gray-200">
                  더 읽어보기
                </h2>
                {contextPosts && contextPosts.length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {contextPosts.map((post) => {
                      const isCurrent = post.slug === slug
                      return (
                        <li key={post.slug}>
                          {isCurrent ? (
                            <div className="flex items-start gap-2 py-3">
                              <span className="text-primary-500 shrink-0 text-sm">›</span>
                              <div className="flex flex-col gap-1">
                                <span className="text-primary-500 text-sm">{post.title}</span>
                                <div className="flex flex-wrap items-center gap-x-2 text-xs text-gray-400 dark:text-gray-500">
                                  <span>{formatDate(post.date, siteMetadata.locale)}</span>
                                  {post.tags?.map((tag) => (
                                    <span key={tag}>#{tag}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <Link href={`/${post.path}`} className="group flex items-start py-3">
                              <span className="shrink-0 text-sm text-transparent" />
                              <div className="flex flex-col gap-1">
                                <span className="group-hover:text-primary-500 dark:group-hover:text-primary-400 text-sm font-light text-gray-900 dark:text-gray-100">
                                  {post.title}
                                </span>
                                <div className="flex flex-wrap items-center gap-x-2 text-xs text-gray-400 dark:text-gray-500">
                                  <span>{formatDate(post.date, siteMetadata.locale)}</span>
                                  {post.tags?.map((tag) => (
                                    <span key={tag}>#{tag}</span>
                                  ))}
                                </div>
                              </div>
                            </Link>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="text-sm font-light text-gray-900 dark:text-gray-100">
                    No posts yet.
                  </p>
                )}
              </div>
              <div className="mt-8">
                <Link
                  href={backHref}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  aria-label="Back to posts"
                >
                  &larr; Back to posts
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}
