---
title: Fampandrosoana Modely Plugin
---

# Fampandrosoana Modely Plugin

Ity pejy ity dia maneho ny tena fihetsiky ny **Paramètres > Plugins Portail Mpanjifa** (`/settings/customer-portal/plugins`) ao amin'ny WimaZone Billing.

## Inona no tohanan'ny pejy admin

Avy amin'ny pejy fanitarana, azonao atao ny:

- Miverina amin'ny modely default (`native`)
- Manavao ny modely Git rehetra
- Manampy modely avy amin'ny:
  - tahiry GitHub (tsy miankina/ampahibemaso, miaraka amin'ny sampana)
  - tahiry ZIP
- Mampiasa modely mifanaraka
- Manavao modely
- Mamafa modely (afa-tsy ny default)

## Loharano tohanan

### 1) Tahiry GitHub

Paramètre misy:

- URL tahiry (`customer_portal_plugin_repo_url`)
- Sampana (`customer_portal_plugin_repo_branch`)
- Token tsy miankina (`customer_portal_plugin_repo_token`)
- Sync automatika alefaina (`customer_portal_plugin_auto_sync_enabled`)
- Elanelana sync automatika (`customer_portal_plugin_auto_sync_interval`): `5`, `10`, `15`, `30`, `60` minitra

Tanjona sync tahiry:

```text
storage/extensions/customer-portal-plugins/installed/git
```

### 2) Fampidirana ZIP

Ny modely ZIP dia apetraka ao amin'ny:

```text
storage/extensions/customer-portal-plugins/installed/manual/<plugin-id>
```

Ny tahiry dia tsy maintsy misy modely manan-kery miaraka amin'ny `plugin.json`.

## Rafitra modely antenaina

Ny modely manan-kery dia mifototra amin'ny **`plugin.json`** (fa tsy `plugin.php`).

Ohatra kely indrindra:

```text
my-template/
├── plugin.json
├── views/
│   └── layouts/
│       ├── customer-layout-auth.blade.php
│       └── customer-layout-dashboard.blade.php
├── lang/
│   ├── fr/
│   └── mg/
└── images/
    ├── img1.png
    ├── desktop/
    │   └── img1.png
    └── mobile/
        └── img1.png
```

## Manifest `plugin.json`

Saha lehibe ampiasain'ny tetikasa:

- `id` (takiana, tokana)
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

Fitsipika ID:

- Endrika azo ekena: `^[a-z0-9][a-z0-9._-]*$`
- ID voarara: `native`, `native-default`

Ohatra:

```json
{
  "id": "modern-orange",
  "name": "Modern Orange Portal",
  "version": "1.0.0",
  "description": "Modely portail mpanjifa mobile-first",
  "author": "ITDev Success",
  "compatible_with": "3.4.0",
  "source_url": "https://github.com/example/customer-portal-templates",
  "featured": true,
  "sort_order": 10,
  "commercial_badge": "",
  "changelog": "Famoahana voalohany"
}
```

## Fanamarinana amin'ny fampiasana ao amin'ny WimaZone

Ny modely dia azo asiana marika raha:

- tsy misy anarana
- tsy misy sary preview hita
- tsy misy ny layouts takiana
- tsy misy ny rakitra `lang`
- tsy mifanaraka amin'ny version tetikasa ankehitriny

Rakitra layout takiana:

- `views/layouts/customer-layout-auth.blade.php`
- `views/layouts/customer-layout-dashboard.blade.php`

Fitsipika sary preview ekena:

- `img1.png`, `img2.jpg`, sns.
- Rakitra `images/desktop` sy `images/mobile`
- Fanitarana: `png`, `jpg`, `jpeg`, `webp`

## Laharam-pahamehana loharano

Raha misy `id` mitovy amin'ny Git sy ZIP:

- Ny version Git no aloha amin'ny lisitra mavitrika
- Ny valin'ny sync dia ahitana hafatra fampitandremana

## Endpoints mahasoa (referansa)

- `GET /settings/customer-portal/plugins`
- `POST /settings/customer-portal/plugins/sync-settings`
- `POST /settings/customer-portal/plugins/install-zip`
- `POST /settings/customer-portal/plugins/sync`
- `POST /settings/customer-portal/plugins/{plugin}/refresh`
- `DELETE /settings/customer-portal/plugins/{plugin}`

## Fanao tsara indrindra

- Tehirizo ny ID marin-toerana (aza ovaina aorian'ny fametrahana)
- Ataovy version ny modely-nao (`version`, changelog)
- Tsapao ny auth sy tableau de bord amin'ny finday sy ordinateur
- Soroka ny fifanolanana ID eo amin'ny ZIP manual sy loharano Git
- Aleo manana tahiry manokana ho an'ny modely portail mpanjifa
