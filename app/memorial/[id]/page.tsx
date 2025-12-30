'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Share2, Music, MapPin } from 'lucide-react';
import Footer from '@/components/Footer';
import PhotoGallery from '@/components/PhotoGallery';
import CandleMemorial from '@/components/CandleMemorial';
import MusicPlayer from '@/components/MusicPlayer';
import WebLinksDisplay from '@/components/WebLinksDisplay';
import PersonalMessages from '@/components/PersonalMessages';
import { getPhoto, blobToURL } from '@/lib/indexedDB';
import { getTemplate } from '@/lib/templates';

export default function MemorialPage() {
  const params = useParams();
  const router = useRouter();
  const [memorial, setMemorial] = useState<any>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [galleryMediasWithUrls, setGalleryMediasWithUrls] = useState<any[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const id = params?.id;
    if (!id) {
      router.push('/');
      return;
    }

    const saved = localStorage.getItem('memorial-' + id);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setMemorial(data);
        
        if (data.identite?.photoProfilId) {
          loadProfilePhoto(data.identite.photoProfilId);
        }
        
        if (data.medias && data.medias.length > 0) {
          loadGalleryMedias(data.medias);
        }
        
        if (data.gouts?.musiqueFileId) {
          loadAudio(data.gouts.musiqueFileId);
        }
      } catch (e) {
        console.error('Erreur');
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [params, router]);

  const loadProfilePhoto = async (photoId: string) => {
    try {
      const photo = await getPhoto(photoId);
      if (photo) {
        setProfilePhotoUrl(blobToURL(photo.blob));
      }
    } catch (error) {
      console.error('Erreur chargement photo profil:', error);
    }
  };

  const loadGalleryMedias = async (medias: any[]) => {
    try {
      const mediasWithUrls = await Promise.all(
        medias.map(async (media) => {
          if (media.url.startsWith('indexed-db:')) {
            const photoId = media.url.replace('indexed-db:', '');
            const photo = await getPhoto(photoId);
            if (photo) {
              return { ...media, url: blobToURL(photo.blob) };
            }
          }
          return media;
        })
      );
      setGalleryMediasWithUrls(mediasWithUrls);
    } catch (error) {
      console.error('Erreur chargement médias:', error);
    }
  };

  const loadAudio = async (audioId: string) => {
    try {
      const audio = await getPhoto(audioId);
      if (audio) {
        setAudioUrl(blobToURL(audio.blob));
      }
    } catch (error) {
      console.error('Erreur chargement audio:', error);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Mémorial de ' + (memorial?.identite?.prenom || ''),
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Lien copié !');
    }
  };

  if (!memorial) {
    return (
      <div className="min-h-screen bg-memoir-bg flex items-center justify-center">
        <p className="text-memoir-blue">Chargement...</p>
      </div>
    );
  }

  const { identite, gouts, texteGenere, template, photoFilter, message, liensWeb } = memorial;
  const currentTemplate = getTemplate(template || 'bleu-dore');
  const isLightBg = ['sepia-terre', 'encre-manuscrit'].includes(template || '');
  const memorialId = params?.id as string;

  return (
    <main className="min-h-screen" style={{ backgroundColor: currentTemplate.colors.bg }}>
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 transition-colors"
              style={{ color: currentTemplate.colors.accent }}
            >
              <Home className="w-5 h-5" />
              <span className="text-sm">Retour</span>
            </Link>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm"
              style={{ 
                backgroundColor: currentTemplate.colors.accent,
                color: isLightBg ? '#fff' : currentTemplate.colors.bg
              }}
            >
              <Share2 className="w-4 h-4" />
              Partager
            </button>
          </div>

          {/* Photo de profil */}
          {profilePhotoUrl && (
            <div className="flex justify-center mb-8">
              <img
                src={profilePhotoUrl}
                alt={identite?.prenom || 'Photo de profil'}
                className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-4 shadow-xl"
                style={{ borderColor: currentTemplate.colors.accent }}
              />
            </div>
          )}

          {/* Nom et dates */}
          <div className="text-center mb-12">
            <h1 
              className={`text-4xl md:text-5xl mb-3 ${currentTemplate.fonts.heading} ${
                currentTemplate.typography === 'serif' ? 'font-serif' : 
                currentTemplate.typography === 'calligraphy' ? 'font-calli' : 
                'font-sans'
              }`}
              style={{ color: currentTemplate.colors.text }}
            >
              {identite?.prenom} {identite?.nom}
            </h1>
            
            {(identite?.dateNaissance || identite?.dateDeces) && (
              <div 
                className="flex items-center justify-center gap-3 mb-10 text-sm tracking-widest font-light"
                style={{ color: currentTemplate.colors.textSecondary }}
              >
                {identite?.dateNaissance && (
                  <span>{new Date(identite.dateNaissance).getFullYear()}</span>
                )}
                {identite?.dateNaissance && identite?.dateDeces && <span>—</span>}
                {identite?.dateDeces && (
                  <span>{new Date(identite.dateDeces).getFullYear()}</span>
                )}
              </div>
            )}

            <div 
              className="h-px w-16 mx-auto mb-12"
              style={{ backgroundColor: currentTemplate.colors.accent, opacity: 0.4 }}
            />
          </div>

          {/* Texte principal */}
          {texteGenere && (
            <div 
              className="rounded-xl shadow p-8 mb-8"
              style={{ 
                backgroundColor: isLightBg ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
                color: currentTemplate.colors.text
              }}
            >
              <p 
                className={`whitespace-pre-line text-base md:text-lg ${currentTemplate.fonts.body} ${
                  currentTemplate.typography === 'serif' || currentTemplate.typography === 'calligraphy' ? 'font-serif' : 'font-sans'
                }`}
                style={{ 
                  color: currentTemplate.colors.text, 
                  opacity: 0.92,
                  lineHeight: currentTemplate.typography === 'calligraphy' ? '2' : '1.8'
                }}
              >
                {texteGenere}
              </p>
            </div>
          )}

          {/* Messages personnels */}
          {message && message.hasMessage && message.content && (
            <div className="mb-8">
              <PersonalMessages
                messages={[{ content: message.content }]}
                accentColor={currentTemplate.colors.accent}
                textColor={currentTemplate.colors.text}
                bgColor={currentTemplate.colors.bg}
                typography={currentTemplate.typography}
              />
            </div>
          )}

          {/* Galerie */}
          {galleryMediasWithUrls && galleryMediasWithUrls.length > 0 && (
            <div 
              className="rounded-xl shadow p-6 mb-8"
              style={{ 
                backgroundColor: isLightBg ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)'
              }}
            >
              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: currentTemplate.colors.text }}
              >
                Galerie
              </h3>
              <PhotoGallery 
                medias={galleryMediasWithUrls}
                accentColor={currentTemplate.colors.accent}
                textColor={currentTemplate.colors.text}
                bgColor={currentTemplate.colors.bg}
                selectedFilter={photoFilter || 'original'}
                showFilterSelector={false}
              />
            </div>
          )}

          {/* Goûts et musique */}
          {(gouts?.musique || gouts?.lieu || gouts?.phrase || audioUrl) && (
            <div 
              className="rounded-xl shadow p-6 mb-8"
              style={{ 
                backgroundColor: isLightBg ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)'
              }}
            >
              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: currentTemplate.colors.text }}
              >
                Moments et goûts
              </h3>
              <div className="space-y-4">
                {gouts?.musique && (
                  <div className="flex items-start gap-3">
                    <Music 
                      className="w-5 h-5 flex-shrink-0 mt-1"
                      style={{ color: currentTemplate.colors.accent }}
                    />
                    <div className="flex-1">
                      <p 
                        className="font-semibold"
                        style={{ color: currentTemplate.colors.text }}
                      >
                        Musique
                      </p>
                      <p style={{ color: currentTemplate.colors.text, opacity: 0.7 }}>
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
                      accentColor={currentTemplate.colors.accent}
                      textColor={currentTemplate.colors.text}
                      bgColor={currentTemplate.colors.bg}
                      autoPlay={true}
                    />
                  </div>
                )}
                
                {gouts?.lieu && (
                  <div className="flex items-start gap-3">
                    <MapPin 
                      className="w-5 h-5 flex-shrink-0 mt-1"
                      style={{ color: currentTemplate.colors.accent }}
                    />
                    <div>
                      <p 
                        className="font-semibold"
                        style={{ color: currentTemplate.colors.text }}
                      >
                        Lieu
                      </p>
                      <p style={{ color: currentTemplate.colors.text, opacity: 0.7 }}>
                        {gouts.lieu}
                      </p>
                    </div>
                  </div>
                )}
                
                {gouts?.phrase && (
                  <blockquote 
                    className="border-l-4 pl-4 italic"
                    style={{ 
                      borderColor: currentTemplate.colors.accent,
                      color: currentTemplate.colors.text,
                      opacity: 0.8
                    }}
                  >
                    {gouts.phrase}
                  </blockquote>
                )}
              </div>
            </div>
          )}

          {/* Bougie */}
          {identite?.prenom && (
            <div className="mb-8">
              <CandleMemorial 
                prenom={identite.prenom}
                memorialId={memorialId}
                accentColor={currentTemplate.colors.accent}
                textColor={currentTemplate.colors.text}
                bgColor={currentTemplate.colors.bg}
              />
            </div>
          )}

          {/* Liens web */}
          {liensWeb && liensWeb.length > 0 && (
            <div className="mb-8">
              <WebLinksDisplay
                liens={liensWeb}
                accentColor={currentTemplate.colors.accent}
                textColor={currentTemplate.colors.text}
                bgColor={currentTemplate.colors.bg}
              />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
