import { Step, ADJECTIFS, VALEURS, STYLE_EXEMPLES } from '@/lib/schema';
import { QuestionnaireData } from '@/lib/schema';

export const getSteps = (contextStr: string, data: Partial<QuestionnaireData> = {}): Step[] => {
  const steps: Step[] = [];

  // Determine actual context and type
  const isCelebration = contextStr === 'celebration'; // Living
  const isHeritage = contextStr === 'heritage';
  const isFuneral = contextStr === 'funeral';
  const isObjectMemory = contextStr === 'object_memory'; // Legacy?

  // For Heritage, determine if Person or Object based on data
  const heritageType = (data as any)['heritageTypeSelection']?.heritageType;
  const isObject = isObjectMemory || (isHeritage && heritageType === 'D\'un objet ou d\'un lieu');
  const isPerson = !isObject; // Default is person

  // Living vs Deceased for Person
  const isLiving = isCelebration || (isHeritage && isPerson && false); // Heritage person could be living or dead? Prompt implied ancestors mostly ("récits d'ancêtres"). But "Transmettre vos mémoires" could be self. Let's assume Deceased/Ancestor for Heritage Person unless specified otherwise.
  // Actually, "Histoires de famille" -> often deceased.
  // "Fêter quelqu'un" -> Living.
  // "Honorer une mémoire" -> Deceased.
  // Let's assume Heritage Person is Deceased by default for "encrez-le pour les générations futures".
  // Or ask? Prompt says: "Si type = personne: Prénom, Année de naissance, Année de décès (si concerné)".
  // So "Année de décès" is conditional.

  // STEP 0: Heritage Type Selection (Only for Heritage context)
  if (isHeritage) {
    steps.push({
      id: 'heritageTypeSelection',
      title: 'De quoi souhaitez-vous parler ?',
      description: 'Choisissez la nature de ce mémorial.',
      questions: [
        {
          id: 'heritageType',
          label: 'Je souhaite raconter l\'histoire...',
          type: 'radio',
          options: ['D\'une personne', 'D\'un objet ou d\'un lieu'],
          path: 'heritageType', // We need to ensure saving this updates data.heritageType
          // Note: The generic Step component might save to 'heritageTypeSelection.heritageType' if not careful.
          // schema has heritageType at root. We might need a special handler or path '.'?
          // The StepComponent uses `field.split('.')`. If we want root, we can use a custom path logic.
          // Let's assume the question ID matches the field if it's at root, or we use path.
          // In previous code: `path: 'identite.photoProfilId'`.
          // So here `path: 'heritageType'` should work if we update StepComponent/Question logic to allow root updates.
          // But `data.heritageType` is at root.
          // Let's rely on `onChange` handling `path`.
        }
      ]
    });
  }

  // STEP 1: Repères essentiels
  steps.push({
    id: 'identite',
    title: 'Repères essentiels',
    description: isObject ? 'Identifions cet objet ou ce lieu.' : 'Identifions la personne.',
    questions: [
      // Common / Person Fields
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
          id: 'prenom', // Reuse 'prenom' as 'Name' for object to simplify schema mapping? Or use specific field?
          // Schema has 'prenom' in identite. Let's use it for Object Name for now or add 'nomObjet' to schema?
          // Prompt says "Nom : [_______]".
          // Let's use 'prenom' as the main "Title" field for the entity.
          label: 'Nom de l\'objet ou du lieu',
          type: 'text',
          placeholder: 'Ex: La montre de Grand-Père',
        },
        {
          id: 'dateNaissance', // Start date / acquisition
          label: 'Depuis quand est-il dans la famille ?',
          type: 'text',
          placeholder: 'Ex: 1920, ou "depuis toujours"',
        }
      ] : []),

      // Conditional Death Date (Person only)
      ...(isPerson && !isCelebration ? [
        {
          id: 'dateDeces',
          label: 'Année de décès (si concerné)',
          type: 'text',
          optional: true,
          placeholder: 'Ex: 2023',
        }
      ] : [])
    ].map(q => ({ ...q, type: q.type as any })) // Cast types
  });

  // STEP 2: Style
  steps.push({
    id: 'style',
    title: 'Style d\'écriture',
    description: 'Quel ton ressemble le plus à cette histoire ?',
    type: 'style-picker',
    questions: []
  });

  // STEP 3: Trois mots (Adjectifs)
  steps.push({
    id: 'caractere',
    title: 'Trois mots',
    description: isObject ? 'Choisissez 3 mots qui définissent cet objet.' : 'Choisissez 3 mots qui définissent cette personne.',
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

  // STEP 4: Une valeur
  steps.push({
    id: 'valeurs',
    title: 'Une valeur',
    description: isObject ? 'Quelle valeur cet objet représente-t-il ?' : isCelebration ? 'Quelle valeur lui tient le plus à cœur ?' : 'Quelle valeur lui tenait le plus à cœur ?',
    questions: [
      {
        id: 'selected',
        label: 'Sélectionnez des valeurs',
        type: 'checkbox',
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

  // STEP 5: En une phrase
  steps.push({
    id: 'message', // Schema has 'message' block.
    title: 'En une phrase',
    description: isObject ? 'Pourquoi cet objet est-il important pour vous ?' : (isCelebration ? 'Si vous deviez la résumer en une phrase ?' : 'Si vous deviez le/la résumer en une phrase ?'),
    questions: [
      {
        id: 'content',
        label: 'Votre résumé',
        type: 'textarea',
        placeholder: '________________________________',
      }
    ]
  });

  return steps;
};
