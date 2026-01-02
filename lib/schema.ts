// Définition de la structure des données du questionnaire

export interface QuestionnaireData {
  // Bloc A - Repères essentiels
  identite: {
    prenom: string;
    nom?: string;
    dateNaissance?: string;
    dateDeces?: string;
    lieuNaissance?: string;
    lieuSymbolique?: string;
    pronom?: 'il' | 'elle' | 'iel' | 'prenom';
  };

  // Nouveau - Type d'hommage
  typeHommage?: 'personnel' | 'professionnel' | 'mixte';

  // Nouveau - Lien avec la personne
  lienPersonne?: {
    type: 'pere-mere' | 'fils-fille' | 'frere-soeur' | 'conjoint' | 'ami' | 'collegue' | 'autre' | 'inconnu';
    precisionAutre?: string;
  };

  // Nouveau - Mode contributeur
  modeContributeur?: {
    mode: 'solo' | 'multi';
    quiContribue?: string[]; // Array pour checkbox multiple
    quiContribueLibre?: string; // Champ libre si "Autre"
  };

  // Bloc B - Style d'écriture
  style: 'sobre' | 'narratif' | 'poetique' | null;

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
  };

  // Médias et liens
  medias?: any[];
  liensWeb?: any[];
  };

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
  caption?: string;
  nom?: string;
}

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
  type?: 'default' | 'style-picker';
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
