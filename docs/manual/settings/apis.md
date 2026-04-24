# APIs disponibles

Cette page résume les APIs externes visibles dans **Paramètres > API** (`/settings/apis`) de Wima Zone Billing.

## Paiement

| Logo | API | Statut dans le projet | Configuration principale | Test |
|---|---|---|---|---|
| <img src="/mvola.jpg" alt="MVola" width="36" /> | MVola | Disponible | `payment_mvola_*` (base URL, OAuth/API key, partner MSISDN, callback) | Oui (`/settings/apis/test-mvola`) |
| <img src="/airtel.png" alt="Airtel Money" width="36" /> | Airtel Money | Prévu (UI "Bientôt") | Non actif | Non |
| <img src="/orange.png" alt="Orange Money" width="36" /> | Orange Money | Prévu (UI "Bientôt") | Non actif | Non |

## Notifications

| Logo | API | Statut dans le projet | Configuration principale | Test |
|---|---|---|---|---|
| <img src="/befiana.png" alt="SMS by Befiana" width="44" /> | SMS by Befiana | Disponible | `SmsSettings` + `befiana_sms_base_url` | Oui (`/settings/sms/test`) |
| <img src="/email.png" alt="Mail SMTP" width="36" /> | Mail SMTP | Disponible | `smtp_host`, `smtp_port`, `smtp_username`, `smtp_password`, `smtp_encryption` | Oui (`/settings/apis/test-smtp`) |
| <img src="/tawk.png" alt="Tawk.to Chat" width="36" /> | Tawk.to Chat | Disponible | `tawkto_enabled`, `tawkto_property_id`, `tawkto_widget_id`, options widget | Validation via aperçu/config |
| <img src="/whatsapp.png" alt="WhatsApp" width="36" /> | WhatsApp | Prévu (UI "Bientôt") | Non actif dans l'écran API | Non |

## Autres configurations liées

L'écran API centralise aussi:

- `platform_redirect_url` (redirection client),
- `platform_server_url` (URL serveur),
- `ops_alert_webhook_url` (webhook alertes opérations).

## Notes d'exploitation

- Les secrets sont masqués en mode démo.
- L'accès à `/settings/apis` est restreint (permission `manage-settings`, souvent rôle `Super Admin`).
- Toujours tester une API après modification avant déploiement en production.
