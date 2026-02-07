import { Step, ADJECTIFS, VALEURS, STYLE_EXEMPLES } from '@/lib/schema';
import { QuestionnaireData } from '@/lib/schema';

export const getSteps = (contextStr: string, data: Partial<QuestionnaireData> = {}, onlyTeaser: boolean = false): Step[] => {
  const steps: Step[] = [];

  // Determine actual context and type based on previous answers OR url fallback
  // We prioritize the data from Step 1 (contextSelection) if it exists.

  const selectedContext = (data as any)['contextSelection']?.type;

  let isPerson = true;
  let isObject = false;
  let isLiving = false; // Default assumption for wording if unknown

  if (selectedContext) {
    // Logic to parse the saved string from contextSelection
    if (selectedContext.includes('vivante')) {
      isLiving = true;
      isPerson = true;
    } else if (selectedContext.includes('disparue')) {
      isLiving = false;
      isPerson = true;
    } else if (selectedContext.includes('objet')) {
      isObject = true;
      isPerson = false;
    }
  } else {
    // Fallback to URL context if Step 1 not answered yet
    const isCelebration = contextStr === 'celebration';
    const isHeritage = contextStr === 'heritage';
    const isObjectMemory = contextStr === 'object_memory';

    // Heritage defaults
    const heritageType = (data as any)['heritageTypeSelection']?.heritageType; // Legacy support

    if (isObjectMemory || (isHeritage && heritageType === 'D\'un objet ou d\'un lieu')) {
      isObject = true;
      isPerson = false;
    } else {
      isPerson = true;
    }

    if (isCelebration) isLiving = true;
  }

  // STEP 1: Contextualisation (Le "Contextualisation douce")
  // Affiché au début pour orienter la suite
  steps.push({
    id: 'contextSelection',
    title: 'De qui souhaitez-vous parler ?',
    description: 'Pour commencer, précisons le sujet de votre récit.',
    questions: [
      {
        id: 'type',
        label: 'Je souhaite raconter l\'histoire...',
        type: 'radio',
        options: [
          'D\'une personne vivante (fête, anniversaire...)',
          'D\'une personne disparue (hommage, mémorial)',
          'D\'un objet, d\'un lieu ou d\'une transmission'
        ],
        path: 'contextSelection.type',
      }
    ]
  });

  // STEP 2: Repères essentiels
  steps.push({
    id: 'identite',
    title: 'Repères essentiels',
    description: isObject ? 'Identifions cet objet ou ce lieu.' : 'Identifions la personne.',
    questions: [
      // Person Fields
      ...(isPerson ? [
        {
          id: 'prenom',
          label: 'Prénom',
          type: 'text',
          placeholder: 'Ex: Jean',
        },
        {
          id: 'nom',
          label: 'Nom',
          type: 'text',
          optional: true,
          placeholder: 'Ex: Dupont',
        },
        {
          id: 'dateNaissance',
          label: 'Année de naissance',
          type: 'text',
          placeholder: 'Ex: 1954',
        },
      ] : []),

      // Object Fields
      ...(isObject ? [
        {
          id: 'prenom', // Reuse 'prenom' for Name
          label: 'Nom de l\'objet ou du lieu',
          type: 'text',
          placeholder: 'Ex: La montre de Grand-Père',
        },
        {
          id: 'dateNaissance', // Start date
          label: 'Depuis quand est-il dans la famille ?',
          type: 'text',
          placeholder: 'Ex: 1920, ou "depuis toujours"',
        }
      ] : []),

      // Conditional Death Date (Deceased Person only)
      ...(isPerson && !isLiving ? [
        {
          id: 'dateDeces',
          label: 'Année de décès',
          type: 'text',
          optional: true,
          placeholder: 'Ex: 2023',
        }
      ] : [])
    ].map(q => ({ ...q, type: q.type as any }))
  });

  // STEP: Lien avec la personne (SKIPPED IN TEASER)
  if (isPerson && !onlyTeaser) {
    steps.push({
      id: 'lienPersonne',
      title: 'Votre lien',
      description: 'Qui êtes-vous par rapport à cette personne ?',
      questions: [
        {
          id: 'type',
          label: 'Vous êtes...',
          type: 'select',
          options: [],
          path: 'lienPersonne.type'
        },
        {
          id: 'precision',
          label: 'Précisez (si besoin)',
          type: 'text',
          optional: true,
          path: 'lienPersonne.precisionAutre'
        }
      ]
    });
  }

  // STEP: Mode contributeur (SKIPPED IN TEASER)
  if (!isObject && !onlyTeaser) {
    steps.push({
      id: 'modeContributeur',
      title: 'Participation',
      description: 'Comment souhaitez-vous construire ce mémorial ?',
      questions: [
        {
          id: 'mode',
          label: 'Mode de participation',
          type: 'radio',
          options: ['Juste moi (je rédige seul·e)', 'Avec d\'autres personnes'],
          path: 'modeContributeur.mode'
        }
      ]
    });
  }

  // STEP 3: Style
  steps.push({
    id: 'style',
    title: 'Style d\'écriture',
    description: 'Quel ton ressemble le plus à cette histoire ?',
    type: 'style-picker',
    questions: []
  });

  // STEP 4: Trois mots
  steps.push({
    id: 'caractere',
    title: 'Trois mots',
    description: isObject ? 'Choisissez 3 mots qui définissent cet objet.' : 'Choisissez 3 mots pour le/la décrire.',
    questions: [
      {
        id: 'adjectifs',
        label: 'Sélectionnez 3 mots',
        type: 'checkbox',
        options: ADJECTIFS,
      },
      {
        id: 'autre',
        label: 'Ou ajoutez un autre mot',
        type: 'text',
        optional: true,
        placeholder: 'Votre mot...',
      }
    ]
  });

  // STEP 5: Une valeur
  steps.push({
    id: 'valeurs',
    title: 'Une valeur',
    description: isObject ? 'Quelle valeur cet objet représente-t-il ?' : 'Quelle valeur lui tenait le plus à cœur ?',
    questions: [
      {
        id: 'selected',
        label: 'Sélectionnez une ou plusieurs valeurs',
        type: 'checkbox', // The prompt implies single selection (radio circles) but checkbox is safer for hesitation. Let's keep checkbox or switch to radio if strict.
        options: VALEURS,
      },
      {
        id: 'autre',
        label: 'Autre',
        type: 'text',
        optional: true,
        placeholder: 'Autre valeur...',
      }
    ]
  });

  // STEP 6 (Final Teaser Step): En une phrase
  steps.push({
    id: 'message',
    title: 'En une phrase',
    description: isObject ? 'Pourquoi cet objet est-il important pour vous ?' : (isPerson ? `Si vous deviez résumer ${data.identite?.prenom || 'cette personne'} en une phrase ?` : 'Votre résumé'),
    questions: [
      {
        id: 'content',
        label: 'Votre résumé',
        type: 'textarea',
        placeholder: '________________________________',
        path: 'resume'
      }
    ]
  });

  if (onlyTeaser) {
    return steps;
  }

  // --- PREMIUM STEPS (Post-Paiement) ---

  // STEP 7: Galerie Photos
  steps.push({
    id: 'galerie',
    title: 'Galerie Souvenirs',
    description: 'Partagez quelques photos marquantes (max 15 pour commencer).',
    questions: [
      {
        id: 'photos',
        label: 'Vos photos',
        type: 'file', // Assuming 'file' type is handled or will be
        optional: true,
        path: 'galerie'
      }
    ]
  });

  // STEP 8: Arbre Généalogique (Famille)
  if (isPerson) {
    steps.push({
      id: 'famille',
      title: 'Racines & Famille',
      description: 'Pour situer cette personne dans son histoire familiale.',
      questions: [
        {
          id: 'parents',
          label: 'Noms des parents',
          type: 'text',
          optional: true,
          placeholder: 'Ex: Marie & Pierre Dupont',
          path: 'famille.parents'
        },
        {
          id: 'conjoint',
          label: 'Conjoint(e) / Partenaire',
          type: 'text',
          optional: true,
          placeholder: 'Ex: Sophie',
          path: 'famille.conjoint'
        },
        {
          id: 'enfants',
          label: 'Enfants (prénoms)',
          type: 'textarea',
          optional: true,
          placeholder: 'Ex: Lucas, Emma, Thomas...',
          path: 'famille.enfants'
        }
      ]
    });
  }

  // STEP 9: Talents & Passions
  steps.push({
    id: 'talents',
    title: 'Talents & Passions',
    description: isObject ? 'A quoi cet objet servait-il ?' : 'Qu\'est-ce qui l\'animait au quotidien ?',
    questions: [
      {
        id: 'talent',
        label: isObject ? 'Usage principal' : 'Un talent ou une passion ?',
        type: 'text',
        placeholder: isObject ? 'Ex: Coudre, écrire...' : 'Ex: Le piano, le jardinage...',
        path: 'talents.talent'
      },
      {
        id: 'detail',
        label: 'Quelques détails',
        type: 'textarea',
        optional: true,
        path: 'talents.details'
      }
    ]
  });

  // STEP 10: Une Fierté / Réalisation
  steps.push({
    id: 'fierte',
    title: 'Une Fierté',
    description: isObject ? 'Quel est son détail le plus remarquable ?' : 'Quelle était sa plus grande fierté ou réalisation ?',
    questions: [
      {
        id: 'content',
        label: 'Racontez-nous',
        type: 'textarea',
        placeholder: 'Ex: Avoir construit sa maison, ses enfants, un voyage...',
        path: 'fierte'
      }
    ]
  });

  // STEP 11: Goûts & Signes de vie
  if (isPerson) {
    steps.push({
      id: 'gouts',
      title: 'Jardin Secret',
      description: 'Ces petits détails qui n\'appartenaient qu\'à elle/lui.',
      questions: [
        {
          id: 'musique',
          label: 'Une musique qu\'il/elle aimait ?',
          type: 'text',
          optional: true,
          placeholder: 'Titre ou artiste',
          path: 'gouts.musique'
        },
        {
          id: 'citation',
          label: 'Une expression ou citation favorite ?',
          type: 'text',
          optional: true,
          placeholder: 'Ex: "La vie est belle"',
          path: 'gouts.citation'
        },
        {
          id: 'lieu',
          label: 'Son lieu préféré ?',
          type: 'text',
          optional: true,
          path: 'gouts.lieu'
        },
        {
          id: 'plat',
          label: 'Son plat signature ?',
          type: 'text',
          optional: true,
          path: 'gouts.plat'
        }
      ]
    });
  }

  // STEP 12: Message Libre
  steps.push({
    id: 'messageLibre',
    title: 'Message Libre',
    description: 'Avez-vous un dernier message à transmettre ?',
    questions: [
      {
        id: 'contenu',
        label: 'Votre message (ou celui que vous auriez voulu lui dire)',
        type: 'textarea',
        optional: true,
        placeholder: 'Écrivez librement ici...',
        path: 'messageLibre'
      }
    ]
  });

  return steps;
};
