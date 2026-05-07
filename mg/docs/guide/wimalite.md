---
title: Fametrahana wimalite (MikroTik CPU EN7562CT)
description: Fametrahana wimalite, version maivana PHP madio an'ny Wima Zone, mifanaraka amin'ny hEX refresh sy hEX S 2025 (CPU EN7562CT arm32v5)
---

# Fametrahana wimalite

**wimalite** dia version maivana be an'ny Wima Zone, nosoratana amin'ny **PHP madio** (fork an'ny Mikhmon). Tsy toa ny `wimazone/billing` (Laravel 11 + MariaDB), ny wimalite dia ~100 Mo fotsiny ny sary ary mihinan'angovo ~30-50 Mo RAM — izay mahatonga azy mifanaraka amin'ny MikroTik misy CPU **EN7562CT** (hEX refresh, hEX S 2025) izay voafetra amin'ny arm32v5 soft-float.

::: tip Rahoviana no ampiasaina wimalite vs wimazone/billing
- **wimazone/billing** → hotspot feno miaraka amin'ny MariaDB, facturation miabo, routeur maro, MVola. Ho an'ny L009, hAP ax², RB5009, CCR.
- **wimalite** → fitantanana hotspot fototra (voucher, session, bandwidth). Routeur tokana, PHP madio. **Hany safidy ho an'ny hEX refresh sy hEX S 2025**.
:::

## <Icon name="Router" color="warning" /> Fitaovana mifanaraka

Ny sary `wimazone/wimalite:latest` dia **multi-arch** ary mandray :

| Modely | Product code | Architecture | RAM |
|---|---|---|---:|
| hEX refresh | E50UG | arm/v5 (EN7562CT) | 512 MB |
| hEX S 2025 | E60iUGS | arm/v5 (EN7562CT) | 512 MB |
| L009UiGS | — | arm/v7 | 512 MB |
| RB4011 | RB4011iGS+ | arm/v7 | 1 GB |
| hAP ax² / ax³ | — | arm64 | 1 GB |
| RB5009 | — | arm64 | 1 GB |
| CCR2004 / 2116 | — | arm64 | 4 GB+ |
| serveur x86 / CasaOS | — | amd64 | — |

## <Icon name="Package" color="info" /> Stack ao anatiny

- **Debian bookworm slim** (mandray arm/v5, arm/v7, arm64, amd64)
- **PHP 8.3** + `mod_php` Apache (processus tokana)
- **Apache 2.4**
- Extension PHP : `sockets` (API RouterOS)
- **Tsy misy base de données** — ny config dia tehirizina ao `include/config.php`
- Fitehirizana : volume `/data` ho an'ny config + logos napetraka

## 1) Fepetra MikroTik

Mitovy amin'ny fepetra an'ny [wimazone/billing](/mg/docs/guide/installation) ho an'ny ampahany RouterOS (device-mode advanced, container=yes, bridge, VETH, NAT, DNS, USB ext4). Ny config container ihany no miova.

## 2) Mamorona mount maharitra

```routeros
/container/mounts/add name=wimalite-data src=usb1/wimalite-data dst=/data
```

Ao anaty `/data` ao amin'ny container :
- `config.php` — credentials MikroTik (server/user/password) sy settings
- `img-uploads/` — logos napetraka avy amin'ny admin

## 3) Variables tontolo iainana

Toy ny `wimazone/billing`, ny sary wimalite **tsy mitondra ny kaody PHP** — izy **maka izany avy amin'ny GitHub eo am-piaingana**. Roa variable ilaina :

```routeros
/container/envs/add list=wimalite-env key=GIT_REPOSITORY_URL value=https://github.com/ITDev-Success/wimalite.git
/container/envs/add list=wimalite-env key=GITHUB_PRIVATE_ACCESS_TOKEN value=TOKEN_OMEN_ITDEVSUCCESS
/container/envs/add list=wimalite-env key=GIT_BRANCH value=main
/container/envs/add list=wimalite-env key=GIT_SYNC_ENABLED value=true
/container/envs/add list=wimalite-env key=GIT_OFFLINE_FALLBACK value=true
/container/envs/add list=wimalite-env key=TZ value=Indian/Antananarivo
```

::: info License / token
`GITHUB_PRIVATE_ACCESS_TOKEN` dia omen'ny ITDevSuccess rehefa mividy license — **token mitovy amin'ny wimazone/billing**.
:::

::: tip Fanavaozana ho azy
Isaky ny `/container stop` + `/container start`, ny entrypoint dia manao `git pull` ary maka ny version farany an'ny kaody avy any GitHub. **Tsy mila rebuild na maka sary Docker vaovao** mba hanavao ny app — afa-tsy raha miova ny sary mihitsy (Apache, PHP, extension). Ny rakitra `/data/.image_version` dia ahafahana manamarina ny version napetraka.
:::

## 4) Mamorona sy manomboka ny container

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

Fidirana admin : `http://<ip-routeur>:8090`

## 6) Fidirana voalohany

Credentials default :

```text
Username : wimalite
Password : 1234
```

::: danger Ovao avy hatrany
Ireo credentials ireo dia hita amin'ny code source open-source. Ovao alohan'ny hampasehoana ny container amin'ny tambajotra, avy amin'ny **Settings > Sessions** ao amin'ny admin UI, na mivantana amin'ny `/data/config.php` avy amin'ny MikroTik.
:::

## <Icon name="Database" color="primary" /> Backup

Ny rakitra hany tokony hotahirizina dia `config.php` :

```routeros
/file/copy src=usb1/wimalite-data/config.php dst=usb1/backup/wimalite-config-2026-04-24.php
```

Mba hamerenana : ajanona ny container, soloy ny rakitra, alefa indray.

## <Icon name="Wrench" color="warning" /> Famahana olana

| Soritr'aretina | Antony | Vahaolana |
|---|---|---|
| Tsy mandeha ny container amin'ny hEX refresh | Sary taloha tsy misy variant arm/v5 | Maka ny sary farany |
| `GITHUB_PRIVATE_ACCESS_TOKEN manquant` | Token tsy misy ary tsy misy kaody local | Ampio ao amin'ny `wimalite-env` |
| `git clone failed` / tsy misy kaody | Token diso na GitHub tsy azo iditra | Hamarino ny token ITDevSuccess, zahao `/container/shell` + `curl https://github.com` |
| `Can't connect to MikroTik API` | IP/user/password diso ao amin'ny config.php | Hanova amin'ny admin UI na mivantana `/data/config.php` |
| Tsy mandeha ny login | Config simba | Esory `/data/config.php`, alefa indray (averina amin'ny default) |
| Log foana | Ao anatin'ny container | `/container/shell [find name="wimalite"]` avy eo `tail -f /var/log/apache2/error.log` |

## <Icon name="RefreshCw" color="info" /> Fanavaozana

```routeros
/container/stop [find where name="wimalite"]
/container/remove [find where name="wimalite"]

/container/add name="wimalite" remote-image=wimazone/wimalite:latest \
  interface=veth-wimalite root-dir=usb1/wimalite \
  mounts=wimalite-data envlist=wimalite-env \
  start-on-boot=yes logging=yes

/container/start [find where name="wimalite"]
```

Ny data dia tafita ao amin'ny `usb1/wimalite-data/`.
