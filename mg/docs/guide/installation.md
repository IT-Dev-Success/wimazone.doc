---
title: Torolàlana Fametrahana
---

# Torolàlana Fametrahana

Ity torolàlana ity dia mikasika ny fametrahana WimaZone Billing avy amin'ny tahiry ofisialy.

## <Icon name="Router" color="warning" /> Fametrahana MikroTik Aloha {#mikrotik}

Raha ny MikroTik no tanjona voalohany, ity ny lalana arahina:

1. Apetraho ny WimaZone Billing amin'ny serveur na Docker host (soso-kevitra), avy eo ampifandraiso ny routeur amin'ny API.
2. Jereo aloha ny pejy manokana:
   - [Torolàlana fametrahana MikroTik](/mg/docs/guide/mikrotik)
3. Ho an'ny dingana container RouterOS sy ny stratejia sary, araho:
   - [Torolàlana Docker](/mg/docs/guide/docker)
   - Fizarana README ny tetikasa: *MikroTik RouterOS 7 (container)*.
4. Hamarino ny porofon'ny API, port (`8728`/`8729`) ary ny fampifandraisana rakitra hotspot alohan'ny hampiasaina amin'ny production.

Ity fomba ity dia misoroka ny fanavesarana ny container RouterOS ary mitazona ny fahamarinan'ny queue/scheduler.

## <Icon name="ClipboardList" color="primary" /> Fepetra Takiana {#requirements}
*   **PHP**: 8.2 na ambony (8.4 soso-kevitra)
*   **Composer**: 2.x
*   **Node.js**: 20+ ho an'ny fananganana asset
*   **Database**: SQLite 3.x (dev/MikroTik) na MySQL 8.0 / MariaDB 11.5 (production)
*   **Fanitarana**: `mbstring`, `openssl`, `json`, `pdo_sqlite`, `pdo_mysql`

---

## <Icon name="Terminal" color="secondary" /> Fametrahana Mivantana (Linux/VPS) {#manual-linux}
Soso-kevitra ho an'ny VPS Ubuntu/Debian miaraka amin'ny Nginx/Apache.

### 1. Fepetra takiana
Hamarino fa efa voapetraka ny `git`, `unzip` ary `php`.
```bash
sudo apt update
sudo apt install git unzip php php-cli php-fpm php-mysql php-sqlite3 php-curl php-mbstring php-xml php-zip
```

### 2. Clone ny tahiry
```bash
cd /var/www/html
git clone https://github.com/ITDev-Success/billing.git
cd billing
```

### 3. Hametraka ny dependencies
```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
```

### 4. Tontolo iainana sy lakile
```bash
cp .env.example .env
php artisan key:generate
```

### 5. Database
Fampandrosoana (SQLite):
```bash
touch database/database.sqlite
```

Production (MySQL/MariaDB): ovao ny `.env` amin'ny porofon'ny database-nao:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=wimazone
DB_USERNAME=wimazone
DB_PASSWORD=your-password
```

Ho an'ny fametrahana Docker miaraka amin'ny MySQL 8.0 na MariaDB 11.5, jereo ny [Torolàlana Docker](/mg/docs/guide/docker).

### 6. Migration
```bash
php artisan migrate --force
php artisan optimize:clear
```

---

## <Icon name="Container" color="info" /> Docker (Soso-kevitra)
Ho an'ny fametrahana container, ampiasao ny torolàlana Docker manokana:

- [Torolàlana Docker](/mg/docs/guide/docker)

---

## <Icon name="Server" color="success" /> Serveur Web {#web-servers}

### Apache / OpenLiteSpeed
1.  Apetraho ny document root amin'ny rakitra `public/`.
2.  Alefaso ny URL rewriting.
3.  Hamarino ny alalana fanoratana ho an'ny `storage/` sy `bootstrap/cache/`.

### Nginx
Tsy mamaky `.htaccess` ny Nginx. Ampiasao ity configuration ity ao amin'ny `server` block-nao:

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
        fastcgi_pass unix:/run/php/php8.2-fpm.sock; # Ovao ny version
    }

    location ~ /\.ht {
        deny all;
    }
}
```

## <Icon name="Globe" color="info" /> Hébergement Zaraina {#shared-hosting}
Azo atao ny ankamaroan'ny hébergement zaraina, saingy ny VPS no soso-kevitra kokoa ho an'ny fahamarinan'ny scheduler/queue.

1.  Alefaso ny source amin'ny rakitra hosting-nao.
2.  Atondro ny domain document root amin'ny `public/`.
3.  Ampiasao PHP 8.2+.
4.  Hamarino ny fanitarana ilaina sy ny `storage/` azo soratana.

---

## <Icon name="Cloud" color="primary" /> VPS & Cloud {#vps-cloud}

### aaPanel
1.  **Mamorona Website**: Ampio site -> PHP-8.x.
2.  **Rakitra Site**:
    *   Apetraho ny **Running Directory** (fa tsy ny Site Directory) amin'ny `/public`.
    *   Esory ny tsipika "Anti-XSS" (matetika manakana ny fitahirizana config).
3.  **URL Rewrite**: Ampiasao modely rewrite mifanaraka amin'ny Laravel.
4.  **Alalana**: Chown ny mpampiasa `www` amin'ny rakitra site.

### PaaS Cloud (Railway / Render / Heroku)
Raha mametraka amin'ny PaaS ianao, ampiasao fitahirizana maharitra ary alefaso mazava tsara ny queue/scheduler workers.

---

## <Icon name="Settings" color="success" /> Aorian'ny Fametrahana {#post-installation}
Aorian'ny fametrahana:
1. Apetraho ny queue worker:
   ```bash
   php artisan queue:work --queue=mikrotik,default --tries=2 --timeout=300
   ```
2. Apetraho ny scheduler cron:
   ```cron
   * * * * * cd /var/www/billing && php artisan schedule:run >> /dev/null 2>&1
   ```
3. Apetraho ny routeur MikroTik avy amin'ny panel admin ary hamarino ny fampifandraisana API.

## <Icon name="Shield" color="warning" /> Variables Production Manan-danja {#critical-vars}

Ampio sy hamarino ireto sanda ireto amin'ny production:

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

Soso-kevitra ho an'ny fahamarinan'ny hotspot:

```env
HOTSPOT_STATUS_TIMEOUT_SECONDS=2
HOTSPOT_STATUS_CACHE_SECONDS=3
HOTSPOT_STATUS_FAILURE_COOLDOWN_SECONDS=20
MIKROTIK_BOOT_HOTSPOT_SYNC=false
MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW=false
```
