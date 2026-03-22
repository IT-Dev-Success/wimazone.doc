---
title: MikroTik Installation Guide
---

# MikroTik Installation Guide

Ce guide couvre l’installation complète de WimaZone Billing sur un routeur MikroTik en mode container.

## Routeurs compatibles (référence projet)

| Modèle | Architecture | RAM | Compatibilité |
|---|---|---:|---|
| L009UiGS-2HaxD-IN | ARM 32 bits | 512 MB | Compatible |
| L009UiGS-RM | ARM 32 bits | 512 MB | Compatible |
| hAP ac3 | ARM 32 bits | 256 MB | Compatible |
| hAP ax2 | ARM 64 bits | 1 GB | Compatible |
| hAP ax3 | ARM 64 bits | 1 GB | Compatible |

Les routeurs MikroTik compatibles sont disponibles à l’achat sur la boutique en ligne : **[wimazone.mg/boutique](https://wimazone.mg/boutique)**

## Cibles d’image

- `linux/arm/v7` (MikroTik ARM 32)
- `linux/arm64` (MikroTik ARM 64)
- `linux/amd64` (serveur/CasaOS)

## 1) Activer le support container

```routeros
/system/device-mode/update container=yes
```

Redémarrer le routeur si nécessaire.

## 2) Créer le bridge des containers

```routeros
/interface/bridge/add name=dockers comment="Bridge containers Wima Zone"
/ip/address/add address=172.17.0.1/24 interface=dockers comment="Gateway bridge containers"
```

## 3) Créer l’interface VETH du container billing

```routeros
/interface/veth/add name=veth-billing address=172.17.0.2/24 gateway=172.17.0.1 comment="Wima Zone"
/interface/bridge/port/add bridge=dockers interface=veth-billing
```

## 4) Ajouter le NAT sortant des containers

```routeros
/ip/firewall/nat/add chain=srcnat src-address=172.17.0.0/24 action=masquerade comment="Containers Internet"
```

## 5) Configurer le DNS du routeur

```routeros
/ip/dns/set servers=1.1.1.1,8.8.8.8 allow-remote-requests=yes
```

## 6) Créer le stockage persistant SQLite

```routeros
/container/mounts/add name=billing-db src=usb1/billing-data dst=/data
```

Base persistante attendue:

```text
/data/database.sqlite
```

## 7) Variables d’environnement du container

```routeros
/container/envs/add list=billing-env key=APP_ENV value=production
/container/envs/add list=billing-env key=APP_DEBUG value=false
/container/envs/add list=billing-env key=DB_DATABASE value=/data/database.sqlite
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

> `GITHUB_PRIVATE_ACCESS_TOKEN` est fourni par ITDevSuccess.

## 8) Créer le container Wima Zone

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

## 9) Démarrer le container

```routeros
/container/start [find where name="Wima Zone"]
```

## 10) Vérifier les logs

```routeros
/container/log print follow where container="Wima Zone"
```

## 11) Walled Garden recommandé

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

## 12) Vérifications utiles

```routeros
/interface/veth/print
/container/mounts/print
/container/envs/print
/ip/hotspot/walled-garden/print
/ip/hotspot/walled-garden/ip/print
```

## 13) Notes d’exploitation

- `GIT_OFFLINE_FALLBACK=true`: le container démarre avec le code local si GitHub est indisponible.
- `DB_DATABASE=/data/database.sqlite`: persistance DB lors recréation container.
- `LARAVEL_AUTO_STORAGE_LINK=false`: évite un blocage au boot sur certains mounts.
- Préparer les assets frontend en amont (pas de build frontend lourd sur MikroTik).

## 14) Dépannage rapide

Si tu vois `SIGKILL`, `502`, ou `max_children`:

1. Vérifier OOM/mémoire du host.
2. Vérifier identifiants API/port (`8728`/`8729`).
3. Vérifier que les fichiers hotspot sont bien synchronisés.
4. Garder `MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW=false`.
5. Garder timeout/cache/cooldown de `/hotspot/status`.
