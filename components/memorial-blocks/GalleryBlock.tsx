'use client';

import PhotoGallery from '@/components/PhotoGallery';

interface GalleryBlockProps {
  medias: any[];
  template: any;
  photoFilter: string;
  isLightBg: boolean;
}

export default function GalleryBlock({ medias, template, photoFilter, isLightBg }: GalleryBlockProps) {
  if (!medias || medias.length === 0) return null;
  
  return (
    <div 
      className="rounded-xl shadow p-6"
      style={{ 
        backgroundColor: isLightBg ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)'
      }}
    >
      <h3 
        className="text-2xl font-bold mb-6"
        style={{ color: template.colors.text }}
      >
        Galerie
      </h3>
      <PhotoGallery 
        medias={medias}
        accentColor={template.colors.accent}
        textColor={template.colors.text}
        bgColor={template.colors.bg}
selectedFilter={(photoFilter || 'original') as 'original' | 'noir-blanc' | 'sepia' | 'adouci'}
        showFilterSelector={false}
      />
    </div>
  );
}
