'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Share2, Edit2 } from 'lucide-react';
import Footer from '@/components/Footer';
import MemorialLayout from '@/components/MemorialLayout';
import {
    ProfileBlock,
    TextBlock,
    MessagesBlock,
    GalleryBlock,
    GoutsBlock,
    TributeBlock,
    LinksBlock,
    FamilyBlock,
    LocationBlock,
    ContributeBlock,
} from '@/components/memorial-blocks';
import { getPhoto, blobToURL } from '@/lib/indexedDB';
import { getTemplate } from '@/lib/templates';
import { BlockType } from '@/lib/layouts';

export default function MemorialPreviewPage() {
    const params = useParams();
    const router = useRouter();
    const [memorial, setMemorial] = useState<any>(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
    const [galleryMediasWithUrls, setGalleryMediasWithUrls] = useState<any[]>([]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        // Charger les données depuis localStorage (Preview)
        const previewDataRaw = localStorage.getItem('memorialPreviewData');
        if (!previewDataRaw) {
            // Fallback: try to see if we can construct it from pieces
            const qData = localStorage.getItem('questionnaireData');
            const text = localStorage.getItem('generatedMemorialText');
            if (qData && text) {
                const mDataLocal = localStorage.getItem('mediaData');
                const mData = mDataLocal ? JSON.parse(mDataLocal) : {};
                setMemorial({
                    identite: JSON.parse(qData),
                    medias: mData.galleryPhotos || [],
                    texteGenere: text,
                    template: 'bleu-dore', // default
                    gouts: { musiqueFileId: mData.audioFile } // approximated
                });
            } else {
                router.push('/dashboard/1/validate');
            }
            return;
        }

        const payload = JSON.parse(previewDataRaw);
        setMemorial(payload);

        // Charger les assets (Photos/Audio) depuis IndexedDB
        const loadAssets = async () => {
            // Profile Photo
            if (payload.medias?.profilePhotoId) {
                const photo = await getPhoto(payload.medias.profilePhotoId);
                if (photo) setProfilePhotoUrl(blobToURL(photo.blob));
            }

            // Gallery
            if (payload.medias?.galleryPhotos && payload.medias.galleryPhotos.length > 0) {
                const mediasWithUrls = await Promise.all(
                    payload.medias.galleryPhotos.map(async (media: any) => {
                        // Assuming media object structure from GalleryUploader
                        // If media object has 'file' property (File object) or ID?
                        // GalleryUploader saves to IDB and returns IDs usually or Blob URLs?
                        // Using getPhoto for gallery items if they are IDs. 
                        // Let's assume standard structure { id: '...', type: 'image' } or similar
                        if (media.id) {
                            const photo = await getPhoto(media.id);
                            if (photo) return { ...media, url: blobToURL(photo.blob) };
                        }
                        return media;
                    })
                );
                setGalleryMediasWithUrls(mediasWithUrls);
            }

            // Audio
            if (payload.medias?.audioFile) {
                // Check if it's base64 (string) or ID?
                // MediasPage sets audioFile as base64 string (FileReader result).
                // So we can use it directly if it's base64.
                if (typeof payload.medias.audioFile === 'string' && payload.medias.audioFile.startsWith('data:')) {
                    setAudioUrl(payload.medias.audioFile);
                }
            }
        };
        loadAssets();

    }, [router]);

    const handleShare = () => {
        alert("Ceci est un aperçu. Publiez le mémorial pour le partager.");
    };

    if (!memorial) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Chargement de l'aperçu...</p>
            </div>
        );
    }

    const { identite, gouts, texteGenere, template, photoFilter, message, layout, blockOrder, liensWeb } = memorial;
    const currentTemplate = getTemplate(template || 'bleu-dore');
    const isLightBg = ['sepia-terre', 'encre-manuscrit'].includes(template || '');
    const memorialId = (params?.id as string) || 'preview';
    const finalLayout = layout || 'classic';
    // Use TributeBlock instead of CandleBlock
    const defaultBlockOrder: BlockType[] = ['profile', 'text', 'messages', 'gallery', 'gouts', 'candle', 'links'];
    const finalBlockOrder: BlockType[] = blockOrder || defaultBlockOrder;

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
                photoFilter={photoFilter} // Pass filter if available in memorial
                template={currentTemplate}
                isLightBg={isLightBg}
            />
        ),
        gouts: (
            <GoutsBlock
                gouts={gouts || {}}
                audioUrl={audioUrl}
                template={currentTemplate}
                isLightBg={isLightBg}
            />
        ),
        candle: (
            <TributeBlock
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
        family: (
            <FamilyBlock
                template={currentTemplate}
                isLightBg={isLightBg}
            />
        ),
        location: (
            <LocationBlock
                template={currentTemplate}
                isLightBg={isLightBg}
            />
        ),
        contribute: (
            <ContributeBlock
                template={currentTemplate}
                isLightBg={isLightBg}
            />
        ),
        quote: null,
    };

    return (
        <main className="min-h-screen" style={{ backgroundColor: currentTemplate.colors.bg }}>
            {/* Preview Banner */}
            <div className="bg-[#0F2A44] text-white py-3 px-4 text-center sticky top-0 z-50 shadow-md flex justify-between items-center">
                <div className="font-medium text-sm">Mode Aperçu</div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition-colors"
                >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                </button>
            </div>

            <section className="relative py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header avec retour et partage */}
                    <div className="flex items-center justify-between mb-12">
                        <Link
                            href="/dashboard/1/validate"
                            className="inline-flex items-center gap-2 transition-colors"
                            style={{ color: currentTemplate.colors.accent }}
                        >
                            <Home className="w-5 h-5" />
                            <span className="text-sm">Retour</span>
                        </Link>

                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm opacity-50 cursor-not-allowed"
                            style={{
                                backgroundColor: currentTemplate.colors.accent,
                                color: isLightBg ? '#fff' : currentTemplate.colors.bg
                            }}
                        >
                            <Share2 className="w-4 h-4" />
                            Partager (Désactivé)
                        </button>
                    </div>

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
