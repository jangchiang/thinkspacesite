import { translateContent } from '../../../../services/translation';

export default {
  async afterCreate(event) {
    const { result } = event;

    // Only auto-translate if this is a Thai post (default)
    // Handle both 'th' and 'th-TH' locale codes
    if (!result.locale?.startsWith('th')) return;

    // Check if English version already exists
    const existingEn = await strapi.db.query('api::blog-post.blog-post').findOne({
      where: {
        documentId: result.documentId,
        locale: 'en',
      },
    });

    if (existingEn) return;

    try {
      // Translate content from Thai to English
      const translated = await translateContent(
        {
          title: result.title,
          excerpt: result.excerpt,
          content: result.content,
        },
        'th',
        'en'
      );

      if (translated.title) {
        // Create English localization with images
        await strapi.documents('api::blog-post.blog-post').update({
          documentId: result.documentId,
          locale: 'en',
          data: {
            title: translated.title,
            slug: result.slug,
            excerpt: translated.excerpt || null,
            content: translated.content || null,
            author: result.author,
            category: result.category,
            featuredImage: result.featuredImage?.id || null,
            authorImage: result.authorImage?.id || null,
          },
        });

        console.log(`Auto-translated blog post "${result.title}" to English`);
      }
    } catch (error) {
      console.error('Auto-translation failed:', error);
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;

    // Only auto-translate if updating Thai version (default)
    // Handle both 'th' and 'th-TH' locale codes
    if (!result.locale?.startsWith('th')) return;

    // Skip if this is not a significant update
    if (!params.data?.title && !params.data?.content && !params.data?.excerpt) return;

    try {
      // Translate updated content from Thai to English
      const translated = await translateContent(
        {
          title: params.data?.title || result.title,
          excerpt: params.data?.excerpt || result.excerpt,
          content: params.data?.content || result.content,
        },
        'th',
        'en'
      );

      if (translated.title) {
        // Update or create English localization with images
        await strapi.documents('api::blog-post.blog-post').update({
          documentId: result.documentId,
          locale: 'en',
          data: {
            title: translated.title,
            excerpt: translated.excerpt || null,
            content: translated.content || null,
            featuredImage: result.featuredImage?.id || null,
            authorImage: result.authorImage?.id || null,
          },
        });

        console.log(`Auto-updated English translation for "${result.title}"`);
      }
    } catch (error) {
      console.error('Auto-translation update failed:', error);
    }
  },
};
