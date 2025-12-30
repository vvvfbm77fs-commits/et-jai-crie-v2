'use client';

import { Step as StepType } from '@/lib/schema';
import Question from './Question';
import StylePicker from './StylePicker';
import MediaUploader from './MediaUploader';
import LinkManager from './LinkManager';
import ProfilePhotoUploader from './ProfilePhotoUploader';

interface StepProps {
  step: StepType;
  data: any;
  onChange: (field: string, value: any) => void;
}

// Fonction pour adapter les textes selon le genre
function adaptText(text: string, genre?: string): string {
  if (!genre || genre === 'Sans genre spécifié') {
    return text
      .replace(/\bAvait-elle\b/gi, 'Avait-elle')
      .replace(/\bdont elle était\b/gi, 'dont cette personne était')
      .replace(/\bqui la\b/gi, 'qui la')
      .replace(/\bCe qui l'animait/gi, 'Ce qui animait cette personne');
  }
  
  if (genre === 'Il') {
    return text
      .replace(/\bAvait-elle\b/gi, 'Avait-il')
      .replace(/\bdont elle était\b/gi, 'dont il était')
      .replace(/\bqui la\b/gi, 'qui le')
      .replace(/\bCe qui animait cette personne/gi, 'Ce qui l\'animait')
      .replace(/\bella\b/gi, 'le')
      .replace(/\bfière\b/gi, 'fier')
      .replace(/\bdéfinissaient\b/gi, 'définissaient');
  }
  
  // Genre === 'Elle' : on garde le texte tel quel
  return text;
}

export default function Step({ step, data, onChange }: StepProps) {
  const genre = data.identite?.genre;
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-memoir-blue mb-3">
          {step.title}
        </h2>
        {step.description && (
          <p className="text-memoir-blue/70 text-lg">
            {adaptText(step.description, genre)}
          </p>
        )}
      </div>

      {step.type === 'style-picker' ? (
        <StylePicker
          value={data.style}
          onChange={(value) => onChange('style', value)}
        />
      ) : step.type === 'profile-photo' ? (
        <ProfilePhotoUploader
          photoId={data.identite?.photoProfilId}
          onPhotoChange={(photoId) => onChange('identite.photoProfilId', photoId)}
          memorialId={typeof window !== 'undefined' ? `temp-${Date.now()}` : 'temp'}
        />
      ) : step.type === 'media-gallery' ? (
        <MediaUploader
          value={data.medias || []}
          onChange={(value) => onChange('medias', value)}
          type="all"
        />
      ) : step.type === 'links-manager' ? (
        <LinkManager
          value={data.liensWeb || []}
          onChange={(value) => onChange('liensWeb', value)}
        />
      ) : (
        <div className="space-y-6">
          {step.questions?.map((question) => (
            <Question
              key={question.id}
              question={{
                ...question,
                label: adaptText(question.label, genre),
                placeholder: question.placeholder ? adaptText(question.placeholder, genre) : undefined,
              }}
              value={data[step.id]?.[question.id]}
              onChange={(value) =>
                onChange(`${step.id}.${question.id}`, value)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
