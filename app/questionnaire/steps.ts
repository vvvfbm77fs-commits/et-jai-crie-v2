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

  // ÉTAPE - Photo de profil
  {
    id: 'photoProfil',
    title: 'Photo de profil',
    description: 'Ajoutez une photo pour personnaliser le mémorial (facultatif)',
    questions: [
      {
        id: 'photoProfilId',
        label: 'Photo de la personne',
        type: 'photo',
        optional: true,
        helper: 'Cette photo sera affichée en haut du mémorial',
        path: 'identite.photoProfilId',
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
    description: 'Toutes les contributions servent à générer un texte unique à la fin.',
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
        id: 'lieuDeces',
        label: 'Lieu de décès',
        type: 'text',
        optional: true,
        placeholder: 'Ville, pays...',
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

  // ÉTAPE 6 - Généalogie
  {
    id: 'genealogie',
    title: 'Généalogie',
    description: 'Les liens familiaux importants autour de cette personne',
    optional: true,
    questions: [
      {
        id: 'parents',
        label: 'Parents',
        type: 'textarea',
        optional: true,
        placeholder: 'Prénoms, liens, éléments marquants...',
      },
      {
        id: 'fratrie',
        label: 'Fratrie',
        type: 'textarea',
        optional: true,
        placeholder: 'Frères, sœurs, liens particuliers...',
      },
      {
        id: 'enfants',
        label: 'Enfants',
        type: 'textarea',
        optional: true,
        placeholder: 'Prénoms, relations, souvenirs...',
      },
      {
        id: 'partenaires',
        label: 'Conjoint·e(s) / Partenaire(s)',
        type: 'textarea',
        optional: true,
        placeholder: 'Personnes avec qui il/elle a partagé sa vie...',
      },
      {
        id: 'autres',
        label: 'Autres liens familiaux',
        type: 'textarea',
        optional: true,
        placeholder: 'Grands-parents, petits-enfants, autres...',
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

  // ÉTAPE 8 - Faits marquants, parcours, engagements
  {
    id: 'parcours',
    title: 'Faits marquants, exploits et parcours de vie',
    description: 'Les événements qui ont marqué sa trajectoire',
    optional: true,
    questions: [
      {
        id: 'moments',
        label: 'Moments marquants de sa vie',
        type: 'textarea',
        optional: true,
        placeholder: 'Réussites, épreuves, tournants, accidents...',
      },
      {
        id: 'parcoursProfessionnel',
        label: 'Parcours professionnel ou carrière',
        type: 'textarea',
        optional: true,
        placeholder: 'Études, métier, engagements professionnels...',
      },
      {
        id: 'engagements',
        label: 'Engagements, combats, passions structurantes',
        type: 'textarea',
        optional: true,
        placeholder: 'Militantisme, passions importantes...',
      },
      {
        id: 'fiertes',
        label: 'Fiertés ou accomplissements majeurs',
        type: 'textarea',
        optional: true,
        placeholder: 'Ce dont il/elle était particulièrement fier/fière...',
      },
    ],
  },

  // ÉTAPE 9 - Blagues, humour et souvenirs
  {
    id: 'humour',
    title: 'Blagues, humour et souvenirs',
    description: 'Les souvenirs légers et joyeux (facultatif)',
    optional: true,
    questions: [
      {
        id: 'blagues',
        label: 'Blagues récurrentes ou phrases cultes',
        type: 'textarea',
        optional: true,
        placeholder: 'Ses expressions, ses blagues...',
      },
      {
        id: 'betises',
        label: 'Bêtises ou situations absurdes',
        type: 'textarea',
        optional: true,
        placeholder: 'Souvenirs drôles, petites histoires...',
      },
      {
        id: 'rires',
        label: 'Ce qui faisait rire tout le monde',
        type: 'textarea',
        optional: true,
        placeholder: 'Ce qui rendait cette personne unique...',
      },
    ],
  },

  // ÉTAPE 10 - Liens et relations
  {
    id: 'liens',
    title: 'Liens et relations',
    description: 'Les personnes qui ont compté dans sa vie',
    optional: true,
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

  // ÉTAPE 11 - Talents et passions
  {
    id: 'talents',
    title: 'Talents et passions',
    description: 'Ce qui animait, ce qui était maîtrisé',
    optional: true,
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

  // ÉTAPE 12 - Goûts et signes de vie
  {
    id: 'gouts',
    title: 'Goûts et signes de vie',
    description: 'Les petites choses qui définissaient',
    optional: true,
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

  // ÉTAPE 13 - Musique / audio
  {
    id: 'musiqueAudio',
    title: 'Galerie et audio',
    description: 'Ajoutez un fichier audio ou une musique liée au souvenir (facultatif)',
    optional: true,
    questions: [
      {
        id: 'musiqueFileId',
        label: 'Fichier audio',
        type: 'file',
        optional: true,
        helper: 'MP3, WAV, M4A...',
        path: 'gouts.musiqueFileId',
      },
    ],
  },

  // ÉTAPE 14 - Galerie photos
  {
    id: 'galerie',
    title: 'Galerie photos',
    description: 'Ajoutez des photos qui illustrent sa vie (facultatif)',
    optional: true,
    questions: [
      {
        id: 'medias',
        label: 'Photos de la galerie',
        type: 'gallery',
        optional: true,
        helper: 'Vous pouvez ajouter jusqu\'à 20 photos. Elles seront affichées sous forme de galerie.',
        path: 'medias',
      },
    ],
  },

  // ÉTAPE 15 - Message libre
  {
    id: 'message',
    title: 'Message libre',
    description: 'Un dernier mot, si vous le souhaitez',
    optional: true,
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
