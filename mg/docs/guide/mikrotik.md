---
title: Torolàlana Fametrahana MikroTik
---

# Torolàlana Fametrahana MikroTik

Ity torolàlana ity dia mikasika ny fametrahana feno ny WimaZone Billing amin'ny routeur MikroTik amin'ny fomba container.

## Routeur tohanan (referansa tetikasa)

| Modely | Rafitra | RAM | Fitoviana |
|---|---|---:|---|
| L009UiGS-2HaxD-IN | ARM 32-bit | 512 MB | Mifanaraka |
| L009UiGS-RM | ARM 32-bit | 512 MB | Mifanaraka |
| hAP ac3 | ARM 32-bit | 256 MB | Mifanaraka |
| hAP ax2 | ARM 64-bit | 1 GB | Mifanaraka |
| hAP ax3 | ARM 64-bit | 1 GB | Mifanaraka |

Ny routeur MikroTik mifanaraka dia azo vidiana amin'ny fivarotana an-tserasera: **[wimazone.mg/boutique](https://wimazone.mg/boutique)**

## Rafitra sary kendrena

- `linux/arm/v7` (MikroTik ARM 32)
- `linux/arm64` (MikroTik ARM 64)
- `linux/amd64` (serveur/CasaOS)

## 1) Alefaso ny fanohanana container

```routeros
/system/device-mode/update container=yes
```

Avereno alefa ny routeur raha ilaina.

## 2) Mamorona ny tetezana container

```routeros
/interface/bridge/add name=dockers comment="Bridge containers Wima Zone"
/ip/address/add address=172.17.0.1/24 interface=dockers comment="Gateway bridge containers"
```

## 3) Mamorona ny interface VETH billing

```routeros
/interface/veth/add name=veth-billing address=172.17.0.2/24 gateway=172.17.0.1 comment="Wima Zone"
/interface/bridge/port/add bridge=dockers interface=veth-billing
```

## 4) Ampio NAT mivoaka ho an'ny containers

```routeros
/ip/firewall/nat/add chain=srcnat src-address=172.17.0.0/24 action=masquerade comment="Containers Internet"
```

## 5) Apetraho ny DNS routeur

```routeros
/ip/dns/set servers=1.1.1.1,8.8.8.8 allow-remote-requests=yes
```

## 6) Mamorona fitahirizana SQLite maharitra

```routeros
/container/mounts/add name=billing-db src=usb1/billing-data dst=/data
```

Lalana database maharitra antenaina:

```text
/data/database.sqlite
```

## 7) Variables tontolo iainana container

```routeros
/container/envs/add list=billing-env key=APP_ENV value=production
/container/envs/add list=billing-env key=APP_DEBUG value=false
/container/envs/add list=billing-env key=DB_DATABASE value=/data/database.sqlite
/container/envs/add list=billing-env key=GIT_SYNC_ENABLED value=true
/container/envs/add list=billing-env key=GIT_REPOSITORY_URL value=https://github.com/ITDev-Success/billing.git
/container/envs/add list=billing-env key=GIT_BRANCH value=main
/container/envs/add list=billing-env key=GIT_OFFLINE_FALLBACK value=true
/container/envs/add list=billing-env key=GITHUB_PRIVATE_ACCESS_TOKEN value=TOKEN_PROVIDED_BY_ITDEVSUCCESS
/container/envs/add list=billing-env key=LARAVEL_AUTO_MIGRATION value=true
/container/envs/add list=billing-env key=LARAVEL_AUTO_MIGRATION_OPTIONS value=--force
/container/envs/add list=billing-env key=LARAVEL_AUTO_STORAGE_LINK value=false
/container/envs/add list=billing-env key=LARAVEL_ENABLE_QUEUE_WORKER value=true
/container/envs/add list=billing-env key=LARAVEL_ENABLE_SCHEDULER value=true
/container/envs/add list=billing-env key=LARAVEL_QUEUE_WORKER_OPTIONS value="--queue=mikrotik,default --tries=1 --timeout=1200 --sleep=2"
/container/envs/add list=billing-env key=REDIRECT_URL value=https://your-portal.example.com
/container/envs/add list=billing-env key=HOTSPOT_STATUS_TIMEOUT_SECONDS value=2
/container/envs/add list=billing-env key=HOTSPOT_STATUS_CACHE_SECONDS value=3
/container/envs/add list=billing-env key=HOTSPOT_STATUS_FAILURE_COOLDOWN_SECONDS value=20
/container/envs/add list=billing-env key=MIKROTIK_BOOT_HOTSPOT_SYNC value=false
/container/envs/add list=billing-env key=MIKROTIK_BOOT_HOTSPOT_SYNC_ONLY_ONLINE value=true
/container/envs/add list=billing-env key=MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW value=false
```

> Ny `GITHUB_PRIVATE_ACCESS_TOKEN` dia omen'ny ITDevSuccess.

## 8) Mamorona ny container Wima Zone

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

## 9) Alefaso ny container

```routeros
/container/start [find where name="Wima Zone"]
```

## 10) Jereo ny logs

```routeros
/container/log print follow where container="Wima Zone"
```

## 11) Fitsipika Walled Garden soso-kevitra

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

### Port mahazatra azo avela

```routeros
/ip/hotspot/walled-garden/add dst-port=8728 action=allow comment="MikroTik API"
/ip/hotspot/walled-garden/add dst-port=8291 action=allow comment="Winbox"
```

## 12) Fitsirihana mahasoa

```routeros
/interface/veth/print
/container/mounts/print
/container/envs/print
/ip/hotspot/walled-garden/print
/ip/hotspot/walled-garden/ip/print
```

## 13) Fanamarihana fiasana

- `GIT_OFFLINE_FALLBACK=true`: ny container dia manomboka amin'ny kaody eo an-toerana rehefa tsy misy ny GitHub.
- `DB_DATABASE=/data/database.sqlite`: ny DB dia maharitra na misy famerenana container.
- `LARAVEL_AUTO_STORAGE_LINK=false`: misoroka ny fisakanana fanombohana amin'ny fametrahana mount sasany.
- Omano mialoha ny asset frontend (soroka ny fananganana frontend mavesatra amin'ny MikroTik).

## 14) Famahana olana haingana

Raha mahita `SIGKILL`, `502`, na `max_children` ianao:

1. Jereo ny fahatsiarovana host / fepetra OOM.
2. Hamarino ny porofon'ny API sy ny port (`8728`/`8729`).
3. Hamarino fa voafangaro ny rakitra hotspot.
4. Tehirizo `MIKROTIK_BOOT_HOTSPOT_SYNC_PROCESS_NOW=false`.
5. Tehirizo ny sanda timeout/cache/cooldown `/hotspot/status` voapetraka.
