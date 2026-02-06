'use client';

import Image from 'next/image';

interface ProfileBlockProps {
  prenom?: string;
  nom?: string;
  dateNaissance?: string;
  dateDeces?: string;
  photoUrl?: string;
  coverImage?: string; // New prop for Hero mode
  template: any;
  photoFilter?: string;
  coverImagePosition?: string; // New prop for custom object-position
}

export default function ProfileBlock({
  prenom,
  nom,
  dateNaissance,
  dateDeces,
  photoUrl,
  coverImage,
  template,
  photoFilter,
  coverImagePosition = 'center'
}: ProfileBlockProps) {
  const filters: Record<string, string> = {
    'original': '',
    'none': '',
    'bw': 'grayscale(100%)',
    'noir-blanc': 'grayscale(100%)',
    'sepia': 'sepia(80%) contrast(1.1)',
    'vintage': 'brightness(1.1) contrast(0.9) saturate(0.8)',
    'adouci': 'brightness(1.1) contrast(0.9) saturate(0.8)',
  };

  // If coverImage is provided, use the Hero Layout ("Example" style)
  if (coverImage) {
    return (
      <div className="relative h-[60vh] w-full mb-12 -mt-12 md:-mt-16 overflow-hidden">
        <Image
          src={coverImage}
          alt="Cover"
          fill
          className="object-cover"
          style={{ objectPosition: coverImagePosition }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${template.colors.bg} 0%, transparent 60%, rgba(0,0,0,0.2) 100%)`
          }}
        />

        <div className="absolute bottom-0 w-full p-6 md:p-12 flex flex-col items-center text-center pb-12 md:pb-20">
          {photoUrl && (
            <div className="mb-6 relative animate-in fade-in zoom-in duration-1000">
              <img
                src={photoUrl}
                alt={prenom || 'Photo de profil'}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 shadow-2xl"
                style={{
                  borderColor: template.colors.accent,
                  filter: filters[photoFilter || 'none'] || ''
                }}
              />
            </div>
          )}

          <h1
            className={`text-5xl md:text-7xl mb-4 drop-shadow-xl animate-in slide-in-from-bottom-4 duration-1000 delay-200 ${template.fonts.heading} ${template.typography === 'serif' ? 'font-serif' : 'font-sans'}`}
            style={{ color: template.colors.text }}
          >
            {prenom} {nom}
          </h1>

          {(dateNaissance || dateDeces) && (
            <div
              className="flex items-center justify-center gap-3 text-lg tracking-[0.2em] font-light uppercase opacity-90 drop-shadow-md animate-in slide-in-from-bottom-4 duration-1000 delay-300"
              style={{ color: template.colors.accent }}
            >
              {dateNaissance && (
                <span>{new Date(dateNaissance).getFullYear()}</span>
              )}
              {dateNaissance && dateDeces && <span>—</span>}
              {dateDeces && (
                <span>{new Date(dateDeces).getFullYear()}</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Classic Layout (Original)
  return (
    <div className="text-center">
      {photoUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={photoUrl}
            alt={prenom || 'Photo de profil'}
            className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-4 shadow-xl transition-all duration-700"
            style={{
              borderColor: template.colors.accent,
              filter: filters[photoFilter || 'none'] || ''
            }}
          />
        </div>
      )}

      <h1
        className={`text-4xl md:text-5xl mb-3 ${template.fonts.heading} ${template.typography === 'serif' ? 'font-serif' :
          template.typography === 'calligraphy' ? 'font-calli' :
            'font-sans'
          }`}
        style={{ color: template.colors.text }}
      >
        {prenom} {nom}
      </h1>

      {(dateNaissance || dateDeces) && (
        <div
          className="flex items-center justify-center gap-3 mb-10 text-sm tracking-widest font-light"
          style={{ color: template.colors.textSecondary }}
        >
          {dateNaissance && (
            <span>{new Date(dateNaissance).getFullYear()}</span>
          )}
          {dateNaissance && dateDeces && <span>—</span>}
          {dateDeces && (
            <span>{new Date(dateDeces).getFullYear()}</span>
          )}
        </div>
      )}

      <div
        className="h-px w-16 mx-auto"
        style={{ backgroundColor: template.colors.accent, opacity: 0.4 }}
      />
    </div>
  );
}
