'use client';

import { Music, MapPin } from 'lucide-react';
import MusicPlayer from '@/components/MusicPlayer';

interface GoutsBlockProps {
  gouts: any;
  audioUrl?: string | null;
  template: any;
  isLightBg: boolean;
}

export default function GoutsBlock({ gouts, audioUrl, template, isLightBg }: GoutsBlockProps) {
  if (!gouts || (!gouts.musique && !gouts.lieu && !gouts.phrase && !audioUrl)) return null;
  
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
        Moments et goûts
      </h3>
      <div className="space-y-4">
        {gouts.musique && (
          <div className="flex items-start gap-3">
            <Music 
              className="w-5 h-5 flex-shrink-0 mt-1"
              style={{ color: template.colors.accent }}
            />
            <div className="flex-1">
              <p 
                className="font-semibold"
                style={{ color: template.colors.text }}
              >
                Musique
              </p>
              <p style={{ color: template.colors.text, opacity: 0.7 }}>
                {gouts.musique}
              </p>
            </div>
          </div>
        )}
        
        {audioUrl && (
          <div>
            <MusicPlayer
              audioUrl={audioUrl}
              title={gouts?.musique}
              accentColor={template.colors.accent}
              textColor={template.colors.text}
              bgColor={template.colors.bg}
              autoPlay={true}
            />
          </div>
        )}
        
        {gouts.lieu && (
          <div className="flex items-start gap-3">
            <MapPin 
              className="w-5 h-5 flex-shrink-0 mt-1"
              style={{ color: template.colors.accent }}
            />
            <div>
              <p 
                className="font-semibold"
                style={{ color: template.colors.text }}
              >
                Lieu
              </p>
              <p style={{ color: template.colors.text, opacity: 0.7 }}>
                {gouts.lieu}
              </p>
            </div>
          </div>
        )}
        
        {gouts.phrase && (
          <blockquote 
            className="border-l-4 pl-4 italic"
            style={{ 
              borderColor: template.colors.accent,
              color: template.colors.text,
              opacity: 0.8
            }}
          >
            {gouts.phrase}
          </blockquote>
        )}
      </div>
    </div>
  );
}
