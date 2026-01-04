/**
 * Service lifecycle hooks
 * Automatically creates a Page Hero entry when a new Service is created
 */

import type { Core } from '@strapi/strapi';

interface ServiceData {
  documentId: string;
  slug: string;
  title: string;
  shortDescription?: string;
  description?: string;
  locale?: string;
}

interface LifecycleEvent {
  result: ServiceData;
}

export default {
  async afterCreate(event: LifecycleEvent) {
    const { result } = event;
    const strapi = (global as { strapi: Core.Strapi }).strapi;

    // Only proceed if we have a slug
    if (!result.slug) {
      strapi.log.warn('Service created without slug, skipping page hero creation');
      return;
    }

    const pageIdentifier = `service-${result.slug}`;

    // Check if page hero already exists
    const existingHeroes = await strapi.documents('api::page-hero.page-hero').findMany({
      filters: { pageIdentifier: { $eq: pageIdentifier } },
      locale: 'th-TH',
    });

    if (existingHeroes.length > 0) {
      strapi.log.info(`Page hero for ${pageIdentifier} already exists, skipping`);
      return;
    }

    try {
      // Determine the locale of the created service
      const serviceLocale = result.locale || 'th-TH';
      const isThai = serviceLocale === 'th-TH' || serviceLocale === 'th';

      // Create Thai version first (default locale)
      const thTitle = isThai ? result.title : result.title;
      const thSubtitle = isThai
        ? (result.shortDescription || result.description || '')
        : (result.shortDescription || result.description || '');

      const thEntry = await strapi.documents('api::page-hero.page-hero').create({
        data: {
          pageIdentifier,
          title: thTitle,
          subtitle: thSubtitle,
          backgroundType: 'none',
          overlayOpacity: 60,
          overlayColor: '#000000',
          textColor: 'light',
        },
        locale: 'th-TH',
        status: 'published',
      });

      strapi.log.info(`Created Thai page hero for service: ${pageIdentifier}`);

      // Create English localization
      const enTitle = isThai ? result.title : result.title;
      const enSubtitle = isThai
        ? (result.shortDescription || result.description || '')
        : (result.shortDescription || result.description || '');

      await strapi.documents('api::page-hero.page-hero').update({
        documentId: thEntry.documentId,
        data: {
          pageIdentifier,
          title: enTitle,
          subtitle: enSubtitle,
          backgroundType: 'none',
          overlayOpacity: 60,
          overlayColor: '#000000',
          textColor: 'light',
        },
        locale: 'en',
        status: 'published',
      });

      strapi.log.info(`Created English page hero for service: ${pageIdentifier}`);
      strapi.log.info(`Page hero auto-created for new service: ${result.title} (${pageIdentifier})`);

    } catch (error) {
      strapi.log.error(`Failed to create page hero for service ${result.slug}:`, error);
    }
  },

  async afterDelete(event: LifecycleEvent) {
    const { result } = event;
    const strapi = (global as { strapi: Core.Strapi }).strapi;

    if (!result.slug) return;

    const pageIdentifier = `service-${result.slug}`;

    try {
      // Find and delete the associated page hero
      const existingHeroes = await strapi.documents('api::page-hero.page-hero').findMany({
        filters: { pageIdentifier: { $eq: pageIdentifier } },
        locale: 'th-TH',
      });

      for (const hero of existingHeroes) {
        await strapi.documents('api::page-hero.page-hero').delete({
          documentId: hero.documentId,
        });
        strapi.log.info(`Deleted page hero for removed service: ${pageIdentifier}`);
      }
    } catch (error) {
      strapi.log.error(`Failed to delete page hero for service ${result.slug}:`, error);
    }
  },
};
