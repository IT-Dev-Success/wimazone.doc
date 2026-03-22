---
title: Torolàlana Docker
---

# Torolàlana Docker

WimaZone Billing dia manohana ny fametrahana Docker amin'ny serveur mahazatra sy ny dingana mifandraika amin'ny RouterOS.

## <Icon name="Database" color="info" /> Database Tohanan

| Milina | Version | Fampiasana | Charset |
| :--- | :--- | :--- | :--- |
| SQLite | 3.x | Fametrahana MikroTik (embedded) | — |
| MySQL | 8.0 | Fametrahana serveur / CasaOS | `utf8mb4` / `utf8mb4_unicode_ci` |
| MariaDB | 11.5 | Fametrahana production (Docker) | `utf8mb4` / `utf8mb4_unicode_ci` |

Ny milina database dia voafidy amin'ny `DB_CONNECTION` (sanda: `sqlite` na `mysql`). Samy voapetraka ao amin'ny sary Docker ny fanitarana PHP `pdo_mysql` sy `pdo_sqlite`.

## <Icon name="Zap" color="warning" /> Fanombohana Haingana (SQLite)

Clone ny tetikasa ary alefaso amin'ny compose:

```bash
git clone https://github.com/ITDev-Success/billing.git
cd billing
cp .env.example .env
docker compose up -d --build
```

Sokafy ny navigateur-nao ary mandehana amin'ny `http://localhost:8080`.

Alefaso ny baiko aorian'ny fanombohana ao anatin'ny container raha ilaina:
```bash
docker exec -it billing php artisan key:generate
docker exec -it billing php artisan migrate --force
```

## <Icon name="Wrench" color="primary" /> Docker Compose (SQLite / MikroTik)

Ohatra kely indrindra:

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

## <Icon name="Server" color="success" /> Fametrahana CasaOS (MySQL)

Ny rakitra `deploy/docker-compose.yml` dia mametraka stack feno miaraka amin'ny MySQL 8.0 sy phpMyAdmin:

| Serivisy | Sary | Port | Andraikitra |
| :--- | :--- | :--- | :--- |
| `wima-zone` | `shinsenter/laravel:php8.4` | 8081 (HTTP), 8443 (HTTPS) | Rindranasa Laravel |
| `wima-zone-mysql` | `mysql:8.0` | 3306 | Database MySQL |
| `wima-zone-phpmyadmin` | `phpmyadmin/phpmyadmin:latest` | 8080 | Fitantanana DB |

```bash
cd deploy
docker compose up -d
docker exec -it wima-zone php artisan migrate --force
```

Variables tontolo iainana MySQL:

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=wimazone
DB_USERNAME=laravel
DB_PASSWORD=change_me
DB_ROOT_PASSWORD=change_root_password
```

Fitahirizana maharitra CasaOS:

| Lalana Host | Lalana Container | Votoatiny |
| :--- | :--- | :--- |
| `/DATA/AppData/wima-zone/wwwroot` | `/var/www/html` | Loharano Laravel |
| `/DATA/AppData/wima-zone/mysql` | `/var/lib/mysql` | Data MySQL |

## <Icon name="Shield" color="danger" /> Fametrahana Production (MariaDB)

Ny rakitra `deploy/docker-compose.prod.yml` dia mametraka stack production feno miaraka amin'ny MariaDB 11.5, Nginx, Redis sy workers manokana:

| Serivisy | Sary | Andraikitra |
| :--- | :--- | :--- |
| `app` | Sary manokana (Dockerfile) | Rindranasa PHP-FPM |
| `web` | `nginx:1.27-alpine` | Serveur web (port 8080) |
| `worker` | Sary manokana | Laravel queue worker |
| `scheduler` | Sary manokana | Laravel scheduler |
| `db` | `mariadb:11.5` | Database MariaDB |
| `redis` | `redis:7-alpine` | Cache sy sessions |

```bash
cd deploy
docker compose -f docker-compose.prod.yml up -d
```

Variables MariaDB production:

```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=billing
DB_USERNAME=billing
DB_PASSWORD=change_me
DB_ROOT_PASSWORD=change_root_password
```

Fitsirihana fahasalamana ao anatiny: MariaDB (`mariadb-admin ping`, 10 famerenana), PHP App (`php -v`), Nginx (`wget http://localhost/up`). Ny serivisy `app`, `worker` sy `scheduler` dia miandry ny database ho salama (`service_healthy`) alohan'ny hanombohana.

## <Icon name="Tags" color="info" /> Tags

- Ampiasao ny tag famoahana tetikasa avy amin'ny famoahana tahiry.
- Version tetikasa voarakitra ankehitriny: `v3.4.0`.

## <Icon name="Sliders" color="success" /> Variables Tontolo Iainana

| Variable | Famaritana | Sanda default |
| :--- | :--- | :--- |
| `APP_ENV` | Tontolo iainana Laravel. | `production` |
| `APP_DEBUG` | Fomba debug. | `false` |
| `APP_URL` | URL rindranasa ampahibemaso. | `http://localhost:8080` |
| `REDIRECT_URL` | URL redirect fallback portail captive. | `http://wima-zone.wifi` |
| `HOTSPOT_STATUS_TIMEOUT_SECONDS` | Timeout ho an'ny antso API hotspot status. | `2` |
| `HOTSPOT_STATUS_CACHE_SECONDS` | Varavarankely cache ho an'ny valiny hotspot status. | `3` |
| `HOTSPOT_STATUS_FAILURE_COOLDOWN_SECONDS` | Cooldown rehefa tsy misy ny routeur. | `20` |
| `MIKROTIK_BOOT_HOTSPOT_SYNC` | Queue sync hotspot fanombohana. | `false` |
| `MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW` | Ampandehanina avy hatrany ny sync fanombohana. | `false` |

Soso-kevitra ho an'ny fanombohana voalohany/seeding admin:

```env
SEED_SUPER_ADMIN_EMAIL=admin@example.com
SEED_SUPER_ADMIN_PASSWORD=replace-with-strong-password
```

## <Icon name="Folder" color="primary" /> Fitahirizana (Volumes)

Lalana manan-danja:

- `/var/www/html/storage`
- `/var/www/html/bootstrap/cache`
- `/var/www/html/database` (raha SQLite)
- `/var/lib/mysql` (raha MySQL/MariaDB, amin'ny alalan'ny Docker volume)

## <Icon name="RefreshCw" color="warning" /> Fanavaozana

```bash
git pull
docker compose build --no-cache
docker compose up -d
docker exec -it billing php artisan migrate --force
docker exec -it billing php artisan optimize:clear
```

Ho an'ny fomba container RouterOS, araho ny script fametrahana sy dingana sary voatsapa amin'ny haavon'ny tetikasa.
