'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

const POSTS_PER_PAGE = 5

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
}

export default function ListLayout({ posts }: ListLayoutProps) {
  const pathname = usePathname()
  const [displayCount, setDisplayCount] = useState(POSTS_PER_PAGE)
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const currentTag = pathname.startsWith('/tags/')
    ? decodeURIComponent(pathname.replace('/tags/', '').split('/')[0])
    : null

  const displayPosts = posts.slice(0, displayCount)
  const hasMore = displayCount < posts.length

  return (
    <>
      <div>
        <div className="space-y-2 pt-6 pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            모든 글
          </h1>
        </div>
        {posts.length === 0 ? (
          <div className="border-t-[1.2px] border-gray-200 pt-8 dark:border-gray-700">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              아직 글이 없습니다.
            </p>
          </div>
        ) : (
          <div className="flex border-t-[1.2px] border-gray-200 sm:space-x-24 dark:border-gray-700">
            <div className="hidden max-w-[220px] min-w-[220px] self-stretch border-r-[1.2px] border-gray-200 sm:block dark:border-gray-700">
              <div className="sticky top-0 max-h-screen overflow-auto px-6 pt-5 pb-4">
                <ul className="mt-1">
                  {sortedTags.map((t) => {
                    return (
                      <li key={t} className="my-5">
                        {currentTag === t ? (
                          <Link
                            href="/blog"
                            className="group text-base font-medium uppercase"
                            aria-label={`${t} 태그 선택 취소`}
                          >
                            <span className="text-primary-500">› {t}</span>
                            <span className="text-gray-400 dark:text-gray-500">{` (${tagCounts[t]})`}</span>
                          </Link>
                        ) : (
                          <Link
                            href={`/tags/${slug(t)}`}
                            className="group text-base font-medium uppercase"
                            aria-label={`View posts tagged ${t}`}
                          >
                            <span className="text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                              {t}
                            </span>
                            <span className="text-gray-400 dark:text-gray-500">{` (${tagCounts[t]})`}</span>
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className="pt-5">
              <ul>
                {displayPosts.map((post) => {
                  const { path, date, title, summary, tags } = post
                  return (
                    <li key={path} className="py-5">
                      <article className="flex flex-col space-y-2 xl:space-y-0">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-sm leading-6 font-medium text-gray-400 dark:text-gray-500">
                            <time dateTime={date} suppressHydrationWarning>
                              {formatDate(date, siteMetadata.locale)}
                            </time>
                          </dd>
                        </dl>
                        <div className="space-y-3">
                          <div>
                            <h2 className="text-lg leading-8 font-medium tracking-tight">
                              <Link
                                href={`/${path}`}
                                className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="mt-2 flex flex-wrap">
                              {tags?.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ul>
              {hasMore && (
                <div className="flex justify-center pt-8 pb-4">
                  <button
                    onClick={() => setDisplayCount((prev) => prev + POSTS_PER_PAGE)}
                    className="border-primary-500 text-primary-500 hover:bg-primary-500 cursor-pointer rounded-full border px-6 py-2 text-sm font-medium hover:text-white dark:hover:text-white"
                  >
                    더 보기
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
