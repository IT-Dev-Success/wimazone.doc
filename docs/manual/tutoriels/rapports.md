---
title: Consulter les rapports
description: Revenus, ventes et taux d'utilisation
---

# Consulter les rapports

![Page Rapports](/screenshots/rapports.png)
*Rapports & Analytique → Rapports — vue consolidée des revenus et ventes*

WimaZone fournit des rapports consolidés pour piloter votre activité hotspot.

## <Icon name="BarChart" color="info" /> 1) Rapports disponibles

Menu → **Rapports & Analytique → Rapports**

Liste :

- **Revenus par période** — journalier, hebdomadaire, mensuel
- **Ventes par forfait** — quels forfaits se vendent le mieux
- **Ventes par routeur** — performance par point de vente
- **Activations vs expirations** — taux d'usage réel
- **Top clients** — clients récurrents
- **Rapports cafe** — si le module Cyber Café est activé

## <Icon name="Calendar" color="primary" /> 2) Filtrer par période

En haut de chaque rapport :

- **Aujourd'hui** / **Hier**
- **7 derniers jours** / **30 derniers jours**
- **Ce mois** / **Mois dernier**
- **Période personnalisée** (date début + date fin)

Les données se recalculent en direct.

## <Icon name="PieChart" color="warning" /> 3) Visualiser

Chaque rapport combine :

- Un **graphique** (barres, courbes ou camembert selon le rapport)
- Un **tableau détaillé** sous le graphique
- Des **totaux** (revenus, nombre de ventes, taux)

## <Icon name="Download" color="success" /> 4) Exporter

Boutons en haut à droite :

- **Exporter CSV** — toutes les lignes du rapport courant
- **Exporter PDF** — rapport formaté pour impression
- **Imprimer** — envoi direct à l'imprimante

## <Icon name="FileText" color="primary" /> 5) Rapports automatiques

Dans **Paramètres → Rapports automatiques**, vous pouvez programmer :

- Rapport quotidien → email tous les jours à 23h00
- Rapport hebdomadaire → email chaque lundi matin
- Rapport mensuel → email le 1er du mois

Les rapports sont envoyés aux adresses configurées en PDF.

## <Icon name="TrendingUp" color="info" /> 6) Indicateurs clés (dashboard)

Sur le **Dashboard principal**, retrouvez en un coup d'œil :

| Carte | Contenu |
|---|---|
| **Revenus aujourd'hui** | Total en Ariary du jour |
| **Revenus ce mois** | Cumul mensuel |
| **Actif / Expiré** | Ratio de vouchers |
| **Clients** | Nombre total |
| **Tickets** | Stock disponible |

## <Icon name="Database" color="warning" /> 7) Archiver

Pour alléger la base sur le long terme :

- Menu → **Paramètres → Système → Archivage**
- Définir le seuil (ex. > 12 mois)
- Lancer **Archiver maintenant** → les sessions anciennes passent en table archive, toujours consultables mais hors index principal

Le stock MariaDB reste sous les 500 MB même après plusieurs années d'exploitation.

## Retour

→ [Tous les tutoriels](/docs/manual/tutoriels/)
