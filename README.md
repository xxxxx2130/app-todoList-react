# Application de Gestion de Tâches - React Native

## Description
Cette application mobile permet aux utilisateurs de gérer efficacement leurs tâches quotidiennes.  
Développée dans le cadre du module **Programmation Application Client** de la Licence 3 Informatique à l'Université de Caen Normandie, elle offre une interface intuitive et des fonctionnalités complètes pour la gestion des listes et tâches individuelles.

---


## Fonctionnalités
### 1. Authentification et Gestion de Compte
- Création, connexion et déconnexion de compte  
- Suppression sécurisée du compte avec confirmation  

### 2. Gestion des Listes de Tâches
- Création et modification des listes thématiques  
- Consultation et suppression des listes  
- Visualisation de la progression globale par liste  

### 3. Gestion des Tâches Individuelles
- Ajout, modification et suppression de tâches  
- Marquage des tâches comme terminées ou en cours  
- Filtrage : toutes, en cours, terminées  

### 4. Suivi de la Progression
- Compteur de tâches terminées vs total  
- Barre de progression graphique  
- Statistiques globales de productivité  

### 5. Export des Données
- Export des tâches au format **CSV**  

### 6. Gestion des Erreurs
- Gestion des erreurs d’authentification, réseau et autorisation  
- Feedback clair à l’utilisateur via alertes et messages  

---

## Structure des Écrans
- Écran de connexion / création de compte / déconnexion  
- Écran de gestion du compte utilisateur  
- Écran des listes de tâches et détail d’une liste individuelle  

---

## Difficultés Rencontrées
- Importation d’images depuis la galerie : problèmes d’incompatibilité de versions de dépendances  

---

## Technologies Utilisées
- **React Native** pour le développement mobile multiplateforme  
- **Expo** pour le déploiement et tests rapides  
- **AsyncStorage** pour la persistance locale des tâches  
- **React Navigation** pour la navigation entre écrans  

---

## Installation et Lancement
1. Cloner le dépôt :  
```bash
git clone https://github.com/<username>/todo-app.git

    Installer les dépendances :

cd todo-app
npm install

    Lancer l’application :

npm run start

    Scanner le QR code avec Expo Go ou utiliser un émulateur mobile.

Perspectives d’Évolution

    Implémentation de notifications pour les tâches importantes

    Synchronisation avec un backend pour sauvegarde cloud

    Gestion de catégories de tâches

    Mode sombre / clair et améliorations de l’interface utilisateur
