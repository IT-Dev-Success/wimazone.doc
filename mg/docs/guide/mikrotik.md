---
title: Fametrahana MikroTik
description: Torolàlana feno hametrahana ny Wima Zone Billing amin'ny container MikroTik RouterOS v7
---

# Fametrahana amin'ny MikroTik

Ity torolàlana ity dia mikasika ny fametrahana **dingana tsirairay** ny Wima Zone Billing amin'ny mode container amin'ny routeur MikroTik RouterOS v7.

::: tip Alohan'ny hanombohana
Hamarino fa vita daholo ny [lisitra fepetra takiana](/mg/docs/guide/installation#requirements) : RouterOS v7.10+, USB ext4, token GitHub ITDevSuccess.
:::

## <Icon name="Router" color="warning" /> Routeur mifanaraka

| Modely | Architecture | RAM | Fitoviana |
|---|---|---:|---|
| L009UiGS-2HaxD-IN | ARM 32 bits | 512 MB | Mifanaraka |
| L009UiGS-RM | ARM 32 bits | 512 MB | Mifanaraka |
| hAP ax2 | ARM 64 bits | 1 GB | Mifanaraka |
| hAP ax3 | ARM 64 bits | 1 GB | Mifanaraka |

Azo vidiana ao amin'ny fivarotana an-tserasera : **[wimazone.mg/boutique](https://wimazone.mg/boutique)**

## <Icon name="Package" color="info" /> Sary kendrena

- `linux/arm/v7` (MikroTik ARM 32)
- `linux/arm64` (MikroTik ARM 64)
- `linux/amd64` (serveur/CasaOS)

Sary ho an'ny besinimaro : `wimazone/billing:latest` (Docker Hub).

---

## 1) Hamarino ny device-mode

Ny routeur sasany (indrindra ny hAP ax2) dia `mode=home` rehefa avy amin'ny orinasa, ka **tsy mandeha** ny container. Hamarino aloha :

```routeros
/system/device-mode/print
```

Raha tsy `advanced` ny `mode`, ovao :

```routeros
/system/device-mode/update mode=advanced
```

::: warning Porofo fizaràna ilaina
RouterOS dia hangataka anao **hanindry ny bouton reset** an'ny routeur ao anatin'ny 60 segondra mba hanamarinana ny fiovana. Raha tsy izany dia tsy mandeha ny baiko.
:::

## 2) Alefaso ny fanohanana container

```routeros
/system/device-mode/update container=yes
```

Mitovy amin'iny : hangataka fanamarinana amin'ny bouton reset ihany koa. Avy eo hamarino :

```routeros
/system/device-mode/print
# tokony hiseho : container: yes
```

## 3) Apetraho ny rafitra container

Rehefa tsy voaova, RouterOS dia mampiasa RAM ho an'ny rakitra vonjimaika sy ny couche sary — izany dia feno haingana amin'ny MikroTik. Tsy maintsy atodika amin'ny USB :

```routeros
/container/config/set \
  registry-url=https://registry-1.docker.io \
  tmpdir=usb1/tmp \
  layerdir=usb1/layer
```

Hamarino :

```routeros
/container/config/print
```

## 4) Mamorona bridge ho an'ny container

```routeros
/interface/bridge/add name=dockers comment="Bridge containers Wima Zone"
/ip/address/add address=172.17.0.1/24 interface=dockers comment="Gateway bridge containers"
```

Ampio ny bridge ao amin'ny lisitra interface **LAN** mba ampiharina ny firewall sy DNS anatiny :

```routeros
/interface/list/member/add list=LAN interface=dockers
```

## 5) Mamorona VETH ho an'ny container billing

```routeros
/interface/veth/add name=veth-billing address=172.17.0.2/24 gateway=172.17.0.1 comment="Wima Zone"
/interface/bridge/port/add bridge=dockers interface=veth-billing
```

## 6) Ampio NAT mivoaka ho an'ny container

```routeros
/ip/firewall/nat/add chain=srcnat src-address=172.17.0.0/24 action=masquerade comment="Containers Internet"
```

## 7) Firewall (fanondranana portail + fidirana admin)

Atondro ny port ivelany **8080** an'ny routeur mankany amin'ny port 80 an'ny container (izay no hidiran'ny mpanjifa LAN amin'ny portail WimaZone) :

```routeros
/ip/firewall/nat/add chain=dstnat protocol=tcp dst-port=8080 action=dst-nat \
  to-addresses=172.17.0.2 to-ports=80 comment="Fanondranana portail Wima Zone"
```

Omena alalana ny port miditra (chain `input`) :

```routeros
/ip/firewall/filter/add chain=input protocol=tcp dst-port=8080 action=accept comment="Portail Wima Zone"
/ip/firewall/filter/add chain=input protocol=tcp dst-port=8291 action=accept comment="Winbox"
/ip/firewall/filter/add chain=input protocol=tcp dst-port=8728 action=accept comment="API MikroTik"
/ip/firewall/filter/add chain=input protocol=tcp dst-port=8729 action=accept comment="API-SSL MikroTik"
```

::: tip Laharan'ny lalàna
Apetraho ireo lalàna ireo **alohan'ny** `drop` ankapobeny amin'ny chain `input`. Raha tsy izany, tsy ampiasaina. Ampiasao `/ip/firewall/filter/move` raha ilaina.
:::

## 8) Apetraho ny DNS an'ny routeur

```routeros
/ip/dns/set servers=1.1.1.1,8.8.8.8 allow-remote-requests=yes
```

## 9) Mamorona fitehirizana MariaDB maharitra

Ny sary dia mitondra **MariaDB** ao anatiny ; tsy maintsy atao maharitra amin'ny USB ny lahatahiry MariaDB mba ho tafita amin'ny redémarrage / fanavaozana.

```routeros
/container/mounts/add name=billing-db src=usb1/billing-data/mysql dst=/var/lib/mysql
```

::: warning USB ext4 ilaina
Ny mount container dia tsy mandeha raha tsy amin'ny stockage voatsipika **ext4**. Hamarino amin'ny `/disk/print` fa hita ny `usb1`. Tsy handeha ny MariaDB amin'ny FAT32/NTFS.
:::

## 10) Variables tontolo iainana ho an'ny container

```routeros
/container/envs/add list=billing-env key=APP_ENV value=production
/container/envs/add list=billing-env key=APP_DEBUG value=false
/container/envs/add list=billing-env key=B_CONNECTION value=mysql
/container/envs/add list=billing-env key=DB_HOST value=127.0.0.1
/container/envs/add list=billing-env key=DB_PORT value=3306
/container/envs/add list=billing-env key=DB_DATABASE value=wimazone
/container/envs/add list=billing-env key=DB_USERNAME value=wimazone
/container/envs/add list=billing-env key=DB_PASSWORD value=SOLOY_AMIN_NY_TENIMIAFINA_MATANJAKA
/container/envs/add list=billing-env key=MARIADB_ROOT_PASSWORD value=SOLOY_AMIN_NY_TENIMIAFINA_ROOT
/container/envs/add list=billing-env key=GIT_SYNC_ENABLED value=true
/container/envs/add list=billing-env key=GIT_REPOSITORY_URL value=https://github.com/ITDev-Success/billing.git
/container/envs/add list=billing-env key=GIT_BRANCH value=main
/container/envs/add list=billing-env key=GIT_OFFLINE_FALLBACK value=true
/container/envs/add list=billing-env key=GITHUB_PRIVATE_ACCESS_TOKEN value=TOKEN_OMEN_ITDEVSUCCESS
/container/envs/add list=billing-env key=LARAVEL_AUTO_MIGRATION value=true
/container/envs/add list=billing-env key=LARAVEL_AUTO_MIGRATION_OPTIONS value=--force
/container/envs/add list=billing-env key=LARAVEL_AUTO_STORAGE_LINK value=false
/container/envs/add list=billing-env key=LARAVEL_ENABLE_QUEUE_WORKER value=true
/container/envs/add list=billing-env key=LARAVEL_ENABLE_SCHEDULER value=true
/container/envs/add list=billing-env key=LARAVEL_QUEUE_WORKER_OPTIONS value="--queue=mikrotik,default --tries=1 --timeout=1200 --sleep=2"
/container/envs/add list=billing-env key=REDIRECT_URL value=https://portail-anao.example.com
/container/envs/add list=billing-env key=HOTSPOT_STATUS_TIMEOUT_SECONDS value=2
/container/envs/add list=billing-env key=HOTSPOT_STATUS_CACHE_SECONDS value=3
/container/envs/add list=billing-env key=HOTSPOT_STATUS_FAILURE_COOLDOWN_SECONDS value=20
/container/envs/add list=billing-env key=MIKROTIK_BOOT_HOTSPOT_SYNC value=false
/container/envs/add list=billing-env key=MIKROTIK_BOOT_HOTSPOT_SYNC_ONLY_ONLINE value=true
/container/envs/add list=billing-env key=MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW value=false
```

::: info Licence
`GITHUB_PRIVATE_ACCESS_TOKEN` dia omen'ny ITDevSuccess rehefa mividy license.
:::

## 11) Mamorona container Wima Zone

```routeros
/container/add \
  name="Wima Zone" \
  remote-image=wimazone/billing:latest \
  interface=veth-billing \
  root-dir=usb1/wimazone \
  mounts=billing-db \
  envlist=billing-env \
  start-on-boot=yes \
  logging=yes
```

## 12) Manomboka ny container

```routeros
/container/start [find where name="Wima Zone"]
```

## 13) Hamarino ny log

```routeros
/container/log print follow where container="Wima Zone"
```

Ny boot voalohany dia mety haharitra **2 ka hatramin'ny 5 minitra** (clone Git + migration Laravel). Tokony ho hitanao amin'ny farany :

```text
[scheduler] started
[queue] worker listening on mikrotik,default
[nginx] listening on 0.0.0.0:80
```

## 14) Walled Garden soso-kevitra {#walled-garden}

### Walled Garden IP

```routeros
/ip/hotspot/walled-garden/ip/add dst-address=172.17.0.2 action=accept comment="Wima Zone container"
/ip/hotspot/walled-garden/ip/add dst-address=192.168.88.1 protocol=tcp dst-port=8291 action=accept comment="Winbox"
/ip/hotspot/walled-garden/ip/add dst-address=192.168.88.1 protocol=tcp dst-port=80 action=accept comment="WebFig HTTP"
/ip/hotspot/walled-garden/ip/add dst-address=192.168.88.1 protocol=tcp dst-port=443 action=accept comment="WebFig HTTPS"
```

### Walled Garden host

```routeros
/ip/hotspot/walled-garden/add dst-host=wima-zone.wifi action=allow
/ip/hotspot/walled-garden/add dst-host=*.wima-zone.wifi action=allow
/ip/hotspot/walled-garden/add dst-host=portal.wima-zone.wifi action=allow
/ip/hotspot/walled-garden/add dst-host=embed.tawk.to action=allow
/ip/hotspot/walled-garden/add dst-host=va.tawk.to action=allow
/ip/hotspot/walled-garden/add dst-host=*.tawk.to action=allow
/ip/hotspot/walled-garden/add dst-host=api.befiana.cloud action=allow
/ip/hotspot/walled-garden/add dst-host=*.befiana.cloud action=allow
```

### Port fanampiny

```routeros
/ip/hotspot/walled-garden/add dst-port=8728 action=allow comment="API MikroTik"
/ip/hotspot/walled-garden/add dst-port=8291 action=allow comment="Winbox"
```

## 15) Fanamarinana aorian'ny fametrahana

```routeros
/interface/veth/print
/container/mounts/print
/container/envs/print
/ip/hotspot/walled-garden/print
/ip/hotspot/walled-garden/ip/print
/container/print
```

---

## <Icon name="LogIn" color="success" /> Fidirana voalohany {#premier-acces}

Rehefa mandeha ny container, mankanesa amin'ny portail admin :

**URL :** `http://172.17.0.2` (amin'ny fitaovana ao anatin'ny tambajotra anatiny).

**Porofo fidirana voalohany** (ovao avy hatrany) :

```text
Email    : admin@wimazone.local
Password : ChangeMe!2026
```

::: danger Asa voalohany tsy maintsy atao

1. Midira amin'ny super-admin.
2. Ovao ny tenimiafina avy amin'ny **Profil → Fiarovana**.
3. Apetraho ny API MVola / Befiana ao amin'ny **Paramètres → APIs**.
4. Ampio ny routeur MikroTik ao amin'ny **Paramètres → Routeurs**.
:::

## <Icon name="Database" color="primary" /> Backup sy famerenana {#backup-restore}

### Hitahiry ny MariaDB

Sokafy ny shell anatin'ny container avy eo avoay amin'ny `mysqldump` :

```routeros
/container/shell [find where name="Wima Zone"]
```

Avy eo ao anatin'ny shell :

```bash
mysqldump -u root -p"$MARIADB_ROOT_PASSWORD" wimazone > /var/lib/mysql/backups/wimazone-$(date +%F).sql
```

Ny rakitra `.sql` dia hita avy amin'ny RouterOS ao amin'ny `usb1/billing-data/mysql/backups/`. Raha te-hampiasa lahatahiry backup manokana :

```routeros
/file/copy src=usb1/billing-data/mysql/backups/wimazone-YYYY-MM-DD.sql dst=usb1/backup/wimazone-YYYY-MM-DD.sql
```

Na alaina avy amin'ny host lavitra amin'ny SCP :

```bash
scp admin@192.168.88.1:/usb1/backup/wimazone-2026-04-24.sql ./
```

### Hamerina backup

```routeros
/container/shell [find where name="Wima Zone"]
```

Ao anatin'ny shell :

```bash
mysql -u root -p"$MARIADB_ROOT_PASSWORD" wimazone < /var/lib/mysql/backups/wimazone-YYYY-MM-DD.sql
```

::: tip Automatique
Ampio scheduler RouterOS manao dump isan'andro :

```routeros
/system/scheduler/add name=billing-backup interval=1d start-time=03:00 on-event={
  /container/shell [find where name="Wima Zone"] command="sh -c 'mysqldump -u root -p\"\$MARIADB_ROOT_PASSWORD\" wimazone > /var/lib/mysql/backups/wimazone-daily.sql'"
}
```

:::

## <Icon name="RefreshCw" color="info" /> Fanavaozana {#mise-a-jour}

Ny fanavaozana dia dingana roa : alaina ny sary vaovao avy eo averina forona ny container. Ny migration Laravel dia mandeha ho azy rehefa miverina ny container (`LARAVEL_AUTO_MIGRATION=true`).

```routeros
# 1. Ajanona ary esory ny container ankehitriny (ny data amin'ny USB tsy voakasika)
/container/stop [find where name="Wima Zone"]
/container/remove [find where name="Wima Zone"]

# 2. Averina forona amin'ny configuration mitovy
/container/add \
  name="Wima Zone" \
  remote-image=wimazone/billing:latest \
  interface=veth-billing \
  root-dir=usb1/wimazone \
  mounts=billing-db \
  envlist=billing-env \
  start-on-boot=yes \
  logging=yes

# 3. Alefa
/container/start [find where name="Wima Zone"]
```

::: warning Mitahiry aloha
Manao dump MariaDB (jereo ny fizarana eo aloha) **alohan'ny** fanavaozana.
:::

## <Icon name="Wrench" color="warning" /> Famahana olana {#depannage}

### Tsy mandeha ny container

```routeros
/container/log print where container="Wima Zone"
```

Hafatra mahazatra :

| Hafatra | Antony | Vahaolana |
|---|---|---|
| `SIGKILL` / `OOMKilled` | Tsy ampy RAM | Ahena ny queue workers, ampiasao ax2/ax3 |
| `git clone failed` | Licence diso | Hamarino `GITHUB_PRIVATE_ACCESS_TOKEN` |
| `Can't connect to MySQL server on '127.0.0.1'` | Mbola tsy vonona ny MariaDB | Miandrasa 30 s aorian'ny boot ; jereo `s6-svstat mariadb` |
| `Access denied for user 'wimazone'` | Tenimiafina DB diso | Hamarino `DB_PASSWORD` sy `MARIADB_ROOT_PASSWORD` |
| `Unknown database 'wimazone'` | Mount `/var/lib/mysql` foana na simba | Esory ny mount, avelao ny MariaDB hamorona indray |
| `502 Bad Gateway` | PHP-FPM feno | Ahena `HOTSPOT_STATUS_TIMEOUT_SECONDS=1` |
| `max_children reached` | Fangatahana be loatra | Hajao `MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW=false` |

### Diagnostic tambajotra (VETH / bridge)

```routeros
/interface/veth/print detail
/interface/bridge/port/print where bridge=dockers
/ip/address/print where interface=dockers
/ping 172.17.0.2 count=4
```

Raha tsy mamaly ny `172.17.0.2`, hamarino fa tafaray amin'ny VETH ny container :

```routeros
/container/print detail
```

### Sync hotspot mitsahatra

```routeros
/container/shell [find where name="Wima Zone"]
# Ao anatin'ny container :
php artisan hotspot:sync --router=1 --dry-run
```

### Log Laravel

Avy amin'ny shell anatin'ny container :

```bash
tail -f /var/www/html/storage/logs/laravel.log
```

### API MikroTik tsy azo idirana

Hamarino ny credentials sy ny port :

```routeros
/user/print
/ip/service/print
# API tokony alefa (port 8728) na API-SSL (8729)
/ip/service/enable api
```

---

## <Icon name="BookOpen" color="info" /> Notes fampandehanana

- `GIT_OFFLINE_FALLBACK=true` : ny container dia manomboka amin'ny kaody eto an-toerana raha tsy tafiditra ny GitHub.
- Mount `/var/lib/mysql` amin'ny `usb1/billing-data/mysql` : ny data MariaDB dia maharitra na dia averina forona aza ny container.
- `LARAVEL_AUTO_STORAGE_LINK=false` : misoroka olana amin'ny mount sasany.
- Atao mialoha ny assets frontend (tsy atao amin'ny MikroTik ny build mavesatra).
- Ho an'ny fanaraha-maso : `/container/log print follow where container="Wima Zone"`.
