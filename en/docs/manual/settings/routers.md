# Router Management

Router management is available in **Routers** (`/routers`).

## Add a router

1. Open `Routers > New`.
2. Fill:
   - router name,
   - host/IP,
   - API port (8728 or 8729),
   - API credentials,
   - active/inactive status.
3. Save and run connectivity test.

## Available actions

- API connectivity test (`POST /routers/test-connection`)
- Router sync (`POST /routers/{router}/sync`)
- Status/system resources (`GET /routers/{router}/status`, `.../system-resources`)
- Hotspot file sync (`POST /routers/{router}/sync-hotspot`)
- Cancel hotspot sync (`POST /routers/{router}/sync-hotspot/cancel`)
- Router reboot (`POST /routers/{router}/reboot`, permission-based)

## MikroTik API compatibility

WimaZone Billing supports RouterOS v6 and v7.

Recommended:

- use a dedicated API account,
- keep least-privilege permissions,
- verify credentials before production sync tasks.
