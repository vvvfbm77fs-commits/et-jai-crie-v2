'use client';

interface ProfileBlockProps {
  prenom?: string;
  nom?: string;
  dateNaissance?: string;
  dateDeces?: string;
  photoUrl?: string;
  template: any;
}

export default function ProfileBlock({ 
  prenom, 
  nom, 
  dateNaissance, 
  dateDeces, 
  photoUrl,
  template 
}: ProfileBlockProps) {
  return (
    <div className="text-center">
      {photoUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={photoUrl}
            alt={prenom || 'Photo de profil'}
            className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-4 shadow-xl"
            style={{ borderColor: template.colors.accent }}
          />
        </div>
      )}
      
      <h1 
        className={`text-4xl md:text-5xl mb-3 ${template.fonts.heading} ${
          template.typography === 'serif' ? 'font-serif' : 
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
