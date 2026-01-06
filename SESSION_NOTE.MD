# Session Notes

## Date: 2026-01-06

### Issues Fixed

#### 1. Features Section (WhyChooseUsSection) Not Updating from Strapi

**Problem:** The `WhyChooseUsSection` component had hardcoded features and completely ignored Strapi data. Even though `getHomepage` fetches `whyChooseUsSection.features`, the component never used it.

**Solution:**
- Updated `apps/web/components/sections/why-choose-us.tsx`:
  - Added `data` prop to accept Strapi data
  - Added icon mapping for Strapi icons (Shield, Clock, Users, Award, etc.)
  - Component now uses Strapi features if available, falls back to hardcoded defaults
  - Added support for `isVisible` flag to hide section
  - Added support for custom `title` and `subtitle` from Strapi

- Updated `apps/web/app/[locale]/(marketing)/page.tsx`:
  - Now passes `homepageData?.whyChooseUsSection` to the component

#### 2. "Trusted by" Section Showing '?' on Language Change

**Problem:** When switching languages, the "Trusted by leading organizations" text would show '?' because Strapi returned `trustedByText: "?"` for some locales, and the fallback logic (`value || fallback`) considered "?" as truthy.

**Solution:**
- Added `isValidText()` helper function that checks:
  - Not null/undefined
  - Not empty string
  - Not just "?"
- Applied this validation to all hero section text fields (badge, title, titleHighlight, subtitle, cta, trustedBy)

#### 3. Images Not Showing on Navigation/Language Change

**Problem:** Client components used `process.env.NEXT_PUBLIC_STRAPI_URL` which is NOT available at runtime in client-side code (only at build time). Since it wasn't set during Docker build, it defaulted to `http://localhost:1337`.

**Solution:**
- Pass `strapiUrl` from server components (which have access to `process.env.STRAPI_URL`) to client components as a prop
- Updated components:
  - `components/ui/logo-carousel.tsx` - added `strapiUrl` prop
  - `components/sections/hero.tsx` - added `strapiUrl` prop
  - `components/sections/news-preview.tsx` - added `strapiUrl` prop
  - `components/sections/about-sections.tsx` (TeamSection) - added `strapiUrl` prop
  - `app/[locale]/(marketing)/news/news-grid.tsx` - added `strapiUrl` prop
- Updated pages to pass `strapiUrl`:
  - `app/[locale]/(marketing)/page.tsx`
  - `app/[locale]/(marketing)/about/page.tsx`
  - `app/[locale]/(marketing)/news/page.tsx`

#### 4. SEO Improvements

**Sitemap Updated (`app/sitemap.ts`):**
- Changed from hardcoded routes to dynamic routes from Strapi
- Correct routes: `/news` (not `/blog`), `/works` (not `/case-studies`)
- Added dynamic fetching for services, news, works, and jobs
- Updated default site URL to `techthinkspace.com`

**JSON-LD Structured Data Added (`app/[locale]/layout.tsx`):**
- Organization schema with company info
- WebSite schema with search action
- Proper hrefLang tags with full URLs

### Files Modified

1. `apps/web/components/sections/why-choose-us.tsx`
2. `apps/web/components/ui/logo-carousel.tsx`
3. `apps/web/components/sections/hero.tsx`
4. `apps/web/components/sections/news-preview.tsx`
5. `apps/web/components/sections/about-sections.tsx`
6. `apps/web/app/[locale]/(marketing)/page.tsx`
7. `apps/web/app/[locale]/(marketing)/about/page.tsx`
8. `apps/web/app/[locale]/(marketing)/news/page.tsx`
9. `apps/web/app/[locale]/(marketing)/news/news-grid.tsx`
10. `apps/web/app/sitemap.ts`
11. `apps/web/app/[locale]/layout.tsx`

### Testing Notes

- TypeScript compilation passes
- Rebuild web container with `--no-cache` to apply changes
- For SEO:
  - Submit sitemap to Google Search Console
  - Set up Google Business Profile
  - Consider adding more content (blog posts) with target keywords
