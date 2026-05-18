export type CategoryType = 'text' | 'photo'

export interface Category {
  slug: string
  title: string
  type: CategoryType
}

const categories: Category[] = [
  { slug: 'economy-weekly', title: 'Economy weekly', type: 'text' },
  { slug: 'meals', title: 'Meals', type: 'photo' },
]

export default categories

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug)
