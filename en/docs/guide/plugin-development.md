---
title: Plugin Template Development
---

# Plugin Template Development

This page reflects the real behavior of **Settings > Customer Portal Plugins** (`/settings/customer-portal/plugins`) in WimaZone Billing.

## What the admin page supports

From the extension page, you can:

- Switch back to the default template (`native`)
- Update all Git templates
- Add templates from:
  - a GitHub repository (private/public, with branch)
  - a ZIP archive
- Activate a compatible template
- Refresh a template
- Delete a template (except default)

## Supported sources

### 1) GitHub repository

Available settings:

- Repository URL (`customer_portal_plugin_repo_url`)
- Branch (`customer_portal_plugin_repo_branch`)
- Private token (`customer_portal_plugin_repo_token`)
- Auto sync enabled (`customer_portal_plugin_auto_sync_enabled`)
- Auto sync interval (`customer_portal_plugin_auto_sync_interval`): `5`, `10`, `15`, `30`, `60` minutes

Repository sync target:

```text
storage/extensions/customer-portal-plugins/installed/git
```

### 2) ZIP import

ZIP templates are installed into:

```text
storage/extensions/customer-portal-plugins/installed/manual/<plugin-id>
```

The archive must contain a valid template with `plugin.json`.

## Expected template structure

A valid template is based on **`plugin.json`** (not `plugin.php`).

Minimal example:

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

## `plugin.json` manifest

Main fields used by the project:

- `id` (required, unique)
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

ID rules:

- Allowed pattern: `^[a-z0-9][a-z0-9._-]*$`
- Forbidden IDs: `native`, `native-default`

Example:

```json
{
  "id": "modern-orange",
  "name": "Modern Orange Portal",
  "version": "1.0.0",
  "description": "Mobile-first customer portal template",
  "author": "ITDev Success",
  "compatible_with": "3.4.0",
  "source_url": "https://github.com/example/customer-portal-templates",
  "featured": true,
  "sort_order": 10,
  "commercial_badge": "",
  "changelog": "Initial release"
}
```

## Runtime validation in WimaZone

A template can be flagged if:

- missing name
- no preview images found
- required layouts missing
- `lang` directory missing
- incompatible with current project version

Required layout files:

- `views/layouts/customer-layout-auth.blade.php`
- `views/layouts/customer-layout-dashboard.blade.php`

Accepted preview image rules:

- `img1.png`, `img2.jpg`, etc.
- `images/desktop` and `images/mobile` folders
- extensions: `png`, `jpg`, `jpeg`, `webp`

## Source priority

If the same `id` exists in both Git and ZIP:

- Git version takes priority in active listing
- sync result includes a warning message

## Useful endpoints (reference)

- `GET /settings/customer-portal/plugins`
- `POST /settings/customer-portal/plugins/sync-settings`
- `POST /settings/customer-portal/plugins/install-zip`
- `POST /settings/customer-portal/plugins/sync`
- `POST /settings/customer-portal/plugins/{plugin}/refresh`
- `DELETE /settings/customer-portal/plugins/{plugin}`

## Best practices

- Keep stable IDs (do not rename after deployment)
- Version your templates (`version`, changelog)
- Test auth and dashboard on mobile and desktop
- Avoid ID conflicts between manual ZIP and Git source
- Prefer a dedicated repository for customer portal templates
