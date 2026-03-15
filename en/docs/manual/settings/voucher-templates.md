# Ticket Templates

Ticket print templates are managed in:

- `/settings/ticket-print/templates`

## Functions

- install template ZIP,
- activate/deactivate,
- sync settings,
- preview template,
- refresh/delete.

## Rendering order

1. active template,
2. active override (if configured),
3. default fallback template.

## Best practices

- keep a simple fallback template,
- avoid heavy assets,
- test `vouchers/print` and `vouchers/print-multiple` after template changes.
