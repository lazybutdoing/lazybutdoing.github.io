'use client'

import { ReactNode, useState } from 'react'
import Image from './Image'

type Photo = string | { src: string; alt?: string }

interface Props {
  photos: Photo[]
  children: ReactNode
}

function getSrc(p: Photo) {
  return typeof p === 'string' ? p : p.src
}

function getAlt(p: Photo) {
  return typeof p === 'string' ? '' : (p.alt ?? '')
}

export default function PhotoPost({ photos, children }: Props) {
  const [index, setIndex] = useState(0)
  const count = photos.length
  const current = photos[index]

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  return (
    <div className="not-prose my-8 grid grid-cols-1 gap-6 md:grid-cols-[20rem_1fr] md:gap-8">
      <div className="group relative aspect-square overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900">
        <Image
          src={getSrc(current)}
          alt={getAlt(current)}
          fill
          sizes="(min-width: 768px) 320px, 100vw"
          className="object-contain"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="이전 사진"
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60 focus-visible:opacity-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="다음 사진"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60 focus-visible:opacity-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div
              aria-hidden
              className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1 drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]"
            >
              {photos.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                    i === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="prose dark:prose-invert max-w-none md:h-[20rem] md:[scrollbar-gutter:stable] md:overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
