---
title: Installation wimalite (MikroTik CPU EN7562CT)
description: Déploiement de wimalite, version légère PHP pur de Wima Zone, compatible hEX refresh et hEX S 2025 (CPU EN7562CT arm32v5)
---

# Installation wimalite

**wimalite** est une version ultra-légère de Wima Zone, écrite en **PHP pur** (fork de Mikhmon). Contrairement à `wimazone/billing` (Laravel 11 + MariaDB), wimalite tient en **~100 Mo d'image** et consomme **~30-50 Mo de RAM** au runtime — ce qui la rend compatible avec les MikroTik à CPU **EN7562CT** (hEX refresh, hEX S 2025) dont le sandbox container est restreint à arm32v5 soft-float.

::: tip Quand utiliser wimalite vs wimazone/billing
- **wimazone/billing** → hotspot complet avec MariaDB, facturation avancée, multi-routeurs, MVola intégré. Pour L009, hAP ax³, RB5009, CCR.
- **wimalite** → gestion hotspot basique (vouchers, sessions, bandwidth). Single-router, PHP pur. **Seule option pour hEX refresh et hEX S 2025**.
:::

## <Icon name="Router" color="warning" /> Matériel compatible

L'image `wimazone/wimalite:latest` est **multi-arch** et couvre :

| Modèle | Product code | Architecture | RAM |
|---|---|---|---:|
| hEX refresh | E50UG | arm/v5 (EN7562CT) | 512 MB |
| hEX S 2025 | E60iUGS | arm/v5 (EN7562CT) | 512 MB |
| L009UiGS | — | arm/v7 | 512 MB |
| RB4011 | RB4011iGS+ | arm/v7 | 1 GB |
| hAP ax³ | — | arm64 | 1 GB |
| RB5009 | — | arm64 | 1 GB |
| CCR2004 / 2116 | — | arm64 | 4 GB+ |
| serveur x86 / CasaOS | — | amd64 | — |

## <Icon name="Package" color="info" /> Stack embarquée

- **Debian bookworm slim** (couvre arm/v5, arm/v7, arm64, amd64)
- **PHP 8.3** + `mod_php` Apache (un seul processus)
- **Apache 2.4**
- Extension PHP : `sockets` (API RouterOS)
- **Aucune base de données** — config stockée dans `include/config.php`
- Persistance : volume `/data` pour config + logos uploadés

## 1) Prérequis MikroTik

Identique aux prérequis [wimazone/billing](/docs/guide/installation) pour la partie RouterOS (device-mode advanced, container=yes, bridge, VETH, NAT, DNS, USB ext4). Seule la config container change.

## 2) Créer le mount persistant

```routeros
/container/mounts/add name=wimalite-data src=usb1/wimalite-data dst=/data
```

Le dossier `/data` du container contient :
- `config.php` — credentials MikroTik (serveur/user/password) et settings
- `img-uploads/` — logos custom uploadés via l'admin

## 3) Variables d'environnement

Comme `wimazone/billing`, l'image wimalite **ne contient pas le code PHP** — elle le **télécharge au boot** via l'API wimazone (license-gated). Variable obligatoire :

```routeros
/container/envs/add list=wimalite-env key=WIMAZONE_LICENSE_KEY value=LIC-XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX
/container/envs/add list=wimalite-env key=OFFLINE_FALLBACK value=true
/container/envs/add list=wimalite-env key=TZ value=Indian/Antananarivo
```

::: info Licence
`WIMAZONE_LICENSE_KEY` est fournie par ITDevSuccess lors de l'achat d'une licence — clé propre à chaque routeur, révocable individuellement depuis le portail admin.
:::

::: tip Mise à jour automatique
À chaque `/container stop` + `/container start`, l'entrypoint fait un `git pull` et récupère la dernière version du code depuis GitHub. **Pas besoin de rebuild ni de pull d'une nouvelle image Docker** pour mettre à jour l'app — sauf si l'image elle-même change (Apache, PHP, extension). Le fichier `/data/.image_version` permet de vérifier la version d'image déployée.
:::

## 4) Créer et démarrer le container

```routeros
/interface/veth/add name=veth-wimalite address=172.17.0.3/24 gateway=172.17.0.1 comment="wimalite"
/interface/bridge/port/add bridge=dockers interface=veth-wimalite

/container/add \
  name="wimalite" \
  remote-image=wimazone/wimalite:latest \
  interface=veth-wimalite \
  root-dir=usb1/wimalite \
  mounts=wimalite-data \
  envlist=wimalite-env \
  start-on-boot=yes \
  logging=yes

/container/start [find where name="wimalite"]
```

## 5) Redirection firewall

```routeros
/ip/firewall/nat/add chain=dstnat protocol=tcp dst-port=8090 action=dst-nat \
  to-addresses=172.17.0.3 to-ports=80 comment="Redirection wimalite"

/ip/firewall/filter/add chain=input protocol=tcp dst-port=8090 action=accept comment="wimalite admin"
```

Accès admin : `http://<ip-routeur>:8090`

## 6) Premier login

Identifiants par défaut :

```text
Username : wimalite
Password : 1234
```

::: danger À changer immédiatement
Ces identifiants sont publics (code source open-source). Change-les avant d'exposer le container sur un réseau, via **Settings > Sessions** dans l'admin UI, ou directement en éditant `/data/config.php` côté MikroTik.
:::

## <Icon name="Database" color="primary" /> Backup

Le seul fichier à sauvegarder est `config.php` :

```routeros
/file/copy src=usb1/wimalite-data/config.php dst=usb1/backup/wimalite-config-2026-04-24.php
```

Pour restaurer : arrêter le container, remplacer le fichier, redémarrer.

## <Icon name="Wrench" color="warning" /> Dépannage

| Symptôme | Cause | Solution |
|---|---|---|
| Container ne démarre pas sur hEX refresh | Ancienne image sans variant arm/v5 | Pull la dernière image |
| `WIMAZONE_LICENSE_KEY manquante` | Clé absente et pas de code local | Ajouter la clé dans `wimalite-env` |
| `licence rejetee (HTTP 401/403)` | Licence invalide ou révoquée | Vérifier la clé dans le portail admin |
| `Can't connect to MikroTik API` | Mauvais IP/user/password dans config.php | Éditer via admin UI ou directement `/data/config.php` |
| Login ne fonctionne pas | Config corrompue | Supprimer `/data/config.php`, redémarrer (réinit au défaut) |
| Logs vides | Apache logs dans le container | `/container/shell [find name="wimalite"]` puis `tail -f /var/log/apache2/error.log` |

## <Icon name="RefreshCw" color="info" /> Mise à jour

```routeros
/container/stop [find where name="wimalite"]
/container/remove [find where name="wimalite"]

/container/add name="wimalite" remote-image=wimazone/wimalite:latest \
  interface=veth-wimalite root-dir=usb1/wimalite \
  mounts=wimalite-data envlist=wimalite-env \
  start-on-boot=yes logging=yes

/container/start [find where name="wimalite"]
```

Les données persistent dans `usb1/wimalite-data/`.
