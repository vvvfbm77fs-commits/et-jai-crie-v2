'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Edit, Globe, RefreshCw } from 'lucide-react';
import PhotoGallery from '@/components/PhotoGallery';
import ConsentModal from '@/components/ConsentModal';
import { getPhoto, blobToURL } from '@/lib/indexedDB';
import { TEMPLATES, getTemplate } from '@/lib/templates';

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
        if (parsed.texteGenere) {
          setTexteGenere(parsed.texteGenere);
          setEditedText(parsed.texteGenere);
        } else {
          generateText(parsed);
        }
        
        // Charger la photo de profil
        if (parsed.identite?.photoProfilId) {
          loadProfilePhoto(parsed.identite.photoProfilId);
        }
        
        // Charger les photos de la galerie
        if (parsed.medias && parsed.medias.length > 0) {
          loadGalleryMedias(parsed.medias);
        }
      } catch (e) {
        console.error('Erreur');
        router.push('/questionnaire');
      }
    } else {
      router.push('/questionnaire');
    }
  }, [router]);

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
          if (media.url && media.url.startsWith('indexed-db:')) {
            const photoId = media.url.replace('indexed-db:', '');
            const photo = await getPhoto(photoId);
            if (photo) {
              return { ...media, url: blobToURL(photo.blob) };
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

  const generateText = async (dataToUse: any) => {
    setIsGenerating(true);
    
    // Simulation d'un délai de génération pour l'effet
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const { identite, caractere, valeurs, liens, talents, realisation, gouts, message, style } = dataToUse;
      
      let texte = '';
      const genre = identite?.genre;
      const il = genre === 'Il' ? 'Il' : genre === 'Elle' ? 'Elle' : identite?.prenom || 'Cette personne';
      const le = genre === 'Il' ? 'le' : genre === 'Elle' ? 'la' : 'l\'';
      const lui = genre === 'Il' ? 'lui' : genre === 'Elle' ? 'elle' : 'cette personne';
      const son = genre === 'Il' ? 'son' : genre === 'Elle' ? 'sa' : 'son';
      const ne = genre === 'Il' ? 'né' : genre === 'Elle' ? 'née' : 'né·e';
      const decede = genre === 'Il' ? 'décédé' : genre === 'Elle' ? 'décédée' : 'décédé·e';
      
      // PARAGRAPHE 1 : Introduction avec dates
      if (identite?.prenom) {
        const anneeNaissance = identite?.dateNaissance ? new Date(identite.dateNaissance).getFullYear() : null;
        const anneeDeces = identite?.dateDeces ? new Date(identite.dateDeces).getFullYear() : null;
        
        if (anneeNaissance && anneeDeces) {
          const duree = anneeDeces - anneeNaissance;
          texte = `${identite.prenom}`;
          if (identite.nom) texte += ` ${identite.nom}`;
          texte += ` a traversé ${duree} années avec une présence qui lui était propre. ${ne.charAt(0).toUpperCase() + ne.slice(1)} en ${anneeNaissance}`;
          if (identite.lieuNaissance) texte += ` à ${identite.lieuNaissance}`;
          texte += `, ${decede} en ${anneeDeces}. `;
        } else {
          texte = `${identite.prenom}`;
          if (identite.nom) texte += ` ${identite.nom}`;
          texte += ` avançait dans la vie avec une manière d'être qui ${le} définissait. `;
        }
      }
      
      // PARAGRAPHE 2 : Caractère dissous (pas de liste)
      if (caractere?.adjectifs?.length > 0) {
        texte += '\n\n';
        const adj = caractere.adjectifs;
        
        if (adj.includes('libre') || adj.includes('indépendant·e')) {
          texte += `${il} ne supportait pas les cadres trop étroits, préférant tracer ${son} propre chemin. `;
        }
        if (adj.includes('discret·e') || adj.includes('pudique') || adj.includes('réservé·e')) {
          texte += `Sans jamais chercher la lumière, ${il} préférait l'ombre portée des gestes discrets. `;
        }
        if (adj.includes('généreux·se') || adj.includes('protecteur·rice')) {
          texte += `${il} savait créer autour de ${lui} un espace où chacun pouvait respirer. `;
        }
        if (adj.includes('passionné·e') || adj.includes('entier·e')) {
          texte += `Quand ${il} s'engageait dans quelque chose, c'était corps et âme, sans demi-mesure. `;
        }
        if (adj.includes('drôle') || adj.includes('solaire')) {
          texte += `${son.charAt(0).toUpperCase() + son.slice(1)} humour avait cette capacité rare de détendre l'air, de rendre les moments plus légers. `;
        }
        if (adj.includes('curieux·se') || adj.includes('créatif·ve')) {
          texte += `L'envie d'explorer, de comprendre, de créer ne ${le} quittait jamais vraiment. `;
        }
      }
      
      // PARAGRAPHE 3 : Valeurs intégrées
      if (valeurs?.selected?.length > 0) {
        texte += '\n\n';
        const vals = valeurs.selected;
        
        if (vals.includes('liberté')) {
          texte += `La liberté n'était pas un concept abstrait mais une façon de vivre, de refuser ce qui opprime, de laisser respirer. `;
        }
        if (vals.includes('famille') || vals.includes('transmission')) {
          texte += `Les liens familiaux comptaient profondément, cette attention aux générations, ce souci de transmettre ce qui importe. `;
        }
        if (vals.includes('créativité') || vals.includes('curiosité')) {
          texte += `Créer, explorer, ne jamais cesser d'apprendre : c'était au cœur de ${son} rapport au monde. `;
        }
        if (vals.includes('justice') || vals.includes('engagement')) {
          texte += `Face à l'injustice, ${il} ne baissait pas les yeux. L'engagement n'était pas un mot vide. `;
        }
        if (vals.includes('simplicité') || vals.includes('discrétion') || vals.includes('humilité')) {
          texte += `${il} préférait l'essentiel au superflu, la simplicité aux apparences. `;
        }
        if (vals.includes('amitié') || vals.includes('loyauté')) {
          texte += `Les amitiés tissées au fil du temps formaient une toile solide, faite de loyauté et de présence. `;
        }
      }
      
      // PARAGRAPHE 4 : Relations
      if (liens?.personnes) {
        texte += '\n\n';
        texte += `Les liens tissés au fil des années formaient la trame d'une vie riche. Dans les gestes du quotidien, les repas partagés, les conversations qui s'éternisent. `;
        if (liens.noms) {
          // Intégrer les noms dans le texte
          const noms = liens.noms.split(',').map((n: string) => n.trim()).filter(Boolean);
          if (noms.length > 0) {
            if (noms.length === 1) {
              texte += `${noms[0]}, cette présence qui accompagne, qui ancre, qui demeure. `;
            } else if (noms.length === 2) {
              texte += `${noms[0]} et ${noms[1]}, ces présences qui accompagnent, qui ancrent, qui demeurent. `;
            } else {
              texte += `${noms.slice(0, -1).join(', ')} et ${noms[noms.length - 1]}, ces présences qui accompagnent, qui ancrent, qui demeurent. `;
            }
          }
        }
        texte += `Cette façon d'être présent sans s'imposer, d'écouter sans juger, de soutenir sans étouffer. `;
      }
      
      // PARAGRAPHE 5 : Talents et passions
      if (talents?.passions || talents?.talent) {
        texte += '\n\n';
        if (talents.passions) {
          texte += `Ce qui ${le} animait prenait forme dans ces moments où le temps se suspend : ${talents.passions}. `;
        }
        if (talents.talent) {
          texte += `${il} avait cette capacité particulière, ce savoir-faire que l'on n'apprend pas dans les livres. `;
        }
        texte += `Ces passions n'étaient pas de simples passe-temps mais des façons d'habiter le monde, de lui donner sens. `;
      }
      
      // PARAGRAPHE 6 : Lieux et atmosphères (AMÉLIORÉ - Raconter vraiment)
      if (gouts?.lieu || identite?.lieuSymbolique || gouts?.saison) {
        texte += '\n\n';
        
        if (gouts.lieu) {
          const lieux = gouts.lieu.split(',').map((l: string) => l.trim());
          if (lieux.length === 1) {
            // Un seul lieu : le raconter avec détails
            texte += `Il y avait ce lieu, ${lieux[0]}, qui revenait sans cesse. `;
            if (gouts.habitude) {
              texte += `Là-bas, ${gouts.habitude.toLowerCase()}. `;
            }
            texte += `Un ancrage, une géographie intérieure. `;
          } else {
            // Plusieurs lieux : créer une narration
            texte += `Les lieux portaient quelque chose d'essentiel. ${lieux[0]} d'abord, `;
            if (gouts.saison) {
              const saisonLower = gouts.saison.toLowerCase();
              if (saisonLower.includes('été')) {
                texte += `surtout l'été, quand la lumière dure jusqu'au soir. `;
              } else if (saisonLower.includes('hiver')) {
                texte += `même l'hiver, quand tout se tait. `;
              } else if (saisonLower.includes('automne')) {
                texte += `particulièrement en automne, avec ses couleurs qui basculent. `;
              } else if (saisonLower.includes('printemps')) {
                texte += `au printemps surtout, quand tout recommence. `;
              } else {
                texte += `surtout en ${saisonLower}. `;
              }
            }
            
            if (lieux.length === 2) {
              texte += `Puis ${lieux[1].toLowerCase()}, autre territoire, autre respiration. `;
            } else {
              texte += lieux.slice(1, -1).map((l: string) => l.toLowerCase()).join(', ') + ', ';
              texte += `et ${lieux[lieux.length - 1].toLowerCase()}, autant de points de repère. `;
            }
            
            if (gouts.habitude) {
              texte += `Dans ces lieux, ${gouts.habitude.toLowerCase()}. Des rituels qui tissent le temps. `;
            }
          }
        } else if (identite.lieuSymbolique) {
          texte += `Il y avait ce lieu, ${identite.lieuSymbolique}, gardé quelque part au plus profond. `;
          if (gouts.habitude) {
            texte += `${gouts.habitude}. Un geste ancré, une présence qui demeure. `;
          }
        }
        
        // Saison traitée narrativement si pas encore utilisée
        if (gouts.saison && !gouts.lieu) {
          const saisonLower = gouts.saison.toLowerCase();
          if (saisonLower.includes('été')) {
            texte += `L'été portait quelque chose de particulier. Ces longues journées où le temps s'étire, où tout devient possible. `;
          } else if (saisonLower.includes('hiver')) {
            texte += `L'hiver avait ${son} importance. Le silence, le repli, cette lumière rasante qui change tout. `;
          } else if (saisonLower.includes('automne')) {
            texte += `L'automne revenait avec ses mélancolies douces, ses lumières obliques, ce basculement vers l'intérieur. `;
          } else if (saisonLower.includes('printemps')) {
            texte += `Le printemps apportait toujours un souffle nouveau. Cette énergie qui revient, ces possibles qui s'ouvrent. `;
          } else {
            texte += `${gouts.saison} portait une atmosphère particulière, une tonalité qui ${le} définissait. `;
          }
        }
      }
      
      // PARAGRAPHE 7 : Musique et phrase
      if (gouts?.musique || gouts?.phrase) {
        texte += '\n\n';
        
        if (gouts.musique) {
          texte += `La musique avait ${son} importance. Quand résonnait "${gouts.musique}", quelque chose se passait. Une porte qui s'ouvre, un ailleurs qui se dessine. `;
        }
        
        if (gouts.phrase) {
          texte += `\n\n"${gouts.phrase}"\n\n`;
          texte += `Ces mots-là n'étaient pas anodins. Ils disaient une vision du monde, une façon de tenir debout. `;
        }
      }
      
      // PARAGRAPHE 8 : Réalisation
      if (realisation) {
        texte += '\n\n';
        texte += `Il y avait aussi ce dont ${il} était fier : ${realisation}. Pas pour la reconnaissance ou les applaudissements, mais parce que cela avait du sens, parce que cela comptait vraiment. `;
      }
      
      // NOTE: Le message personnel n'est plus intégré ici, il sera affiché séparément
      
      // PARAGRAPHE 9-10 : Conclusion selon le style
      texte += '\n\n';
      
      if (style === 'poetique') {
        texte += `Ce qui demeure aujourd'hui ne se mesure pas en mots. Ce sont ces gestes simples, ces attentions discrètes, ces présences qui continuent de circuler entre nous. L'absence même devient une forme de présence.`;
        texte += '\n\n';
        texte += `Ce qui a été transmis continue de vivre, autrement, dans les traces laissées, dans les mémoires habitées. Ce qui reste, c'est cette voix qui résonne encore, ces valeurs qui nous guident, cette manière d'être au monde qui nous a profondément marqués.`;
      } else if (style === 'narratif') {
        texte += `Ce qui demeure aujourd'hui, ce sont les histoires racontées, les rires partagés, les silences complices. Tout cela forme une mémoire collective qui ne s'efface pas.`;
        texte += '\n\n';
        texte += `Les liens tissés traversent le temps. Ce qui a été vécu ensemble demeure. Et cette voix continue de résonner en nous, nous rappelant qui nous sommes, d'où nous venons.`;
      } else {
        texte += `Ce qui demeure aujourd'hui traverse le silence. Les liens tissés au fil du temps forment une trame qui ne se défait pas.`;
        texte += '\n\n';
        texte += `Ce qui reste, c'est cette présence qui nous accompagne encore, discrètement, dans les gestes du quotidien et les pensées qui reviennent.`;
      }
      
      setTexteGenere(texte);
      setEditedText(texte);
      
      const updated = { ...dataToUse, texteGenere: texte };
      localStorage.setItem('questionnaire-memoire', JSON.stringify(updated));
      setData(updated);
    } catch (error) {
      console.error('Erreur génération:', error);
      setTexteGenere('Une erreur est survenue lors de la génération. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (data) {
      generateText(data);
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

  const handlePublish = () => {
    setShowConsentModal(true);
  };

  const handleConfirmPublish = () => {
    setShowConsentModal(false);
    setIsPublishing(true);
    
    setTimeout(() => {
      const memorial = {
        ...data,
        id: Date.now().toString(),
        publishedAt: new Date().toISOString(),
        status: 'published',
        template: selectedTemplate,
        photoFilter: photoFilter,
        texteGenere: texteGenere,
      };
      
      localStorage.setItem('memorial-' + memorial.id, JSON.stringify(memorial));
      router.push('/memorial/' + memorial.id);
    }, 1500);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-memoir-bg flex items-center justify-center">
        <p className="text-memoir-blue">Chargement...</p>
      </div>
    );
  }

  const currentTemplate = getTemplate(selectedTemplate);

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

        <div className="grid md:grid-cols-3 gap-4 mb-8">{TEMPLATES.map((template) => (
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

        <div 
          className="rounded-2xl shadow-2xl p-8 md:p-12 mb-8"
          style={{ 
            backgroundColor: currentTemplate.colors.bg,
            color: currentTemplate.colors.text 
          }}
        >
          <div className="max-w-2xl mx-auto">
            {profilePhotoUrl && (
              <div className="flex justify-center mb-8">
                <img
                  src={profilePhotoUrl}
                  alt={data.identite?.prenom || 'Photo de profil'}
                  className="w-36 h-36 rounded-full object-cover border-4 shadow-xl"
                  style={{ borderColor: currentTemplate.colors.accent }}
                />
              </div>
            )}
            
            <h2 
              className={`text-4xl md:text-5xl mb-3 text-center ${currentTemplate.fonts.heading} ${
                currentTemplate.typography === 'serif' ? 'font-serif' : 
                currentTemplate.typography === 'calligraphy' ? 'font-calli' : 
                'font-sans'
              }`}
              style={{ color: currentTemplate.colors.text }}
            >
              {data.identite?.prenom} {data.identite?.nom}
            </h2>
            
            {(data.identite?.dateNaissance || data.identite?.dateDeces) && (
              <div 
                className="flex items-center justify-center gap-3 mb-10 text-sm tracking-widest font-light"
                style={{ color: currentTemplate.colors.textSecondary }}
              >
                {data.identite?.dateNaissance && (
                  <span>{new Date(data.identite.dateNaissance).getFullYear()}</span>
                )}
                {data.identite?.dateNaissance && data.identite?.dateDeces && <span>—</span>}
                {data.identite?.dateDeces && (
                  <span>{new Date(data.identite.dateDeces).getFullYear()}</span>
                )}
              </div>
            )}

            <div className="h-px w-16 mx-auto mb-12" style={{ backgroundColor: currentTemplate.colors.accent, opacity: 0.4 }} />

            {isGenerating ? (
              <div className="text-center py-16">
                <div className="animate-spin w-12 h-12 border-4 border-t-transparent rounded-full mx-auto mb-4" 
                     style={{ borderColor: currentTemplate.colors.accent, borderTopColor: 'transparent' }}
                />
                <p className="opacity-70">Génération du texte en cours...</p>
              </div>
            ) : isEditing ? (
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
              <div className="prose prose-lg max-w-none">
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
          </div>
        </div>

        {galleryMediasWithUrls && galleryMediasWithUrls.length > 0 && (
          <div 
            className="rounded-2xl shadow-2xl p-8 md:p-12 mb-8"
            style={{ 
              backgroundColor: currentTemplate.colors.bg,
              color: currentTemplate.colors.text 
            }}
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Aperçu de la galerie photo
              </h3>
              <PhotoGallery 
                medias={galleryMediasWithUrls}
                accentColor={currentTemplate.colors.accent}
                textColor={currentTemplate.colors.text}
                bgColor={currentTemplate.colors.bg}
                selectedFilter={photoFilter}
                onFilterChange={(filter) => {
                  setPhotoFilter(filter);
                  const updated = { ...data, photoFilter: filter };
                  localStorage.setItem('questionnaire-memoire', JSON.stringify(updated));
                  setData(updated);
                }}
                showFilterSelector={true}
              />
            </div>
          </div>
        )}

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
          Le texte est généré par intelligence artificielle. Vous pouvez le régénérer ou le modifier avant publication.
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
