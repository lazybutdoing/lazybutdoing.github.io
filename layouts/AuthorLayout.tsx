import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            소개
          </h1>
        </div>
        <div className="flex flex-col items-center space-y-2 border-t-[1.2px] border-gray-200 px-6 pt-8 dark:border-gray-700">
          <div className="flex flex-col items-center pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
          </div>
          <div className="author-bio prose dark:prose-invert max-w-none pt-8 pb-8 text-center text-sm">
            <h3 className="not-prose pb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-100">
              {name}
            </h3>
            {children}
            <div className="not-prose flex justify-center space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />
              <SocialIcon kind="github" href={github} size={6} />
              <SocialIcon kind="linkedin" href={linkedin} size={6} />
              <SocialIcon kind="x" href={twitter} size={6} />
              <SocialIcon kind="bluesky" href={bluesky} size={6} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
