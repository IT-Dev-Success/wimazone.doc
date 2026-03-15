---
title: Guide Docker
---

# Guide Docker

WimaZone Billing prend en charge les déploiements Docker sur serveur standard et dans des workflows liés à RouterOS.

## <Icon name="Zap" color="warning" /> Démarrage rapide

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

## <Icon name="Wrench" color="primary" /> Exemple Docker Compose

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

## <Icon name="RefreshCw" color="warning" /> Mise à jour

```bash
git pull
docker compose build --no-cache
docker compose up -d
docker exec -it billing php artisan migrate --force
docker exec -it billing php artisan optimize:clear
```

Pour le mode container RouterOS, suivez les scripts de déploiement projet et les images validées.
