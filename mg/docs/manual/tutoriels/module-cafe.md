---
title: Module Cyber Café — dingana feno
description: Manomboka amin'ny poste voalohany ka hatramin'ny libre-service
---

# Module Cyber Café — dingana feno

Ity tutoriel ity dia manaraka ny fizotra feno : mamorona poste, mamoaka code d'activation, mametraka ny client **Wima Cafe** desktop, manomboka session aloha vola na avy eo, ary mamonjy ny mode libre-service.

![Dashboard Cyber Café](/screenshots/cafe-dashboard.png)
*Fijery ankapobeny ny dashboard `/cafe` — poste, session ary MikroTik*

## <Icon name="Plus" color="info" /> 1) Mamorona poste voalohany

Menu → **Gestion du réseau → Poste** (`/cafe`).

1. Kitio **+ Poste vaovao**
2. Fenoy :

| Saha | Ohatra |
|---|---|
| **Anarana** | `PC-01` |
| **IP fixe** | `192.168.88.10` |
| **Routeur** | safidio ny MikroTik |
| **Vidiny/minitra** | `10 Ar` |
| **Mode** | `Aloha vola` na `Avy eo` |

3. **Tehirizo** — vokarina ho azy ny **code d'activation 12 isa** (`XXX-XXX-XXX-XXX`).

::: tip Code d'activation
Mifamatotra amin'ny poste manokana ity code ity. Hajao tsy ho hita — io no ampiasain'ny app Wima Cafe hanamarinana.
:::

## <Icon name="MonitorDown" color="warning" /> 2) Ampidiro ny client Wima Cafe amin'ny poste

Amin'ny PC tsirairay :

1. Alaino ny binary **Wima Cafe** (Windows `.msix` / macOS `.app` / Linux `.AppImage`)
2. Apetraho
3. Alefaso — hiseho ny ecran configuration

Fenoy :

| Saha | Sanda |
|---|---|
| URL serveur | `http://172.17.0.2:80` |
| URL WebSocket | `ws://172.17.0.2:80/ws/cafe-client` |
| Anaran'ny poste | `PC-01` |
| Code d'activation | ny 12 isa |
| Anaran'ny orinasa | `Ny Cybercafé-ko` |

Kitio **Alefa** → hidina lock screen feno ny poste.

## <Icon name="Play" color="success" /> 3) Session aloha vola

Avy amin'ny admin :

1. Dashboard `/cafe` → andalana `PC-01`
2. Kitio **Manomboka session**
3. Fidio :
   - **Faharetana** : 30 min / 1h / 2h / custom
   - **Mpanjifa** : voucher na anarana
   - **Mode** : Vola madio / MVola / Vola aloha
4. Manamafy

Amin'ny mpanjifa : miafina ny lock screen, afaka mampiasa ny bureau, badge mampiseho ny fotoana sisa.

## <Icon name="Clock" color="primary" /> 4) Session avy eo vao mandoa

Mitovy fa **Mode avy eo** voakitikitika. Tsy misy fandoavana amin'ny fanombohana. Amin'ny fiafarana :

1. Kitio **Ajanona**
2. Kajian'ny rafitra `ceil(segondra/60) × vidiny/min`
3. Ny admin mitaky ny vidiny

## <Icon name="UserCheck" color="info" /> 5) Mode libre-service

Hahafahan'ny mpanjifa manomboka tena (tsy mila admin) :

1. Dashboard → poste → **Alefaso libre-service**
2. Apetraho ny vidiny default sy ny faharetana max
3. Tehirizo

Amin'ny mpanjifa : ny lock screen mampiseho bouton **Manomboka session-ko**. Manapa-kevitra, mandoa (MVola na voucher), misokatra ho azy ny session.

## <Icon name="Ban" color="danger" /> 6) Fanidiana amin'ny fangatahana

Amin'ny fotoana rehetra, avy amin'ny dashboard :

- **Hidio** → mamerina ny lock screen
- **Esory** → manaisotra ny poste + mamafa ny IP binding MikroTik

## <Icon name="RefreshCw" color="warning" /> 7) Sync amin'ny MikroTik

Raha misy poste tsy mifanaraka :

1. Dashboard `/cafe` → **Sync MikroTik** ambony
2. Averin'ny rafitra ny lalàna IP binding tsirairay

## <Icon name="AlertTriangle" color="danger" /> Famahana olana

| Tarehy | Vahaolana |
|---|---|
| Client voafantina "Poste inconnu 404" | Hamarino fa mitovy ny anaran'ny poste |
| Session nandeha nefa mbola voasakana ny poste | Kitio **Sync MikroTik** |
| Tsy voafantina ny app Wima Cafe | Avereno forona ny code d'activation |
| Ny lock screen tsy manarona ny ecran feno | Jereo raha mandeha amin'ny mode kiosk |

## Jereo ihany koa

- [Fijery Module Cyber Café](/mg/docs/manual/cafe/)
- [Fametrahana MikroTik cafe](/mg/docs/manual/cafe/mikrotik)
- [Client Logiciel Wima Cafe](/mg/docs/manual/cafe/client)
