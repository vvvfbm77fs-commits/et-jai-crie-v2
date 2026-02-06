# Et j'ai crié - Mémoire

Application Next.js pour créer des mémoriaux numériques et récits de vie avec dignité, esthétisme et humanité.

## 🎯 Description

"Et j'ai crié - Mémoire" est une plateforme permettant de capturer et transmettre l'essence d'une vie, d'une histoire ou d'un objet précieux. L'application accompagne l'utilisateur via un questionnaire sensible pour générer, grâce à l'IA, un récit structuré et émouvant, présenté sur une page mémorial haut de gamme.

## ✨ Fonctionnalités Clés

### 🏛️ Trois Types de Mémoriaux
1.  **Funéraire** : Pour honorer la mémoire d'un défunt (biographie, hommages, bougies/fleurs).
2.  **Vivant** : Pour raconter une vie, célébrer un départ en retraite ou un anniversaire (biographie, anecdotes, soutiens/cœurs).
3.  **Objet** : Pour transmettre l'histoire d'un meuble, d'un lieu ou d'un objet de famille (histoire, caractéristiques, "J'adore").

### 💎 Expérience Utilisateur
-   **Questionnaire Guidé** : Parcours étape par étape (Identité, Liens, Passions, Souvenirs...) pour collecter la matière narrative.
-   **Génération IA au ton juste** : Création de biographies riches et respectueuses (styles : Sobre, Narratif, Poétique).
-   **Design Premium & Templating** :
    -   Système de **thèmes visuels** (Bleu Nuit & Doré, Sépia & Terre, Encre & Manuscrit).
    -   Mise en page éditoriale automatique.
-   **Interactivité & Rituels** :
    -   **Espace Hommage** : Allumage de bougies virtuelles et dépôt de fleurs (Funéraire) ou "Likes/Cœurs" de soutien (Vivant/Objet).
    -   **Livre d'or** : Messages personnels des proches.
    -   **Musique** : Lecteur audio intégré pour une ambiance immersive.
    -   **Galerie Photo** : Diaporama élégant.

### 💼 Pour les Professionnels (Pompes Funèbres)
-   **Dashboard Pro** : Gestion des dossiers clients, suivi des statuts (Brouillon, En attente, Publié).
-   **QR Codes** : Génération de QR codes (Marbre/Laiton/Plexi) pour lier le physique au numérique.
-   **Suivi des commissions** : Interface dédiée à l'apport d'affaires.

## 🚀 Installation

```bash
# Cloner le projet
git clone [url-du-repo]
cd et-jai-crie

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env.local avec les clés Supabase et OpenAI/Claude
cp .env.example .env.local

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🛠️ Technologies

-   **Frontend** : Next.js 15 (App Router), React 18, TypeScript, Tailwind CSS.
-   **Backend / Data** : Supabase (PostgreSQL, Auth, Storage).
-   **IA** : Intégration pour la génération de texte (OpenAI / Anthropic).
-   **UI/UX** : Lucide React (Icônes), Framer Motion (Animations), Composants "Glassmorphism".
-   **Déploiement** : Vercel.

## 📁 Structure du Projet

```
et-jai-crie/
├── app/
│   ├── dashboard/          # Espace client et pro
│   ├── memorial/[id]/      # Page publique du mémorial (Production)
│   ├── exemple/            # Pages de démonstration (Funéraire, Vivant, Objet)
│   ├── questionnaire/      # Parcours de création
│   └── api/                # Routes API (Webhooks, Génération)
├── components/
│   ├── memorial-blocks/    # Briques du mémorial (Profile, Text, Gallery, Tribute...)
│   └── ...                 # Composants UI partagés
├── lib/
│   ├── templates.ts        # Configuration des thèmes visuels
│   ├── layouts.ts          # Gestion des structures de page
│   └── supabase.ts         # Client Supabase
└── public/                 # Assets statiques
```

## 🎨 Design System

L'application repose sur une identité visuelle forte :
-   **Typographie** : Combinaisons élégantes (Serif pour l'émotion, Sans-serif pour la clarté).
-   **Couleurs** : Palettes douces et respectueuses (Or, Bleu profond, Sable, Noir profonds).
-   **Architecture** : Système de blocs modulaires (`MemorialLayout`) permettant une grande flexibilité de mise en page tout en garantissant une harmonie visuelle.

## 📝 Principes Éditoriaux

L'IA est instruite pour respecter des règles strictes :
-   **Dignité** : Pas de familiarité excessive ni de pathétique.
-   **Vérité** : Pas d'invention de faits, respect des silences.
-   **Style** : Une plume adaptée au sujet (solennelle pour le deuil, pétillante pour le vivant).

## 📄 Licence

Propriété exclusive - Tous droits réservés.
