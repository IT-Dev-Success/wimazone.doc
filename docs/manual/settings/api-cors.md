# API & CORS

Cette page couvre les réglages d'intégration dans **Paramètres > API** (`/settings/apis`).

## CORS

Configurer explicitement les domaines autorisés:

1. Ajouter des origines exactes (`https://exemple.com`).
2. Éviter `*` en production.
3. N'ouvrir que les méthodes nécessaires.
4. Revalider après changement via navigateur/devtools.

## APIs externes

Selon modules activés, vous pouvez configurer:

- MVola (test disponible)
- SMTP (test envoi)
- Tawk.to
- autres configs tierces

## Sécurité

- Garder les secrets côté serveur uniquement.
- Utiliser des clés séparées par environnement.
- Restreindre l'accès à `Super Admin` pour les paramètres API.
