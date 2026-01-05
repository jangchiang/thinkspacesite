import { translateContent } from '../../../../services/translation';

// Track documents currently being translated to prevent infinite loops
const translatingDocuments = new Set<string>();

// Helper to get target locale
function getTargetLocale(sourceLocale: string): string | null {
  if (sourceLocale === 'th-TH' || sourceLocale === 'th') return 'en';
  if (sourceLocale === 'en') return 'th-TH';
  return null;
}

// Helper to get translation direction
function getTranslationLangs(sourceLocale: string): { from: string; to: string } | null {
  if (sourceLocale === 'th-TH' || sourceLocale === 'th') return { from: 'th', to: 'en' };
  if (sourceLocale === 'en') return { from: 'en', to: 'th' };
  return null;
}

export default {
  async afterCreate(event) {
    const { result } = event;

    const translationKey = `${result.documentId}-create`;

    // Prevent infinite loops
    if (translatingDocuments.has(translationKey)) return;

    const sourceLocale = result.locale || 'th-TH';
    const targetLocale = getTargetLocale(sourceLocale);
    const translationLangs = getTranslationLangs(sourceLocale);

    if (!targetLocale || !translationLangs) return;

    // Check if target locale version already exists
    const existingTarget = await strapi.db.query('api::legal-page.legal-page').findOne({
      where: {
        documentId: result.documentId,
        locale: targetLocale,
      },
    });

    if (existingTarget) return;

    const autoTranslate = result.autoTranslate !== false; // Default to true

    translatingDocuments.add(translationKey);

    try {
      if (autoTranslate) {
        // Auto-translate ON: Translate content using AI
        console.log(`Auto-translating legal page "${result.title}" from ${translationLangs.from} to ${translationLangs.to}...`);

        const translated = await translateContent(
          {
            title: result.title,
            content: result.content,
          },
          translationLangs.from,
          translationLangs.to
        );

        if (translated.title) {
          await strapi.documents('api::legal-page.legal-page').update({
            documentId: result.documentId,
            locale: targetLocale,
            data: {
              title: translated.title,
              slug: result.slug,
              content: translated.content || null,
              lastUpdated: result.lastUpdated,
              autoTranslate: result.autoTranslate,
            },
          });

          console.log(`Auto-translated legal page "${result.title}" to ${targetLocale}`);
        }
      } else {
        // Auto-translate OFF: Create blank localization
        console.log(`Creating blank ${targetLocale} version for legal page "${result.title}"...`);

        await strapi.documents('api::legal-page.legal-page').update({
          documentId: result.documentId,
          locale: targetLocale,
          data: {
            title: '', // Blank - user must fill in
            slug: result.slug,
            content: null,
            lastUpdated: result.lastUpdated,
            autoTranslate: result.autoTranslate,
          },
        });

        console.log(`Created blank ${targetLocale} version for legal page "${result.title}"`);
      }
    } catch (error) {
      console.error('Auto-localization failed:', error);
    } finally {
      translatingDocuments.delete(translationKey);
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;

    // Skip if this is not a significant update
    if (!params.data?.title && !params.data?.content) return;

    const translationKey = `${result.documentId}-update`;

    // Prevent infinite loops
    if (translatingDocuments.has(translationKey)) return;

    const sourceLocale = result.locale || 'th-TH';
    const targetLocale = getTargetLocale(sourceLocale);
    const translationLangs = getTranslationLangs(sourceLocale);

    if (!targetLocale || !translationLangs) return;

    const autoTranslate = result.autoTranslate !== false; // Default to true

    // Only auto-update if autoTranslate is ON
    if (!autoTranslate) return;

    translatingDocuments.add(translationKey);

    try {
      console.log(`Auto-updating ${targetLocale} translation for legal page "${result.title}"...`);

      const translated = await translateContent(
        {
          title: params.data?.title || result.title,
          content: params.data?.content || result.content,
        },
        translationLangs.from,
        translationLangs.to
      );

      if (translated.title) {
        await strapi.documents('api::legal-page.legal-page').update({
          documentId: result.documentId,
          locale: targetLocale,
          data: {
            title: translated.title,
            content: translated.content || null,
          },
        });

        console.log(`Auto-updated ${targetLocale} translation for legal page "${result.title}"`);
      }
    } catch (error) {
      console.error('Auto-translation update failed:', error);
    } finally {
      translatingDocuments.delete(translationKey);
    }
  },
};
