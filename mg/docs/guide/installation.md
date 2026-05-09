---
title: Fepetra Takiana MikroTik
description: Fitaovana, RouterOS ary fanamarinana alohan'ny hametrahana Wima Zone Billing amin'ny container MikroTik
---

# Fepetra Takiana MikroTik

Ity pejy ity dia mamintina ny zavatra rehetra tokony ho vonona **alohan'ny** hanarahana ny [Torolàlana fametrahana MikroTik](/mg/docs/guide/mikrotik). Wima Zone Billing dia apetraka amin'ny **mode container RouterOS v7** ihany, miaraka amin'ny **MariaDB** ao anatin'ny container ary maharitra amin'ny USB. Ny sary Docker dia multi-arch ho an'ny ARM 32 (armv7) sy ARM 64 bits.

## <Icon name="Router" color="warning" /> Fitaovana mifanaraka {#requirements}

Routeur MikroTik voatsapa sy tohanana :

| Modely | Architecture | RAM | USB soso-kevitra |
|---|---|---:|---|
| L009UiGS-2HaxD-IN | ARM 32 bits (armv7) | 512 MB | USB ≥ 8 GB |
| L009UiGS-RM | ARM 32 bits (armv7) | 512 MB | USB ≥ 8 GB |
| hAP ax3 | ARM 64 bits | 1 GB | USB ≥ 16 GB |
| RB5009 | ARM 64 bits | 1 GB | USB ≥ 16 GB |

::: danger wimazone/billing : tsy tohanana (CPU EN7562CT)
Ny **hEX refresh (E50UG)** sy ny **hEX S 2025 (E60iUGS)** dia mampiasa CPU Airoha EN7562CT, izay voafetra amin'ny **arm32v5 soft-float ihany** ao amin'ny sandbox container RouterOS ([doc ofisialin'ny MikroTik](https://help.mikrotik.com/docs/display/ROS/Container#Container-Requirements)). Izany dia tsy mifanaraka amin'ny Alpine musl armhf (ARMv7 hard-float) izay fototry ny `wimazone/billing`.

**Safidy hafa** : ampiasao [**wimalite**](/mg/docs/guide/wimalite), version PHP madio an'ny Wima Zone izay ~100 Mo fotsiny ary mandeha amin'ny arm32v5 (mifanaraka amin'ny hEX refresh sy hEX S 2025).
:::

::: tip Fivarotana
Ireo modely ireo dia azo vidiana ao amin'ny **[wimazone.mg/boutique](https://wimazone.mg/boutique)**.
:::

## <Icon name="Cpu" color="info" /> RouterOS

- **RouterOS 7.10+** (fitohanana maharitra an'ny mode container).
- License **Level 4** farafahakeliny.
- `device-mode` amin'ny **`advanced`** (ny `home` default dia manakana ny container).
- Ny `container` azo alefa amin'ny `/system/device-mode` (fanamarinana amin'ny bouton reset).
- Ora NTP mifandrindra (raha tsy izay dia mety tsy handeha ny TLS).

## <Icon name="HardDrive" color="primary" /> Fitehirizana USB

- USB voatsipika amin'ny **ext4** (tsy handeha ny MariaDB amin'ny FAT32/NTFS).
- **16 GB** soso-kevitra (sary ~150 MB + data MariaDB + backup + log).
- Herinaratra mirindra : halaviro ny USB hub tsy misy adapteur amin'ny ax2/ax3.

## <Icon name="Network" color="success" /> Tambajotra

- Fidirana Internet ivelany (port 443) ho an'ny `docker.io`, `github.com` ary ny API ITDevSuccess.
- Port **8728** (API MikroTik) na **8729** (API-SSL) malalaka an-trano.
- Plage IP ho an'ny bridge container : `172.17.0.0/24` (azo ovaina).
- DNS mandeha tsara amin'ny routeur (`/ip/dns`).

## <Icon name="Key" color="warning" /> License & fidirana

- **Licence** omen'ny ITDevSuccess (variable `GITHUB_PRIVATE_ACCESS_TOKEN`).
- Porofon'ny **MVola** raha alefa ny fandoavana mobile.
- Fidirana **Befiana SMS** raha alefa ny fampandrenesana SMS.

## <Icon name="CheckCircle" color="success" /> Lisitra hamarinina {#post-installation}

Alohan'ny hanombohana ny baiko fametrahana :

- [ ] RouterOS v7.10+ apetraka sy nohavaozina (`/system/package/update check-for-updates`)
- [ ] `device-mode` amin'ny `advanced` (`/system/device-mode/print`)
- [ ] USB voapetraka sy voatsipika ext4 (`/disk/print`) miaraka amin'ny lahatahiry `tmp/`, `layer/` sy `billing-data/`
- [ ] DNS routeur mandeha (`/ip/dns/print`)
- [ ] Ora system mifandrindra (`/system/ntp/client/print`)
- [ ] Licence azo tamin'ny ITDevSuccess
- [ ] Tenimiafina MariaDB voafidy (`DB_PASSWORD` + `MARIADB_ROOT_PASSWORD`)
- [ ] URL portail captif voadidy (`REDIRECT_URL`)
- [ ] Walled Garden voakasa ho an'ny domain lehibe (MVola, Befiana, Tawk)

::: warning Dingana manaraka
Vonona daholo ny fepetra ? Tohizo amin'ny **[Torolàlana fametrahana MikroTik](/mg/docs/guide/mikrotik)** ho an'ny baiko tsirairay.
:::
