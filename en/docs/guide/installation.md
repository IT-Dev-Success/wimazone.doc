---
title: Installation Guide
---

# Installation Guide

This guide covers the installation of WimaZone Billing from the official repository.

## <Icon name="Router" color="warning" /> MikroTik Deployment First {#mikrotik}

If your primary target is MikroTik operations, start with this path:

1. Deploy WimaZone Billing on a server or Docker host (recommended), then connect routers via API.
2. Follow the dedicated page first:
   - [MikroTik Installation Guide](/en/docs/guide/mikrotik)
3. For RouterOS container workflows and image strategy, follow:
   - [Docker Guide](/en/docs/guide/docker)
   - Project README section: *MikroTik RouterOS 7 (container)*.
4. Validate API credentials, port (`8728`/`8729`), and hotspot file sync before production traffic.

This approach avoids overloading RouterOS containers and keeps queue/scheduler execution stable.

## <Icon name="ClipboardList" color="primary" /> General Requirements {#requirements}
*   **PHP**: 8.2 or higher (8.4 recommended)
*   **Composer**: 2.x
*   **Node.js**: 20+ for asset build
*   **Database**: SQLite 3.x (dev/MikroTik) or MySQL 8.0 / MariaDB 11.5 (production)
*   **Extensions**: `mbstring`, `openssl`, `json`, `pdo_sqlite`, `pdo_mysql`

---

## <Icon name="Terminal" color="secondary" /> Manual Installation (Linux/VPS) {#manual-linux}
Recommended for Ubuntu/Debian VPS with Nginx/Apache.

### 1. Requirements
Ensure you have `git`, `unzip`, and `php` installed.
```bash
sudo apt update
sudo apt install git unzip php php-cli php-fpm php-mysql php-sqlite3 php-curl php-mbstring php-xml php-zip
```

### 2. Clone Repository
```bash
cd /var/www/html
git clone https://github.com/ITDev-Success/billing.git
cd billing
```

### 3. Install Dependencies
```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
```

### 4. Environment and Key
```bash
cp .env.example .env
php artisan key:generate
```

### 5. Database
Development (SQLite):
```bash
touch database/database.sqlite
```

Production (MySQL/MariaDB): update `.env` with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=wimazone
DB_USERNAME=wimazone
DB_PASSWORD=your-password
```

For Docker deployment with MySQL 8.0 or MariaDB 11.5, see the [Docker Guide](/en/docs/guide/docker).

### 6. Migrate
```bash
php artisan migrate --force
php artisan optimize:clear
```

---

## <Icon name="Container" color="info" /> Docker (Recommended)
For containerized deployments, use the dedicated Docker guide:

- [Docker Guide](/en/docs/guide/docker)

---

## <Icon name="Server" color="success" /> Web Servers {#web-servers}

### Apache / OpenLiteSpeed
1.  Set document root to the `public/` folder.
2.  Enable URL rewriting.
3.  Ensure write permissions for `storage/` and `bootstrap/cache/`.

### Nginx
Nginx does not read `.htaccess`. Use this configuration block in your `server` block:

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
        fastcgi_pass unix:/run/php/php8.2-fpm.sock; # Adjust version
    }

    location ~ /\.ht {
        deny all;
    }
}
```

## <Icon name="Globe" color="info" /> Shared Hosting {#shared-hosting}
Most shared hosting setups are possible, but VPS is strongly recommended for scheduler/queue reliability.

1.  Upload source to your hosting folder.
2.  Point domain document root to `public/`.
3.  Use PHP 8.2+.
4.  Ensure required extensions and writable `storage/`.

---

## <Icon name="Cloud" color="primary" /> VPS & Cloud {#vps-cloud}

### aaPanel
1.  **Create Website**: Add site -> PHP-8.x.
2.  **Site Directory**:
    *   Set **Running Directory** (not Site Directory) to `/public`.
    *   Uncheck "Anti-XSS" (sometimes blocks config saving).
3.  **URL Rewrite**: Use a Laravel-compatible rewrite template.
4.  **Permissions**: Chown `www` user to the site directory.

### PaaS Cloud (Railway / Render / Heroku)
If you deploy on PaaS, use persistent storage and run queue/scheduler workers explicitly.

---

## <Icon name="Settings" color="success" /> Post-Installation {#post-installation}
After setup:
1. Configure queue worker:
   ```bash
   php artisan queue:work --queue=mikrotik,default --tries=2 --timeout=300
   ```
2. Configure scheduler cron:
   ```cron
   * * * * * cd /var/www/billing && php artisan schedule:run >> /dev/null 2>&1
   ```
3. Configure MikroTik routers from the admin panel and validate API connectivity.

## <Icon name="Shield" color="warning" /> Critical Production Variables {#critical-vars}

Add and verify these values in production:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://billing.example.com
REDIRECT_URL=https://portal.example.com

SEED_SUPER_ADMIN_EMAIL=admin@example.com
SEED_SUPER_ADMIN_PASSWORD=replace-with-strong-password

LARAVEL_ENABLE_QUEUE_WORKER=true
LARAVEL_ENABLE_SCHEDULER=true
LARAVEL_QUEUE_WORKER_OPTIONS=--queue=mikrotik,default --tries=1 --timeout=1200 --sleep=2
```

Recommended for hotspot stability:

```env
HOTSPOT_STATUS_TIMEOUT_SECONDS=2
HOTSPOT_STATUS_CACHE_SECONDS=3
HOTSPOT_STATUS_FAILURE_COOLDOWN_SECONDS=20
MIKROTIK_BOOT_HOTSPOT_SYNC=false
MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW=false
```
