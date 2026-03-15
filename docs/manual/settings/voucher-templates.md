# Templates de tickets

Les templates d'impression ticket sont gérés dans:

- `/settings/ticket-print/templates`

## Fonctions

- installation ZIP de template,
- activation/désactivation,
- synchronisation paramètres,
- aperçu template,
- rafraîchissement/suppression.

## Rendu des vouchers

Le rendu d'impression utilise:

1. template actif,
2. puis override actif si configuré,
3. sinon fallback template par défaut.

## Bonnes pratiques

- conserver un template de secours simple,
- éviter les assets lourds (impression lente),
- tester `vouchers/print` et `vouchers/print-multiple` après changement.
