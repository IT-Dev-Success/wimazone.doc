---
title: Fametrahana AP MikroTik
description: Hampifanaraka Access Point MikroTik (Wi-Fi dual-band) miaraka amin'ny routeur Wima Zone fototra
---

# Fametrahana AP MikroTik

Ity pejy ity dia manazava ny fomba fametrahana **point d'accès Wi-Fi MikroTik dual-band** (2.4 GHz + 5 GHz) izay handefa ny SSID **Wima Zone** ao amin'ny faritra rakofany. Ny AP dia ampidirina amin'ny **LAN** an'ny routeur fototra izay mampandeha ny portail captif sy ny container billing.

::: tip Toe-javatra ampiasana
- **1 routeur fototra** (L009, hAP ax³, RB5009, RB4011…) misy container `wimazone/billing` sy hotspot voapetraka.
- **N point d'accès** (wAP ax, hAP ax², cAP ax, sns.) napetraka eny rehetra eny ho an'ny rakon-Wi-Fi — samy amin'ny mode bridge transparente mankany amin'ny LAN-n'ny routeur fototra.

Ny mpanjifa miditra amin'ny SSID dia atondro mankany amin'ny portail captif an'ny routeur fototra.
:::

## <Icon name="Router" color="warning" /> Modely AP soso-kevitra

