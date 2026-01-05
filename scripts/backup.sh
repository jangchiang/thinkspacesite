#!/bin/bash

# ===========================================
# Think Space - Database & Uploads Backup Script
# ===========================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
BACKUP_DIR="${BACKUP_DIR:-$(dirname "$0")/../backups}"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=${RETENTION_DAYS:-7}

# Navigate to docker directory
cd "$(dirname "$0")/../docker"

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Think Space Backup - $DATE${NC}"
echo -e "${GREEN}=========================================${NC}"

# Parse command line arguments
ACTION=${1:-all}

backup_database() {
    echo -e "${YELLOW}Backing up PostgreSQL database...${NC}"

    docker compose exec -T db pg_dump \
        -U ${POSTGRES_USER:-postgres} \
        -d ${POSTGRES_DB:-thinkspace} \
        --no-owner \
        --no-acl \
        > "$BACKUP_DIR/db_$DATE.sql"

    # Compress
    gzip "$BACKUP_DIR/db_$DATE.sql"

    echo -e "${GREEN}Database backup: $BACKUP_DIR/db_$DATE.sql.gz${NC}"
}

backup_uploads() {
    echo -e "${YELLOW}Backing up CMS uploads...${NC}"

    # Create tar archive of uploads volume
    docker run --rm \
        -v thinkspace_cms-uploads:/data \
        -v "$BACKUP_DIR":/backup \
        alpine tar czf /backup/uploads_$DATE.tar.gz -C /data .

    echo -e "${GREEN}Uploads backup: $BACKUP_DIR/uploads_$DATE.tar.gz${NC}"
}

backup_all() {
    backup_database
    backup_uploads

    # Create combined backup archive
    echo -e "${YELLOW}Creating combined backup archive...${NC}"
    tar czf "$BACKUP_DIR/thinkspace_full_$DATE.tar.gz" \
        -C "$BACKUP_DIR" \
        "db_$DATE.sql.gz" \
        "uploads_$DATE.tar.gz"

    # Remove individual files
    rm -f "$BACKUP_DIR/db_$DATE.sql.gz" "$BACKUP_DIR/uploads_$DATE.tar.gz"

    echo -e "${GREEN}Full backup: $BACKUP_DIR/thinkspace_full_$DATE.tar.gz${NC}"
}

restore_database() {
    BACKUP_FILE=$2

    if [ -z "$BACKUP_FILE" ]; then
        echo -e "${RED}Error: Please specify backup file${NC}"
        echo "Usage: $0 restore-db <backup_file.sql.gz>"
        exit 1
    fi

    if [ ! -f "$BACKUP_FILE" ]; then
        echo -e "${RED}Error: Backup file not found: $BACKUP_FILE${NC}"
        exit 1
    fi

    echo -e "${RED}WARNING: This will overwrite the current database!${NC}"
    read -p "Are you sure? (y/N): " confirm

    if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
        echo -e "${YELLOW}Restoring database from $BACKUP_FILE...${NC}"

        # Decompress and restore
        gunzip -c "$BACKUP_FILE" | docker compose exec -T db psql \
            -U ${POSTGRES_USER:-postgres} \
            -d ${POSTGRES_DB:-thinkspace}

        echo -e "${GREEN}Database restored successfully${NC}"
    else
        echo -e "${YELLOW}Cancelled${NC}"
    fi
}

cleanup_old_backups() {
    echo -e "${YELLOW}Cleaning up backups older than $RETENTION_DAYS days...${NC}"

    find "$BACKUP_DIR" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete
    find "$BACKUP_DIR" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete

    echo -e "${GREEN}Cleanup complete${NC}"
}

list_backups() {
    echo -e "${YELLOW}Available backups:${NC}"
    ls -lah "$BACKUP_DIR"/*.tar.gz "$BACKUP_DIR"/*.sql.gz 2>/dev/null || echo "No backups found"
}

case $ACTION in
    all)
        backup_all
        cleanup_old_backups
        ;;

    db)
        backup_database
        ;;

    uploads)
        backup_uploads
        ;;

    restore-db)
        restore_database "$@"
        ;;

    cleanup)
        cleanup_old_backups
        ;;

    list)
        list_backups
        ;;

    *)
        echo "Usage: $0 {all|db|uploads|restore-db|cleanup|list}"
        echo ""
        echo "Commands:"
        echo "  all        - Full backup (database + uploads)"
        echo "  db         - Backup database only"
        echo "  uploads    - Backup CMS uploads only"
        echo "  restore-db - Restore database from backup file"
        echo "  cleanup    - Remove old backups (older than $RETENTION_DAYS days)"
        echo "  list       - List available backups"
        exit 1
        ;;
esac

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Backup operation complete${NC}"
echo -e "${GREEN}=========================================${NC}"
