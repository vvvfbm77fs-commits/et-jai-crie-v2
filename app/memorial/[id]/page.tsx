'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Share2 } from 'lucide-react';
import Footer from '@/components/Footer';
import MemorialLayout from '@/components/MemorialLayout';
import {
  ProfileBlock,
  TextBlock,
  MessagesBlock,
  GalleryBlock,
  GoutsBlock,
  CandleBlock,
  LinksBlock,
} from '@/components/memorial-blocks';
import { getPhoto, blobToURL } from '@/lib/indexedDB';
import { getTemplate } from '@/lib/templates';
import { BlockType } from '@/lib/layouts';

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
        
        // Charger la photo de profil
        if (data.identite?.photoProfilId) {
          loadProfilePhoto(data.identite.photoProfilId);
        }
        
        // Charger les URLs des médias de la galerie
        if (data.medias && data.medias.length > 0) {
          loadGalleryMedias(data.medias);
        }
        
        // Charger le fichier audio
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

  const { identite, gouts, medias, texteGenere, template, photoFilter, message, layout, blockOrder, liensWeb } = memorial;
  const currentTemplate = getTemplate(template || 'bleu-dore');
  const isLightBg = ['sepia-terre', 'encre-manuscrit'].includes(template || '');
  const memorialId = params?.id as string;
  const finalLayout = layout || 'classic';
  const finalBlockOrder: BlockType[] = blockOrder || ['profile', 'text', 'messages', 'gallery', 'gouts', 'candle', 'links'];

  // Préparer les blocs pour MemorialLayout
  const blocks = {
    profile: (
      <ProfileBlock
        prenom={identite?.prenom}
        nom={identite?.nom}
        dateNaissance={identite?.dateNaissance}
        dateDeces={identite?.dateDeces}
        photoUrl={profilePhotoUrl || undefined}
        template={currentTemplate}
      />
    ),
    text: (
      <TextBlock
        texte={texteGenere}
        template={currentTemplate}
        isLightBg={isLightBg}
      />
    ),
    messages: (
      <MessagesBlock
        message={message}
        template={currentTemplate}
      />
    ),
    gallery: (
      <GalleryBlock
        medias={galleryMediasWithUrls}
        photoFilter={photoFilter}
        template={currentTemplate}
        isLightBg={isLightBg}
      />
    ),
    gouts: (
      <GoutsBlock
        gouts={gouts}
        audioUrl={audioUrl}
        template={currentTemplate}
        isLightBg={isLightBg}
      />
    ),
    candle: (
      <CandleBlock
        prenom={identite?.prenom || ''}
        memorialId={memorialId}
        template={currentTemplate}
      />
    ),
    links: (
      <LinksBlock
        liens={liensWeb || []}
        template={currentTemplate}
      />
    ),
    quote: null, // Pas encore implémenté
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: currentTemplate.colors.bg }}>
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header avec retour et partage */}
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

          {/* Layout avec blocs */}
          <MemorialLayout
            layout={finalLayout}
            blockOrder={finalBlockOrder}
            blocks={blocks}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
