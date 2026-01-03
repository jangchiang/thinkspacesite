# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Think Space is an enterprise technology company website built with:
- **Frontend:** Next.js 15 (App Router) on port 3000
- **API:** Elysia/Bun on port 3001
- **CMS:** Strapi 5 on port 1337
- **Database:** Supabase (PostgreSQL) on port 5432
- **Search:** Meilisearch on port 7700
- **Cache:** Redis on port 6379

All services run in Docker containers.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Compose Stack                      │
├─────────────────────────────────────────────────────────────┤
│  Next.js (:3000) ─┬─ Elysia (:3001) ─┬─ Strapi (:1337)     │
│                   │                   │                      │
│                   └───────┬───────────┘                      │
│                           │                                  │
│         Redis (:6379) ────┴──── Supabase/PostgreSQL (:5432) │
│                                 Meilisearch (:7700)          │
└─────────────────────────────────────────────────────────────┘
```

## Commands

```bash
# Development
docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up
docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up --build

# Production
docker compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up -d --build

# Logs
docker compose logs -f web api cms

# Database access
docker compose exec db psql -U postgres -d thinkspace

# Run migrations
docker compose exec api bun run db:migrate

# Testing (once apps exist)
bun run test                    # Unit tests (Vitest)
bun run test:watch              # Watch mode
bun run test:e2e                # E2E tests (Playwright)
docker compose exec api bun test  # API tests (Bun test)
```

## Project Structure (Planned)

```
thinkspace-web/
├── apps/
│   ├── web/                    # Next.js 15 frontend
│   │   ├── app/
│   │   │   ├── (marketing)/    # Marketing pages (about, services, contact)
│   │   │   ├── (resources)/    # Blog, resources, events
│   │   │   └── api/            # Next.js API routes
│   │   ├── components/
│   │   │   ├── ui/             # Base UI (shadcn/ui)
│   │   │   ├── sections/       # Page sections
│   │   │   └── forms/          # Form components
│   │   └── lib/                # Utilities, Strapi client, validations
│   │
│   ├── api/                    # Elysia API server
│   │   └── src/
│   │       ├── routes/         # API routes (leads, contact, newsletter, search)
│   │       ├── services/       # Business logic (email, search)
│   │       ├── middleware/     # Auth, rate limiting, logging
│   │       └── lib/            # Supabase, Redis, Meilisearch clients
│   │
│   └── cms/                    # Strapi 5
│       └── src/
│           ├── api/            # Content types (page, service, blog-post, case-study)
│           └── components/     # Reusable components (shared/, sections/)
│
├── packages/
│   ├── ui/                     # Shared component library
│   ├── types/                  # Shared TypeScript types
│   └── config/                 # Shared configs (ESLint, Tailwind)
│
└── docker/
    ├── docker-compose.yml      # Base compose
    ├── docker-compose.dev.yml  # Development overrides
    ├── docker-compose.prod.yml # Production overrides
    └── services/               # Dockerfiles for each service
```

## Key Patterns

### Next.js
- Server Components by default, `'use client'` only when needed
- Data fetching via cached Strapi client (`lib/strapi.ts`)
- Forms with React Hook Form + Zod validation
- ISR with 1-hour revalidation, webhook-triggered on-demand revalidation

### Elysia API
- TypeBox validation on all routes
- Route modules aggregated in `routes/index.ts`
- Services layer for business logic
- JWT auth middleware for protected routes

### Strapi
- Dynamic zones for flexible page building
- Shared components (SEO, buttons, media)
- Section components for page sections
- i18n enabled (en, th)

## Code Style

- TypeScript strict mode with explicit types
- Zod/TypeBox for runtime validation
- Tailwind CSS with design system colors (green-500 primary)
- File naming: `kebab-case.tsx` for components, `use-*.ts` for hooks

## Documentation Files

| File | Purpose |
|------|---------|
| PRD.md | Full product requirements, database schema, design system |
| nextjs.md | Frontend patterns, App Router, data fetching |
| elysia.md | API routes, middleware, services |
| strapi.md | Content types, components, webhooks |
| supabase.md | Database schema, RLS policies |
| docker.md | Docker Compose setup, Dockerfiles, nginx config |
| testing.md | Vitest, Playwright, Bun test patterns |
| components.md | UI components, design system |
| forms.md | Form handling patterns |
| search.md | Meilisearch integration |
| tasks.md | Development workflows |
