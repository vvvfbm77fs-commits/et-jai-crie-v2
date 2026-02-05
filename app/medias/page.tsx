'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Music, Image as ImageIcon, Check } from 'lucide-react';
import PhotoUploader from '@/components/PhotoUploader';
import GalleryUploader from '@/components/GalleryUploader';

export default function MediasPage() {
  const router = useRouter();
  const [memorialId] = useState(() => `memorial-${Date.now()}`);
  const [profilePhotoId, setProfilePhotoId] = useState<string | undefined>(undefined);
  const [galleryPhotos, setGalleryPhotos] = useState<any[]>([]);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('none');

  // Vérifier si on vient d'ALMA ou du questionnaire
  // Vérifier si on vient d'ALMA ou du questionnaire
  useEffect(() => {
    // Check for any valid context storage
    const almaData =
      localStorage.getItem('almaConversation_funeral') ||
      localStorage.getItem('almaConversation_living_story') ||
      localStorage.getItem('almaConversation_object_memory');

    const questionnaireData = localStorage.getItem('questionnaireData');

    if (!almaData && !questionnaireData) {
      // Si aucune donnée, rediriger vers l'accueil
      // router.push('/'); 
      // TEMPORARY: Commented out for debugging/easier flow testing. 
      // Ideally we should redirect, but if context is tricky, let's allow access for now or log warning.
      console.warn("No conversation data found. Redirect cancelled for dev.");
    }
  }, [router]);

  const handleContinue = () => {
    // Sauvegarder les médias dans localStorage
    const mediaData = {
      profilePhotoId,
      galleryPhotos,
      audioFile,
      selectedFilter,
      memorialId,
    };
    localStorage.setItem('mediaData', JSON.stringify(mediaData));

    // Rediriger vers la génération du texte
    router.push('/dashboard/1/generate');
  };

  const canContinue = profilePhotoId !== undefined; // Au minimum la photo de profil

  return (
    <div className="min-h-screen bg-gradient-to-br from-memoir-blue/5 via-white to-memoir-gold/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-memoir-blue mb-2">
            Ajoutez des médias
          </h1>
          <p className="text-memoir-blue/70">
            Photos, musique et souvenirs visuels qui feront vivre ce mémorial
          </p>
        </div>

        <div className="space-y-8">
          {/* Photo de profil */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-memoir-blue/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-memoir-gold/20 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-memoir-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-memoir-blue">Photo de profil</h2>
                <p className="text-sm text-memoir-blue/60">La photo principale du mémorial</p>
              </div>
            </div>
            <PhotoUploader
              photoId={profilePhotoId}
              onPhotoChange={setProfilePhotoId}
              memorialId={memorialId}
              label="Photo de profil"
              filter={selectedFilter}
            />
          </div>

          {/* Filtre photo */}
          {profilePhotoId && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-memoir-blue/10">
              <h3 className="text-lg font-semibold text-memoir-blue mb-4">Style de photo</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'none', label: 'Original' },
                  { value: 'sepia', label: 'Sépia' },
                  { value: 'bw', label: 'Noir & Blanc' },
                  { value: 'enhanced', label: 'Amélioré' },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${selectedFilter === filter.value
                      ? 'border-memoir-gold bg-memoir-gold/10 text-memoir-gold font-medium'
                      : 'border-memoir-blue/20 text-memoir-blue/70 hover:border-memoir-gold/50'
                      }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Galerie photos */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-memoir-blue/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-memoir-gold/20 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-memoir-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-memoir-blue">Galerie photos</h2>
                <p className="text-sm text-memoir-blue/60">Autres photos et souvenirs (optionnel)</p>
              </div>
            </div>
            <GalleryUploader
              medias={galleryPhotos}
              onMediasChange={setGalleryPhotos}
              memorialId={memorialId}
            />
          </div>

          {/* Audio */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-memoir-blue/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-memoir-gold/20 flex items-center justify-center">
                <Music className="w-5 h-5 text-memoir-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-memoir-blue">Musique ou message audio</h2>
                <p className="text-sm text-memoir-blue/60">Une musique importante ou un message vocal (optionnel)</p>
              </div>
            </div>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setAudioFile(event.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="block w-full text-sm text-memoir-blue/70
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-memoir-gold file:text-white
                file:cursor-pointer
                hover:file:bg-memoir-gold/90"
            />
            {audioFile && (
              <div className="mt-3">
                <audio controls className="w-full">
                  <source src={audioFile} />
                </audio>
              </div>
            )}
          </div>
        </div>

        {/* Bouton continuer */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className="flex items-center gap-2 px-8 py-4 bg-memoir-gold text-white rounded-lg font-medium text-lg hover:bg-memoir-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Check className="w-5 h-5" />
            Continuer vers le texte
          </button>
        </div>

        {!canContinue && (
          <p className="text-center text-sm text-memoir-blue/60 mt-3">
            La photo de profil est requise pour continuer
          </p>
        )}
      </div>
    </div>
  );
}