| Modely | Code | Tarehy | Backhaul |
|---|---|---|---|
| **wAP ax** | L22UGS-5HaxD2HaxD | 2.4 + 5 GHz Wi-Fi 6 | SFP / Ethernet |
| **cAP ax** | cAPGi-5HaxD2HaxD | 2.4 + 5 GHz Wi-Fi 6 | PoE |
| **hAP ax²** | C52iG-5HaxD2HaxD-TC | 2.4 + 5 GHz Wi-Fi 6 | Ethernet |
| **hAP ax³** | C53UiG+5HPaxD2HPaxD | 2.4 + 5 GHz Wi-Fi 6 | Ethernet (tsara ho an'ny hot-spot mafy) |

::: warning RouterOS 7.13+ ilaina
Ny syntaxe `/interface/wifi/` (tsy `wave2`) dia niseho tamin'ny RouterOS 7.13. Ny modely taloha amin'ny `/interface/wifiwave2/` dia mbola azo ampiasaina fa miova ny syntaxe — alefaso ny baiko mifanaraka.
:::

## 1) Fidirana voalohany amin'ny AP

Ampifandraiso amin'ny cable Ethernet ny port LAN-n'ny AP. Default IP : `192.168.88.1/24`. Atao 192.168.88.10 ny IP-n'ny PC anao, ary midira amin'ny :

- **Winbox** → `192.168.88.1` → user `admin`, tenimiafina foana (avadiho avy hatrany)
- **SSH** → `ssh admin@192.168.88.1`
- **WebFig** → <http://192.168.88.1>

::: danger Ovao ny tenimiafina admin
```routeros
/user/set admin password=TENIMIAFINA_MATANJAKA
```
:::

## 2) Reset orinasa (azo atao fa soso-kevitra)

Raha efa voapetraka ny AP, atao reset mba hisorohana ny olana :

```routeros
/system/reset-configuration no-defaults=yes skip-backup=yes
```

Hiverina ny AP, tsy misy intsony config. Miverina indray amin'ny MAC via Winbox.

## 3) Mamorona bridge LAN

Ny bridge dia hampikambana ny port uplink (SFP na Ethernet arakaraka ny modely) sy ny interface Wi-Fi roa :

```routeros
/interface/bridge
add name=bridge protocol-mode=rstp
```

`protocol-mode=rstp` mba hialana amin'ny boucle raha mametraka AP maromaro.

## 4) Ampio amin'ny bridge ny port

Ovay ny anaran'ny uplink arakaraky ny modely :
- **wAP ax (L22UGS)** → `sfp1` (fibre) na `ether1`
- **hAP ax²/ax³** → `ether1`
- **cAP ax** → `ether1` (PoE in)

```routeros
/interface/bridge/port
add bridge=bridge interface=sfp1
add bridge=bridge interface=wifi1
add bridge=bridge interface=wifi2
```

## 5) Datapath Wi-Fi iray

Ny datapath dia mampifandray ny radio Wi-Fi amin'ny bridge :

```routeros
/interface/wifi/datapath
add name=dp1 bridge=bridge
```

## 6) Configurations Wi-Fi (2.4 GHz + 5 GHz)

```routeros
/interface/wifi/configuration
add name=cfg-2g mode=ap ssid="Wima Zone 2G" country="South Africa" \
    channel.band=2ghz-n channel.width=20mhz datapath=dp1
add name=cfg-5g mode=ap ssid="Wima Zone 5G" country="South Africa" \
    channel.band=5ghz-ac datapath=dp1
```

::: tip Maninona `country="South Africa"` ?
Tsy lalandava ao anaty ny lisitra régulatoire RouterOS ny Madagascar. **South Africa** no profil akaiky indrindra (mitovy ny bande 2.4 / 5 GHz azo ampiasaina, mitovy ny herinaratra). Raha tohanan'ny AP-nao mivantana ny `country="Madagascar"`, ampiasao izany.
:::

::: info SSID iray 2G/5G (safidy)
Mba hahafahan'ny mpanjifa hifindra automatique-ny eo amin'ny 2.4 sy 5 GHz arakaraky ny signal, ampiasao **SSID mitovy** ho an'ny roa :

```routeros
add name=cfg-2g mode=ap ssid="Wima Zone" ...
add name=cfg-5g mode=ap ssid="Wima Zone" ...
```

Raha tsy izany, tano samihafa (`Wima Zone 2G` / `Wima Zone 5G`) ho an'ny fanaraha-maso manokana — mahasoa amin'ny cyber-café izay ilaina ho any amin'ny 5G ny poste raikitra.
:::

## 7) Alefaso ny radio

```routeros
/interface/wifi
set wifi1 configuration=cfg-2g disabled=no
set wifi2 configuration=cfg-5g disabled=no
```

## 8) IP management an'ny AP

Tsy mila DHCP server ny AP — ny routeur fototra no manome ny IP an'ny mpanjifa. Fa kosa, ilaina ny manana IP fixe ho an'ny AP mba hahafahana mitantana azy lavitra :

```routeros
/ip/address
add address=192.168.88.2/24 interface=bridge
```

::: warning IP samihafa isaky ny AP
Raha mametraka AP maromaro ianao, **ampio** ny adiresy : 192.168.88.2, .3, .4… (na manokana plage `192.168.88.200-250` ho an'ny AP ao anatin'ny DHCP an'ny routeur fototra).
:::

## 9) Fanamarinana

```routeros
/interface/wifi/print          # wifi1 + wifi2 amin'ny `running`
/interface/bridge/port/print   # sfp1, wifi1, wifi2 ao amin'ny `bridge`
/ip/address/print              # 192.168.88.2/24 amin'ny bridge
/interface/wifi/registration-table/print  # mpanjifa miditra
```

Amin'ny smartphone : jereo raha miseho ao anaty lisitra ny SSID **Wima Zone 2G** (na/sy 5G). Fifandraisana → fanondranana ho amin'ny portail captif Wima Zone (avy amin'ny routeur fototra).

## 10) Mifamatotra amin'ny routeur fototra Wima Zone

Ny AP dia mandeha amin'ny **L2 bridge transparente** — tsy manao NAT, tsy manome DHCP, tsy manana hotspot. Ireo dia mijanona amin'ny routeur fototra.

```text
[Internet]
   │
[Router fototra Wima Zone] ── hotspot + container billing
   │ (LAN: 192.168.88.1/24, DHCP 192.168.88.10-199)
   ├── eth2 ─────► [AP no 1 — 192.168.88.2]  📡 Wima Zone 2G/5G
   ├── eth3 ─────► [AP no 2 — 192.168.88.3]  📡 Wima Zone 2G/5G
   └── eth4 ─────► [AP no 3 — 192.168.88.4]  📡 Wima Zone 2G/5G
```

Ny mpanjifa miditra na amin'ny AP iza, dia mahazo IP avy amin'ny DHCP central, voafandriky ny hotspot an'ny routeur fototra, ary atondro mankany amin'ny portail captif.

## <Icon name="Wrench" color="warning" /> Famahana olana

| Soritr'aretina | Antony | Vahaolana |
|---|---|---|
| SSID tsy hita | `country` voapetraka tsy mety | Andramo `country="South Africa"` na `"Madagascar"` |
| Mpanjifa miditra fa tsy mahazo IP | DHCP-n'ny routeur fototra tsy tonga any amin'ny AP | Hamarino fa `sfp1`/`ether1` an'ny AP dia tao anaty bridge, ary cable amin'ny port LAN an'ny routeur fototra (tsy WAN) |
| Tsy misy fanondranana portail captif | Hotspot an'ny routeur fototra tsy alefa amin'ny bridge | Amin'ny routeur fototra : `/ip/hotspot/print` jereo raha bridge LAN ny interface |
| AP tsy azo iditra aorian'ny config | IP management diso | Reset orinasa (`/system/reset-configuration`) + miverina |
| Boucle network / deconnexions | RSTP tsy mandeha | `protocol-mode=rstp` amin'ny bridge (jereo `/interface/bridge/print`) |
| Wi-Fi 6 (ax) tsy hita amin'ny mpanjifa sasany | Mode tery amin'ny `ac` | `channel.band=5ghz-ax` (fa tsy `5ghz-ac`) — hamarino ny mpanjifa raha mifanaraka |

## <Icon name="Database" color="primary" /> Backup config AP

```routeros
/export file=ap-config-2026-05-14
```

Hiseho ao amin'ny `/file/print` ny rakitra `ap-config-2026-05-14.rsc` — azonao alaina amin'ny Winbox / SFTP. Mba hamerenana : `/import file-name=ap-config-2026-05-14.rsc`.
