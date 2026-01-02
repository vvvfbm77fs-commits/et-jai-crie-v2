// Configuration des layouts de page

export type BlockType = 
  | 'profile'
  | 'text'
  | 'messages'
  | 'gallery'
  | 'gouts'
  | 'candle'
  | 'links'
  | 'quote';

export interface BlockConfig {
  id: BlockType;
  label: string;
  required?: boolean;
}

export interface LayoutConfig {
  id: string;
  name: string;
  description: string;
  columns: 1 | 2 | 3;
  blocks: BlockType[];
  columnBlocks?: {
    left?: BlockType[];
    center?: BlockType[];
    right?: BlockType[];
  };
}

export const AVAILABLE_BLOCKS: BlockConfig[] = [
  { id: 'profile', label: 'Photo & Nom', required: true },
  { id: 'text', label: 'Texte principal', required: true },
  { id: 'messages', label: 'Messages personnels' },
  { id: 'gallery', label: 'Galerie photos' },
  { id: 'gouts', label: 'Goûts & Musique' },
  { id: 'candle', label: 'Bougie' },
  { id: 'links', label: 'Liens web' },
  { id: 'quote', label: 'Citation' },
];

export const PRESET_LAYOUTS: LayoutConfig[] = [
  {
    id: 'classic',
    name: 'Classique',
    description: 'Une colonne, lecture linéaire',
    columns: 1,
    blocks: ['profile', 'text', 'messages', 'gallery', 'gouts', 'candle', 'links'],
  },
  {
    id: 'editorial',
    name: 'Éditorial',
    description: 'Deux colonnes élégantes',
    columns: 2,
    blocks: ['profile', 'text', 'messages', 'gallery', 'gouts', 'candle', 'links'],
    columnBlocks: {
      left: ['profile', 'gouts', 'candle'],
      right: ['text', 'messages'],
    },
  },
  {
    id: 'magazine',
    name: 'Magazine',
    description: 'Asymétrique, moderne',
    columns: 2,
    blocks: ['profile', 'text', 'messages', 'gallery', 'gouts', 'candle', 'links'],
    columnBlocks: {
      left: ['text', 'messages', 'gallery'],
      right: ['profile', 'gouts', 'links'],
    },
  },
  {
    id: 'triptych',
    name: 'Triptyque',
    description: 'Trois colonnes (desktop uniquement)',
    columns: 3,
    blocks: ['profile', 'text', 'messages', 'gallery', 'gouts', 'candle', 'links'],
    columnBlocks: {
      left: ['gouts', 'candle'],
      center: ['profile', 'text'],
      right: ['messages', 'links'],
    },
  },
];

export function getLayout(id: string): LayoutConfig {
  return PRESET_LAYOUTS.find(l => l.id === id) || PRESET_LAYOUTS[0];
}
