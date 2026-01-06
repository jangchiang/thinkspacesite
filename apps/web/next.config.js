/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // Disabled for simpler Docker deployment
  transpilePackages: ['@thinkspace/ui', '@thinkspace/types'],
  images: {
    remotePatterns: [
      // Development
      { protocol: 'http', hostname: 'localhost', port: '1337' },
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      { protocol: 'http', hostname: 'cms', port: '1337' },
      { protocol: 'http', hostname: 'cms' },
      // Production - Strapi CMS
      { protocol: 'https', hostname: 'cms.techthinkspace.com' },
      { protocol: 'http', hostname: 'cms.techthinkspace.com' },
      // Supabase
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig
