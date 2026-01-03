import en from '@/i18n/locales/en.json';
import th from '@/i18n/locales/th.json';

const translations = { en, th };

export const getTranslation = (locale: string) => {
  return translations[locale] || translations['en'];
};
