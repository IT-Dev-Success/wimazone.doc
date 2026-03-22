---
title: Docker Guide
---

# Docker Guide

WimaZone Billing supports Docker deployments on standard servers and RouterOS-related workflows.

## <Icon name="Database" color="info" /> Supported Databases

| Engine | Version | Use Case | Charset |
| :--- | :--- | :--- | :--- |
| SQLite | 3.x | MikroTik deployment (embedded) | — |
| MySQL | 8.0 | Server / CasaOS deployment | `utf8mb4` / `utf8mb4_unicode_ci` |
| MariaDB | 11.5 | Production deployment (Docker) | `utf8mb4` / `utf8mb4_unicode_ci` |

The database engine is selected via `DB_CONNECTION` (values: `sqlite` or `mysql`). Both `pdo_mysql` and `pdo_sqlite` PHP extensions are installed in the Docker image.

## <Icon name="Zap" color="warning" /> Quick Start (SQLite)

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

## <Icon name="Wrench" color="primary" /> Docker Compose (SQLite / MikroTik)

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

## <Icon name="Server" color="success" /> CasaOS Deployment (MySQL)

The `deploy/docker-compose.yml` file deploys a full stack with MySQL 8.0 and phpMyAdmin:

| Service | Image | Port | Role |
| :--- | :--- | :--- | :--- |
| `wima-zone` | `shinsenter/laravel:php8.4` | 8081 (HTTP), 8443 (HTTPS) | Laravel application |
| `wima-zone-mysql` | `mysql:8.0` | 3306 | MySQL database |
| `wima-zone-phpmyadmin` | `phpmyadmin/phpmyadmin:latest` | 8080 | DB administration |

```bash
cd deploy
docker compose up -d
docker exec -it wima-zone php artisan migrate --force
```

MySQL environment variables:

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=wimazone
DB_USERNAME=laravel
DB_PASSWORD=change_me
DB_ROOT_PASSWORD=change_root_password
```

CasaOS persistent volumes:

| Host Path | Container Path | Content |
| :--- | :--- | :--- |
| `/DATA/AppData/wima-zone/wwwroot` | `/var/www/html` | Laravel source code |
| `/DATA/AppData/wima-zone/mysql` | `/var/lib/mysql` | MySQL data |

## <Icon name="Shield" color="danger" /> Production Deployment (MariaDB)

The `deploy/docker-compose.prod.yml` file deploys a full production stack with MariaDB 11.5, Nginx, Redis and dedicated workers:

| Service | Image | Role |
| :--- | :--- | :--- |
| `app` | Custom image (Dockerfile) | PHP-FPM application |
| `web` | `nginx:1.27-alpine` | Web server (port 8080) |
| `worker` | Custom image | Laravel queue worker |
| `scheduler` | Custom image | Laravel scheduler |
| `db` | `mariadb:11.5` | MariaDB database |
| `redis` | `redis:7-alpine` | Cache and sessions |

```bash
cd deploy
docker compose -f docker-compose.prod.yml up -d
```

Production MariaDB variables:

```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=billing
DB_USERNAME=billing
DB_PASSWORD=change_me
DB_ROOT_PASSWORD=change_root_password
```

Built-in health checks: MariaDB (`mariadb-admin ping`, 10 retries), PHP App (`php -v`), Nginx (`wget http://localhost/up`). The `app`, `worker` and `scheduler` services wait for the database to be healthy (`service_healthy`) before starting.

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
- `/var/lib/mysql` (if MySQL/MariaDB, via Docker volume)

## <Icon name="RefreshCw" color="warning" /> Updating

```bash
git pull
docker compose build --no-cache
docker compose up -d
docker exec -it billing php artisan migrate --force
docker exec -it billing php artisan optimize:clear
```

For RouterOS container mode, follow your project-level deployment scripts and tested image workflow.
