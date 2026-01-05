#!/bin/bash

# Seed Services data to Strapi
# Usage: ./seed-services.sh [STRAPI_URL] [API_TOKEN]

STRAPI_URL="${1:-http://131.1.1.161:8101}"
API_TOKEN="${2:-}"
API_URL="$STRAPI_URL/api/services"

echo "Seeding Services to $STRAPI_URL..."
echo ""

# Function to create service
create_service() {
  local data="$1"
  if [ -n "$API_TOKEN" ]; then
    curl -s -X POST "$API_URL" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $API_TOKEN" \
      -d "$data"
  else
    curl -s -X POST "$API_URL" \
      -H "Content-Type: application/json" \
      -d "$data"
  fi
  echo ""
}

# Service 1: Cloud Services
echo "Creating: Cloud Services..."
create_service '{
  "data": {
    "title": "Cloud Services",
    "slug": "cloud",
    "description": "Enterprise cloud solutions including migration, infrastructure management, and optimization. We help organizations leverage AWS, Azure, and Google Cloud platforms.",
    "shortDescription": "Enterprise cloud solutions and migration services",
    "icon": "Cloud",
    "order": 1,
    "locale": "en"
  }
}'

# Service 2: Software Development
echo "Creating: Software Development..."
create_service '{
  "data": {
    "title": "Software Development",
    "slug": "software",
    "description": "Custom software development for business needs. From web applications to enterprise systems, we build scalable and maintainable solutions.",
    "shortDescription": "Custom software development for business needs",
    "icon": "Code",
    "order": 2,
    "locale": "en"
  }
}'

# Service 3: HPC & AI Infrastructure
echo "Creating: HPC & AI Infrastructure..."
create_service '{
  "data": {
    "title": "HPC & AI Infrastructure",
    "slug": "hpc-ai",
    "description": "High Performance Computing and AI infrastructure solutions. GPU clusters, distributed computing, and optimized environments for machine learning workloads.",
    "shortDescription": "High Performance Computing and AI infrastructure",
    "icon": "Server",
    "order": 3,
    "locale": "en"
  }
}'

# Service 4: AI & Data Science
echo "Creating: AI & Data Science..."
create_service '{
  "data": {
    "title": "AI & Data Science",
    "slug": "ai-datascience",
    "description": "AI and data analytics solutions for your business. Machine learning models, data pipelines, and business intelligence dashboards.",
    "shortDescription": "AI and data analytics solutions",
    "icon": "BarChart",
    "order": 4,
    "locale": "en"
  }
}'

# Service 5: Cybersecurity
echo "Creating: Cybersecurity..."
create_service '{
  "data": {
    "title": "Cybersecurity",
    "slug": "cybersecurity",
    "description": "Comprehensive security solutions including threat assessment, security operations center (SOC), and compliance management.",
    "shortDescription": "Comprehensive security solutions",
    "icon": "Shield",
    "order": 5,
    "locale": "en"
  }
}'

# Service 6: IT Consulting
echo "Creating: IT Consulting..."
create_service '{
  "data": {
    "title": "IT Consulting",
    "slug": "consulting",
    "description": "Technology consulting and digital transformation advisory. We help organizations plan and execute their technology roadmap.",
    "shortDescription": "Technology consulting and advisory",
    "icon": "Code",
    "order": 6,
    "locale": "en"
  }
}'

# Service 7: Research & Development
echo "Creating: Research & Development..."
create_service '{
  "data": {
    "title": "Research & Development",
    "slug": "research",
    "description": "Innovation and research for emerging technologies. We explore new solutions and build proof-of-concepts for cutting-edge applications.",
    "shortDescription": "Innovation and emerging technologies research",
    "icon": "FlaskConical",
    "order": 7,
    "locale": "en"
  }
}'

echo ""
echo "Done! Checking results..."
curl -s "$STRAPI_URL/api/services" 2>&1
echo ""
echo ""
echo "Add Thai translations via Strapi Admin: $STRAPI_URL/admin"
