# Et j'ai crié - Mémoire

Application Next.js pour créer des textes de mémoire avec dignité et humanité.

## 🎯 Description

"Et j'ai crié - Mémoire" est un questionnaire guidé permettant de transmettre l'essence d'une vie à travers un texte respectueux et personnel. L'application propose trois styles d'écriture (sobre, narratif, poétique) et collecte les informations essentielles pour créer un hommage digne.

## ✨ Fonctionnalités

- **Questionnaire complet en 9 étapes** : Identité, style, caractère, valeurs, liens, talents, réalisations, goûts, message
- **3 styles d'écriture** : Sobre/factuel, Narratif/humain, Poétique/sensible
- **Sauvegarde automatique** : Les réponses sont sauvegardées dans le navigateur
- **Interface soignée** : Design épuré avec palette de couleurs douce (beige, marron, noir)
- **Navigation fluide** : Progression par étapes avec barre de progression visuelle
- **Responsive** : Fonctionne sur mobile, tablette et desktop

## 📋 Structure du questionnaire

### Bloc A - Repères essentiels
Prénom, nom, dates de naissance/décès, lieux importants

### Bloc B - Style d'écriture
Choix entre 3 exemples de textes avec tonalités différentes

### Bloc C - Caractère et tempérament
Sélection parmi 22 adjectifs (discret·e, généreux·se, drôle, etc.)

### Bloc D - Valeurs
Sélection des valeurs importantes (liberté, transmission, justice, etc.)

### Bloc E - Liens et relations
Description des personnes importantes dans la vie

### Bloc F - Talents et passions
Talents particuliers et passions

### Bloc G - Réalisation ou fierté
Un accomplissement dont la personne était fière

### Bloc H - Goûts et signes de vie
Musique, phrase, lieu, habitude, saison préférée

### Bloc I - Message libre
Possibilité de laisser un message personnel

## 🚀 Installation

```bash
# Cloner le projet
git clone [url-du-repo]
cd et-jai-crie

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🛠️ Technologies utilisées

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icônes)

## 📁 Structure du projet

```
et-jai-crie/
├── app/
│   ├── page.tsx                 # Page d'accueil
│   ├── layout.tsx               # Layout principal
│   ├── globals.css              # Styles globaux
│   ├── questionnaire/
│   │   ├── page.tsx            # Page du questionnaire
│   │   └── steps.ts            # Définition des étapes
│   └── api/
│       └── generate/
│           └── route.ts        # API de génération (à venir)
├── components/
│   ├── Step.tsx                # Composant étape
│   ├── Question.tsx            # Composant question
│   ├── StylePicker.tsx         # Sélecteur de style
│   └── Progress.tsx            # Barre de progression
└── lib/
    ├── schema.ts               # Types et constantes
    └── prompt.ts               # Prompts pour l'IA
```

## 🎨 Design

### Palette de couleurs
- **Beige** (`#F5F1E8`) : Fond principal, douceur
- **Marron** (`#8B7355`) : Accent, boutons
- **Noir** (`#2C2C2C`) : Texte, contraste

### Typographie
- Police serif (Georgia) pour le corps de texte
- Interface soignée et épurée
- Hiérarchie visuelle claire

## 🔮 Développements futurs

1. **Génération IA du texte**
   - Intégration de l'API Anthropic Claude
   - Génération selon le style choisi
   - Respect strict du prompt éditorial

2. **Fonctionnalités avancées**
   - Export PDF du texte généré
   - Upload audio/vidéo pour le message libre
   - Partage sécurisé du questionnaire
   - Édition et régénération du texte

3. **Améliorations UX**
   - Animation entre les étapes
   - Validation des champs
   - Suggestions intelligentes
   - Mode sombre

## 📝 Principes éditoriaux

### Règles absolues du prompt IA
- Aucun propos insultant, violent, haineux ou diffamatoire
- Respect des silences et non-dits
- Aucune invention de faits
- Écriture avec dignité, sobriété et humanité
- Pas de clichés (« ange », « étoile », etc.)

### Les trois styles
- **Sobre** : clair, factuel, sans lyrisme
- **Narratif** : incarné, humain, anecdotique
- **Poétique** : lent, imagé, symbolique

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

## 📄 Licence

Projet personnel - Tous droits réservés

## 👤 Auteur

Projet créé dans le cadre de "Et j'ai crié - Mémoire"

---

**Note** : Cette application est conçue avec respect et sensibilité pour honorer la mémoire de ceux qui nous ont quittés ou pour transmettre l'héritage de ceux qui nous sont chers.
