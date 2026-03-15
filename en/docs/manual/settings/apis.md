# Available APIs

This page summarizes external APIs shown in **Settings > APIs** (`/settings/apis`).

## Payments

| Logo | API | Project status | Main configuration | Test |
|---|---|---|---|---|
| <img src="/mvola.jpg" alt="MVola" width="36" /> | MVola | Available | `payment_mvola_*` (base URL, OAuth/API key, partner MSISDN, callback) | Yes (`/settings/apis/test-mvola`) |
| <img src="/airtel.png" alt="Airtel Money" width="36" /> | Airtel Money | Planned (UI "Coming soon") | Not active | No |
| <img src="/orange.png" alt="Orange Money" width="36" /> | Orange Money | Planned (UI "Coming soon") | Not active | No |

## Notifications

| Logo | API | Project status | Main configuration | Test |
|---|---|---|---|---|
| <img src="/befiana.png" alt="SMS by Befiana" width="44" /> | SMS by Befiana | Available | `SmsSettings` + `befiana_sms_base_url` | Yes (`/settings/sms/test`) |
| <img src="/email.png" alt="Mail SMTP" width="36" /> | Mail SMTP | Available | `smtp_host`, `smtp_port`, `smtp_username`, `smtp_password`, `smtp_encryption` | Yes (`/settings/apis/test-smtp`) |
| <img src="/tawk.png" alt="Tawk.to Chat" width="36" /> | Tawk.to Chat | Available | `tawkto_enabled`, `tawkto_property_id`, `tawkto_widget_id`, widget options | Validation from config/preview |
| <img src="/whatsapp.png" alt="WhatsApp" width="36" /> | WhatsApp | Planned (UI "Coming soon") | Not active in APIs screen | No |

## Other related settings

The APIs screen also centralizes:

- `platform_redirect_url` (client redirect URL),
- `platform_server_url` (server URL),
- `ops_alert_webhook_url` (operations webhook),
- `customer_portal_active_plugin` (active customer portal plugin).

## Operations notes

- Secrets are masked in demo mode.
- Access to `/settings/apis` is restricted (permission `manage-settings`, often `Super Admin`).
- Always run API tests after changing credentials.
