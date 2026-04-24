---
title: Installation MikroTik
description: Guide complet pour installer WimaZone Billing en container sur MikroTik RouterOS v7
---

# Installation sur MikroTik

Ce guide couvre l'installation **pas-à-pas** de WimaZone Billing en mode container sur un routeur MikroTik RouterOS v7.

::: tip Avant de commencer
Assurez-vous d'avoir validé toute la [checklist de prérequis](/docs/guide/installation#requirements) : RouterOS v7.10+, USB ext4, token GitHub ITDevSuccess.
:::

## <Icon name="Router" color="warning" /> Routeurs compatibles

| Modèle | Architecture | RAM | Compatibilité |
|---|---|---:|---|
| L009UiGS-2HaxD-IN | ARM 32 bits | 512 MB | Compatible |
| L009UiGS-RM | ARM 32 bits | 512 MB | Compatible |
| hAP ax2 | ARM 64 bits | 1 GB | Compatible |
| hAP ax3 | ARM 64 bits | 1 GB | Compatible |

Les routeurs MikroTik compatibles sont disponibles à l'achat sur la boutique en ligne : **[wimazone.mg/boutique](https://wimazone.mg/boutique)**

## <Icon name="Package" color="info" /> Cibles d'image

- `linux/arm/v7` (MikroTik ARM 32)
- `linux/arm64` (MikroTik ARM 64)
- `linux/amd64` (serveur/CasaOS)

Image publique : `wimazone/billing:latest` (Docker Hub).

---

## 1) Vérifier le device-mode

Certains routeurs sortent d'usine avec `mode=home` (hAP ax2 notamment), ce qui **désactive** la fonctionnalité container. Vérifier d'abord :

```routeros
/system/device-mode/print
```

Si `mode` est différent de `advanced`, basculer :

```routeros
/system/device-mode/update mode=advanced
```

::: warning Confirmation physique requise
RouterOS vous demandera d'**appuyer sur le bouton reset physique** du routeur dans les 60 secondes pour confirmer le changement. Sans cette confirmation, la commande est annulée.
:::

## 2) Activer le support container

```routeros
/system/device-mode/update container=yes
```

Même principe : une confirmation par bouton reset est demandée. Vérifier ensuite :

```routeros
/system/device-mode/print
# doit afficher : container: yes
```

## 3) Configurer le sous-système container

Par défaut, RouterOS utilise la RAM pour les fichiers temporaires et les couches d'image — ce qui sature très vite sur MikroTik. Il faut rediriger vers l'USB :

```routeros
/container/config/set \
  registry-url=https://registry-1.docker.io \
  tmpdir=usb1/tmp \
  layerdir=usb1/layer
```

Vérifier :

```routeros
/container/config/print
```

## 4) Créer le bridge des containers

```routeros
/interface/bridge/add name=dockers comment="Bridge containers Wima Zone"
/ip/address/add address=172.17.0.1/24 interface=dockers comment="Gateway bridge containers"
```

Ajouter le bridge à la liste d'interfaces **LAN** pour que les règles firewall et DNS internes s'appliquent :

```routeros
/interface/list/member/add list=LAN interface=dockers
```

## 5) Créer l'interface VETH du container billing

```routeros
/interface/veth/add name=veth-billing address=172.17.0.2/24 gateway=172.17.0.1 comment="Wima Zone"
/interface/bridge/port/add bridge=dockers interface=veth-billing
```

## 6) Ajouter le NAT sortant des containers

```routeros
/ip/firewall/nat/add chain=srcnat src-address=172.17.0.0/24 action=masquerade comment="Containers Internet"
```

## 7) Configurer le DNS du routeur

```routeros
/ip/dns/set servers=1.1.1.1,8.8.8.8 allow-remote-requests=yes
```

## 8) Créer le stockage persistant MariaDB

L'image embarque **MariaDB** ; il faut persister son répertoire de données sur l'USB pour survivre aux redémarrages / mises à jour.

```routeros
/container/mounts/add name=billing-db src=usb1/billing-data/mysql dst=/var/lib/mysql
```

::: warning Clé USB ext4 obligatoire
Les mounts container ne fonctionnent qu'avec un stockage formaté **ext4**. Vérifier avec `/disk/print` que le device `usb1` est bien reconnu. MariaDB refuse de démarrer sur FAT32/NTFS.
:::

## 9) Variables d'environnement du container

