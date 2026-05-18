import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-xl leading-8 font-normal tracking-tight text-gray-900 sm:text-2xl sm:leading-9 xl:text-3xl xl:leading-11 dark:text-gray-100">
      {children}
    </h1>
  )
}
