'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Edit3, RotateCcw, Eye, Check } from 'lucide-react';
import { getPhoto, blobToURL } from '@/lib/indexedDB';
import { TEMPLATES } from '@/lib/templates';
import LayoutSelector from '@/components/LayoutSelector';
import BlockOrderEditor from '@/components/BlockOrderEditor';
import { BlockType } from '@/lib/layouts';


export default function ValidatePage() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [questionnaireData, setQuestionnaireData] = useState<any>(null);
    const [mediaData, setMediaData] = useState<any>(null);
    const [selectedTemplate, setSelectedTemplate] = useState('bleu-dore');

    // Customization State
    const [layout, setLayout] = useState('classic');
    const [blockOrder, setBlockOrder] = useState<BlockType[]>(['profile', 'quote', 'text', 'family', 'location', 'gallery', 'gouts', 'messages', 'candle', 'contribute', 'links']);

    useEffect(() => {
        const storedText = localStorage.getItem('generatedMemorialText');
        if (storedText) {
            // Clean instructions like *[...]* and trim extra whitespace
            const cleaned = storedText.replace(/\*\[.*?\]\*/g, '').trim();
            setText(cleaned);
        } else {
            setText("Le texte n'a pas pu être chargé. Veuillez régénérer le mémorial.");
        }

        const qData = localStorage.getItem('questionnaireData');
        if (qData) {
            setQuestionnaireData(JSON.parse(qData));
        }

        const loadPhoto = async () => {
            try {
                const mediaDataRaw = localStorage.getItem('mediaData');
                if (mediaDataRaw) {
                    const mData = JSON.parse(mediaDataRaw);
                    setMediaData(mData);
                    if (mData.profilePhotoId) {
                        const photo = await getPhoto(mData.profilePhotoId);
                        if (photo) {
                            setProfilePhoto(blobToURL(photo.blob));
                        }
                    }
                }
            } catch (e) {
                console.error("Erreur chargement photo", e);
            }
        };
        loadPhoto();

        setLoading(false);
    }, []);

    const saveState = () => {
        const data = {
            identite: {
                prenom: questionnaireData?.prenom || questionnaireData?.defunt?.prenom || 'Prénom',
                nom: questionnaireData?.nom || questionnaireData?.defunt?.nom || 'Nom',
                ...questionnaireData
            },
            medias: mediaData || {},
            texteGenere: text,
            template: selectedTemplate,
            layout: layout,
            blockOrder: blockOrder,
            message: "Un espace pour célébrer la vie.",
            publishedAt: new Date().toISOString()
        };
        localStorage.setItem('memorialPreviewData', JSON.stringify(data));
        return data;
    }

    const handlePreview = () => {
        saveState();
        router.push('/memorial/1/preview');
    };

    const handleRegenerate = () => {
        if (confirm('Voulez-vous régénérer le texte ? Les modifications actuelles seront perdues.')) {
            router.push('/dashboard/1/generate');
        }
    };

    const handlePublish = () => {
        if (confirm('Êtes-vous sûr de vouloir publier ce mémorial ? Il sera accessible publiquement.')) {
            const data = saveState();
            localStorage.setItem('memorialData_1', JSON.stringify(data));
            // Also update preview data so the "final" view works
            localStorage.setItem('memorialPreviewData', JSON.stringify(data));

            alert('Mémorial publié avec succès ! 🎉');
            router.push('/memorial/1/preview');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F4F2] to-white">
            {/* Header */}
            <header className="bg-white border-b border-[#C9A24D]/20 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/dashboard/1" className="flex items-center gap-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Retour au tableau de bord</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isEditing
                                ? 'bg-[#C9A24D] text-white'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Edit3 className="w-4 h-4" />
                            <span className="hidden md:inline">{isEditing ? 'Aperçu' : 'Modifier le texte'}</span>
                        </button>

                        <button
                            onClick={handlePreview}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                        >
                            <Eye className="w-4 h-4" />
                            <span className="hidden md:inline">Aperçu complet</span>
                        </button>

                        <button
                            onClick={handlePublish}
                            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            <Check className="w-4 h-4" />
                            <span>Publier</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl text-[#0F2A44] mb-3 font-normal" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                        Validation & Personnalisation
                    </h1>
                    <p className="text-lg text-gray-600 italic">
                        Relisez le texte, choisissez le design et organisez les éléments de la page.
                    </p>
                </div>

                {/* Success Message */}
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg mb-8">
                    <div className="flex gap-3">
                        <div className="text-green-600 text-2xl">✨</div>
                        <div>
                            <h3 className="text-green-900 font-medium mb-1">Mémorial généré avec succès</h3>
                            <p className="text-sm text-green-800">
                                Le texte ci-dessous a été créé en synthétisant votre conversation avec Alma.
                                Vous pouvez le modifier avant de le publier.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Text Editor */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Text Editor / Preview */}
                        <div className="bg-white rounded-2xl border-2 border-[#C9A24D]/30 shadow-lg overflow-hidden">
                            {profilePhoto ? (
                                <div className="relative h-64 w-full bg-gray-900">
                                    <img src={profilePhoto} alt="Défunt" className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90" />
                                    <div className="absolute bottom-6 left-0 right-0 text-center">
                                        <h2 className="text-3xl text-[#C9A24D] font-normal" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                                            Mémorial
                                        </h2>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gradient-to-r from-[#0F2A44] to-[#1C3B5A] px-8 py-6">
                                    <h2 className="text-3xl text-[#C9A24D] font-normal text-center" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                                        Mémorial
                                    </h2>
                                </div>
                            )}

                            <div className="p-8 md:p-12">
                                {isEditing ? (
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="w-full min-h-[500px] text-lg leading-relaxed text-[#0F2A44] focus:outline-none resize-none"
                                        style={{ fontFamily: 'Georgia, serif' }}
                                    />
                                ) : (
                                    <div className="prose prose-lg max-w-none">
                                        {text.split('\n\n').map((paragraph, index) => (
                                            <p key={index} className="text-lg leading-relaxed text-[#0F2A44] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Customization Tools */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* 1. Template Selection */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-[#0F2A44] mb-4 flex items-center gap-2">
                                <span>🎨</span> Style & Ambiance
                            </h2>
                            <div className="grid grid-cols-1 gap-3">
                                {TEMPLATES.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTemplate(t.id)}
                                        className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${selectedTemplate === t.id
                                            ? 'border-memoir-gold bg-memoir-gold/5 ring-1 ring-memoir-gold'
                                            : 'border-gray-200 hover:border-memoir-gold/50'
                                            }`}
                                    >
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center border shadow-sm"
                                            style={{ backgroundColor: t.colors.bg, borderColor: t.colors.accent }}>
                                            <span className="text-xs font-bold" style={{ color: t.colors.text }}>Aa</span>
                                        </div>
                                        <span className="font-medium text-[#0F2A44] text-sm">{t.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Layout Selection */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-[#0F2A44] mb-4 flex items-center gap-2">
                                <span>📐</span> Mise en page
                            </h2>
                            <LayoutSelector selectedLayout={layout} onLayoutChange={setLayout} />
                        </div>

                        {/* 3. Block Order */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-[#0F2A44] mb-4 flex items-center gap-2">
                                <span>🏗️</span> Organisation
                            </h2>
                            <BlockOrderEditor blocks={blockOrder} onOrderChange={setBlockOrder} />
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                            <p className="text-sm text-blue-800">
                                💡 Vous pourrez toujours modifier ces éléments plus tard dans votre tableau de bord.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
