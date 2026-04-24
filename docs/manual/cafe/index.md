---
title: Module Cyber Cafe
---

# Module Cyber Cafe

Le module Cyber Cafe de Wima Zone Billing permet de gerer des postes de travail dans un cyber cafe avec facturation automatique et controle d'acces reseau MikroTik.

## Vue d'ensemble

Le systeme repose sur trois composants :

- **Dashboard admin** (`/cafe`) : gestion des postes, demarrage/arret de sessions, suivi en temps reel.
- **Client Flutter** : application desktop installee sur chaque poste, affiche un ecran de verrouillage et gere le temps de session.
- **Integration MikroTik** : blocage/deblocage automatique de l'acces internet via Hotspot IP Binding et firewall address-list.

## Flux de fonctionnement

```
Admin cree un poste ──> IP bloquee sur MikroTik (pas d'internet)
         │
         v
Admin demarre une session ──> IP bypassed (internet ouvert)
         │                          │
         │                    Client Flutter affiche
         │                    le temps restant
         v                          │
Session expire ou fin manuelle ──> IP re-bloquee (internet coupe)
```

## Modes de facturation

Le module supporte deux modes :

- **Prepaye** : le client paie avant la session. Le montant est calcule a l'avance (`duree x tarif/min`). La transaction est enregistree immediatement.
- **Postpaye** : le client paie apres. Le montant final est calcule selon le temps reel consomme (`ceil(secondes/60) x tarif/min`). La transaction est enregistree a la fin de la session.

## Mode libre-service

Quand le libre-service est active sur un poste, le client peut demarrer sa propre session depuis l'ecran de verrouillage (sans intervention de l'admin). L'admin configure le tarif par defaut et active/desactive cette option par poste.

## Rubriques

- [Configuration MikroTik](/docs/manual/cafe/mikrotik) : commandes a executer sur le routeur.
- [Client Flutter](/docs/manual/cafe/client) : installation et configuration de l'application desktop.

## Routes admin

| Route | Methode | Description |
|---|---|---|
| `/cafe` | GET | Dashboard (postes + sessions recentes) |
| `/cafe` | POST | Creer un nouveau poste |
| `/cafe/sessions/start` | POST | Demarrer une session sur un poste |
| `/cafe/sessions/{id}/extend` | POST | Prolonger une session active |
| `/cafe/stations/{id}/lock` | POST | Verrouiller un poste (fin session) |
| `/cafe/stations/{id}` | DELETE | Supprimer un poste |
| `/cafe/stations/{id}/self-service` | POST | Activer/desactiver le libre-service |
| `/cafe/stations/{id}/regenerate-token` | POST | Regenerer le code d'activation |
| `/cafe/sync-mikrotik` | POST | Synchroniser tous les postes avec MikroTik |

## API client (Flutter)

| Endpoint | Auth | Description |
|---|---|---|
| `GET /api/cafe/ping` | Non | Test de connexion |
| `POST /api/cafe/register` | Bearer | Enregistrer/mettre a jour un poste |
| `POST /api/cafe/heartbeat` | Bearer | Heartbeat + etat session courant |
| `GET /api/cafe/session/{stationName}` | Bearer | Polling etat session (fallback WS) |
| `POST /api/cafe/session/start` | Bearer | Demarrer session (libre-service) |
| `POST /api/cafe/session/{id}/end` | Bearer | Terminer session depuis le client |

## Permissions

Le module necessite la permission `manage-cafe`. Executez le seeder apres migration :

```bash
php artisan migrate
php artisan db:seed
```
