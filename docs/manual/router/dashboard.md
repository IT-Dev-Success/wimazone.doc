# Dashboard routeur

Le dashboard (`/dashboard`) donne une vue synthétique de l'exploitation.

## Ce que vous surveillez

- routeurs online/offline,
- tendances sessions et ventes,
- alertes opérationnelles,
- indicateurs de santé.

## Actions utiles

- rafraîchir le tableau (`/dashboard/refresh`),
- vérifier le solde SMS si activé,
- utiliser l'aperçu opérationnel pour isoler une panne.

## En cas de données figées

1. Vérifier le scheduler/queue worker.
2. Vérifier la connectivité routeur API.
3. Contrôler les logs applicatifs et Nginx/PHP-FPM.
