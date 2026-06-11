/**
 * Script to delete and reseed stats to fix locale sync issues
 * Run this from the cms directory:
 * npx ts-node scripts/reseed-stats.ts
 */

import Strapi from '@strapi/strapi';

const statsData = [
  {
    value: '20+',
    label: { th: 'องค์กรที่ไว้วางใจ', en: 'Organizations Served' },
    order: 1,
  },
  {
    value: '6',
    label: { th: 'กลุ่มโซลูชันหลัก', en: 'Solution Pillars' },
    order: 2,
  },
  {
    value: '3',
    label: { th: 'พันธมิตรเทคโนโลยี', en: 'Technology Partners' },
    order: 3,
  },
  {
    value: '2024',
    label: { th: 'ก่อตั้งที่เชียงใหม่', en: 'Founded in Chiang Mai' },
    order: 4,
  },
];

async function reseedStats() {
  const strapi = await Strapi().load();

  try {
    console.log('Deleting existing stats...');

    // Get all stats in Thai locale
    const thStats = await strapi.documents('api::stat.stat').findMany({
      locale: 'th-TH',
    });

    // Get all stats in English locale
    const enStats = await strapi.documents('api::stat.stat').findMany({
      locale: 'en',
    });

    console.log(`Found ${thStats.length} Thai stats and ${enStats.length} English stats`);

    // Delete all stats (both locales will be deleted when deleting the document)
    const allDocumentIds = new Set([
      ...thStats.map(s => s.documentId),
      ...enStats.map(s => s.documentId),
    ]);

    for (const docId of allDocumentIds) {
      await strapi.documents('api::stat.stat').delete({
        documentId: docId,
      });
      console.log(`Deleted stat document: ${docId}`);
    }

    console.log('Creating new stats...');

    for (const stat of statsData) {
      // Create Thai version first
      const thEntry = await strapi.documents('api::stat.stat').create({
        data: {
          value: stat.value,
          label: stat.label.th,
          order: stat.order,
        },
        locale: 'th-TH',
        status: 'published',
      });

      console.log(`Created Thai stat: ${stat.value} - ${stat.label.th}`);

      // Create English localization
      await strapi.documents('api::stat.stat').update({
        documentId: thEntry.documentId,
        data: {
          label: stat.label.en,
        },
        locale: 'en',
        status: 'published',
      });

      console.log(`Created English stat: ${stat.value} - ${stat.label.en}`);
    }

    console.log('Stats reseeding complete!');
  } catch (error) {
    console.error('Error reseeding stats:', error);
  } finally {
    await strapi.destroy();
  }
}

reseedStats();
