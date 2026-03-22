---
title: aaPanel (Docker)
---

# aaPanel (Docker)

Ity pejy ity dia manoratra ny fototra azo antoka hampiasana WimaZone Billing amin'ny aaPanel Docker.

## Fomba Soso-kevitra

1. Ampiasao mivantana ny tahiry tetikasa:
   ```bash
   git clone https://github.com/ITDev-Success/billing.git
   cd billing
   ```
2. Omano ny tontolo iainana:
   ```bash
   cp .env.example .env
   ```
3. Atsangano sy alefaso:
   ```bash
   docker compose up -d --build
   ```
4. Alefaso ny migration:
   ```bash
   docker exec -it billing php artisan migrate --force
   ```

## Fanamarihana Manan-danja

- Ny document root dia tsy maintsy mitodika amin'ny `public/` (na lalana reverse proxy mifanaraka).
- Tehirizo ny `storage/` sy `bootstrap/cache/` azo soratana.
- Apetraho ny queue sy scheduler workers ho an'ny production.
- Aza mampiasa sary/config snippets MIVO taloha avy amin'ny modely ivelany.

Ho an'ny referansa feno momba ny variables, jereo ny [Torolàlana Docker](/mg/docs/guide/docker).
