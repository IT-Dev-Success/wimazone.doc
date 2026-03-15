# Gestion des routeurs

La gestion routeur s'effectue dans **Routeurs** (`/routers`).

## Ajouter un routeur

1. Ouvrir `Routeurs > Nouveau`.
2. Renseigner:
   - nom du routeur,
   - hôte/IP,
   - port API (8728 ou 8729),
   - identifiants API,
   - statut actif/inactif.
3. Sauvegarder puis exécuter un test de connexion.

## Actions disponibles

- Test connexion API (`POST /routers/test-connection`)
- Synchronisation routeur (`POST /routers/{router}/sync`)
- État/ressources système (`GET /routers/{router}/status`, `.../system-resources`)
- Sync fichiers hotspot (`POST /routers/{router}/sync-hotspot`)
- Annulation sync hotspot (`POST /routers/{router}/sync-hotspot/cancel`)
- Redémarrage routeur (`POST /routers/{router}/reboot`, selon permission)

## Compatibilité API MikroTik

WimaZone Billing prend en charge RouterOS v6 et v7 via API:

- v6: `plaintext-login` possible selon configuration.
- v7: authentification challenge/response supportée par la librairie.

Recommandé:

- privilégier un compte API dédié (non admin global),
- limiter les permissions au strict nécessaire,
- éviter les mots de passe contenant des caractères non testés côté routeur.

## Diagnostic rapide

- Si "Invalid user name or password": vérifier utilisateur API côté MikroTik.
- Si timeout: vérifier reachability (`ping`, NAT, firewall, route).
- Si sync hotspot échoue: vérifier droits FTP/API/écriture et disque cible.
