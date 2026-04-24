---
title: Module Cyber Cafe
---

# Module Cyber Cafe

Ny module Cyber Cafe an'ny Wima Zone Billing dia ahafahana mitantana ny poste amin'ny cybercafé misy faktiora sy fifehezana ny fidirana amin'ny Internet.

## Fijery ankapobeny

Ny rafitra dia mifototra amin'ny singa telo :

- **Dashboard admin** (`/cafe`) : fitantanana poste, fanombohana/fanaperana session, fanaraha-maso amin'ny fotoana tena izy.
- **Client Flutter** : application desktop apetraka amin'ny poste tsirairay, mampiseho lock screen sy mitantana ny fotoana.
- **Integration MikroTik** : sakanana/famelana ho azy ny Internet amin'ny Hotspot IP Binding sy firewall.

## Fizotran'ny asa

```
Admin mamorona poste ──> IP voasakana amin'ny MikroTik (tsy misy Internet)
         │
         v
Admin manomboka session ──> IP bypassed (Internet misokatra)
         │                          │
         │                    Client Flutter mampiseho
         │                    ny fotoana sisa
         v                          │
Session lany na ajanona ──> IP voasakana indray (Internet tapaka)
```

## Mode faktiora

Misy roa ny mode :

- **Aloha vola** : mandoa aloha ny mpanjifa. Kajiana mialoha ny vidiny (`faharetana x vidiny/minitra`).
- **Avy eo vao mandoa** : mandoa aorian'ny session. Kajiana ny fotoana tena nampiasaina.

## Mode libre-service

Rehefa voasokajy ny libre-service amin'ny poste iray, ny mpanjifa afaka manomboka session-ny avy amin'ny lock screen (tsy mila admin). Ny admin no mametra ny vidiny default sy mamonjy/manaisotra amin'ny poste tsirairay.

## Fizarana

- [Fametrahana MikroTik](/mg/docs/manual/cafe/mikrotik) : baiko atao amin'ny routeur.
- [Client Flutter](/mg/docs/manual/cafe/client) : fametrahana sy configuration ny application desktop.

## Route admin

| Route | Méthode | Famaritana |
|---|---|---|
| `/cafe` | GET | Dashboard (poste + session) |
| `/cafe` | POST | Mamorona poste vaovao |
| `/cafe/sessions/start` | POST | Manomboka session amin'ny poste |
| `/cafe/sessions/{id}/extend` | POST | Mampitombo session mandeha |
| `/cafe/stations/{id}/lock` | POST | Manidy poste (fanaperana session) |
| `/cafe/stations/{id}` | DELETE | Manala poste |
| `/cafe/stations/{id}/self-service` | POST | Alefaso/ajanona libre-service |
| `/cafe/stations/{id}/regenerate-token` | POST | Mamorona indray code d'activation |
| `/cafe/sync-mikrotik` | POST | Sync poste rehetra amin'ny MikroTik |

## API client (Flutter)

| Endpoint | Auth | Famaritana |
|---|---|---|
| `GET /api/cafe/ping` | Tsia | Fitsapana fifandraisana |
| `POST /api/cafe/register` | Bearer | Firaketana poste |
| `POST /api/cafe/heartbeat` | Bearer | Heartbeat + etat session |
| `GET /api/cafe/session/{stationName}` | Bearer | Polling session |
| `POST /api/cafe/session/start` | Bearer | Manomboka session (libre-service) |
| `POST /api/cafe/session/{id}/end` | Bearer | Manajanona session |

## Alalana

Ny module dia mitaky ny alalana `manage-cafe`. Alefaso ny seeder aorian'ny migration :

```bash
php artisan migrate
php artisan db:seed
```
