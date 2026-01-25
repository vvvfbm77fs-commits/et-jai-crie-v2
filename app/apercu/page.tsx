'use client';
import { slugify } from '@/lib/slugify';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Globe, RefreshCw } from 'lucide-react';
import ConsentModal from '@/components/ConsentModal';
import LayoutSelector from '@/components/LayoutSelector';
import BlockOrderEditor from '@/components/BlockOrderEditor';
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
import { TEMPLATES, getTemplate } from '@/lib/templates';
import { BlockType } from '@/lib/layouts';
import { GENERATION_MESSAGES } from '@/lib/generationMessages'; 
import { generateMistralPrompt } from '@/lib/generateMistralPrompt'; 

export default function AperçuPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [texteGenere, setTexteGenere] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('bleu-dore');
  const [photoFilter, setPhotoFilter] = useState<'original' | 'noir-blanc' | 'sepia' | 'adouci'>('original');
  const [isPublishing, setIsPublishing] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [galleryMediasWithUrls, setGalleryMediasWithUrls] = useState<any[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<string>('classic');
  const [blockOrder, setBlockOrder] = useState<BlockType[]>(['profile', 'text', 'messages', 'gallery', 'gouts', 'candle', 'links']);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [createdUrls, setCreatedUrls] = useState<string[]>([]);
  const [generationError, setGenerationError] = useState<string>('');


  useEffect(() => {
    const saved = localStorage.getItem('questionnaire-memoire');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
        if (parsed.template) {
          setSelectedTemplate(parsed.template);
        }
        if (parsed.photoFilter) {
          setPhotoFilter(parsed.photoFilter);
        }
        if (parsed.layout) {
          setSelectedLayout(parsed.layout);
        }
        if (parsed.blockOrder) {
          setBlockOrder(parsed.blockOrder);
        }
        if (parsed.texteGenere) {
          setTexteGenere(parsed.texteGenere);
          setEditedText(parsed.texteGenere);
        } else {
          generateText(parsed);
        }
        if (parsed.identite?.photoProfilId) {
          loadProfilePhoto(parsed.identite.photoProfilId);
        }
        if (parsed.medias && parsed.medias.length > 0) {
          loadGalleryMedias(parsed.medias);
        }
        if (parsed.gouts?.musiqueFileId) {
          loadAudio(parsed.gouts.musiqueFileId);
        }
      } catch (e) {
        console.error('Erreur');
        router.push('/questionnaire');
      }
    } else {
      router.push('/questionnaire');
    }

    return () => {
      createdUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [router]);

  const loadProfilePhoto = async (photoId: string) => {
    try {
      const photo = await getPhoto(photoId);
      if (photo) {
        const url = blobToURL(photo.blob);
        setProfilePhotoUrl(url);
        setCreatedUrls(prev => [...prev, url]);
      }
    } catch (error) {
      console.error('Erreur chargement photo profil:', error);
    }
  };

  const loadGalleryMedias = async (medias: any[]) => {
    try {
      const mediasWithUrls = await Promise.all(
        medias.map(async (media) => {
          if (media.url && media.url.startsWith('indexed-db:')) {
            const photoId = media.url.replace('indexed-db:', '');
            const photo = await getPhoto(photoId);
            if (photo) {
              const url = blobToURL(photo.blob);
              setCreatedUrls(prev => [...prev, url]);
              return { ...media, url };
            }
          }
          return media;
        })
      );
      setGalleryMediasWithUrls(mediasWithUrls.filter(m => m.url));
    } catch (error) {
      console.error('Erreur chargement médias galerie:', error);
    }
  };

  const loadAudio = async (audioId: string) => {
    try {
      const audio = await getPhoto(audioId);
      if (audio) {
        const url = blobToURL(audio.blob);
        setAudioUrl(url);
        setCreatedUrls(prev => [...prev, url]);
      }
    } catch (error) {
      console.error('Erreur chargement audio:', error);
    }
  };
const generateText = async (dataToUse: any) => {
  setIsGenerating(true);
  setGenerationError('');

  try {
    const {
      identite,
      caractere,
      valeurs,
      genealogie,
      parcours,
      humour,
      liens,
      talents,
      realisation,
      gouts,
      style,
      message,
    } = dataToUse;

    const badWords = ['con', 'connard', 'connasse', 'salaud', 'salope', 'putain', 'merde', 'chier', 'enculé', 'bite', 'couille'];
    const filterBadWords = (text: string) => {
      if (!text || typeof text !== 'string') return text || '';
      let out = text;
      badWords.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\w*\\b`, 'gi');
        out = out.replace(regex, '[···]');
      });
      return out;
    };

    const genre = identite?.genre;
    const prenom = identite?.prenom || '';
    const lui = prenom || 'cette personne';
    const nom = identite?.nom || '';
    const dateNaissance = identite?.dateNaissance ? new Date(identite.dateNaissance).getFullYear() : '';
    const dateDeces = identite?.dateDeces ? new Date(identite.dateDeces).getFullYear() : '';
    const lieuNaissance = identite?.lieuNaissance || '';
    const lieuDeces = identite?.lieuDeces || '';
    const lieuSymbolique = identite?.lieuSymbolique || '';

    const isSkipped = (section?: { skip?: boolean } | null) =>
      Boolean(section?.skip);

    const goutsSkipped = isSkipped(gouts);
    const lieu = goutsSkipped ? '' : gouts?.lieu || '';
    const habitude = goutsSkipped ? '' : gouts?.habitude || '';
    const saison = goutsSkipped ? '' : gouts?.saison || '';
    const musique = goutsSkipped ? '' : gouts?.musique || '';
    const phrase = goutsSkipped ? '' : gouts?.phrase || '';
    const goutsTexte = goutsSkipped ? '' : gouts?.goutsTexte || gouts?.texte || '';

    const adjectifs = caractere?.adjectifs?.join(', ') || '';
    const anecdote = caractere?.anecdote || '';
    const valeursListe = valeurs?.selected?.join(', ') || '';
    const valeursTexte = valeurs?.valeursTexte || valeurs?.texte || '';

    const liensSkipped = isSkipped(liens);
    const nomsLiens = liensSkipped ? '' : liens?.noms || liens?.personnes || '';
    const liensTexte = liensSkipped ? '' : liens?.liensTexte || liens?.texte || '';

    const talentsSkipped = isSkipped(talents);
    const passions = talentsSkipped ? '' : talents?.passions || '';
    const talent = talentsSkipped ? '' : talents?.talent || '';
    const talentsTexte = talentsSkipped ? '' : talents?.talentsTexte || talents?.texte || '';
    const realisationText =
      typeof realisation === 'string'
        ? realisation
        : realisation?.text || parcours?.fiertes || '';
    const messageSkipped = isSkipped(message);
    const messagePerso = messageSkipped
      ? ''
      : message?.content
        ? filterBadWords(message.content)
        : '';

    const parcoursSkipped = isSkipped(parcours);
    const momentsMarquants = parcoursSkipped ? '' : parcours?.moments || '';
    const parcoursPro = parcoursSkipped ? '' : parcours?.parcoursProfessionnel || '';
    const engagements = parcoursSkipped ? '' : parcours?.engagements || '';
    const humourSkipped = isSkipped(humour);
    const blagues = humourSkipped ? '' : humour?.blagues || '';
    const betises = humourSkipped ? '' : humour?.betises || '';
    const rires = humourSkipped ? '' : humour?.rires || '';

    const genealogieSkipped = isSkipped(genealogie);
    const genealogieElements = genealogieSkipped
      ? ''
      : [
          genealogie?.parents ? `Parents : ${genealogie.parents}` : '',
          genealogie?.fratrie ? `Fratrie : ${genealogie.fratrie}` : '',
          genealogie?.enfants ? `Enfants : ${genealogie.enfants}` : '',
          genealogie?.partenaires ? `Partenaire(s) : ${genealogie.partenaires}` : '',
          genealogie?.autres ? `Autres liens : ${genealogie.autres}` : '',
        ]
          .filter(Boolean)
          .join(' | ');

    const toneMap: Record<string, string> = {
      'poetique': 'sensible et littéraire, avec des images poétiques',
      'narratif': 'narratif et vivant, avec des anecdotes concrètes',
      'sobre': 'sobre, factuel et direct'
    };
    const tonalite = toneMap[style] || 'sobre et respectueux';

    const prompt = `Tu es un écrivain français spécialisé dans les textes commémoratifs de haute qualité littéraire.

IDENTITÉ : ${prenom} ${nom}
Naissance : ${dateNaissance}${lieuNaissance ? ` à ${lieuNaissance}` : ''}
Décès : ${dateDeces}${lieuDeces ? ` à ${lieuDeces}` : ''}
Lieux importants : ${lieu || lieuSymbolique}

RÉDIGE UN TEXTE EN 6-7 PARAGRAPHES EN SUIVANT CETTE STRUCTURE EXACTE :

§1 - INTRODUCTION
Nom complet suivi d'un point. Dates et lieux de vie. Ton ${tonalite}.

§2 - CARACTÈRE
Adjectifs : ${adjectifs}
${anecdote ? `>>> RACONTE ABSOLUMENT CETTE ANECDOTE : "${anecdote}"` : 'Développe sa personnalité avec des exemples concrets'}

§3 - VALEURS & CONVICTIONS
Valeurs : ${valeursListe}
${valeursTexte ? `>>> DÉVELOPPE IMPÉRATIVEMENT : "${valeursTexte}"` : ''}
Explique ce qui comptait pour ${lui}.

§4 - LIENS & FAMILLE
Proches : ${nomsLiens}${liensTexte ? ` - ${liensTexte}` : ''}
${genealogieElements ? `Généalogie : ${genealogieElements}` : ''}
Passions : ${passions}${talent ? `, ${talent}` : ''}
${talentsTexte ? `>>> PRÉCISE OBLIGATOIREMENT : "${talentsTexte}"` : ''}
Lieux aimés : ${lieu}. Saison préférée : ${saison}${musique ? `. Musique : ${musique}` : ''}
${goutsTexte ? `Autres goûts : ${goutsTexte}` : ''}

§5 - PARCOURS & MOMENTS MARQUANTS
${momentsMarquants ? `Moments clés : ${momentsMarquants}` : 'Évoque les moments clés de son parcours'}
${parcoursPro ? `Parcours professionnel : ${parcoursPro}` : ''}
${engagements ? `Engagements : ${engagements}` : ''}
${realisationText ? `>>> TU DOIS ABSOLUMENT MENTIONNER : "${realisationText}"` : ''}

§6 - HUMOUR & SOUVENIRS
${blagues ? `Blagues / phrases : ${blagues}` : ''}
${betises ? `Bêtises / situations drôles : ${betises}` : ''}
${rires ? `Ce qui faisait rire : ${rires}` : ''}

§7 - CONCLUSION
${messagePerso ? `Intègre ce message (reformulé si vulgaire) : "${messagePerso}".` : ''}
Termine sobre, une phrase courte.

STYLE "Et j'ai crié" :
- Phrases courtes et directes
- Langage naturel, contemporain
- JAMAIS : "ce qui demeure", "ancre", "trame", "tisser", "traverse"
- Ton ${tonalite}

RÈGLES ABSOLUES :
✓ Commence par "${prenom} ${nom}."
✓ UTILISE TOUS LES ÉLÉMENTS MARQUÉS >>> (anecdote, valeurs détaillées, talents détaillés, réalisation)
✓ Si un élément contient des vulgarités, IGNORE-LE COMPLÈTEMENT
✓ Minimum 5 paragraphes substantiels
✓ Termine sobre

Génère le texte maintenant :`;

    const response = await fetch('/api/generate-memorial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(GENERATION_MESSAGES.error);
    }

    const result = await response.json();
    const texte = result.text || GENERATION_MESSAGES.error;

    setTexteGenere(texte);
    setEditedText(texte);

    const updated = { ...dataToUse, texteGenere: texte };
    localStorage.setItem('questionnaire-memoire', JSON.stringify(updated));
    setData(updated);
  } catch (error) {
    console.error('Erreur génération:', error);
    setGenerationError(GENERATION_MESSAGES.error);
  } finally {
    setIsGenerating(false);
  }
};


  const handleRegenerate = () => {
    if (data) {
      const dataWithoutText = { ...data };
      delete dataWithoutText.texteGenere;
      generateText(dataWithoutText);
    }
  };

  const handleSaveEdit = () => {
    setTexteGenere(editedText);
    const updated = { ...data, texteGenere: editedText };
    localStorage.setItem('questionnaire-memoire', JSON.stringify(updated));
    setData(updated);
    setIsEditing(false);
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const updated = { ...data, template: templateId };
    localStorage.setItem('questionnaire-memoire', JSON.stringify(updated));
    setData(updated);
  };

  const handleLayoutChange = (layoutId: string) => {
    setSelectedLayout(layoutId);
    const updated = { ...data, layout: layoutId };
    localStorage.setItem('questionnaire-memoire', JSON.stringify(updated));
    setData(updated);
  };

  const handleBlockOrderChange = (newOrder: BlockType[]) => {
    setBlockOrder(newOrder);
    const updated = { ...data, blockOrder: newOrder };
    localStorage.setItem('questionnaire-memoire', JSON.stringify(updated));
    setData(updated);
  };

  const handlePublish = () => {
    setShowConsentModal(true);
  };

const handleConfirmPublish = async () => {
  console.log('🔵 [DEBUT] handleConfirmPublish appelé');
  setShowConsentModal(false);
  setIsPublishing(true);

  try {
    console.log('🔵 [STEP 1] Extraction des données...');
    const prenom = data.identite?.prenom || '';
    const nom = data.identite?.nom || '';
    console.log('🔵 [STEP 1] Prenom:', prenom, 'Nom:', nom);

    console.log('🔵 [STEP 2] Génération du slug...');
    const slug = `${slugify(prenom)}-${slugify(nom)}-${Date.now()}`;
    console.log('🔵 [STEP 2] Slug généré:', slug);

    console.log('🔵 [STEP 3] Vérification de Supabase...');
    console.log('🔵 [STEP 3] Supabase client:', supabase ? 'OK ✅' : 'ERREUR ❌');

    console.log('🔵 [STEP 4] Préparation des données pour insertion...');
    const insertData = {
      prenom,
      nom,
      slug,
      data,
      texte_genere: texteGenere,
      status: 'published',
      published_at: new Date().toISOString(),
    };
    console.log('🔵 [STEP 4] Données à insérer:', JSON.stringify(insertData, null, 2));

    console.log('🔵 [STEP 5] Appel Supabase INSERT...');
    const { data: memorial, error } = await supabase
      .from('memoriaux')
      .insert(insertData)
      .select()
      .single();

    console.log('🔵 [STEP 6] Résultat Supabase:');
    console.log('🔵 [STEP 6] Memorial:', memorial);
    console.log('🔵 [STEP 6] Error:', error);

    if (error) {
      console.error('🔴 [ERREUR] Supabase error:', error);
      console.error('🔴 [ERREUR] Error code:', error.code);
      console.error('🔴 [ERREUR] Error message:', error.message);
      console.error('🔴 [ERREUR] Error details:', error.details);
      throw error;
    }

    console.log('🟢 [SUCCÈS] Memorial créé avec ID:', memorial?.id);
    console.log('🟢 [SUCCÈS] Redirection vers:', `/memorial/${memorial?.slug}`);
    
    router.push(`/memorial/${memorial.slug}`);
  } catch (error) {
    console.error('🔴 [CATCH] Erreur complète:', error);
    console.error('🔴 [CATCH] Type:', typeof error);
    console.error('🔴 [CATCH] Stack:', (error as Error)?.stack);
    alert('Erreur lors de la publication. Vérifiez la console (F12) pour plus de détails.');
  } finally {
    console.log('🔵 [FIN] Publication terminée');
    setIsPublishing(false);
  }
};


  if (!data) {
    return (
      <div className="min-h-screen bg-memoir-bg flex items-center justify-center">
        <p className="text-memoir-blue">Chargement...</p>
      </div>
    );
  }

  const currentTemplate = getTemplate(selectedTemplate);
  const isLightBg = ['sepia-terre', 'encre-manuscrit'].includes(selectedTemplate);

  const memorialBlocks = {
    profile: (
      <ProfileBlock
        prenom={data.identite?.prenom}
        nom={data.identite?.nom}
        dateNaissance={data.identite?.dateNaissance}
        dateDeces={data.identite?.dateDeces}
        photoUrl={profilePhotoUrl || undefined}
        template={currentTemplate}
      />
    ),
    text: isEditing ? (
      <div>
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full h-96 p-4 rounded-lg border-2 mb-4"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: currentTemplate.colors.text,
            borderColor: currentTemplate.colors.accent
          }}
        />
        <div className="flex gap-3">
          <button
            onClick={handleSaveEdit}
            className="px-6 py-3 rounded-lg font-medium"
            style={{ backgroundColor: currentTemplate.colors.accent, color: '#fff' }}
          >
            Enregistrer
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditedText(texteGenere);
            }}
            className="px-6 py-3 rounded-lg border-2"
            style={{ borderColor: currentTemplate.colors.accent }}
          >
            Annuler
          </button>
        </div>
      </div>
    ) : (
      <TextBlock
        texte={texteGenere}
        template={currentTemplate}
        isLightBg={isLightBg}
      />
    ),
    messages: (
      <MessagesBlock
        message={data.message}
        template={currentTemplate}
      />
    ),
    gallery: galleryMediasWithUrls.length > 0 ? (
      <GalleryBlock
        medias={galleryMediasWithUrls}
        photoFilter={photoFilter}
        template={currentTemplate}
        isLightBg={isLightBg}
      />
    ) : null,
    gouts: (
      <GoutsBlock
        gouts={data.gouts}
        audioUrl={audioUrl}
        template={currentTemplate}
        isLightBg={isLightBg}
      />
    ),
    candle: (
      <CandleBlock
        prenom={data.identite?.prenom || ''}
        memorialId="preview"
        template={currentTemplate}
      />
    ),
    links: data.liensWeb && data.liensWeb.length > 0 ? (
      <LinksBlock
        liens={data.liensWeb}
        template={currentTemplate}
      />
    ) : null,
    quote: null,
  };

  return (
    <main className="min-h-screen bg-memoir-bg py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/questionnaire"
            className="flex items-center gap-2 text-memoir-gold hover:text-memoir-gold/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Modifier</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-memoir-blue">
            Aperçu du mémorial
          </h1>
          
          <div className="w-24"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateChange(template.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedTemplate === template.id
                  ? 'border-memoir-gold bg-memoir-gold/5'
                  : 'border-memoir-blue/10 hover:border-memoir-gold/30'
              }`}
            >
              <div 
                className="w-full h-20 rounded mb-2"
                style={{ backgroundColor: template.colors.bg }}
              />
              <p className="text-sm font-medium text-memoir-blue">{template.name}</p>
            </button>
          ))}
        </div>

        <LayoutSelector 
          selectedLayout={selectedLayout}
          onLayoutChange={handleLayoutChange}
        />

        <BlockOrderEditor
          blocks={blockOrder}
          onOrderChange={handleBlockOrderChange}
        />

        <div 
          className="rounded-2xl shadow-2xl p-8 md:p-12 mb-8"
          style={{ 
            backgroundColor: currentTemplate.colors.bg,
            color: currentTemplate.colors.text 
          }}
        >
          {isGenerating ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-t-transparent rounded-full mx-auto mb-4" 
                   style={{ borderColor: currentTemplate.colors.accent, borderTopColor: 'transparent' }}
              />
              <p className="opacity-70 text-lg">{GENERATION_MESSAGES.loading}</p>
            </div>
          ) : generationError ? (
            <div className="text-center py-16">
              <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg text-red-800 mb-6">
                <p className="font-medium">{generationError}</p>
              </div>
              <button
                onClick={handleRegenerate}
                className="px-6 py-3 bg-memoir-gold text-white rounded-lg hover:bg-memoir-gold/90 transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : texteGenere ? (
            <div>
              <p className="text-center italic opacity-60 mb-6 text-sm">
                {GENERATION_MESSAGES.success}
              </p>
              
              <MemorialLayout
                layout={selectedLayout}
                blockOrder={blockOrder}
                blocks={memorialBlocks}
              />
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-memoir-blue/20 text-memoir-blue rounded-lg hover:border-memoir-gold transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            Régénérer le texte
          </button>
          
          <button
            onClick={() => setIsEditing(true)}
            disabled={isGenerating || isEditing}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-memoir-blue/20 text-memoir-blue rounded-lg hover:border-memoir-gold transition-colors disabled:opacity-50"
          >
            <Edit className="w-5 h-5" />
            Modifier le texte
          </button>
          
          <button
            onClick={handlePublish}
            disabled={isGenerating || isEditing || isPublishing}
            className="flex items-center gap-2 px-6 py-3 bg-memoir-gold text-white rounded-lg hover:bg-memoir-gold/90 transition-colors disabled:opacity-50"
          >
            <Globe className="w-5 h-5" />
            {isPublishing ? 'Publication...' : 'Publier le mémorial'}
          </button>
        </div>

        <p className="text-center text-memoir-blue/50 text-sm mt-6">
          Texte généré par Mistral AI (IA française). Vous pouvez le régénérer ou le modifier avant publication.
        </p>
      </div>

      <ConsentModal 
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onConfirm={handleConfirmPublish}
        prenom={data?.identite?.prenom || ''}
      />
    </main>
  );
}
