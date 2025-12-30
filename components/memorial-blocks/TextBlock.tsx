'use client';

interface TextBlockProps {
  texte: string;
  template: any;
  isLightBg: boolean;
}

export default function TextBlock({ texte, template, isLightBg }: TextBlockProps) {
  if (!texte) return null;
  
  return (
    <div 
      className="rounded-xl shadow p-8"
      style={{ 
        backgroundColor: isLightBg ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
        color: template.colors.text
      }}
    >
      <div className="prose prose-lg max-w-none">
        <p 
          className={`whitespace-pre-line text-base md:text-lg ${template.fonts.body} ${
            template.typography === 'serif' || template.typography === 'calligraphy' ? 'font-serif' : 'font-sans'
          }`}
          style={{ 
            color: template.colors.text, 
            opacity: 0.92,
            lineHeight: template.typography === 'calligraphy' ? '2' : '1.8'
          }}
        >
          {texte}
        </p>
      </div>
    </div>
  );
}
