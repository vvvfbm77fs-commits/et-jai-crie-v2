# Commun Vivant

Application Next.js pour créer des mémoriaux numériques et récits de vie avec dignité, esthétisme et humanité.

## 🎯 Description

**Commun Vivant** est une plateforme qui permet de capturer et transmettre l'essence d'une vie, d'une histoire ou d'un objet précieux. L'application accompagne l'utilisateur via un questionnaire sensible pour générer, grâce à l'IA, un récit structuré et émouvant, présenté sur une page mémorial haut de gamme.

> Ce n'est pas un réseau social, ni un "mur Facebook". C'est un espace digne, sobre et intime pour dire ce qui compte vraiment.

---

## ✨ Fonctionnalités Clés

### 🏛️ Trois Types de Mémoriaux

1.  **Funéraire** : Pour honorer la mémoire d'un défunt  
    → Biographie, hommages, bougies et fleurs virtuelles

2.  **Vivant** : Pour raconter une vie, célébrer un départ en retraite ou un anniversaire  
    → Biographie, anecdotes, messages de soutien et cœurs

3.  **Objet** : Pour transmettre l'histoire d'un meuble, d'un lieu ou d'un objet de famille  
    → Histoire, caractéristiques, "J'adore" et témoignages

### 💎 Expérience Utilisateur

-   **Questionnaire Guidé** : Parcours étape par étape (Identité, Liens, Passions, Souvenirs...) pour collecter la matière narrative sans page blanche intimidante.

