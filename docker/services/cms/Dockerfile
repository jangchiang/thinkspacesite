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

# Copy package.json and install production dependencies
COPY package.json ./
RUN npm install --omit=dev

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/database ./database
COPY --from=builder /app/types ./types
COPY --from=builder /app/tsconfig.json ./

# Create non-root user and set permissions
RUN addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 strapi && \
    mkdir -p /app/public/uploads && \
    mkdir -p /app/data && \
    chown -R strapi:strapi /app

USER strapi

EXPOSE 1337

# Run production server
CMD ["npm", "run", "start"]
