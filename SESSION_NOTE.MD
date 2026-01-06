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

### Files Modified

1. `apps/web/components/sections/why-choose-us.tsx`
   - Added Strapi data integration
   - Added icon mapping
   - Added fallback logic

2. `apps/web/app/[locale]/(marketing)/page.tsx`
   - Added `isValidText()` helper
   - Fixed hero data fallback logic
   - Pass `whyChooseUsSection` data to component

### Testing Notes

- TypeScript compilation passes
- The admin should update the Thai locale in Strapi to have proper `trustedByText` value instead of "?"
- Features in Strapi should use valid icon names: Shield, Clock, Users, Award, Headphones, TrendingUp, CheckCircle, Zap, Target, Heart
