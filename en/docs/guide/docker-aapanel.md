---
title: aaPanel (Docker)
---

# aaPanel (Docker)

This page documents a safe baseline to run WimaZone Billing on aaPanel Docker.

## Recommended Approach

1. Use the project repository directly:
   ```bash
   git clone https://github.com/ITDev-Success/billing.git
   cd billing
   ```
2. Prepare environment:
   ```bash
   cp .env.example .env
   ```
3. Build and run:
   ```bash
   docker compose up -d --build
   ```
4. Run migrations:
   ```bash
   docker exec -it billing php artisan migrate --force
   ```

## Important Notes

- Document root must point to `public/` (or equivalent reverse proxy path).
- Keep `storage/` and `bootstrap/cache/` writable.
- Configure queue and scheduler workers for production.
- Avoid using old MIVO images/config snippets from external templates.

For full variable reference, see [Docker Guide](/en/docs/guide/docker).
