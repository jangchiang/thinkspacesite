# Docker Deployment Instructions
## Think Space Website

---

## Docker Compose Architecture

All services run in Docker containers orchestrated by Docker Compose.

### Services Overview

| Service | Image | Port | Depends On |
|---------|-------|------|------------|
| web | node:20-alpine | 3000 | api, cms |
| api | oven/bun:latest | 3001 | db, redis |
| cms | node:20-alpine | 1337 | db |
| db | supabase/postgres | 5432 | - |
| redis | redis:alpine | 6379 | - |
| meilisearch | getmeili/meilisearch | 7700 | - |
| nginx | nginx:alpine | 80, 443 | web, api, cms |

---

## Docker Compose Files

### docker-compose.yml (Base)

```yaml
version: '3.9'

services:
  # ===================
  # Frontend - Next.js
  # ===================
  web:
    build:
      context: ../apps/web
      dockerfile: ../../docker/services/web/Dockerfile
    container_name: thinkspace-web
    restart: unless-stopped
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
      - NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - NEXT_PUBLIC_MEILISEARCH_HOST=${NEXT_PUBLIC_MEILISEARCH_HOST}
    depends_on:
      - api
      - cms
    networks:
      - thinkspace-network

  # ===================
  # API Server - Elysia
  # ===================
  api:
    build:
      context: ../apps/api
      dockerfile: ../../docker/services/api/Dockerfile
    container_name: thinkspace-api
    restart: unless-stopped
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - PORT=3001
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_SERVICE_KEY=${SUPABASE_SERVICE_KEY}
      - REDIS_URL=redis://redis:6379
      - MEILISEARCH_HOST=http://meilisearch:7700
      - MEILISEARCH_KEY=${MEILISEARCH_KEY}
      - RESEND_API_KEY=${RESEND_API_KEY}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - thinkspace-network

  # ===================
  # CMS - Strapi
  # ===================
  cms:
    build:
      context: ../apps/cms
      dockerfile: ../../docker/services/cms/Dockerfile
    container_name: thinkspace-cms
    restart: unless-stopped
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - HOST=0.0.0.0
      - PORT=1337
      - APP_KEYS=${STRAPI_APP_KEYS}
      - API_TOKEN_SALT=${STRAPI_API_TOKEN_SALT}
      - ADMIN_JWT_SECRET=${STRAPI_ADMIN_JWT_SECRET}
      - TRANSFER_TOKEN_SALT=${STRAPI_TRANSFER_TOKEN_SALT}
      - DATABASE_CLIENT=postgres
      - DATABASE_HOST=db
      - DATABASE_PORT=5432
      - DATABASE_NAME=${POSTGRES_DB}
      - DATABASE_USERNAME=${POSTGRES_USER}
      - DATABASE_PASSWORD=${POSTGRES_PASSWORD}
      - DATABASE_SSL=false
    volumes:
      - cms-uploads:/app/public/uploads
    depends_on:
      db:
        condition: service_healthy
    networks:
      - thinkspace-network

  # ===================
  # Database - PostgreSQL
  # ===================
  db:
    image: supabase/postgres:15.1.0.147
    container_name: thinkspace-db
    restart: unless-stopped
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - thinkspace-network

  # ===================
  # Cache - Redis
  # ===================
  redis:
    image: redis:7-alpine
    container_name: thinkspace-redis
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    networks:
      - thinkspace-network

  # ===================
  # Search - Meilisearch
  # ===================
  meilisearch:
    image: getmeili/meilisearch:v1.6
    container_name: thinkspace-search
    restart: unless-stopped
    environment:
      - MEILI_MASTER_KEY=${MEILISEARCH_KEY}
      - MEILI_ENV=${NODE_ENV:-production}
    volumes:
      - meilisearch-data:/meili_data
    networks:
      - thinkspace-network

  # ===================
  # Reverse Proxy - Nginx
  # ===================
  nginx:
    image: nginx:alpine
    container_name: thinkspace-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./services/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./services/nginx/ssl:/etc/nginx/ssl:ro
      - nginx-cache:/var/cache/nginx
    depends_on:
      - web
      - api
      - cms
    networks:
      - thinkspace-network

networks:
  thinkspace-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:
  meilisearch-data:
  cms-uploads:
  nginx-cache:
```

### docker-compose.dev.yml (Development Override)

```yaml
version: '3.9'

services:
  web:
    build:
      target: development
    ports:
      - "3000:3000"
    volumes:
      - ../apps/web:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
    command: bun run dev

  api:
    build:
      target: development
    ports:
      - "3001:3001"
    volumes:
      - ../apps/api:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: bun run dev

  cms:
    ports:
      - "1337:1337"
    volumes:
      - ../apps/cms:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run develop

  db:
    ports:
      - "5432:5432"

  redis:
    ports:
      - "6379:6379"

  meilisearch:
    ports:
      - "7700:7700"
```

### docker-compose.prod.yml (Production Override)

```yaml
version: '3.9'

services:
  web:
    build:
      target: production
    environment:
      - NODE_ENV=production

  api:
    build:
      target: production
    environment:
      - NODE_ENV=production

  cms:
    environment:
      - NODE_ENV=production

  nginx:
    environment:
      - NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx
```

---

## Dockerfiles

