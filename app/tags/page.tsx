import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <div>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            태그
          </h1>
        </div>
        {tagKeys.length === 0 ? (
          <div className="border-t-[1.2px] border-gray-200 pt-8 pb-8 dark:border-gray-700">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              아직 태그가 없습니다.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap border-t-[1.2px] border-gray-200 pt-8 pb-8 dark:border-gray-700">
            {sortedTags.map((t) => {
              return (
                <div key={t} className="mt-2 mr-5 mb-2">
                  <Tag text={t} size="base" />
                  <Link
                    href={`/tags/${slug(t)}`}
                    className="-ml-2 text-base font-semibold text-gray-400 uppercase dark:text-gray-500"
                    aria-label={`View posts tagged ${t}`}
                  >
                    {` (${tagCounts[t]})`}
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
