```typescript
import { Step } from '@/lib/schema';

export const getSteps = (context: 'funeral' | 'living_story' | 'object_memory' = 'funeral'): Step[] => {
  
  if (context === 'object_memory') {
    return [
       // ÉTAPE 0 - Identité de l'objet
       {
        id: 'identite',
        title: 'L\'objet',
        description: 'De quel objet s\'agit-il ?',
        questions: [
          {
            id: 'prenom', // Mapping reused for object name to keep schema simple
            label: 'Nom de l\'objet',
            type: 'text',
            placeholder: 'Ex: Le fauteuil de Grand-Père',
          },
          {
             id: 'type_objet',
             label: 'Type d\'objet',
             type: 'text',
             optional: true,
             placeholder: 'Ex: Meuble, bijou, outil...',
             // Note: schema keys might need to be flexible or we reuse 'nom' field 
           }
        ],
      },
      {
        id: 'photoProfil',
        title: 'Photo de l\'objet',
        description: 'Une photo pour identifier l\'objet',
        questions: [
          {
            id: 'photoProfilId',
            label: 'Photo principale',
            type: 'photo',
            optional: true,
            helper: 'Cette photo sera affichée en haut de la fiche mémoire',
            path: 'identite.photoProfilId',
          },
        ],
      },
      // ÉTAPE 1 - Origine
      {
         id: 'parcours', // Reusing parcours structure
         title: 'Origine et fabrication',
         description: 'D\'où vient cet objet ?',
         questions: [
           {
             id: 'moments', // mapped to origin story
             label: 'Histoire de son acquisition ou fabrication',
             type: 'textarea',
             placeholder: 'Acheté, fabriqué, transmis ? Racontez...',
           },
           {
              id: 'dateNaissance', // mapped to creation date
              label: 'Année de fabrication / acquisition (approximative)',
              type: 'text',
              placeholder: 'Ex: Vers 1950',
           },
           {
              id: 'lieuNaissance', // mapped to place of origin
              label: 'Lieu d\'origine',
              type: 'text',
              placeholder: 'Ville, Pays, Atelier...',
           }
         ]
      },
       // ÉTAPE 2 - Détails physiques
       {
         id: 'gouts', // Reusing gouts for physical details
         title: 'Détails et matières',
         description: 'À quoi ressemble-t-il vraiment ?',
         questions: [
           {
             id: 'goutsTexte',
             label: 'Matières, couleurs, usure',
             type: 'textarea',
             placeholder: 'En bois de chêne, cuir usé, rayure sur le côté...',
           }
         ]
       },
       // ÉTAPE 3 - Vie de l'objet
       {
         id: 'souvenirs_objet',
         title: 'La vie de l\'objet',
         description: 'Quels souvenirs sont liés à lui ?',
         questions: [
           {
             id: 'anecdote', // mapped to character anecdote
             label: 'Une scène, un moment marquant avec cet objet',
             type: 'textarea',
             placeholder: 'Il trônait toujours dans le salon...',
           }
         ]
       },
       // Galerie
       {
        id: 'galerie',
        title: 'Galerie photos',
        description: 'Dautres angles ou détails (facultatif)',
        questions: [
          {
            id: 'medias',
            label: 'Photos supplémentaires',
            type: 'gallery',
            optional: true,
            helper: 'Ajoutez des détails, des marques, l\'objet en situation...',
            path: 'medias',
          },
        ],
      },
    ];
  }

  // Common steps for PERSONS (Funeral & Living)
  const isLiving = context === 'living_story';

  return [
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
      title: isLiving ? 'Quel type de récit souhaitez-vous ?' : 'Quel type d\'hommage souhaitez-vous rendre ?',
      description: 'Cela nous aide à adapter le ton, la structure du texte et les questions suivantes.',
      questions: [
        {
          id: 'type',
          label: 'Choisissez le type de récit',
          type: 'radio',
          options: [
            isLiving ? 'Un portrait personnel (intimité, caractère)' : 'Un hommage personnel (la personne dans l\'intimité)',
            isLiving ? 'Un récit de parcours (carrière, réalisations)' : 'Un hommage professionnel (parcours, engagement, carrière)',
            'Les deux'
          ],
          helper: 'Vous pourrez modifier le texte final à tout moment.',
        },
      ],
    },
  
    // ÉTAPE 2 - Lien avec la personne
    {
      id: 'lienPersonne',
      title: 'Votre lien avec cette personne',
      description: 'Cette information permet d\'adapter la place que prend votre regard dans le texte.',
      questions: [
        {
          id: 'type',
          label: 'Qui est cette personne pour vous ?',
          type: 'radio',
          options: [
            'Père / Mère',
            'Fils / Fille',
            'Frère / Sœur',
            'Conjoint·e / Partenaire',
            'Ami·e',
            'Collègue / Associé·e',
            'Autre',
            !isLiving ? 'Je ne l\'ai pas connu personnellement' : null // Option hidden for living usually
          ].filter(Boolean) as string[],
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
        !isLiving ? {
          id: 'dateDeces',
          label: 'Année de décès',
          type: 'text',
          optional: true,
          placeholder: 'Ex: 2022',
          helper: 'Facultatif',
        } : null,
        !isLiving ? {
          id: 'lieuDeces',
          label: 'Lieu de décès',
          type: 'text',
          optional: true,
          placeholder: 'Ville, pays...',
        } : null,
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
      ].filter(Boolean) as any[],
    },
  
    // ÉTAPE 6 - Généalogie
    {
      id: 'genealogie',
      title: 'Généalogie',
      description: 'Les liens familiaux importants autour de cette personne',
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
      ],
    },
  
    // ÉTAPE 7 - Caractère
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
  
    // ÉTAPE 8 - Valeurs
    {
      id: 'valeurs',
      title: 'Valeurs',
      description: isLiving ? 'Quelles sont les valeurs qui lui tiennent à coeur ?' : 'Quelles valeurs tenaient particulièrement à cœur ?',
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
  
    // ÉTAPE 9 - Faits marquants
    {
      id: 'parcours',
      title: 'Faits marquants, exploits et parcours de vie',
      description: 'Les événements qui marquent sa trajectoire',
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
      ],
    },
  
    // ÉTAPE 10 - Humour
    {
      id: 'humour',
      title: 'Blagues, humour et légèreté',
      description: 'Les souvenirs légers et joyeux',
      questions: [
        {
          id: 'blagues',
          label: 'Blagues récurrentes ou phrases cultes',
          type: 'textarea',
          optional: true,
          placeholder: 'Ses expressions, ses blagues...',
        },
        {
          id: 'rires',
          label: 'Ce qui fait rire',
          type: 'textarea',
          optional: true,
          placeholder: 'Ce qui rend cette personne unique...',
        },
      ],
    },
  
    // ÉTAPE 11 - Talents et passions
    {
      id: 'talents',
      title: 'Talents et passions',
      description: 'Ce qui anime, ce qui est maîtrisé',
      questions: [
        {
          id: 'passions',
          label: 'Passions principales',
          type: 'textarea',
          optional: true,
          placeholder: 'Ce qui le/la passionne...',
        },
        {
          id: 'talent',
          label: 'Talent particulier',
          type: 'text',
          optional: true,
          placeholder: 'Un savoir-faire...',
        },
      ],
    },
  
    // ÉTAPE 12 - Goûts
    {
      id: 'gouts',
      title: 'Goûts et signes de vie',
      description: 'Les petites choses qui définissent',
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
      ],
    },
  
    // ÉTAPE 13 - Musique / audio
    {
      id: 'musiqueAudio',
      title: 'Audio',
      description: 'Ajoutez un fichier audio ou une musique (facultatif)',
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
  
    // ÉTAPE 14 - Galerie
    {
      id: 'galerie',
      title: 'Galerie photos',
      description: 'Ajoutez des photos qui illustrent sa vie (facultatif)',
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
          helper: 'Texte libre',
        },
      ],
    },
  ];
};
```
