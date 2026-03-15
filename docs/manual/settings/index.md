# Paramètres globaux

La section **Paramètres** centralise la configuration transversale de l'instance.

## Pages principales

- `Paramètres > Général` (`/settings` ou `/settings/general`)
- `Paramètres > Couleurs` (`/settings/colors`)
- `Paramètres > API` (`/settings/apis`)
- `Paramètres > SMTP` (`/settings/smtp`)
- `Paramètres > Paiements` (`/settings/payments`)
- `Paramètres > SMS` (`/settings/sms`)
- `Paramètres > Plugins portail client` (`/settings/customer-portal/plugins`)
- `Paramètres > Templates ticket` (`/settings/ticket-print/templates`)

## Permissions

- Accès global: `manage-settings`
- Actions sensibles (API, plugins/templates): généralement `Super Admin`

## Bonnes pratiques

1. Appliquer les changements critiques en période creuse.
2. Tester sur un routeur pilote avant généralisation.
3. Conserver un historique des modifications (qui, quand, quoi).

## Détail des sous-sections

- [APIs disponibles](/docs/manual/settings/apis)
- [Routeurs](/docs/manual/settings/routers)
- [Templates de tickets](/docs/manual/settings/voucher-templates)
- [Logos](/docs/manual/settings/logos)
- [API & CORS](/docs/manual/settings/api-cors)
- [Plugins](/docs/manual/settings/plugins)
- [Système](/docs/manual/settings/system)
