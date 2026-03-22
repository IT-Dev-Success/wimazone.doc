---
title: Guide Docker
---

# Guide Docker

WimaZone Billing prend en charge les déploiements Docker sur serveur standard et dans des workflows liés à RouterOS.

## <Icon name="Database" color="info" /> Bases de données supportées

| Moteur | Version | Utilisation | Charset |
| :--- | :--- | :--- | :--- |
| SQLite | 3.x | Déploiement MikroTik (embarqué) | — |
| MySQL | 8.0 | Déploiement serveur / CasaOS | `utf8mb4` / `utf8mb4_unicode_ci` |
| MariaDB | 11.5 | Déploiement production (Docker) | `utf8mb4` / `utf8mb4_unicode_ci` |

Le choix du moteur se fait via `DB_CONNECTION` (valeurs : `sqlite` ou `mysql`). Les extensions PHP `pdo_mysql` et `pdo_sqlite` sont toutes deux installées dans l'image Docker.

## <Icon name="Zap" color="warning" /> Démarrage rapide (SQLite)

```bash
git clone https://github.com/ITDev-Success/billing.git
cd billing
cp .env.example .env
docker compose up -d --build
```

Accédez ensuite à `http://localhost:8080`.

Commandes post-démarrage si nécessaire :

```bash
docker exec -it billing php artisan key:generate
docker exec -it billing php artisan migrate --force
```

## <Icon name="Wrench" color="primary" /> Exemple Docker Compose (SQLite / MikroTik)

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

## <Icon name="Server" color="success" /> Déploiement CasaOS (MySQL)

Le fichier `deploy/docker-compose.yml` déploie une stack complète avec MySQL 8.0 et phpMyAdmin :

| Service | Image | Port | Rôle |
| :--- | :--- | :--- | :--- |
| `wima-zone` | `shinsenter/laravel:php8.4` | 8081 (HTTP), 8443 (HTTPS) | Application Laravel |
| `wima-zone-mysql` | `mysql:8.0` | 3306 | Base de données MySQL |
| `wima-zone-phpmyadmin` | `phpmyadmin/phpmyadmin:latest` | 8080 | Administration DB |

```bash
cd deploy
docker compose up -d
docker exec -it wima-zone php artisan migrate --force
```

Variables MySQL à configurer :

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=wimazone
DB_USERNAME=laravel
DB_PASSWORD=change_me
DB_ROOT_PASSWORD=change_root_password
```

Volumes persistants CasaOS :

| Chemin hôte | Chemin container | Contenu |
| :--- | :--- | :--- |
| `/DATA/AppData/wima-zone/wwwroot` | `/var/www/html` | Code source Laravel |
| `/DATA/AppData/wima-zone/mysql` | `/var/lib/mysql` | Données MySQL |

## <Icon name="Shield" color="danger" /> Déploiement Production (MariaDB)

Le fichier `deploy/docker-compose.prod.yml` déploie une stack production complète avec MariaDB 11.5, Nginx, Redis et des workers dédiés :

| Service | Image | Rôle |
| :--- | :--- | :--- |
| `app` | Image custom (Dockerfile) | Application PHP-FPM |
| `web` | `nginx:1.27-alpine` | Serveur web (port 8080) |
| `worker` | Image custom | Queue worker Laravel |
| `scheduler` | Image custom | Scheduler Laravel |
| `db` | `mariadb:11.5` | Base de données MariaDB |
| `redis` | `redis:7-alpine` | Cache et sessions |

```bash
cd deploy
docker compose -f docker-compose.prod.yml up -d
```

Variables MariaDB production :

```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=billing
DB_USERNAME=billing
DB_PASSWORD=change_me
DB_ROOT_PASSWORD=change_root_password
```

Health checks intégrés : MariaDB (`mariadb-admin ping`, 10 retries), App PHP (`php -v`), Nginx (`wget http://localhost/up`). Les services `app`, `worker` et `scheduler` attendent que la base soit saine (`service_healthy`) avant de démarrer.

## <Icon name="Tags" color="info" /> Versions

- Utilisez les tags de release du dépôt projet.
- Version documentée actuellement : `v3.4.0`.

## <Icon name="Sliders" color="success" /> Variables d'environnement utiles

| Variable | Description | Défaut |
| :--- | :--- | :--- |
| `APP_ENV` | Environnement Laravel. | `production` |
| `APP_DEBUG` | Mode debug. | `false` |
| `APP_URL` | URL publique de l'application. | `http://localhost:8080` |
| `REDIRECT_URL` | URL de redirection de secours du portail captif. | `http://wima-zone.wifi` |
| `HOTSPOT_STATUS_TIMEOUT_SECONDS` | Timeout de l'appel API hotspot status. | `2` |
| `HOTSPOT_STATUS_CACHE_SECONDS` | Durée de cache hotspot status. | `3` |
| `HOTSPOT_STATUS_FAILURE_COOLDOWN_SECONDS` | Cooldown si routeur indisponible. | `20` |
| `MIKROTIK_BOOT_HOTSPOT_SYNC` | Mise en file synchro hotspot au démarrage. | `false` |
| `MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW` | Exécution immédiate de la synchro de démarrage. | `false` |

Recommandé pour le premier démarrage (création admin) :

```env
SEED_SUPER_ADMIN_EMAIL=admin@example.com
SEED_SUPER_ADMIN_PASSWORD=remplacer-par-un-mot-de-passe-fort
```

## <Icon name="Folder" color="primary" /> Volumes

Chemins importants :

- `/var/www/html/storage`
- `/var/www/html/bootstrap/cache`
- `/var/www/html/database` (si SQLite)
- `/var/lib/mysql` (si MySQL/MariaDB, via volume Docker)

## <Icon name="RefreshCw" color="warning" /> Mise à jour

```bash
git pull
docker compose build --no-cache
docker compose up -d
docker exec -it billing php artisan migrate --force
docker exec -it billing php artisan optimize:clear
```

Pour le mode container RouterOS, suivez les scripts de déploiement projet et les images validées.
