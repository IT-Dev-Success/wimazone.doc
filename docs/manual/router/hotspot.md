# Gestion hotspot

La gestion hotspot est disponible dans:

- `/hotspot/manage`
- `/hotspot/ip-bindings`

## Fonctions clés

- statut hotspot par routeur,
- activation/désactivation,
- provisioning et application config,
- Walled Garden (save/import/seed/sync),
- snapshots et restauration,
- IP bindings (CRUD, import, sync).

## Routes d'exploitation (exemples)

- `POST /hotspot/router/{router}/toggle`
- `POST /hotspot/router/{router}/provision/apply`
- `POST /hotspot/router/{router}/walled-garden/import`
- `POST /hotspot/ip-bindings/sync-all`

## Conseils d'exploitation

- tester d'abord sur un routeur pilote,
- appliquer hors heures de pointe,
- vérifier l'accès portail client après modification Walled Garden.