-   **Génération IA au ton juste** : Création de biographies riches et respectueuses via **Mistral AI**.  
    → Trois styles au choix : **Sobre/Factuel**, **Narratif/Humain**, **Poétique/Sensible**  
    → Respect absolu des faits fournis (pas d'invention)

-   **Design Premium & Templating** :
    -   Système de **thèmes visuels** : Bleu Nuit & Doré, Sépia & Terre, Encre & Manuscrit
    -   Mise en page éditoriale automatique
    -   Responsive : adapté mobile, tablette, desktop

-   **Interactivité & Rituels** :
    -   **Espace Hommage** : Allumage de bougies virtuelles et dépôt de fleurs (Funéraire) ou "Likes/Cœurs" de soutien (Vivant/Objet)
    -   **Livre d'or** : Messages personnels des proches
    -   **Musique** : Lecteur audio intégré pour une ambiance immersive
    -   **Galerie Photo** : Diaporama élégant

### 💼 Pour les Professionnels (Pompes Funèbres)

-   **Dashboard Pro** : Gestion des dossiers clients, suivi des statuts (Brouillon, En attente, Publié)
-   **QR Codes** : Génération de QR codes (Marbre/Laiton/Plexi) pour lier le physique au numérique
-   **Suivi des commissions** : Interface dédiée à l'apport d'affaires

---

## 🚀 Installation

```bash
# Cloner le projet
git clone [url-du-repo]
cd commun-vivant

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env.local avec :
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - MISTRAL_API_KEY

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🛠️ Technologies

-   **Frontend** : Next.js 15 (App Router), React 18, TypeScript, Tailwind CSS
-   **Backend / Data** : **Supabase** (PostgreSQL, Auth, Storage)
-   **IA** : **Mistral AI** (Le-Mistral-Small-Latest) pour la génération de texte
-   **UI/UX** : Lucide React (Icônes), Framer Motion (Animations), Composants "Glassmorphism"
-   **Déploiement** : Vercel

---

## 📁 Structure du Projet

```
commun-vivant/
├── app/
│   ├── dashboard/          # Espace client et pro
│   ├── memorial/[id]/      # Page publique du mémorial (Production)
│   ├── exemple/            # Pages de démonstration (Funéraire, Vivant, Objet)
│   ├── questionnaire/      # Parcours de création
│   └── api/                # Routes API (Webhooks, Génération)
├── components/
│   ├── memorial-blocks/    # Briques du mémorial (Profile, Text, Gallery, Tribute...)
│   └── ui/                 # Composants UI partagés
├── lib/
│   ├── templates.ts        # Configuration des thèmes visuels
│   ├── layouts.ts          # Gestion des structures de page
│   ├── supabase.ts         # Client Supabase
│   └── mistral.ts          # Configuration Mistral AI
└── public/                 # Assets statiques
```

---

## 📋 Le Questionnaire (Structure V2)

Le questionnaire est construit en **9 blocs progressifs** qui guident en douceur :

**Bloc A** – Repères essentiels (prénom, dates, lieux)  
**Bloc B** – Choix du style via 3 textes exemples  
**Bloc C** – Caractère et tempérament (liste d'adjectifs : discret·e, généreux·se, drôle, engagé·e...)  
**Bloc D** – Valeurs importantes (liste : liberté, transmission, justice, loyauté...)  
**Bloc E** – Liens et relations (personnes importantes)  
**Bloc F** – Talents et passions  
**Bloc G** – Réalisation ou fierté  
**Bloc H** – Goûts et signes de vie (musique, phrase, lieu, rituel, saison...)  
**Bloc I** – Message libre (texte, audio ou vidéo)

> Les listes complètes sont disponibles dans le document `questionnaire_complet_v2.pdf`

---

## 🎨 Design System

L'application repose sur une identité visuelle forte :

### Visuel
-   **Typographie** : Combinaisons élégantes (Serif pour l'émotion, Sans-serif pour la clarté)
-   **Couleurs** : Palettes douces et respectueuses (Or, Bleu profond, Sable, Noirs profonds)
-   **Architecture** : Système de blocs modulaires (`MemorialLayout`) permettant une grande flexibilité de mise en page tout en garantissant une harmonie visuelle
-   **Espaces généreux** : Respiration visuelle, pas de surcharge

### Éditorial
L'IA est instruite pour respecter des règles strictes :

-   **Dignité** : Pas de familiarité excessive ni de pathétique
-   **Vérité** : Pas d'invention de faits, respect des silences
-   **Justesse de ton** : Style adapté au sujet (solennelle pour le deuil, pétillante pour le vivant, sobre pour l'objet)
-   **Sobriété** : Dire l'essentiel, sans fioriture inutile

---

## 🔜 Fonctionnalités Prévues

- [ ] Formulaire de consentement RGPD
- [ ] Option "droit à l'oubli" (suppression définitive)
- [ ] Pages légales (Mentions légales, CGU, Politique de confidentialité)
- [ ] Amélioration UX du questionnaire
- [ ] Prévisualisation avant publication
- [ ] Support multimédia enrichi (galerie photo améliorée, audio)

---

## 🧭 État Actuel du Projet

### ✅ Fonctionnel
- Questionnaire complet (9 blocs)
- Génération de récit via Mistral AI
- Sauvegarde en base de données (Supabase)
- Page mémorial publique avec lien unique
- Déploiement en production sur Vercel
- 3 types de mémoriaux (Funéraire, Vivant, Objet)

### 🔧 Résolu Récemment
- Problème d'authentification Git (compte GitHub correct configuré)
- Publication des mémoriaux en production (désormais opérationnelle)

### 📌 En Cours
- Finalisation des pages légales
- Intégration RGPD complète
- Tests utilisateurs et ajustements UX
- Dashboard professionnel pour pompes funèbres

---

## 💭 Philosophie du Projet

> **La technique au service de la mémoire, pas l'inverse.**

Ce projet est sensible et intime. Chaque décision technique doit servir l'intention humaine : permettre à quelqu'un de transmettre ce qui compte, avec dignité.

Les choix de simplicité, de robustesse et d'accessibilité priment toujours sur l'élégance technique pure.

Si une solution est plus simple, plus robuste ou plus humaine, c'est celle-là qu'on privilégie.

---

## 📄 Licence

Propriété exclusive - Tous droits réservés.

---

## 📞 Contact

Pour toute question ou retour : [à compléter]

---

**Fait avec soin et intention** ✨