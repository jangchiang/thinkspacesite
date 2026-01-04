/**
 * Seed script for Stats
 * Run with: npx ts-node scripts/seed-stats.ts
 */

// Make this file a module to avoid variable conflicts
export {};

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''

interface StatData {
  value: string
  label: string
  labelTh: string
  order: number
}

const stats: StatData[] = [
  {
    value: '500+',
    label: 'Enterprise Clients',
    labelTh: 'ลูกค้าองค์กร',
    order: 1,
  },
  {
    value: '99.9%',
    label: 'SLA Uptime',
    labelTh: 'SLA เวลาทำงาน',
    order: 2,
  },
  {
    value: '24/7',
    label: 'Support Available',
    labelTh: 'สนับสนุนตลอดเวลา',
    order: 3,
  },
  {
    value: '15+',
    label: 'Years Experience',
    labelTh: 'ปีประสบการณ์',
    order: 4,
  },
]

async function createStat(stat: StatData) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
  }

  // Create Thai version first (default locale)
  const thResponse = await fetch(`${STRAPI_URL}/api/stats`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      data: {
        value: stat.value,
        label: stat.labelTh,
        order: stat.order,
        locale: 'th-TH',
        publishedAt: new Date().toISOString(),
      },
    }),
  })

  if (!thResponse.ok) {
    const error = await thResponse.text()
    console.error(`Failed to create Thai stat ${stat.value}:`, error)
    return
  }

  const thData = await thResponse.json() as { data: { documentId: string } }
  const thId = thData.data.documentId

  console.log(`Created Thai stat: ${stat.value} - ${stat.labelTh}`)

  // Create English localization
  const enResponse = await fetch(`${STRAPI_URL}/api/stats/${thId}/localizations`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      locale: 'en',
      value: stat.value,
      label: stat.label,
      order: stat.order,
      publishedAt: new Date().toISOString(),
    }),
  })

  if (!enResponse.ok) {
    const error = await enResponse.text()
    console.error(`Failed to create English stat ${stat.value}:`, error)
    return
  }

  console.log(`Created English stat: ${stat.value} - ${stat.label}`)
}

async function seedStats() {
  console.log('Seeding stats...')
  console.log(`Using Strapi URL: ${STRAPI_URL}`)

  for (const stat of stats) {
    await createStat(stat)
  }

  console.log('Stats seeding complete!')
}

seedStats().catch(console.error)
