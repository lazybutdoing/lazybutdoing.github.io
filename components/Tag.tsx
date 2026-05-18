interface Props {
  text: string
  size?: 'sm' | 'base'
}

const Tag = ({ text, size = 'sm' }: Props) => {
  return (
    <span
      className={`text-primary-500 mr-3 font-medium uppercase ${size === 'base' ? 'text-base' : 'text-sm'}`}
    >
      {text.split(' ').join('-')}
    </span>
  )
}

export default Tag
