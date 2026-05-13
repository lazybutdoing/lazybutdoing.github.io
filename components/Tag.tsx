import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
  size?: 'sm' | 'base'
}

const Tag = ({ text, size = 'sm' }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={`text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 font-medium uppercase ${size === 'base' ? 'text-base' : 'text-sm'}`}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
