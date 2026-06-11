# syntax=docker/dockerfile:1

# ===========================================
# Next.js Web - Production Dockerfile
# ===========================================

FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock* ./
COPY apps/web/package.json ./apps/web/
COPY packages/types/package.json ./packages/types/
COPY packages/config/package.json ./packages/config/
COPY packages/ui/package.json ./packages/ui/
# Clear cache and install fresh
RUN bun pm cache rm 2>/dev/null || true && bun install

# Development stage
FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
WORKDIR /app/apps/web
ENV NODE_ENV=development
EXPOSE 3000
CMD ["bun", "run", "dev"]

# Build stage
FROM base AS builder
WORKDIR /app

# Install build dependencies for native modules (better-sqlite3)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Install dependencies in apps/web and build
WORKDIR /app/apps/web
RUN bun install && bun run build

# Production stage - Use Node.js to run Next.js
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user and own the workdir up front (so installing as that user
# avoids a `chown -R /app` step that duplicates node_modules into a large layer)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown nextjs:nodejs /app
USER nextjs

# Copy the built .next folder, public, and config
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/next.config.js ./next.config.js

# Create a clean package.json without workspace dependencies and install.
# IMPORTANT: Versions MUST match what apps/web was built with (Next 16 / React 19.2.7).
RUN echo '{"name":"thinkspace-web","private":true,"dependencies":{"next":"16.2.9","react":"19.2.7","react-dom":"19.2.7"}}' > package.json && \
    npm install --omit=dev

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "node_modules/next/dist/bin/next", "start"]

# Alias for backwards compatibility
FROM production AS runner