### Web (Next.js) - docker/services/web/Dockerfile

```dockerfile
# Base stage
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=development
EXPOSE 3000
CMD ["pnpm", "dev"]

# Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Production stage
FROM base AS production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### API (Elysia) - docker/services/api/Dockerfile

```dockerfile
# Base stage
FROM oven/bun:1 AS base
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Development stage
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=development
EXPOSE 3001
CMD ["bun", "run", "dev"]

# Production stage
FROM base AS production
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
EXPOSE 3001

RUN adduser --system --uid 1001 elysia
USER elysia

CMD ["bun", "run", "start"]
```

### CMS (Strapi) - docker/services/cms/Dockerfile

```dockerfile
FROM node:20-alpine AS base
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM base AS production
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 strapi
RUN adduser --system --uid 1001 strapi

COPY --from=builder --chown=strapi:strapi /app ./

USER strapi
EXPOSE 1337
CMD ["npm", "run", "start"]
```

---

## Nginx Configuration

### docker/services/nginx/nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;

    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript 
               application/xml application/xml+rss text/javascript image/svg+xml;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general:10m rate=30r/s;

    # Upstream servers
    upstream web {
        server web:3000;
    }

    upstream api {
        server api:3001;
    }

    upstream cms {
        server cms:1337;
    }

    # Main server
    server {
        listen 80;
        server_name thinkspace.com www.thinkspace.com;

        # Redirect to HTTPS in production
        # return 301 https://$server_name$request_uri;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;

        # Frontend
        location / {
            limit_req zone=general burst=20 nodelay;
            proxy_pass http://web;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # API
        location /api/ {
            limit_req zone=api burst=10 nodelay;
            rewrite ^/api/(.*) /$1 break;
            proxy_pass http://api;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # CMS Admin
        location /admin {
            proxy_pass http://cms;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # CMS API (for content)
        location /cms/ {
            rewrite ^/cms/(.*) /$1 break;
            proxy_pass http://cms;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # Static files caching
        location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff2)$ {
            proxy_pass http://web;
            expires 30d;
            add_header Cache-Control "public, immutable";
        }

        # Health check
        location /health {
            return 200 'OK';
            add_header Content-Type text/plain;
        }
    }

    # HTTPS server (uncomment for production)
    # server {
    #     listen 443 ssl http2;
    #     server_name thinkspace.com www.thinkspace.com;
    #
    #     ssl_certificate /etc/nginx/ssl/fullchain.pem;
    #     ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    #     ssl_protocols TLSv1.2 TLSv1.3;
    #     ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    #     ssl_prefer_server_ciphers off;
    #
    #     # ... same locations as above
    # }
}
```

---

## Commands Reference

### Development

```bash
# Start all services
docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up

# Start with build
docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up --build

# Start specific service
docker compose up web

# View logs
docker compose logs -f web api cms

# Execute command in container
docker compose exec web sh
docker compose exec api bun run test
docker compose exec db psql -U postgres -d thinkspace
```

### Production

```bash
# Build and start
docker compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up -d --build

# Scale services
docker compose up -d --scale api=3

# Rolling update
docker compose up -d --no-deps --build web

# View resource usage
docker compose stats
```

### Maintenance

```bash
# Backup database
docker compose exec db pg_dump -U postgres thinkspace > backup.sql

# Restore database
cat backup.sql | docker compose exec -T db psql -U postgres thinkspace

# Prune unused resources
docker system prune -a --volumes

# View container health
docker compose ps
```

---

## Environment Variables

### .env.example

```bash
# ===================
# General
# ===================
NODE_ENV=development
COMPOSE_PROJECT_NAME=thinkspace

# ===================
# URLs
# ===================
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_MEILISEARCH_HOST=http://localhost:7700

# Internal URLs (container-to-container)
API_URL=http://api:3001
STRAPI_URL=http://cms:1337
SUPABASE_URL=http://db:5432

# ===================
# Database
# ===================
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
POSTGRES_DB=thinkspace

# ===================
# Supabase
# ===================
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key

# ===================
# Strapi
# ===================
STRAPI_APP_KEYS=key1,key2,key3,key4
STRAPI_API_TOKEN_SALT=random-salt
STRAPI_ADMIN_JWT_SECRET=random-secret
STRAPI_TRANSFER_TOKEN_SALT=random-salt

# ===================
# Meilisearch
# ===================
MEILISEARCH_KEY=your-master-key

# ===================
# API
# ===================
JWT_SECRET=your-jwt-secret
RESEND_API_KEY=re_xxxxx

# ===================
# Redis
# ===================
REDIS_URL=redis://redis:6379
```

---

## Troubleshooting

### Container won't start
```bash
# Check logs
docker compose logs servicename

# Check container status
docker compose ps -a

# Rebuild from scratch
docker compose down -v
docker compose up --build
```

### Database connection issues
```bash
# Verify database is healthy
docker compose exec db pg_isready

# Check connection from app
docker compose exec api nc -zv db 5432
```

### Port conflicts
```bash
# Find process using port
lsof -i :3000

# Change port in docker-compose.dev.yml
ports:
  - "3001:3000"  # host:container
```

### Permission issues
```bash
# Fix volume permissions
sudo chown -R 1001:1001 ./apps/cms/public/uploads
```
