#!/bin/bash

# ===========================================
# Think Space - Production Deployment Script
# Domain: techthinkspace.com
# ===========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Think Space Production Deployment${NC}"
echo -e "${GREEN}=========================================${NC}"

# Navigate to docker directory
cd "$(dirname "$0")/../docker"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}Error: .env file not found in docker directory${NC}"
    echo -e "${YELLOW}Copy .env.production.example to .env and fill in your values${NC}"
    exit 1
fi

# Parse command line arguments
ACTION=${1:-deploy}

case $ACTION in
    deploy)
        echo -e "${YELLOW}Pulling latest changes...${NC}"
        cd ..
        git pull origin main
        cd docker

        echo -e "${YELLOW}Building and starting containers...${NC}"
        docker compose build --no-cache
        docker compose up -d

        echo -e "${GREEN}Deployment complete!${NC}"
        echo -e "${GREEN}Site: https://techthinkspace.com (port 8801)${NC}"
        echo -e "${GREEN}CMS: https://cms.techthinkspace.com (port 8101)${NC}"
        ;;

    update)
        echo -e "${YELLOW}Updating containers without rebuilding...${NC}"
        docker compose pull
        docker compose up -d
        echo -e "${GREEN}Update complete!${NC}"
        ;;

    rebuild)
        echo -e "${YELLOW}Rebuilding all containers...${NC}"
        docker compose down
        docker compose build --no-cache
        docker compose up -d
        echo -e "${GREEN}Rebuild complete!${NC}"
        ;;

    stop)
        echo -e "${YELLOW}Stopping all containers...${NC}"
        docker compose down
        echo -e "${GREEN}All containers stopped${NC}"
        ;;

    restart)
        echo -e "${YELLOW}Restarting all containers...${NC}"
        docker compose restart
        echo -e "${GREEN}All containers restarted${NC}"
        ;;

    logs)
        echo -e "${YELLOW}Showing logs (Ctrl+C to exit)...${NC}"
        docker compose logs -f ${2:-}
        ;;

    status)
        echo -e "${YELLOW}Container status:${NC}"
        docker compose ps
        ;;

    clean)
        echo -e "${RED}WARNING: This will remove all containers and volumes!${NC}"
        read -p "Are you sure? (y/N): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            docker compose down -v
            docker system prune -f
            echo -e "${GREEN}Cleanup complete${NC}"
        else
            echo -e "${YELLOW}Cancelled${NC}"
        fi
        ;;

    *)
        echo "Usage: $0 {deploy|update|rebuild|stop|restart|logs|status|clean}"
        echo ""
        echo "Commands:"
        echo "  deploy   - Pull latest code and deploy (default)"
        echo "  update   - Update containers without rebuilding"
        echo "  rebuild  - Full rebuild of all containers"
        echo "  stop     - Stop all containers"
        echo "  restart  - Restart all containers"
        echo "  logs     - Show container logs (optionally: logs web|cms|db)"
        echo "  status   - Show container status"
        echo "  clean    - Remove all containers and volumes (DANGEROUS)"
        exit 1
        ;;
esac
