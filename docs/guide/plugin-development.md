---
title: Développement de templates plugin
---

# Développement de templates plugin

Cette page reflète le comportement réel de **Paramètres > Plugins portail client** (`/settings/customer-portal/plugins`) dans WimaZone Billing.

## Ce que l'interface admin permet

Sur la page d'extension, vous pouvez:

- Revenir au template par défaut (`native`)
- Mettre à jour tous les templates Git
- Ajouter des templates depuis:
  - dépôt GitHub (privé/public, avec branche)
  - archive ZIP
- Activer un template compatible
- Rafraîchir un template
- Supprimer un template (sauf template par défaut)

## Sources supportées

### 1) Dépôt GitHub

Paramètres disponibles:

- URL dépôt (`customer_portal_plugin_repo_url`)
- Branche (`customer_portal_plugin_repo_branch`)
- Token privé (`customer_portal_plugin_repo_token`)
- Sync auto activée (`customer_portal_plugin_auto_sync_enabled`)
- Intervalle sync auto (`customer_portal_plugin_auto_sync_interval`) : `5`, `10`, `15`, `30`, `60` minutes

Le système clone/synchronise le dépôt dans:

```text
storage/extensions/customer-portal-plugins/installed/git
```

### 2) Import ZIP

Le ZIP est installé dans:

```text
storage/extensions/customer-portal-plugins/installed/manual/<plugin-id>
```

L'archive doit contenir un template valide avec un `plugin.json`.

## Structure attendue d'un template

Un template valide est basé sur **`plugin.json`** (et non `plugin.php`).

Exemple minimal:

```text
my-template/
├── plugin.json
├── views/
│   └── layouts/
│       ├── customer-layout-auth.blade.php
│       └── customer-layout-dashboard.blade.php
├── lang/
│   ├── fr/
│   └── en/
└── images/
    ├── img1.png
    ├── desktop/
    │   └── img1.png
    └── mobile/
        └── img1.png
```

## Manifest `plugin.json`

Champs principaux utilisés:

- `id` (obligatoire, unique)
- `name`
- `version`
- `description`
- `author`
- `compatible_with`
- `source_url`
- `featured`
- `sort_order`
- `commercial_badge`
- `changelog`

Règle d'ID:

- Format autorisé: `^[a-z0-9][a-z0-9._-]*$`
- IDs interdits: `native`, `native-default`

Exemple:

```json
{
  "id": "modern-orange",
  "name": "Modern Orange Portal",
  "version": "1.0.0",
  "description": "Template client orienté mobile",
  "author": "ITDev Success",
  "compatible_with": "3.4.0",
  "source_url": "https://github.com/example/customer-portal-templates",
  "featured": true,
  "sort_order": 10,
  "commercial_badge": "",
  "changelog": "Initial release"
}
```

## Validation appliquée par WimaZone

Le template est analysé et peut afficher des erreurs si:

- nom manquant
- aucun visuel détecté
- layouts obligatoires manquants
- dossier `lang` manquant
- incompatibilité avec la version projet

Layouts critiques vérifiés:

- `views/layouts/customer-layout-auth.blade.php`
- `views/layouts/customer-layout-dashboard.blade.php`

Images preview acceptées:

- `img1.png`, `img2.jpg`, etc.
- sous-dossiers `images/desktop` et `images/mobile`
- extensions: `png`, `jpg`, `jpeg`, `webp`

## Priorité des sources

Si un même `id` existe en Git et en ZIP:

- la version Git est prioritaire dans la liste active
- un message d'avertissement est affiché après synchronisation

## Endpoints utiles (référence)

- `GET /settings/customer-portal/plugins`
- `POST /settings/customer-portal/plugins/sync-settings`
- `POST /settings/customer-portal/plugins/install-zip`
- `POST /settings/customer-portal/plugins/sync`
- `POST /settings/customer-portal/plugins/{plugin}/refresh`
- `DELETE /settings/customer-portal/plugins/{plugin}`

## Bonnes pratiques

- Garder des IDs stables (ne pas renommer après déploiement)
- Versionner vos templates (`version`, changelog)
- Tester auth + dashboard sur mobile et desktop
- Éviter les conflits d'ID entre ZIP manuel et source Git
- Préférer un dépôt dédié pour les templates portail client
