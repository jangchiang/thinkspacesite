# syntax=docker/dockerfile:1

# ===========================================
# Elysia API - Production Dockerfile
# ===========================================

FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lockb* ./
COPY apps/api/package.json ./apps/api/
COPY packages/types/package.json ./packages/types/
RUN bun install --frozen-lockfile || bun install

# Development stage
FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
WORKDIR /app/apps/api
ENV NODE_ENV=development
EXPOSE 3001
CMD ["bun", "run", "dev"]

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the API
WORKDIR /app/apps/api
RUN bun run build || true

# Production stage
FROM oven/bun:1-slim AS production
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user (Debian syntax)
RUN groupadd --system --gid 1001 api && \
    useradd --system --uid 1001 --gid api elysia

# Copy built application
COPY --from=builder /app/apps/api ./
COPY --from=deps /app/node_modules ./node_modules

RUN chown -R elysia:api /app

USER elysia

EXPOSE 3001

ENV PORT=3001

CMD ["bun", "run", "src/index.ts"]
