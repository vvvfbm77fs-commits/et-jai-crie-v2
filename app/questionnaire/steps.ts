import { Step } from '@/lib/schema';

export const steps: Step[] = [
  // ÉTAPE 0 - Identité minimale
  {
    id: 'identite',
    title: 'L\'identité de la personne',
    description: 'Commençons par l\'essentiel',
    questions: [
      {
        id: 'prenom',
        label: 'Prénom',
        type: 'text',
        placeholder: 'Prénom de la personne',
      },
      {
        id: 'nom',
        label: 'Nom',
        type: 'text',
        optional: true,
        placeholder: 'Nom de famille (facultatif)',
      },
      {
        id: 'pronom',
        label: 'Comment souhaitez-vous que cette personne soit désignée dans le texte ?',
        type: 'radio',
        options: ['Il', 'Elle', 'Iel', 'Utiliser uniquement le prénom'],
        helper: 'Ce choix permet d\'écrire un texte fidèle à votre manière de parler de cette personne.',
      },
    ],
  },

  // ÉTAPE 1 - Type d'hommage
  {
    id: 'typeHommage',
    title: 'Quel type d\'hommage souhaitez-vous rendre ?',
    description: 'Cela nous aide à adapter le ton, la structure du texte et les questions suivantes.',
    questions: [
      {
        id: 'type',
        label: 'Choisissez le type d\'hommage',
        type: 'radio',
        options: [
          'Un hommage personnel (la personne dans l\'intimité)',
          'Un hommage professionnel (parcours, engagement, carrière)',
          'Les deux'
        ],
        helper: 'Vous pourrez modifier le texte final à tout moment.',
      },
    ],
  },

  // ÉTAPE 2 - Lien avec la personne (options adaptées dynamiquement selon le pronom)
  {
    id: 'lienPersonne',
    title: 'Votre lien avec cette personne',
    description: 'Cette information permet d\'adapter la place que prend votre regard dans le texte.',
    questions: [
      {
        id: 'type',
        label: 'Qui était cette personne pour vous ?',
        type: 'radio',
        // Les options seront adaptées dynamiquement selon le pronom choisi
        options: [
          'Père / Mère',
          'Fils / Fille',
          'Frère / Sœur',
          'Conjoint·e / Partenaire',
          'Ami·e',
          'Collègue / Associé·e',
          'Autre',
          'Je ne l\'ai pas connu personnellement'
        ],
      },
      {
        id: 'precisionAutre',
        label: 'Précisez',
        type: 'text',
        optional: true,
        placeholder: 'Votre lien avec la personne...',
        helper: 'Si vous avez choisi "Autre"',
      },
    ],
  },

  // ÉTAPE 3 - Mode contributeur
  {
    id: 'modeContributeur',
    title: 'Qui crée ce mémorial ?',
    description: 'Cette information permet d\'adapter le ton du texte et la signature finale.',
    questions: [
      {
        id: 'mode',
        label: 'Comment créez-vous ce mémorial ?',
        type: 'radio',
        options: [
          'Je crée ce mémorial seul·e',
          'Je crée ce mémorial avec d\'autres personnes'
        ],
      },
      {
        id: 'quiContribue',
        label: 'Qui contribue à ce mémorial ?',
        type: 'checkbox',
        optional: true,
        options: [
          'Ses enfants',
          'Ses ami·e·s',
          'Sa famille',
          'Ses collègues',
          'Ses proches',
          'Autre'
        ],
        helper: 'Si vous créez ce mémorial avec d\'autres personnes (plusieurs choix possibles)',
      },
      {
        id: 'quiContribueLibre',
        label: 'Précisez',
        type: 'text',
        optional: true,
        placeholder: 'Qui contribue ?',
        helper: 'Si vous avez choisi "Autre"',
      },
    ],
  },

  // ÉTAPE 4 - Style d'écriture
  {
    id: 'style',
    title: 'Choix du style d\'écriture',
    description: 'Quel style vous ressemble le plus ?',
    type: 'style-picker',
  },

  // ÉTAPE 5 - Repères biographiques
  {
    id: 'repereBio',
    title: 'Repères biographiques',
    description: 'Quelques dates et lieux pour situer le parcours',
    questions: [
      {
        id: 'dateNaissance',
        label: 'Année de naissance',
        type: 'text',
        optional: true,
        placeholder: 'Ex: 1947',
        helper: 'Facultatif',
      },
      {
        id: 'dateDeces',
        label: 'Année de décès',
        type: 'text',
        optional: true,
        placeholder: 'Ex: 2022',
        helper: 'Facultatif',
      },
      {
        id: 'lieuNaissance',
        label: 'Lieu de naissance',
        type: 'text',
        optional: true,
        placeholder: 'Ville, pays...',
      },
      {
        id: 'lieuSymbolique',
        label: 'Lieu important ou symbolique',
        type: 'text',
        optional: true,
        placeholder: 'Un lieu qui a compté...',
      },
    ],
  },

  // ÉTAPE 6 - Caractère (titre adapté dynamiquement)
  {
    id: 'caractere',
    title: 'Caractère et tempérament',
    description: 'Parmi ces mots, lesquels correspondent le mieux ?',
    questions: [
      {
        id: 'adjectifs',
        label: 'Sélectionnez les mots qui correspondent',
        type: 'checkbox',
        options: [], // Sera rempli depuis ADJECTIFS
      },
      {
        id: 'anecdote',
        label: 'Une anecdote qui illustre son caractère',
        type: 'textarea',
        optional: true,
        placeholder: 'Un souvenir, une situation caractéristique...',
      },
    ],
  },

  // ÉTAPE 7 - Valeurs
  {
    id: 'valeurs',
    title: 'Valeurs',
    description: 'Quelles valeurs tenaient particulièrement à cœur ?',
    questions: [
      {
        id: 'selected',
        label: 'Valeurs importantes',
        type: 'checkbox',
        options: [], // Sera rempli depuis VALEURS
      },
      {
        id: 'valeursTexte',
        label: 'Précisions sur ces valeurs',
        type: 'textarea',
        optional: true,
        placeholder: 'Développez ce qui était important...',
      },
    ],
  },

  // ÉTAPE 8 - Liens et relations
  {
    id: 'liens',
    title: 'Liens et relations',
    description: 'Les personnes qui ont compté dans sa vie',
    questions: [
      {
        id: 'noms',
        label: 'Noms des personnes importantes',
        type: 'textarea',
        optional: true,
        placeholder: 'Prénoms, noms...',
      },
      {
        id: 'liensTexte',
        label: 'Nature de ces liens',
        type: 'textarea',
        optional: true,
        placeholder: 'Décrivez la nature des relations...',
        helper: 'Parents, enfants, conjoint·e, ami·e·s, collègues...',
      },
    ],
  },

  // ÉTAPE 9 - Talents et passions
  {
    id: 'talents',
    title: 'Talents et passions',
    description: 'Ce qui animait, ce qui était maîtrisé',
    questions: [
      {
        id: 'passions',
        label: 'Passions principales',
        type: 'textarea',
        optional: true,
        placeholder: 'Ce qui le/la passionnait...',
      },
      {
        id: 'talent',
        label: 'Talent particulier',
        type: 'text',
        optional: true,
        placeholder: 'Un savoir-faire...',
      },
      {
        id: 'talentsTexte',
        label: 'Précisions sur ce talent ou ces passions',
        type: 'textarea',
        optional: true,
        placeholder: 'Développez...',
      },
    ],
  },

  // ÉTAPE 10 - Réalisation
  {
    id: 'realisation',
    title: 'Réalisation ou fierté',
    description: 'Un accomplissement dont il/elle était fier/fière',
    questions: [
      {
        id: 'realisationText',
        label: 'De quoi était-il/elle particulièrement fier/fière ?',
        type: 'textarea',
        optional: true,
        placeholder: 'Une réalisation, un moment de fierté...',
      },
    ],
  },

  // ÉTAPE 11 - Goûts et signes de vie
  {
    id: 'gouts',
    title: 'Goûts et signes de vie',
    description: 'Les petites choses qui définissaient',
    questions: [
      {
        id: 'musique',
        label: 'Une musique importante',
        type: 'text',
        optional: true,
        placeholder: 'Chanson, artiste, morceau...',
      },
      {
        id: 'phrase',
        label: 'Une phrase aimée',
        type: 'textarea',
        optional: true,
        placeholder: 'Une citation, un dicton...',
      },
      {
        id: 'lieu',
        label: 'Un lieu marquant',
        type: 'text',
        optional: true,
        placeholder: 'Un endroit important...',
      },
      {
        id: 'habitude',
        label: 'Une habitude ou un rituel',
        type: 'textarea',
        optional: true,
        placeholder: 'Un geste quotidien, une tradition...',
      },
      {
        id: 'saison',
        label: 'Une saison préférée',
        type: 'select',
        optional: true,
        options: ['Printemps', 'Été', 'Automne', 'Hiver'],
      },
      {
        id: 'goutsTexte',
        label: 'Autres goûts ou préférences',
        type: 'textarea',
        optional: true,
        placeholder: 'Nourriture, couleurs, activités...',
      },
    ],
  },

  // ÉTAPE 12 - Message libre
  {
    id: 'message',
    title: 'Message libre',
    description: 'Un dernier mot, si vous le souhaitez',
    questions: [
      {
        id: 'hasMessage',
        label: 'Souhaitez-vous laisser un message ?',
        type: 'radio',
        options: ['Oui', 'Non'],
      },
      {
        id: 'content',
        label: 'Votre message',
        type: 'textarea',
        optional: true,
        placeholder: 'Écrivez votre message ici...',
        helper: 'Texte libre (audio et vidéo seront disponibles dans une prochaine version)',
      },
    ],
  },
];
