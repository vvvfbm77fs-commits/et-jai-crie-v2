import { Step } from '@/lib/schema';

export const steps: Step[] = [
  {
    id: 'identite',
    title: 'Repères essentiels',
    description: 'Commençons par les informations de base',
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
        id: 'genre',
        label: 'Comment souhaitez-vous désigner cette personne ?',
        type: 'radio',
        options: ['Elle', 'Il', 'Sans genre spécifié'],
        helper: 'Cela permettra d\'adapter les formulations du texte',
      },
      {
        id: 'dateNaissance',
        label: 'Date de naissance',
        type: 'date',
        optional: true,
      },
      {
        id: 'dateDeces',
        label: 'Date de décès',
        type: 'date',
        optional: true,
        helper: 'Si concerné',
      },
      {
        id: 'lieuNaissance',
        label: 'Lieu de naissance',
        type: 'text',
        optional: true,
        placeholder: 'Ville, pays (facultatif)',
      },
      {
        id: 'lieuSymbolique',
        label: 'Lieu important ou symbolique',
        type: 'text',
        optional: true,
        placeholder: 'Un lieu qui a compté (facultatif)',
      },
    ],
  },
  {
    id: 'photo-profil',
    title: 'Photo de profil',
    description: 'Ajoutez une photo qui représente cette personne',
    type: 'profile-photo',
  },
  {
    id: 'style',
    title: 'Choix du style d\'écriture',
    description: 'Quel style vous ressemble le plus ?',
    type: 'style-picker',
  },
  {
    id: 'caractere',
    title: 'Caractère et tempérament',
    description: 'Parmi ces mots, lesquels correspondent le mieux à cette personne ?',
    questions: [
      {
        id: 'adjectifs',
        label: 'Sélectionnez les mots qui correspondent',
        type: 'checkbox',
        options: [], // Sera rempli depuis ADJECTIFS
      },
      {
        id: 'autre',
        label: 'Autre mot ou précision',
        type: 'text',
        optional: true,
        placeholder: 'Un autre mot qui vous vient...',
      },
    ],
  },
  {
    id: 'valeurs',
    title: 'Valeurs',
    description: 'Quelles valeurs lui tenaient particulièrement à cœur ?',
    questions: [
      {
        id: 'selected',
        label: 'Valeurs importantes',
        type: 'checkbox',
        options: [], // Sera rempli depuis VALEURS
      },
      {
        id: 'autre',
        label: 'Autre valeur',
        type: 'text',
        optional: true,
        placeholder: 'Une autre valeur...',
      },
    ],
  },
  {
    id: 'liens',
    title: 'Liens et relations',
    description: 'Les personnes qui ont compté dans sa vie',
    questions: [
      {
        id: 'personnes',
        label: 'Quelles personnes ont compté dans sa vie ?',
        type: 'textarea',
        placeholder: 'Parents, enfants, conjoint·e, ami·e·s, autres...',
        helper: 'Décrivez les liens importants',
      },
      {
        id: 'noms',
        label: 'Souhaitez-vous nommer certaines personnes ?',
        type: 'textarea',
        optional: true,
        placeholder: 'Noms et prénoms (facultatif)',
      },
    ],
  },
  {
    id: 'talents',
    title: 'Talents et passions',
    description: 'Ce qui animait cette personne, ce qu\'elle savait faire',
    questions: [
      {
        id: 'talent',
        label: 'Avait-elle un talent particulier ?',
        type: 'textarea',
        optional: true,
        placeholder: 'Un savoir-faire, une aptitude...',
      },
      {
        id: 'passions',
        label: 'Avait-elle une ou plusieurs passions ?',
        type: 'textarea',
        optional: true,
        placeholder: 'Ce qui la passionnait...',
      },
    ],
  },
  {
    id: 'realisation',
    title: 'Réalisation ou fierté',
    description: 'Un accomplissement dont elle était fière',
    questions: [
      {
        id: 'realisation',
        label: 'Y a-t-il quelque chose dont elle était particulièrement fière ?',
        type: 'textarea',
        optional: true,
        placeholder: 'Une réalisation, un moment de fierté...',
      },
    ],
  },
  {
    id: 'gouts',
    title: 'Goûts et signes de vie',
    description: 'Les petites choses qui la définissaient',
    questions: [
      {
        id: 'musique',
        label: 'Une musique importante',
        type: 'text',
        optional: true,
        placeholder: 'Chanson, artiste, morceau...',
      },
      {
        id: 'musiqueFileId',
        label: 'Ou ajoutez un fichier audio',
        type: 'file',
        optional: true,
        helper: 'MP3, WAV, M4A...',
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
    ],
  },
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
  {
    id: 'medias',
    title: 'Galerie média',
    description: 'Ajoutez des photos, vidéos ou musiques',
    type: 'media-gallery',
  },
  {
    id: 'liensWeb',
    title: 'Liens et ressources',
    description: 'Partagez des liens importants (articles, pages, réseaux sociaux...)',
    type: 'links-manager',
  },
];
