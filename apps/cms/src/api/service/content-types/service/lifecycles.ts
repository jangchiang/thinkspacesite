/**
 * Service lifecycle hooks
 * - Automatically creates a Page Hero entry when a new Service is created
 * - Automatically translates content between locales
 */

import type { Core } from '@strapi/strapi';
import { translateServiceContent } from '../../../../services/translation';

// Track documents currently being translated to prevent infinite loops
const translatingDocuments = new Set<string>();

interface FeatureComponent {
  id?: number;
  title?: string;
  description?: string;
}

interface ServiceData {
  documentId: string;
  slug: string;
  title: string;
  shortDescription?: string;
  description?: string;
  locale?: string;
  icon?: string;
  color?: string;
  order?: number;
  featuredImage?: { id: number } | null;
  features?: FeatureComponent[];
  useCases?: FeatureComponent[];
  processSteps?: FeatureComponent[];
  technologies?: Array<{ name?: string }>;
  autoTranslate?: boolean;
}

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

interface LifecycleEvent {
  result: ServiceData;
  params?: { data?: Record<string, any> };
}

export default {
  async afterCreate(event: LifecycleEvent) {
    const { result } = event;
    const strapi = (global as { strapi: Core.Strapi }).strapi;

    const translationKey = `${result.documentId}-create`;

    // Prevent infinite loops
    if (translatingDocuments.has(translationKey)) return;

    // Only proceed if we have a slug
    if (!result.slug) {
      strapi.log.warn('Service created without slug, skipping');
      return;
    }

    const sourceLocale = result.locale || 'th-TH';
    const targetLocale = getTargetLocale(sourceLocale);
    const translationLangs = getTranslationLangs(sourceLocale);

    if (!targetLocale || !translationLangs) {
      strapi.log.warn(`Unknown locale ${sourceLocale}, skipping auto-localization`);
      return;
    }

    translatingDocuments.add(translationKey);

    // === Auto-Localization (with or without translation) ===
    try {
      // Check if target locale version already exists
      const existingTarget = await strapi.db.query('api::service.service').findOne({
        where: {
          documentId: result.documentId,
          locale: targetLocale,
        },
      });

      if (!existingTarget) {
        const autoTranslate = result.autoTranslate !== false; // Default to true

        if (autoTranslate) {
          // Auto-translate ON: Translate content using AI
          strapi.log.info(`Auto-translating service "${result.title}" from ${translationLangs.from} to ${translationLangs.to}...`);

          const translated = await translateServiceContent(
            {
              title: result.title,
              description: result.description,
              shortDescription: result.shortDescription,
              features: result.features,
              useCases: result.useCases,
              processSteps: result.processSteps,
            },
            translationLangs.from,
            translationLangs.to
          );

          if (translated.title) {
            // Map translated components to ensure required fields
            const mappedFeatures = (translated.features || [])
              .filter(f => f.title)
              .map(f => ({ title: f.title!, description: f.description || '' }));
            const mappedUseCases = (translated.useCases || [])
              .filter(u => u.title)
              .map(u => ({ title: u.title!, description: u.description || '' }));
            const mappedProcessSteps = (translated.processSteps || [])
              .filter(p => p.title)
              .map(p => ({ title: p.title!, description: p.description || '' }));
            const mappedTechnologies = (result.technologies || [])
              .filter(t => t.name)
              .map(t => ({ name: t.name! }));

            await strapi.documents('api::service.service').update({
              documentId: result.documentId,
              locale: targetLocale,
              data: {
                title: translated.title,
                slug: result.slug,
                description: translated.description || null,
                shortDescription: translated.shortDescription || null,
                icon: result.icon as any,
                color: result.color,
                order: result.order,
                featuredImage: result.featuredImage?.id || null,
                features: mappedFeatures,
                useCases: mappedUseCases,
                processSteps: mappedProcessSteps,
                technologies: mappedTechnologies,
                autoTranslate: result.autoTranslate,
              },
            });

            strapi.log.info(`Auto-translated service "${result.title}" to ${targetLocale}`);
          }
        } else {
          // Auto-translate OFF: Create blank localization
          strapi.log.info(`Creating blank ${targetLocale} version for service "${result.title}"...`);

          const mappedTechnologies = (result.technologies || [])
            .filter(t => t.name)
            .map(t => ({ name: t.name! }));

          await strapi.documents('api::service.service').update({
            documentId: result.documentId,
            locale: targetLocale,
            data: {
              title: '', // Blank title - user must fill in
              slug: result.slug,
              description: null,
              shortDescription: null,
              icon: result.icon as any,
              color: result.color,
              order: result.order,
              featuredImage: result.featuredImage?.id || null,
              features: [],
              useCases: [],
              processSteps: [],
              technologies: mappedTechnologies,
              autoTranslate: result.autoTranslate,
            },
          });

          strapi.log.info(`Created blank ${targetLocale} version for service "${result.title}"`);
        }
      }
    } catch (error) {
      strapi.log.error('Auto-localization failed:', error);
    } finally {
      translatingDocuments.delete(translationKey);
    }

    // === Page Hero Creation ===
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
      // Get both locale versions
      const thService = sourceLocale.startsWith('th') ? result : await strapi.db.query('api::service.service').findOne({
        where: { documentId: result.documentId, locale: 'th-TH' },
      });
      const enService = sourceLocale === 'en' ? result : await strapi.db.query('api::service.service').findOne({
        where: { documentId: result.documentId, locale: 'en' },
      });

      // Create Thai page hero
      const thEntry = await strapi.documents('api::page-hero.page-hero').create({
        data: {
          pageIdentifier,
          title: thService?.title || result.title,
          subtitle: thService?.shortDescription || thService?.description || '',
          backgroundType: 'none',
          overlayOpacity: 60,
          overlayColor: '#000000',
          textColor: 'light',
        },
        locale: 'th-TH',
        status: 'published',
      });

      strapi.log.info(`Created Thai page hero for service: ${pageIdentifier}`);

      // Create English page hero
      await strapi.documents('api::page-hero.page-hero').update({
        documentId: thEntry.documentId,
        data: {
          pageIdentifier,
          title: enService?.title || result.title,
          subtitle: enService?.shortDescription || enService?.description || '',
          backgroundType: 'none',
          overlayOpacity: 60,
          overlayColor: '#000000',
          textColor: 'light',
        },
        locale: 'en',
        status: 'published',
      });

      strapi.log.info(`Created English page hero for service: ${pageIdentifier}`);
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
