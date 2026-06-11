#!/bin/bash
# Start the ThinkSpace CMS (Strapi 5.33.2) for local/dev use, surviving a reboot.
# - Ensures the Postgres container is up (it has a restart policy, so usually already running).
# - Launches Strapi (production build) on http://localhost:1337 with the correct env.
# Usage:  bash scripts/start-thinkspace-cms.sh
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
DB_CONTAINER="ts-strapi-db"
DB_HOST_PORT=5544

echo "==> Ensuring Postgres container ($DB_CONTAINER) is running..."
if ! docker ps --format '{{.Names}}' | grep -q "^${DB_CONTAINER}$"; then
  if docker ps -a --format '{{.Names}}' | grep -q "^${DB_CONTAINER}$"; then
    docker start "$DB_CONTAINER"
  else
    docker run -d --name "$DB_CONTAINER" --restart unless-stopped \
      -e POSTGRES_USER=strapi -e POSTGRES_PASSWORD=strapipass -e POSTGRES_DB=thinkspace \
      -p ${DB_HOST_PORT}:5432 postgres:16-alpine
  fi
fi
# wait for postgres
for i in $(seq 1 30); do
  docker exec -e PGPASSWORD=strapipass "$DB_CONTAINER" pg_isready -U strapi -d thinkspace >/dev/null 2>&1 && break
  sleep 1
done

echo "==> Loading secrets from .env and starting Strapi..."
cd "$REPO/apps/cms"
set -a; source "$REPO/.env"; set +a
export APP_KEYS="$STRAPI_APP_KEYS" ADMIN_JWT_SECRET="$STRAPI_ADMIN_JWT_SECRET" API_TOKEN_SALT="$STRAPI_API_TOKEN_SALT" \
  TRANSFER_TOKEN_SALT="$STRAPI_TRANSFER_TOKEN_SALT" JWT_SECRET="$STRAPI_JWT_SECRET" ENCRYPTION_KEY="${STRAPI_ENCRYPTION_KEY:-$STRAPI_API_TOKEN_SALT}" \
  DATABASE_CLIENT=postgres DATABASE_HOST=127.0.0.1 DATABASE_PORT=${DB_HOST_PORT} DATABASE_NAME=thinkspace \
  DATABASE_USERNAME=strapi DATABASE_PASSWORD=strapipass DATABASE_SSL=false \
  HOST=0.0.0.0 PORT=1337 NODE_ENV=production BROWSER=none

# Build once if there's no production build yet.
if [ ! -d "dist" ] || [ ! -d "build" ]; then
  echo "==> No build found — running 'bun run build' (first run only)..."
  bun run build
fi

echo "==> Starting Strapi on http://localhost:1337/admin"
exec bun run start
