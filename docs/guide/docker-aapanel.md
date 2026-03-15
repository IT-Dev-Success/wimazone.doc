---
title: aaPanel (Docker)
---

# aaPanel (Docker)

Cette page décrit une base fiable pour exécuter WimaZone Billing avec Docker sur aaPanel.

## Approche recommandée

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/ITDev-Success/billing.git
   cd billing
   ```
2. Préparer l'environnement :
   ```bash
   cp .env.example .env
   ```
3. Construire et démarrer :
   ```bash
   docker compose up -d --build
   ```
4. Lancer les migrations :
   ```bash
   docker exec -it billing php artisan migrate --force
   ```

## Points importants

- Le document root doit pointer vers `public/` (ou équivalent via reverse proxy).
- `storage/` et `bootstrap/cache/` doivent être inscriptibles.
- Configurer queue et scheduler en production.
- Éviter les anciens snippets MIVO récupérés depuis des templates externes.

Référence variables : [Guide Docker](/docs/guide/docker).
