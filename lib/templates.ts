// Configuration des templates visuels

export interface TemplateConfig {
  id: string;
  name: string;
  typography: 'sans-serif' | 'serif' | 'calligraphy';
  colors: {
    bg: string;
    text: string;
    accent: string;
    textSecondary: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    section: string; // mb-X
    block: string;   // mb-X
  };
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'bleu-dore',
    name: 'Bleu Nuit & Doré',
    typography: 'sans-serif',
    colors: {
      bg: '#243b55',
      text: '#FAFAFA',
      accent: '#B8936F',
      textSecondary: '#D1D5DB',
    },
    fonts: {
      heading: 'font-light tracking-wide',
      body: 'font-normal leading-relaxed',
    },
    spacing: {
      section: 'mb-20',
      block: 'mb-12',
    },
  },
  {
    id: 'sepia-terre',
    name: 'Sépia & Terre',
    typography: 'serif',
    colors: {
      bg: '#F5EFE6',
      text: '#3A2F28',
      accent: '#9D6B53',
      textSecondary: '#6B5D54',
    },
    fonts: {
      heading: 'font-light tracking-normal',
      body: 'font-serif leading-loose',
    },
    spacing: {
      section: 'mb-24',
      block: 'mb-14',
    },
  },
  {
    id: 'encre-manuscrit',
    name: 'Encre & Manuscrit',
    typography: 'calligraphy',
    colors: {
      bg: '#FFFDF7',
      text: '#1A1A1A',
      accent: '#6B6B6B',
      textSecondary: '#4A4A4A',
    },
    fonts: {
      heading: 'font-light italic tracking-wide',
      body: 'font-serif leading-loose',
    },
    spacing: {
      section: 'mb-24',
      block: 'mb-16',
    },
  },
];

export function getTemplate(id: string): TemplateConfig {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
}
