'use client';

import { Question as QuestionType } from '@/lib/schema';
import AudioUploader from './AudioUploader';
import ProfilePhotoUploader from './ProfilePhotoUploader';
import MediaUploader from './MediaUploader';
import { ADJECTIFS, VALEURS } from '@/lib/schema';

interface QuestionProps {
  question: QuestionType;
  value: any;
  onChange: (value: any) => void;
}

export default function Question({ question, value, onChange }: QuestionProps) {
  const { id, label, type, optional, options, placeholder, helper } = question;

  // Déterminer les options selon le type de question
  let questionOptions = options || [];
  if (id === 'adjectifs') {
    questionOptions = ADJECTIFS;
  } else if (id === 'selected') {
    questionOptions = VALEURS;
  }

  const handleCheckboxChange = (option: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.includes(option)) {
      onChange(currentValues.filter((v) => v !== option));
    } else {
      onChange([...currentValues, option]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block mb-3">
        <span className="text-memoir-blue font-medium">
          {label}
          {optional && (
            <span className="text-memoir-blue/50 text-sm ml-2">(facultatif)</span>
          )}
        </span>
        {helper && (
          <span className="block text-sm text-memoir-blue/60 mt-1">{helper}</span>
        )}
      </label>

      {type === 'text' && (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-field"
        />
      )}

      {type === 'date' && (
        <input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="input-field"
        />
      )}

      {type === 'textarea' && (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="input-field resize-y"
        />
      )}

      {type === 'select' && (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="input-field"
        >
          <option value="">-- Choisir --</option>
          {questionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {type === 'radio' && (
        <div className="space-y-2">
          {questionOptions.map((option) => (
            <label key={option} className="checkbox-item">
              <input
                type="radio"
                name={id}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-memoir-gold"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {type === 'checkbox' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
          {questionOptions.map((option) => (
            <label key={option} className="checkbox-item">
              <input
                type="checkbox"
                checked={Array.isArray(value) && value.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="w-4 h-4 text-memoir-gold"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {type === 'file' && (
        <AudioUploader
          audioId={value}
          onAudioChange={onChange}
          memorialId="current"
        />
      )}

      {type === 'photo' && (
        <ProfilePhotoUploader
          photoId={value}
          onPhotoChange={onChange}
          memorialId="current"
        />
      )}

      {type === 'gallery' && (
        <MediaUploader
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
          type="image"
        />
      )}
    </div>
  );
}
