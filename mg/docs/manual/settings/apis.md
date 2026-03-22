# API Misy

Ity pejy ity dia mamintina ny API ivelany aseho ao amin'ny **Paramètre > API** (`/settings/apis`).

## Fandoavana

| Logo | API | Sata tetikasa | Configuration lehibe | Fitsapana |
|---|---|---|---|---|
| <img src="/mvola.jpg" alt="MVola" width="36" /> | MVola | Misy | `payment_mvola_*` (URL fototra, OAuth/API key, partner MSISDN, callback) | Eny (`/settings/apis/test-mvola`) |
| <img src="/airtel.png" alt="Airtel Money" width="36" /> | Airtel Money | Kasaina (UI "Ho avy") | Tsy mavitrika | Tsia |
| <img src="/orange.png" alt="Orange Money" width="36" /> | Orange Money | Kasaina (UI "Ho avy") | Tsy mavitrika | Tsia |

## Fampandrenesana

| Logo | API | Sata tetikasa | Configuration lehibe | Fitsapana |
|---|---|---|---|---|
| <img src="/befiana.png" alt="SMS by Befiana" width="44" /> | SMS Befiana | Misy | `SmsSettings` + `befiana_sms_base_url` | Eny (`/settings/sms/test`) |
| <img src="/email.png" alt="Mail SMTP" width="36" /> | Mail SMTP | Misy | `smtp_host`, `smtp_port`, `smtp_username`, `smtp_password`, `smtp_encryption` | Eny (`/settings/apis/test-smtp`) |
| <img src="/tawk.png" alt="Tawk.to Chat" width="36" /> | Tawk.to Chat | Misy | `tawkto_enabled`, `tawkto_property_id`, `tawkto_widget_id`, safidy widget | Fanamarinana avy amin'ny config/preview |
| <img src="/whatsapp.png" alt="WhatsApp" width="36" /> | WhatsApp | Kasaina (UI "Ho avy") | Tsy mavitrika amin'ny pejy API | Tsia |

## Paramètre hafa mifandraika

Ny pejy API dia mampiray koa:

- `platform_redirect_url` (URL redirect mpanjifa),
- `platform_server_url` (URL serveur),
- `ops_alert_webhook_url` (webhook fiasana),
- `customer_portal_active_plugin` (plugin portail mpanjifa mavitrika).

## Fanamarihana fiasana

- Miafina ny tsiambaratelo amin'ny fomba demo.
- Ny fidirana amin'ny `/settings/apis` dia voafetra (alalana `manage-settings`, matetika `Super Admin`).
- Alefaso hatrany ny fitsapana API aorian'ny fanovana porofon-teny.
