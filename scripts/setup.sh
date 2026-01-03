#!/bin/bash

set -e

echo "🚀 Think Space Project Setup"
echo "=============================="

# Check for required tools
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is required but not installed."
        exit 1
    fi
    echo "✅ $1 found"
}

echo ""
echo "Checking required tools..."
check_command "bun"
check_command "docker"
check_command "docker-compose"

# Create .env if not exists
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual values"
else
    echo ""
    echo "✅ .env file already exists"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
bun install

# Build shared packages
echo ""
echo "🔨 Building shared packages..."
cd packages/types && bun run build 2>/dev/null || true
cd ../config && bun run build 2>/dev/null || true
cd ../ui && bun run build 2>/dev/null || true
cd ../..

echo ""
echo "=============================="
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Start development: bun run docker:dev"
echo "3. Or start services individually:"
echo "   - Frontend: cd apps/web && bun run dev"
echo "   - API: cd apps/api && bun run dev"
echo "   - CMS: cd apps/cms && npm run develop"
echo ""
echo "Access points (after docker:dev):"
echo "  - Frontend: http://localhost:3000"
echo "  - API Swagger: http://localhost:3001/swagger"
echo "  - CMS Admin: http://localhost:1337/admin"
echo "=============================="
