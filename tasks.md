# Common Tasks Instructions
## Development Workflow Guide

---

## Project Setup

### Initial Setup

```bash
# Clone repository
git clone https://github.com/thinkspace/website.git
cd website

# Copy environment files
cp .env.example .env

# Start with Docker
docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up

# Access services
# Frontend: http://localhost:3000
# API: http://localhost:3001
# CMS: http://localhost:1337/admin
```

### Creating Admin User (Strapi)

```bash
docker compose exec cms npm run strapi admin:create-user -- \
  --firstname=Admin \
  --lastname=User \
  --email=admin@thinkspace.com \
  --password=SecurePassword123
```

---

## Creating New Pages

### 1. Create Page File

```bash
# Marketing page
touch apps/web/app/(marketing)/new-page/page.tsx

# Resource page
touch apps/web/app/(resources)/new-page/page.tsx
```

### 2. Add Page Template

```typescript
// apps/web/app/(marketing)/new-page/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title | Think Space',
  description: 'Page description for SEO',
}

export default function NewPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Page Title</h1>
      {/* Content */}
    </main>
  )
}
```

### 3. Add to Navigation (if needed)

```typescript
// Update lib/navigation.ts
export const mainNav = [
  // ... existing items
  { label: 'New Page', href: '/new-page' },
]
```

---

## Creating New Components

### 1. Create Component File

```bash
# UI component
touch apps/web/components/ui/new-component.tsx

# Section component
touch apps/web/components/sections/new-section.tsx
```

### 2. Component Template

```typescript
// apps/web/components/ui/new-component.tsx
import { cn } from '@/lib/utils'

interface NewComponentProps {
  children: React.ReactNode
  className?: string
}

export function NewComponent({ children, className }: NewComponentProps) {
  return (
    <div className={cn('base-classes', className)}>
      {children}
    </div>
  )
}
```

### 3. Export from Index

```typescript
// apps/web/components/ui/index.ts
export { NewComponent } from './new-component'
```

---

## Adding Strapi Content Types

### 1. Generate Content Type

```bash
docker compose exec cms npm run strapi generate content-type
```

### 2. Define Schema

Edit `apps/cms/src/api/[name]/content-types/[name]/schema.json`

### 3. Create TypeScript Types

```typescript
// packages/types/src/strapi.ts
export interface NewContentType {
  id: number
  attributes: {
    title: string
    slug: string
    // ... fields
  }
}
```

### 4. Create Fetcher

```typescript
// apps/web/lib/strapi.ts
export async function getNewContentType() {
  return fetchStrapi<StrapiResponse<NewContentType[]>>('/new-content-types?populate=*')
}
```

---

## Adding API Endpoints

### 1. Create Route File

```bash
touch apps/api/src/routes/new-route.ts
```

### 2. Define Routes

```typescript
// apps/api/src/routes/new-route.ts
import { Elysia, t } from 'elysia'

export const newRoutes = new Elysia({ prefix: '/new-route' })
  .get('/', () => ({ message: 'Hello' }))
  .post('/', ({ body }) => body, {
    body: t.Object({
      field: t.String(),
    }),
  })
```

### 3. Register Route

```typescript
// apps/api/src/routes/index.ts
import { newRoutes } from './new-route'

export const routes = new Elysia()
  // ... existing routes
  .use(newRoutes)
```

---

## Database Operations

### Run Migration

```bash
# Create migration
docker compose exec db psql -U postgres -d thinkspace -c "
CREATE TABLE new_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
"

# Or use migration file
docker compose exec api bun run db:migrate
```

### Backup Database

```bash
docker compose exec db pg_dump -U postgres thinkspace > backup_$(date +%Y%m%d).sql
```

### Restore Database

```bash
cat backup.sql | docker compose exec -T db psql -U postgres thinkspace
```

---

## Deployment

### Build for Production

```bash
# Build all services
docker compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml build

# Build specific service
docker compose build web --no-cache
```

### Deploy

```bash
# Start production stack
docker compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up -d

# Rolling update
docker compose up -d --no-deps --build web
```

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f web api

# Last 100 lines
docker compose logs --tail=100 web
```

---

## Debugging

### Check Service Health

```bash
# Container status
docker compose ps

# Resource usage
docker compose stats

# Check service logs
docker compose logs web --tail=50
```

### Access Container Shell

```bash
# Frontend
docker compose exec web sh

# API
docker compose exec api sh

# Database
docker compose exec db psql -U postgres -d thinkspace
```

### Debug API Requests

```bash
# Test endpoint
curl http://localhost:3001/health

# Test with data
curl -X POST http://localhost:3001/leads \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com"}'
```

---

## Common Issues

### Port Already in Use

```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in docker-compose
```

### Container Won't Start

```bash
# View logs
docker compose logs servicename

# Rebuild
docker compose down
docker compose up --build
```

### Database Connection Failed

```bash
# Check database is running
docker compose ps db

# Check connection
docker compose exec api nc -zv db 5432

# Check credentials in .env
```

### Strapi Admin Access Issues

```bash
# Reset admin password
docker compose exec cms npm run strapi admin:reset-user-password -- \
  --email=admin@thinkspace.com

# Create new admin
docker compose exec cms npm run strapi admin:create-user
```

---

## Git Workflow

### Feature Branch

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes, commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push -u origin feature/new-feature
```

### Commit Messages

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance tasks
```
