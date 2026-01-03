import type { Locale } from './i18n'

// This module is designed for Server Components only
// The dynamic imports ensure dictionaries are loaded server-side

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  th: () => import('@/dictionaries/th.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale): Promise<Record<string, unknown>> => {
  const loadDict = dictionaries[locale] || dictionaries.en
  return loadDict()
}
