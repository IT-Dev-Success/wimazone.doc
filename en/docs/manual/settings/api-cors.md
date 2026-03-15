# API & CORS

This section covers integrations in **Settings > APIs** (`/settings/apis`).

## CORS

Configure allowed origins explicitly:

1. Add exact origins (`https://example.com`).
2. Avoid wildcard `*` in production.
3. Allow only required methods.
4. Validate with browser devtools after updates.

## External APIs

Depending on enabled modules:

- MVola
- SMTP
- Tawk.to
- other external configs

## Security

- Keep secrets server-side only.
- Use separate credentials per environment.
- Restrict API settings to `Super Admin`.
