---
title: Docker Guide
---

# Docker Guide

WimaZone Billing supports Docker deployments on standard servers and RouterOS-related workflows.

## <Icon name="Zap" color="warning" /> Quick Start

Clone the project and run with compose:

```bash
git clone https://github.com/ITDev-Success/billing.git
cd billing
cp .env.example .env
docker compose up -d --build
```

Open your browser and navigate to `http://localhost:8080`.

Run post-start commands inside container if needed:
```bash
docker exec -it billing php artisan key:generate
docker exec -it billing php artisan migrate --force
```

## <Icon name="Wrench" color="primary" /> Docker Compose

Minimal example:

```yaml
services:
  billing:
    build:
      context: .
      dockerfile: Dockerfile.mikrotik
    container_name: billing
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - APP_ENV=production
      - APP_DEBUG=false
      - APP_URL=http://localhost:8080
      - LARAVEL_ENABLE_QUEUE_WORKER=true
      - LARAVEL_QUEUE_WORKER_OPTIONS=--queue=mikrotik,default --tries=1 --timeout=1200 --sleep=2
      - MIKROTIK_BOOT_HOTSPOT_SYNC=false
    volumes:
      - ./:/var/www/html
```

## <Icon name="Tags" color="info" /> Tags

- Use project release tags from repository releases.
- Current documented project version: `v3.4.0`.

## <Icon name="Sliders" color="success" /> Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `APP_ENV` | Laravel environment. | `production` |
| `APP_DEBUG` | Debug mode. | `false` |
| `APP_URL` | Public app URL. | `http://localhost:8080` |
| `REDIRECT_URL` | Captive portal fallback redirect URL. | `http://wima-zone.wifi` |
| `HOTSPOT_STATUS_TIMEOUT_SECONDS` | Timeout for hotspot status API call. | `2` |
| `HOTSPOT_STATUS_CACHE_SECONDS` | Cache window for hotspot status response. | `3` |
| `HOTSPOT_STATUS_FAILURE_COOLDOWN_SECONDS` | Cooldown when router is unavailable. | `20` |
| `MIKROTIK_BOOT_HOTSPOT_SYNC` | Queue startup hotspot sync. | `false` |
| `MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW` | Process startup sync immediately. | `false` |

Recommended for first boot/admin seeding:

```env
SEED_SUPER_ADMIN_EMAIL=admin@example.com
SEED_SUPER_ADMIN_PASSWORD=replace-with-strong-password
```

## <Icon name="Folder" color="primary" /> Volumes

Important paths:

- `/var/www/html/storage`
- `/var/www/html/bootstrap/cache`
- `/var/www/html/database` (if SQLite)

## <Icon name="RefreshCw" color="warning" /> Updating

```bash
git pull
docker compose build --no-cache
docker compose up -d
docker exec -it billing php artisan migrate --force
docker exec -it billing php artisan optimize:clear
```

For RouterOS container mode, follow your project-level deployment scripts and tested image workflow.
