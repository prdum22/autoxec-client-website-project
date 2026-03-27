import type { ArticleCategory, NavCategory } from '../data'

/** Path segments used in `/category/:slug` and `/?category=` (per AutoXec_AllPages.docx). */
export type CategoryPathSlug =
  | 'ev'
  | 'launches'
  | 'engineering'
  | 'motorsport'
  | 'two-wheelers'
  | 'industry'

export function categoryToPathSlug(cat: NavCategory): CategoryPathSlug {
  const m: Record<NavCategory, CategoryPathSlug> = {
    ev: 'ev',
    launch: 'launches',
    engineering: 'engineering',
    motorsport: 'motorsport',
    twowheeler: 'two-wheelers',
    industry: 'industry',
  }
  return m[cat]
}

export function pathSlugToCategory(slug: string): NavCategory | null {
  const m: Record<CategoryPathSlug, NavCategory> = {
    ev: 'ev',
    launches: 'launch',
    engineering: 'engineering',
    motorsport: 'motorsport',
    'two-wheelers': 'twowheeler',
    industry: 'industry',
  }
  return m[slug as CategoryPathSlug] ?? null
}

/** Homepage filter query `?category=` uses the same tokens as path slugs. */
export function categoryToQueryValue(cat: ArticleCategory): string | null {
  if (cat === 'all') return null
  return categoryToPathSlug(cat as NavCategory)
}

export function queryValueToCategory(value: string | null): ArticleCategory {
  if (!value) return 'all'
  const c = pathSlugToCategory(value)
  return c ?? 'all'
}

export function articleUrl(slug: string): string {
  return `/article/${slug}`
}
