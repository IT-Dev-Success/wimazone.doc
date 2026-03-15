# Hotspot Management

Hotspot management is available in:

- `/hotspot/manage`
- `/hotspot/ip-bindings`

## Key functions

- hotspot status per router,
- enable/disable hotspot,
- provisioning and config apply,
- walled garden save/import/seed/sync,
- snapshots and restore,
- IP bindings CRUD/import/sync.

## Examples

- `POST /hotspot/router/{router}/toggle`
- `POST /hotspot/router/{router}/provision/apply`
- `POST /hotspot/router/{router}/walled-garden/import`
- `POST /hotspot/ip-bindings/sync-all`
