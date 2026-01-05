import type { Locale } from './i18n'

// This module is designed for Server Components only
// The dynamic imports ensure dictionaries are loaded server-side

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dict = Record<string, any>

const dictionaries: Record<Locale, () => Promise<Dict>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  th: () => import('@/dictionaries/th.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale): Promise<Dict> => {
  const loadDict = dictionaries[locale] || dictionaries.en
  return loadDict()
}
