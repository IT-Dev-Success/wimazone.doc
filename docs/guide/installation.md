---
title: Guide d'installation
---

# Guide d'installation

Ce guide couvre l'installation de WimaZone Billing depuis le dépôt officiel.

## <Icon name="Router" color="warning" /> Déploiement MikroTik en priorité {#mikrotik}

Si votre cible principale est MikroTik, commencez par ce parcours :

1. Déployez WimaZone Billing sur un serveur ou un hôte Docker (recommandé), puis connectez les routeurs via API.
2. Consultez d'abord la page dédiée :
   - [Guide d'installation MikroTik](/docs/guide/mikrotik)
3. Pour les workflows container RouterOS et la stratégie d'image :
   - [Guide Docker](/docs/guide/docker)
   - section README projet : *MikroTik RouterOS 7 (container)*.
4. Validez les identifiants API, le port (`8728`/`8729`) et la synchronisation hotspot avant trafic réel.

Cette approche évite de surcharger les containers RouterOS et stabilise l'exécution queue/scheduler.

## <Icon name="ClipboardList" color="primary" /> Prérequis généraux {#requirements}

- **PHP** : 8.2 ou supérieur (8.4 recommandé)
- **Composer** : 2.x
- **Node.js** : 20+ (build frontend)
- **Base** : SQLite 3.x (dev/MikroTik) ou MySQL 8.0 / MariaDB 11.5 (production)
- **Extensions** : `mbstring`, `openssl`, `json`, `pdo_sqlite`, `pdo_mysql`

## <Icon name="Terminal" color="secondary" /> Installation manuelle (Linux/VPS) {#manual-linux}

Recommandé pour VPS Ubuntu/Debian avec Nginx/Apache.

### 1. Préparer le système

```bash
sudo apt update
sudo apt install git unzip php php-cli php-fpm php-mysql php-sqlite3 php-curl php-mbstring php-xml php-zip
```

### 2. Cloner le dépôt

```bash
cd /var/www/html
git clone https://github.com/ITDev-Success/billing.git
cd billing
```

### 3. Installer les dépendances

```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
```

### 4. Configurer l'environnement

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Base de données

Développement (SQLite) :

```bash
touch database/database.sqlite
```

Production (MySQL/MariaDB) : renseignez les identifiants dans `.env` :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=wimazone
DB_USERNAME=wimazone
DB_PASSWORD=votre-mot-de-passe
```

Pour un déploiement Docker avec MySQL 8.0 ou MariaDB 11.5, consultez le [Guide Docker](/docs/guide/docker).

### 6. Migrations

```bash
php artisan migrate --force
php artisan optimize:clear
```

## <Icon name="Container" color="info" /> Docker (recommandé)

Pour un déploiement en conteneurs, utilisez :

- [Guide Docker](/docs/guide/docker)

## <Icon name="Server" color="success" /> Serveurs Web {#web-servers}

### Apache / OpenLiteSpeed

1. Définir le `document root` sur `public/`.
2. Activer la réécriture d'URL.
3. Vérifier les permissions d'écriture sur `storage/` et `bootstrap/cache/`.

### Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/billing/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

## <Icon name="Globe" color="info" /> Hébergement mutualisé {#shared-hosting}

Possible, mais VPS recommandé pour la fiabilité queue/scheduler.

1. Téléverser le code source.
2. Pointer le `document root` vers `public/`.
3. Utiliser PHP 8.2+.
4. Vérifier extensions et permissions d'écriture.

## <Icon name="Cloud" color="primary" /> VPS et Cloud {#vps-cloud}

### aaPanel

1. Créer le site avec PHP 8.x.
2. Régler le *Running Directory* sur `/public`.
3. Utiliser une règle de réécriture compatible Laravel.
4. Vérifier les permissions de l'utilisateur web.

### PaaS (Railway / Render / Heroku)

Utiliser un stockage persistant et lancer explicitement les workers queue/scheduler.

## <Icon name="Settings" color="success" /> Post-installation {#post-installation}

1. Lancer le worker queue :
   ```bash
   php artisan queue:work --queue=mikrotik,default --tries=2 --timeout=300
   ```
2. Ajouter le cron scheduler :
   ```cron
   * * * * * cd /var/www/billing && php artisan schedule:run >> /dev/null 2>&1
   ```
3. Configurer les routeurs MikroTik depuis l'interface admin et valider la connectivité API.

## <Icon name="Shield" color="warning" /> Variables critiques en production {#critical-vars}

Ajouter et vérifier ces variables:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://billing.example.com
REDIRECT_URL=https://portail.example.com

SEED_SUPER_ADMIN_EMAIL=admin@example.com
SEED_SUPER_ADMIN_PASSWORD=remplacer-par-un-mot-de-passe-fort

LARAVEL_ENABLE_QUEUE_WORKER=true
LARAVEL_ENABLE_SCHEDULER=true
LARAVEL_QUEUE_WORKER_OPTIONS=--queue=mikrotik,default --tries=1 --timeout=1200 --sleep=2
```

Recommandé pour la stabilité hotspot:

```env
HOTSPOT_STATUS_TIMEOUT_SECONDS=2
HOTSPOT_STATUS_CACHE_SECONDS=3
HOTSPOT_STATUS_FAILURE_COOLDOWN_SECONDS=20
MIKROTIK_BOOT_HOTSPOT_SYNC=false
MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW=false
```