```routeros
/container/envs/add list=billing-env key=APP_ENV value=production
/container/envs/add list=billing-env key=APP_DEBUG value=false
/container/envs/add list=billing-env key=B_CONNECTION value=mysql
/container/envs/add list=billing-env key=DB_HOST value=127.0.0.1
/container/envs/add list=billing-env key=DB_PORT value=3306
/container/envs/add list=billing-env key=DB_DATABASE value=wimazone
/container/envs/add list=billing-env key=DB_USERNAME value=wimazone
/container/envs/add list=billing-env key=DB_PASSWORD value=REMPLACER_PAR_UN_MOT_DE_PASSE_FORT
/container/envs/add list=billing-env key=MARIADB_ROOT_PASSWORD value=REMPLACER_PAR_UN_MOT_DE_PASSE_ROOT
/container/envs/add list=billing-env key=GIT_SYNC_ENABLED value=true
/container/envs/add list=billing-env key=GIT_REPOSITORY_URL value=https://github.com/ITDev-Success/billing.git
/container/envs/add list=billing-env key=GIT_BRANCH value=main
/container/envs/add list=billing-env key=GIT_OFFLINE_FALLBACK value=true
/container/envs/add list=billing-env key=GITHUB_PRIVATE_ACCESS_TOKEN value=TOKEN_FOURNI_PAR_ITDEVSUCCESS
/container/envs/add list=billing-env key=LARAVEL_AUTO_MIGRATION value=true
/container/envs/add list=billing-env key=LARAVEL_AUTO_MIGRATION_OPTIONS value=--force
/container/envs/add list=billing-env key=LARAVEL_AUTO_STORAGE_LINK value=false
/container/envs/add list=billing-env key=LARAVEL_ENABLE_QUEUE_WORKER value=true
/container/envs/add list=billing-env key=LARAVEL_ENABLE_SCHEDULER value=true
/container/envs/add list=billing-env key=LARAVEL_QUEUE_WORKER_OPTIONS value="--queue=mikrotik,default --tries=1 --timeout=1200 --sleep=2"
/container/envs/add list=billing-env key=REDIRECT_URL value=https://votre-portail.example.com
/container/envs/add list=billing-env key=HOTSPOT_STATUS_TIMEOUT_SECONDS value=2
/container/envs/add list=billing-env key=HOTSPOT_STATUS_CACHE_SECONDS value=3
/container/envs/add list=billing-env key=HOTSPOT_STATUS_FAILURE_COOLDOWN_SECONDS value=20
/container/envs/add list=billing-env key=MIKROTIK_BOOT_HOTSPOT_SYNC value=false
/container/envs/add list=billing-env key=MIKROTIK_BOOT_HOTSPOT_SYNC_ONLY_ONLINE value=true
/container/envs/add list=billing-env key=MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW value=false
```

::: info Token GitHub
`GITHUB_PRIVATE_ACCESS_TOKEN` est fourni par ITDevSuccess lors de l'achat d'une licence.
:::

## 10) Créer le container Wima Zone

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

## 11) Démarrer le container

```routeros
/container/start [find where name="Wima Zone"]
```

## 12) Vérifier les logs

```routeros
/container/log print follow where container="Wima Zone"
```

Le premier boot peut prendre **2 à 5 minutes** (clone Git + migrations Laravel). Vous devriez voir à la fin :

```text
[scheduler] started
[queue] worker listening on mikrotik,default
[nginx] listening on 0.0.0.0:80
```

## 13) Walled Garden recommandé {#walled-garden}

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

### Ports courants à autoriser

```routeros
/ip/hotspot/walled-garden/add dst-port=8728 action=allow comment="API MikroTik"
/ip/hotspot/walled-garden/add dst-port=8291 action=allow comment="Winbox"
```

## 14) Vérifications post-installation

```routeros
/interface/veth/print
/container/mounts/print
/container/envs/print
/ip/hotspot/walled-garden/print
/ip/hotspot/walled-garden/ip/print
/container/print
```

---

## <Icon name="LogIn" color="success" /> Premier accès {#premier-acces}

Une fois le container démarré, accédez au portail admin :

**URL :** `http://172.17.0.2` (depuis un appareil dans le réseau interne).

**Identifiants par défaut** (à changer immédiatement) :

```text
Email    : admin@wimazone.local
Password : ChangeMe!2026
```

::: danger Première action obligatoire

1. Connectez-vous avec le compte super-admin.
2. Changez le mot de passe depuis **Profil → Sécurité**.
3. Renseignez les APIs MVola / Befiana dans **Paramètres → APIs**.
4. Ajoutez votre routeur MikroTik dans **Paramètres → Routeurs**.
:::

## <Icon name="Database" color="primary" /> Backup & restore {#backup-restore}

### Sauvegarder la base MariaDB

Ouvrir un shell dans le container et exporter via `mysqldump` :

```routeros
/container/shell [find where name="Wima Zone"]
```

Puis, dans le shell du container :

```bash
mysqldump -u root -p"$MARIADB_ROOT_PASSWORD" wimazone > /var/lib/mysql/backups/wimazone-$(date +%F).sql
```

Le fichier `.sql` est accessible depuis RouterOS dans `usb1/billing-data/mysql/backups/`. Pour le copier vers un dossier de sauvegarde dédié :

