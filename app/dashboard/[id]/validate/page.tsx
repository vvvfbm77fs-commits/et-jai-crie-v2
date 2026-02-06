'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Edit3, RotateCcw, Eye, Check, Palette } from 'lucide-react';
import { getPhoto, blobToURL } from '@/lib/indexedDB';
import { TEMPLATES } from '@/lib/templates';
import LayoutSelector from '@/components/LayoutSelector';
import BlockOrderEditor from '@/components/BlockOrderEditor';
import { BlockType } from '@/lib/layouts';


export default function ValidatePage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [questionnaireData, setQuestionnaireData] = useState<any>(null);
    const [mediaData, setMediaData] = useState<any>(null);
    const [selectedTemplate, setSelectedTemplate] = useState('bleu-dore');
    const [customColors, setCustomColors] = useState({
        bg: '#ffffff',
        text: '#000000',
        accent: '#C9A24D',
        textSecondary: '#666666'
    });

    // Customization State
    const [layout, setLayout] = useState('classic');
    const [blockOrder, setBlockOrder] = useState<BlockType[]>(['profile', 'quote', 'text', 'family', 'location', 'gallery', 'gouts', 'messages', 'candle', 'contribute', 'links']);
    const [photoFilter, setPhotoFilter] = useState('none');

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
            const parsed = JSON.parse(qData);
            setQuestionnaireData(parsed);
            if (parsed.photoFilter) setPhotoFilter(parsed.photoFilter);
        }

        // ... loadPhoto logic ...
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
                    if (mData.photoFilter) setPhotoFilter(mData.photoFilter);
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
            customColors: selectedTemplate === 'custom' ? customColors : undefined,
            layout: layout,
            blockOrder: blockOrder,
            photoFilter: photoFilter,
            message: "Un espace pour célébrer la vie.",
            publishedAt: new Date().toISOString()
        };
        localStorage.setItem('memorialPreviewData', JSON.stringify(data));
        return data;
    }

    const handlePreview = () => {
        saveState();
        router.push(`/memorial/${id}/preview`);
    };

    const handleRegenerate = () => {
        if (confirm('Voulez-vous régénérer le texte ? Les modifications actuelles seront perdues.')) {
            router.push(`/dashboard/${id}/generate`);
        }
    };

    const handlePublish = () => {
        if (confirm('Êtes-vous sûr de vouloir publier ce mémorial ? Il sera accessible publiquement.')) {
            const data = saveState();
            localStorage.setItem(`memorialData_${id}`, JSON.stringify(data));
            // Also update preview data so the "final" view works
            localStorage.setItem('memorialPreviewData', JSON.stringify(data));

            alert('Mémorial publié avec succès ! 🎉');
            router.push(`/memorial/${id}/preview`);
        }
    };

    const filters = [
        { id: 'none', name: 'Original', class: '' },
        { id: 'sepia', name: 'Sépia', class: 'sepia(80%)' },
        { id: 'bw', name: 'Noir & Blanc', class: 'grayscale(100%)' },
        { id: 'vintage', name: 'Adouci', class: 'brightness(1.1) contrast(0.9) saturate(0.8)' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F4F2] to-white">
            {/* Header ... */}
            <header className="bg-white border-b border-[#C9A24D]/20 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href={`/dashboard/${id}`} className="flex items-center gap-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors">
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
                            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
                        >
                            <Check className="w-4 h-4" />
                            <span>Publier</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl text-[#0F2A44] mb-3 font-normal" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                        Dernières touches
                    </h1>
                    <p className="text-lg text-gray-600 italic">
                        Relisez le récit de vie et apportez les ajustements visuels finaux.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Text Editor (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white rounded-2xl border-2 border-[#C9A24D]/30 shadow-xl overflow-hidden">
                            {profilePhoto ? (
                                <div className="relative h-80 w-full bg-gray-900">
                                    <img
                                        src={profilePhoto}
                                        alt="Défunt"
                                        className="w-full h-full object-cover opacity-80 transition-all duration-700"
                                        style={{ filter: filters.find(f => f.id === photoFilter)?.class || '' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90" />
                                    <div className="absolute bottom-10 left-0 right-0 text-center">
                                        <h2 className="text-4xl text-[#C9A24D] font-normal" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                                            L'Hommage
                                        </h2>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gradient-to-r from-[#0F2A44] to-[#1C3B5A] px-8 py-10">
                                    <h2 className="text-3xl text-[#C9A24D] font-normal text-center" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                                        L'Hommage
                                    </h2>
                                </div>
                            )}

                            <div className="p-8 md:p-16">
                                {isEditing ? (
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="w-full min-h-[600px] text-xl leading-relaxed text-[#0F2A44] focus:outline-none resize-none bg-stone-50/30 p-4 rounded-lg"
                                        style={{ fontFamily: 'Georgia, serif' }}
                                    />
                                ) : (
                                    <div className="prose prose-xl max-w-none">
                                        {text.split('\n\n').map((paragraph, index) => (
                                            <p key={index} className="text-xl leading-relaxed text-[#0F2A44] mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Customization Tools (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* 1. Template Selection */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-[#0F2A44] mb-4 flex items-center gap-2">
                                <Palette className="w-5 h-5 text-[#C9A24D]" /> Thème visuel
                            </h2>
                            <div className="grid grid-cols-1 gap-2">
                                {TEMPLATES.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTemplate(t.id)}
                                        className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${selectedTemplate === t.id
                                            ? 'border-[#C9A24D] bg-[#0F2A44]/5'
                                            : 'border-gray-100 hover:border-[#C9A24D]/30'
                                            }`}
                                    >
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-sm shrink-0"
                                            style={{ backgroundColor: t.id === 'custom' && selectedTemplate === 'custom' ? customColors.bg : t.colors.bg, borderColor: t.id === 'custom' && selectedTemplate === 'custom' ? customColors.accent : t.colors.accent }}>
                                            <span className="text-sm font-bold" style={{ color: t.id === 'custom' && selectedTemplate === 'custom' ? customColors.text : t.colors.text }}>Aa</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-[#0F2A44] block text-sm">{t.name}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t.id}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Color Pickers for Custom Template */}
                            {selectedTemplate === 'custom' && (
                                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <h3 className="text-sm font-bold text-[#0F2A44] uppercase tracking-wider mb-2">Couleurs personnalisées</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Fond</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={customColors.bg}
                                                    onChange={(e) => setCustomColors({ ...customColors, bg: e.target.value })}
                                                    className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={customColors.bg}
                                                    onChange={(e) => setCustomColors({ ...customColors, bg: e.target.value })}
                                                    className="text-[10px] w-full border border-gray-200 rounded px-1 py-1 uppercase"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Texte</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={customColors.text}
                                                    onChange={(e) => setCustomColors({ ...customColors, text: e.target.value })}
                                                    className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={customColors.text}
                                                    onChange={(e) => setCustomColors({ ...customColors, text: e.target.value })}
                                                    className="text-[10px] w-full border border-gray-200 rounded px-1 py-1 uppercase"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Accent</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={customColors.accent}
                                                    onChange={(e) => setCustomColors({ ...customColors, accent: e.target.value })}
                                                    className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={customColors.accent}
                                                    onChange={(e) => setCustomColors({ ...customColors, accent: e.target.value })}
                                                    className="text-[10px] w-full border border-gray-200 rounded px-1 py-1 uppercase"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Secondaire</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={customColors.textSecondary}
                                                    onChange={(e) => setCustomColors({ ...customColors, textSecondary: e.target.value })}
                                                    className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={customColors.textSecondary}
                                                    onChange={(e) => setCustomColors({ ...customColors, textSecondary: e.target.value })}
                                                    className="text-[10px] w-full border border-gray-200 rounded px-1 py-1 uppercase"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 2. Photo Filters */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-[#0F2A44] mb-4 flex items-center gap-2">
                                📸 Filtre photos
                            </h2>
                            <div className="grid grid-cols-2 gap-2">
                                {filters.map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => setPhotoFilter(f.id)}
                                        className={`p-3 rounded-lg border-2 text-center transition-all ${photoFilter === f.id
                                            ? 'border-[#C9A24D] bg-[#0F2A44]/5 text-[#C9A24D]'
                                            : 'border-gray-100 hover:border-gray-200 text-gray-500'
                                            }`}
                                    >
                                        <div className={`w-full h-8 rounded mb-2 overflow-hidden bg-gray-200`}>
                                            <div className="w-full h-full bg-[#C9A24D]/20 flex items-center justify-center text-[10px]" style={{ filter: f.class }}>
                                                EFFET
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium">{f.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Layout Selection */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-[#0F2A44] mb-4 flex items-center gap-2">
                                📐 Architecture
                            </h2>
                            <LayoutSelector selectedLayout={layout} onLayoutChange={setLayout} />
                        </div>

                        {/* 4. Block Order */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-[#0F2A44] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                Ordre des sections
                            </h2>
                            <BlockOrderEditor blocks={blockOrder} onOrderChange={setBlockOrder} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
