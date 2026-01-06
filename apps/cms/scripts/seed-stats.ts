/**
 * Seed script for Stats
 * Run with: npx ts-node scripts/seed-stats.ts
 */

// Make this file a module to avoid variable conflicts
export {};

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const API_TOKEN = process.env.STRAPI_API_TOKEN || ''

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
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`,
  }

  // Create Thai version first
  const thData = {
    data: {
      value: stat.value,
      label: stat.labelTh,
      order: stat.order,
    },
  }

  console.log(`Creating Thai stat: ${stat.value}...`)

  const thResponse = await fetch(`${STRAPI_URL}/api/stats`, {
    method: 'POST',
    headers,
    body: JSON.stringify(thData),
  })

  if (!thResponse.ok) {
    const error = await thResponse.text()
    console.error(`Failed to create Thai stat ${stat.value}:`, error)
    return null
  }

  const thResult = await thResponse.json() as { data: { documentId: string } }
  const documentId = thResult.data.documentId
  console.log(`Created Thai stat: ${stat.value} - ${stat.labelTh}`)

  // Publish Thai version
  await fetch(`${STRAPI_URL}/api/stats/${documentId}/actions/publish`, {
    method: 'POST',
    headers,
  })
  console.log(`Published Thai stat: ${stat.value}`)

  // Create English localization using PUT with locale query param (Strapi 5 pattern)
  const enData = {
    data: {
      value: stat.value,
      label: stat.label,
      order: stat.order,
    },
  }

  const enResponse = await fetch(`${STRAPI_URL}/api/stats/${documentId}?locale=en`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(enData),
  })

  if (!enResponse.ok) {
    const error = await enResponse.text()
    console.error(`Failed to create English stat ${stat.value}:`, error)
    return documentId
  }

  console.log(`Created English stat: ${stat.value} - ${stat.label}`)

  // Publish English version
  await fetch(`${STRAPI_URL}/api/stats/${documentId}/actions/publish?locale=en`, {
    method: 'POST',
    headers,
  })
  console.log(`Published English stat: ${stat.value}\n`)

  return documentId
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
