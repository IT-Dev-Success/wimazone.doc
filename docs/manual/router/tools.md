# Outils système

Les outils d'exploitation couvrent le diagnostic applicatif et routeur.

## Outils fréquents

- test de connexion routeur,
- synchronisation manuelle routeur/hotspot,
- consultation des logs,
- opérations admin (consommation client, aperçu opérations).

## Bonnes pratiques

- exécuter les actions lourdes en période creuse,
- éviter de lancer des sync massives simultanées,
- journaliser chaque action critique.

## Symptômes à surveiller

- hausse brutale des timeouts `/hotspot/status`,
- erreurs PHP-FPM `max_children` / `SIGKILL`,
- erreurs Nginx `upstream timed out` ou `502`.
