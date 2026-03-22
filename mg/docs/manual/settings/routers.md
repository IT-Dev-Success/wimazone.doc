# Fitantanana Routeur

Ny fitantanana routeur dia misy ao amin'ny **Routeur** (`/routers`).

## Manampy routeur

1. Sokafy `Routeur > Vaovao`.
2. Fenoy:
   - anaran'ny routeur,
   - host/IP,
   - port API (8728 na 8729),
   - porofon'ny API,
   - sata mavitrika/tsy mavitrika.
3. Tehirizo ary alefaso ny fitsapana fampifandraisana.

## Asa misy

- Fitsapana fampifandraisana API (`POST /routers/test-connection`)
- Sync routeur (`POST /routers/{router}/sync`)
- Sata/loharanon-karena rafitra (`GET /routers/{router}/status`, `.../system-resources`)
- Sync rakitra hotspot (`POST /routers/{router}/sync-hotspot`)
- Fanafoanana sync hotspot (`POST /routers/{router}/sync-hotspot/cancel`)
- Famerenana routeur (`POST /routers/{router}/reboot`, mifototra amin'ny alalana)

## Fitoviana API MikroTik

WimaZone Billing dia manohana **RouterOS V7** ihany. Ny fanohanana RouterOS V6 dia efa natsahatra.

Soso-kevitra:

- ampiasao kaonty API manokana,
- tehirizo alalana kely indrindra,
- hamarino ny porofon-teny alohan'ny asa sync production.
