# syntax=docker/dockerfile:1

# ===========================================
# Strapi CMS - Production Dockerfile
# ===========================================

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat python3 make g++ vips-dev
WORKDIR /app

# Development stage
FROM base AS development
COPY package.json ./
RUN npm install
COPY . .
RUN mkdir -p /app/public/uploads && \
    addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 strapi && \
    chown -R strapi:strapi /app
USER strapi
EXPOSE 1337
ENV PORT=1337
ENV HOST=0.0.0.0
CMD ["npm", "run", "develop"]

# Build stage
FROM base AS builder
COPY package.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM base AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=1337
ENV HOST=0.0.0.0

# Create the runtime user up front and own the workdir. Installing as this user
# and using COPY --chown keeps every file strapi-owned without a separate
# `chown -R /app` step, which would otherwise duplicate node_modules into a
# ~1GB layer and balloon the final image.
RUN addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 strapi && \
    mkdir -p /app/public/uploads /app/data && \
    chown -R strapi:strapi /app
USER strapi

# Install production dependencies (owned by strapi)
COPY --chown=strapi:strapi package.json ./
RUN npm install --omit=dev

# Copy built application
COPY --chown=strapi:strapi --from=builder /app/dist ./dist
COPY --chown=strapi:strapi --from=builder /app/public ./public
COPY --chown=strapi:strapi --from=builder /app/config ./config
COPY --chown=strapi:strapi --from=builder /app/src ./src
COPY --chown=strapi:strapi --from=builder /app/database ./database
COPY --chown=strapi:strapi --from=builder /app/data ./data
COPY --chown=strapi:strapi --from=builder /app/types ./types
COPY --chown=strapi:strapi --from=builder /app/tsconfig.json ./
COPY --chown=strapi:strapi --from=builder /app/favicon.png ./

EXPOSE 1337

# Run production server
CMD ["npm", "run", "start"]
