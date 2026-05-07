---
title: Manomboka voucher amin'ny mpanjifa
description: Lalana feno ho an'ny mpanjifa hotspot
---

# Manomboka voucher amin'ny mpanjifa

Izay iainan'ny mpanjifa rehefa mividy tikety ary mifandray amin'ny Wi-Fi.

## <Icon name="Wifi" color="info" /> 1) Fifandraisana Wi-Fi

Mifandray amin'ny SSID hotspot (oh. `Wima Zone-Hotspot`) ny mpanjifa. Misokatra ho azy ny portail captif :

```
http://wima-zone.wifi/login
```

## <Icon name="Key" color="success" /> 2) Fampidirana code

Amin'ny pejy fandraisana :

1. Saha **Code voucher** : ampidiro ny litera 8 (oh. `A3X9K2M7`)
2. Kitio **Ampandehano ny fifandraisana**

Manamarina ny code ny rafitra :

- ✓ Mandeha → misokatra ny session
- ✗ Efa nampiasaina → "Efa nampiasaina ny code"
- ✗ Lany andro → "Lany andro ny code"

## <Icon name="Gauge" color="primary" /> 3) Dashboard mpanjifa

Rehefa tafiditra, mankanesa :

```
http://wima-zone.wifi/customer
```

Hita eo :

- **Fotoana sisa** : compte à rebours
- **Habe sisa** : barre de progression
- **Forfait mavitrika** : anarana + vidiny
- **Tantaran'ny session**

## <Icon name="Smartphone" color="warning" /> 4) Fiala

Ny mpanjifa afaka :

- Manindry **Mivoaha** amin'ny dashboard
- Mihidy fotsiny ny navigateur (hihazona ny session)

## <Icon name="BellOff" color="secondary" /> 5) Fampandrenesana

Raha voasokatra ny **SMS Befiana**, mandray SMS ny mpanjifa :

- Amin'ny fanombohana (confirmation + code backup)
- 15 minitra alohan'ny fahataperana (azo ovaina)

Raha voasokatra ny **SMTP** ary nampidirany ny mailaka, mandray faktiora PDF amin'ny mailaka izy.

## <Icon name="Shield" color="danger" /> Amin'ny admin : manaraha session

Ao amin'ny **Gestion des clients → Sessions Mavitrika** :

- Hita amin'ny fotoana tena izy ny rehetra
- Afaka manisotra mpanjifa (**Kick**)
- Fanondranana CSV

## <Icon name="AlertTriangle" color="warning" /> Olana mahazatra

| Tarehy | Antony | Vahaolana |
|---|---|---|
| Tsy misokatra ny portail | DNS voasakana | Jereo walled-garden `wima-zone.wifi` |
| Code ekena fa tsy misy internet | Profil MikroTik tsy misy | Sync ny routeur |
| Voaisotra avy hatrany | Bandwidth profile tsy voapetraka | Jereo Gestion Hotspot |

## Dingana manaraka

→ [Zahao ny tatitra](/mg/docs/manual/tutoriels/rapports)
