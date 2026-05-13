interface Props {
  tag: string
  notice: string
}

export default function TagNotice({ tag, notice }: Props) {
  return (
    <div className="border-primary-300 dark:border-primary-700 border-l-4 pl-4">
      <p className="text-sm leading-relaxed font-light text-gray-500 dark:text-gray-400">
        ⚠️ {notice}
      </p>
    </div>
  )
}