```routeros
/file/copy src=usb1/billing-data/mysql/backups/wimazone-YYYY-MM-DD.sql dst=usb1/backup/wimazone-YYYY-MM-DD.sql
```

Ou récupérer depuis un host distant via SCP :

```bash
scp admin@192.168.88.1:/usb1/backup/wimazone-2026-04-24.sql ./
```

### Restaurer une sauvegarde

```routeros
/container/shell [find where name="Wima Zone"]
```

Dans le shell du container :

```bash
mysql -u root -p"$MARIADB_ROOT_PASSWORD" wimazone < /var/lib/mysql/backups/wimazone-YYYY-MM-DD.sql
```

::: tip Automatisation
Ajoutez un scheduler RouterOS qui déclenche un dump quotidien via le container :

```routeros
/system/scheduler/add name=billing-backup interval=1d start-time=03:00 on-event={
  /container/shell [find where name="Wima Zone"] command="sh -c 'mysqldump -u root -p\"\$MARIADB_ROOT_PASSWORD\" wimazone > /var/lib/mysql/backups/wimazone-daily.sql'"
}
```

:::

## <Icon name="RefreshCw" color="info" /> Mise à jour {#mise-a-jour}

Les mises à jour se font en deux étapes : récupération de la nouvelle image et recréation du container. Les migrations Laravel s'exécutent automatiquement au redémarrage (`LARAVEL_AUTO_MIGRATION=true`).

```routeros
# 1. Arrêter et supprimer le container actuel (les données USB sont conservées)
/container/stop [find where name="Wima Zone"]
/container/remove [find where name="Wima Zone"]

# 2. Recréer avec la même configuration
/container/add \
  name="Wima Zone" \
  remote-image=wimazone/billing:latest \
  interface=veth-billing \
  root-dir=usb1/wimazone \
  mounts=billing-db \
  envlist=billing-env \
  start-on-boot=yes \
  logging=yes

# 3. Démarrer
/container/start [find where name="Wima Zone"]
```

::: warning Toujours sauvegarder avant
Faites un dump MariaDB (cf. section précédente) **avant** toute mise à jour.
:::

## <Icon name="Wrench" color="warning" /> Dépannage {#depannage}

### Le container ne démarre pas

```routeros
/container/log print where container="Wima Zone"
```

Symptômes courants :

| Message | Cause probable | Solution |
|---|---|---|
| `SIGKILL` / `OOMKilled` | Manque de RAM | Réduire les workers queue, utiliser modèle ax2/ax3 |
| `git clone failed` | Token GitHub invalide | Vérifier `GITHUB_PRIVATE_ACCESS_TOKEN` |
| `Can't connect to MySQL server on '127.0.0.1'` | MariaDB pas encore prête | Attendre 30 s après le démarrage ; vérifier `s6-svstat mariadb` |
| `Access denied for user 'wimazone'` | Mot de passe DB incorrect | Vérifier `DB_PASSWORD` et `MARIADB_ROOT_PASSWORD` |
| `Unknown database 'wimazone'` | Mount `/var/lib/mysql` vide ou corrompu | Supprimer le mount, laisser MariaDB réinitialiser |
| `502 Bad Gateway` | PHP-FPM saturé | Baisser `HOTSPOT_STATUS_TIMEOUT_SECONDS` à 1 |
| `max_children reached` | Trop de requêtes simultanées | Garder `MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW=false` |

### Diagnostics réseau (VETH / bridge)

```routeros
/interface/veth/print detail
/interface/bridge/port/print where bridge=dockers
/ip/address/print where interface=dockers
/ping 172.17.0.2 count=4
```

Si `172.17.0.2` ne répond pas, vérifier que le container est bien attaché au VETH :

```routeros
/container/print detail
```

### Synchronisation hotspot bloquée

```routeros
/container/shell [find where name="Wima Zone"]
# Dans le container :
php artisan hotspot:sync --router=1 --dry-run
```

### Logs Laravel

Depuis un shell ouvert dans le container :

```bash
tail -f /var/www/html/storage/logs/laravel.log
```

### API MikroTik inaccessible

Vérifier les credentials et le port :

```routeros
/user/print
/ip/service/print
# API doit être activée (port 8728) ou API-SSL (8729)
/ip/service/enable api
```

---

## <Icon name="BookOpen" color="info" /> Notes d'exploitation

- `GIT_OFFLINE_FALLBACK=true` : le container démarre avec le code local si GitHub est indisponible.
- Mount `/var/lib/mysql` sur `usb1/billing-data/mysql` : les données MariaDB survivent à la recréation du container.
- `LARAVEL_AUTO_STORAGE_LINK=false` : évite un blocage au boot sur certains mounts.
- Préparer les assets frontend en amont (pas de build frontend lourd sur MikroTik).
- Pour surveiller en continu : `/container/log print follow where container="Wima Zone"`.
