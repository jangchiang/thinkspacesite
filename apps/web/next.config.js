/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@thinkspace/ui', '@thinkspace/types'],
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '1337' },
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      { protocol: 'http', hostname: 'cms', port: '1337' },
      { protocol: 'http', hostname: 'cms' },
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
