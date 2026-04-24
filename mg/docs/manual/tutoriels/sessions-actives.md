---
title: Manaraha ny session mavitrika
description: Fanaraha-maso sy fanaisorana
---

# Manaraha ny session mavitrika

Ny panneau **Sessions Mavitrika** dia mampiseho ny mpanjifa tafiditra amin'ny fotoana tena izy.

## <Icon name="Activity" color="info" /> 1) Sokafy ny panneau

Menu → **Gestion des clients → Sessions Mavitrika**.

Mivoatra isaky ny 5 segondra ny lisitra (WebSocket Reverb).

## <Icon name="Users" color="primary" /> 2) Mombamomba azy

Ho an'ny session tsirairay :

| Colonne | Votoaty |
|---|---|
| **Mpanjifa** | Anarana na ID voucher |
| **IP** | IP nomen'ny DHCP |
| **MAC** | MAC an'ny fitaovana |
| **Routeur** | Anaran'ny MikroTik |
| **Forfait** | Anarana + fotoana sisa |
| **Habe** | Download / Upload |
| **Bandwidth** | Haingam-pihetsiketsika (Kpbs) |
| **Fanombohana** | Ora |

## <Icon name="Filter" color="warning" /> 3) Karohy

- Saha fikarohana : IP, MAC, anarana, code voucher
- Filtre : **Routeur**, **Forfait**
- Tri amin'ny colonne

## <Icon name="XCircle" color="danger" /> 4) Manisotra mpanjifa

1. Tsongay ny session
2. Kitio **Manisotra**
3. Manamafy

Alefan'ny Wima Zone amin'ny routeur ny `/ip/hotspot/active/remove` ary foana ny session.

::: warning Manisotra daholo
Ho an'ny maintenance, ampiasao **Routeurs → [anarana] → Manisotra daholo**.
:::

## <Icon name="Download" color="success" /> 5) Fanondranana

Kitio **Exporter** → CSV miaraka amin'ny colonne rehetra.

## <Icon name="AlertOctagon" color="warning" /> 6) Session voasakana

Raha miseho ny mpanjifa fa tsy misy internet :

1. Jereo ny **Bandwidth** (tsy maintsy > 0)
2. Jereo ny profil amin'ny **Routeur → Gestion Hotspot → Mpampiasa mavitrika**
3. Sync indray raha ilaina

## Dingana manaraka

→ [Zahao ny tatitra](/mg/docs/manual/tutoriels/rapports)
