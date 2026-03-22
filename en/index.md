---
layout: home

hero:
  name: "WimaZone Billing"
  text: "MikroTik Hotspot Billing Platform"
  tagline: Laravel-based billing and captive portal solution for routers, vouchers, customers, and payments.
  image:
    light: /logo-m.svg
    dark: /logo-m-dark.svg
    alt: WimaZone Logo
  actions:
    - theme: brand
      text: Get Started
      link: /en/docs/guide/installation
    - theme: alt
      text: MikroTik
      link: /en/docs/guide/mikrotik

features:
  - title: Laravel 11 Stack
    details: Robust architecture with queues, scheduler, migrations, and test coverage.
  - title: MikroTik v6/v7 Compatible
    details: RouterOS API integration with protections for unstable routers and startup sync workflows.
  - title: Captive Portal + Customer Area
    details: Voucher activation, customer dashboard, geolocation checks, and fallback redirects.
  - title: APIs Externe
    details: Payment and notification API integrations (MVola, SMS by Befiana, Mail SMTP, Tawk.to).
---

## Why WimaZone Billing?

WimaZone Billing is a **MikroTik hotspot billing system** focused on real ISP/operator operations: customer lifecycle, vouchers, plans, payments, and router synchronization.

### Key Highlights

- <Icon name="Server" color="warning" /> **Hybrid deployment**: run on a standard server (MySQL/MariaDB) or RouterOS container mode (SQLite).
- <Icon name="Database" color="info" /> **Multi-database**: supports SQLite 3.x, MySQL 8.0 and MariaDB 11.5 via environment configuration.
- <Icon name="Users" color="info" /> **Customer workflow**: hotspot login, voucher activation, dashboard, and support flows.
- <Icon name="Receipt" color="success" /> **Billing core**: plans, charges, invoices, reminders, and payment integration hooks.
- <Icon name="Wrench" color="primary" /> **Operations tooling**: scheduler jobs, sync commands, diagnostics, and release management.
