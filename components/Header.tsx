import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import categories from '@/data/categories'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let wrapperClass = 'w-full bg-transparent'
  if (siteMetadata.stickyNav) {
    wrapperClass += ' sticky top-0 z-50'
  }

  return (
    <header className={wrapperClass}>
      <div className="flex w-full items-center justify-between py-10">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="block text-2xl">🧅</div>
        </Link>
        <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
          <div className="no-scrollbar hidden items-center gap-x-4 overflow-x-auto sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary-500 dark:hover:text-primary-400 m-1 text-sm font-normal tracking-wide whitespace-nowrap text-gray-500 dark:text-gray-400"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
      <nav className="hidden pt-6 pb-8 sm:block">
        <ul className="flex flex-wrap gap-x-6">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${c.slug}`}
                className="hover:text-primary-500 dark:hover:text-primary-400 text-sm font-normal tracking-wide whitespace-nowrap text-gray-500 dark:text-gray-400"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
