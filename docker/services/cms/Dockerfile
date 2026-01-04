# syntax=docker/dockerfile:1

FROM node:22-alpine
RUN apk add --no-cache libc6-compat python3 make g++ vips-dev
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Create non-root user
RUN addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 strapi && \
    mkdir -p /app/public/uploads && \
    chown -R strapi:strapi /app

USER strapi

EXPOSE 1337

ENV PORT=1337
ENV HOST=0.0.0.0

# Run in development mode (builds admin on startup)
CMD ["npm", "run", "develop"]
