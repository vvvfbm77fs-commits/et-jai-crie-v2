// Définition de la structure des données du mémorial

export type TemplateStyle = 'bleu-dore' | 'noir-argent' | 'lumineux';

export interface Media {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  nom?: string;
  description?: string;
  date?: string;
}

export interface Lien {
  id: string;
  url: string;
  titre?: string;
  description?: string;
}

export interface MemorialData {
  // Bloc A - Repères essentiels
  identite: {
    prenom: string;
    nom?: string;
    genre?: 'Elle' | 'Il' | 'Sans genre spécifié';
    dateNaissance?: string;
    dateDeces?: string;
    lieuNaissance?: string;
    lieuSymbolique?: string;
    photoProfilId?: string; // ID de la photo de profil dans IndexedDB
  };

  // Bloc B - Style d'écriture
  style: 'sobre' | 'narratif' | 'poetique' | null;

  // Template visuel choisi
  template?: TemplateStyle;

  // Filtre photo choisi pour la galerie
  photoFilter?: 'original' | 'noir-blanc' | 'sepia' | 'adouci';

  // Texte généré (peut être modifié manuellement)
  texteGenere?: string;

  // Bloc C - Caractère
  caractere: {
    adjectifs: string[];
    autre?: string;
  };

  // Bloc D - Valeurs
  valeurs: {
    selected: string[];
    autre?: string;
  };

  // Bloc E - Liens et relations
  liens: {
    personnes: string;
    noms?: string;
  };

  // Bloc F - Talents et passions
  talents: {
    talent?: string;
    passions?: string;
  };

  // Bloc G - Réalisation
  realisation?: string;

  // Bloc H - Goûts et signes de vie
  gouts: {
    musique?: string;
    musiqueFile?: File | null;
    musiqueFileId?: string; // ID du fichier MP3 dans IndexedDB
    phrase?: string;
    lieu?: string;
    habitude?: string;
    saison?: string;
  };

  // Bloc I - Message libre
  message: {
    hasMessage: boolean;
    type?: 'text' | 'audio' | 'video';
    content?: string;
    file?: File | null;
  };

  // Nouveau - Galerie média
  medias: Media[];

  // Nouveau - Liens web
  liensWeb: Lien[];
}

// Ancien nom gardé pour compatibilité
export type QuestionnaireData = MemorialData;

export interface Question {
  id: string;
  label: string;
  type: 'text' | 'date' | 'textarea' | 'checkbox' | 'radio' | 'select' | 'file';
  optional?: boolean;
  options?: string[];
  placeholder?: string;
  helper?: string;
}

export interface Step {
  id: string;
  title: string;
  description?: string;
  type?: 'default' | 'style-picker' | 'media-gallery' | 'links-manager';
  questions?: Question[];
}

export const ADJECTIFS = [
  'discret·e',
  'généreux·se',
  'drôle',
  'engagé·e',
  'réservé·e',
  'passionné·e',
  'libre',
  'protecteur·rice',
  'créatif·ve',
  'pragmatique',
  'curieux·se',
  'patient·e',
  'exigeant·e',
  'tendre',
  'entier·e',
  'solaire',
  'pudique',
  'audacieux·se',
  'calme',
  'énergique',
  'rassurant·e',
  'indépendant·e',
];

export const VALEURS = [
  'liberté',
  'transmission',
  'justice',
  'loyauté',
  'solidarité',
  'travail bien fait',
  'respect',
  'créativité',
  'engagement',
  'discrétion',
  'famille',
  'amitié',
  'courage',
  'humour',
  'curiosité',
  'simplicité',
  'honnêteté',
  'bienveillance',
];

export const SAISONS = [
  'Printemps',
  'Été',
  'Automne',
  'Hiver',
];

export const STYLE_EXEMPLES = [
  {
    id: 'sobre',
    titre: 'Sobre / Factuel',
    texte: 'Né en 1958, il a traversé sa vie avec discrétion et constance. Il aimait les choses simples, les liens durables, et les moments partagés sans bruit.',
  },
  {
    id: 'narratif',
    titre: 'Narratif / Humain',
    texte: 'Il aimait être entouré. Les repas qui s\'éternisent, les conversations qui comptent, et cette façon bien à lui d\'être présent sans s\'imposer.',
  },
  {
    id: 'poetique',
    titre: 'Poétique / Sensible',
    texte: 'Il avançait doucement, laissant derrière lui des gestes simples et des traces discrètes. Ce qui demeure aujourd\'hui, ce sont ces présences invisibles qui continuent de nous accompagner.',
  },
];
