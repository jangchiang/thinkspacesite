export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  {
    // Serve /uploads (and the rest of public/) with a far-future cache.
    // Strapi gives uploaded files hashed, content-addressed names, so they are
    // effectively immutable — safe to cache for a year. This lets Cloudflare's
    // "Respect Existing Headers" mode hand clients a long Browser Cache TTL and
    // clears the "Add Expires headers" performance flag for CMS images.
    name: 'strapi::public',
    config: {
      maxAge: 31536000000, // 1 year, in ms
    },
  },
];
