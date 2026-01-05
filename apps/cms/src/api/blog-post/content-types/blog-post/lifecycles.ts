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
    const existingTarget = await strapi.db.query('api::blog-post.blog-post').findOne({
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
        console.log(`Auto-translating blog post "${result.title}" from ${translationLangs.from} to ${translationLangs.to}...`);

        const translated = await translateContent(
          {
            title: result.title,
            excerpt: result.excerpt,
            content: result.content,
          },
          translationLangs.from,
          translationLangs.to
        );

        if (translated.title) {
          await strapi.documents('api::blog-post.blog-post').update({
            documentId: result.documentId,
            locale: targetLocale,
            data: {
              title: translated.title,
              slug: result.slug,
              excerpt: translated.excerpt || null,
              content: translated.content || null,
              author: result.author,
              category: result.category,
              featuredImage: result.featuredImage?.id || null,
              authorImage: result.authorImage?.id || null,
              autoTranslate: result.autoTranslate,
            },
          });

          console.log(`Auto-translated blog post "${result.title}" to ${targetLocale}`);
        }
      } else {
        // Auto-translate OFF: Create blank localization
        console.log(`Creating blank ${targetLocale} version for blog post "${result.title}"...`);

        await strapi.documents('api::blog-post.blog-post').update({
          documentId: result.documentId,
          locale: targetLocale,
          data: {
            title: '', // Blank - user must fill in
            slug: result.slug,
            excerpt: null,
            content: null,
            author: result.author,
            category: result.category,
            featuredImage: result.featuredImage?.id || null,
            authorImage: result.authorImage?.id || null,
            autoTranslate: result.autoTranslate,
          },
        });

        console.log(`Created blank ${targetLocale} version for blog post "${result.title}"`);
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
    if (!params.data?.title && !params.data?.content && !params.data?.excerpt) return;

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
      console.log(`Auto-updating ${targetLocale} translation for "${result.title}"...`);

      const translated = await translateContent(
        {
          title: params.data?.title || result.title,
          excerpt: params.data?.excerpt || result.excerpt,
          content: params.data?.content || result.content,
        },
        translationLangs.from,
        translationLangs.to
      );

      if (translated.title) {
        await strapi.documents('api::blog-post.blog-post').update({
          documentId: result.documentId,
          locale: targetLocale,
          data: {
            title: translated.title,
            excerpt: translated.excerpt || null,
            content: translated.content || null,
            featuredImage: result.featuredImage?.id || null,
            authorImage: result.authorImage?.id || null,
          },
        });

        console.log(`Auto-updated ${targetLocale} translation for "${result.title}"`);
      }
    } catch (error) {
      console.error('Auto-translation update failed:', error);
    } finally {
      translatingDocuments.delete(translationKey);
    }
  },
};
