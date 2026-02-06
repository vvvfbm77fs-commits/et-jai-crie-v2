'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LITERARY_STYLES = [
    {
        id: 'sobre',
        name: 'Sobre',
        description: 'Un style épuré et direct, qui va à l\'essentiel',
        example: 'Marie aimait les matins calmes. Elle prenait son café en silence, observant le jardin. Ces moments simples étaient les siens.',
    },
    {
        id: 'narratif',
        name: 'Narratif',
        description: 'Une narration fluide qui raconte une histoire',
        example: 'Chaque matin, Marie se levait avec le soleil. Elle aimait voir le jardin s\'éveiller doucement, une tasse de café à la main. C\'était sa façon de commencer la journée, dans le calme et la contemplation.',
    },
    {
        id: 'poetique',
        name: 'Poétique',
        description: 'Un style imagé et évocateur, plein de douceur',
        example: 'Au lever du jour, Marie accueillait la lumière comme une vieille amie. Son café fumait doucement tandis que le jardin murmurait ses premiers secrets. Elle écoutait, et souriait.',
    },
];

import { supabase } from '@/lib/supabase';

function NewMemorialContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const context = searchParams.get('context');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!context) {
            router.push('/create/selection');
            return;
        }

        const checkAuth = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) {
                    console.error("Auth check error:", error);
                    // On error, we still let them proceed or redirect? 
                    // Let's assume safely logged out if error, so redirect to login
                    const returnUrl = encodeURIComponent(`/create?context=${context}`);
                    router.push(`/login?returnUrl=${returnUrl}`);
                } else if (!session) {
                    const returnUrl = encodeURIComponent(`/create?context=${context}`);
                    router.push(`/login?returnUrl=${returnUrl}`);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                console.error("Auth Exception:", err);
                setLoading(false); // Fallback to allow showing content (or maybe redirect?)
            }
        };

        // Safety timeout
        const timer = setTimeout(() => {
            console.log("Auth check timed out, forcing load");
            setLoading(false);
        }, 3000);

        checkAuth();

        return () => clearTimeout(timer);
    }, [context, router]);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', // Person name OR Object name
        birthDate: '',
        deathDate: '',
        objectType: '',
        objectOrigin: '',
        objectMaterial: '',
        photo: null as File | null,
        literaryStyle: '',
    });
    const [selectedStyle, setSelectedStyle] = useState('');

    const getContextTitle = () => {
        switch (context) {
            case 'living_story': return 'Transmettre une histoire';
            case 'object_memory': return 'Mémoire d\'objet';
            default: return 'Créer un mémorial';
        }
    };

    const getContextSubtitle = () => {
        switch (context) {
            case 'living_story': return 'Racontez votre histoire ou celle d\'un proche';
            case 'object_memory': return 'Donnez une voix à un objet qui compte';
            default: return 'Quelques informations pour commencer';
        }
    };

    const handleNext = () => {
        if (step === 1) {
            if (context === 'object_memory') {
                if (!formData.name || !formData.objectType) {
                    alert('Veuillez remplir le nom et le type d\'objet');
                    return;
                }
            } else if (context === 'living_story') {
                if (!formData.name || !formData.birthDate) {
                    alert('Veuillez remplir le nom et la date de naissance');
                    return;
                }
            } else {
                // Funeral default
                if (!formData.name || !formData.birthDate || !formData.deathDate) {
                    alert('Veuillez remplir tous les champs requis');
                    return;
                }
            }
        }
        if (step === 2) {
            if (!selectedStyle) {
                alert('Veuillez choisir un style littéraire');
                return;
            }
            setFormData({ ...formData, literaryStyle: selectedStyle });
        }
        setStep(step + 1);
    };

    const handleStartQuestionnaire = () => {
        // Redirect with context preserved
        router.push(`/create/questionnaire?context=${context}`);
    };

    const handleStartAlma = () => {
        const params = new URLSearchParams();
        if (context) params.set('context', context);
        if (formData.name) params.set('name', formData.name);
        if (formData.birthDate) params.set('birthDate', formData.birthDate);
        if (formData.deathDate) params.set('deathDate', formData.deathDate);
        if (formData.objectType) params.set('objectType', formData.objectType);

        router.push(`/create/alma?${params.toString()}`);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
    }


    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F4F2] to-white">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-memoir-gold/10 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2 text-memoir-blue/60 hover:text-memoir-blue transition-all group">
                        <div className="w-8 h-8 rounded-full bg-memoir-bg flex items-center justify-center group-hover:bg-memoir-gold/20 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold tracking-tight">Tableau de bord</span>
                    </Link>
                    <div className="hidden md:block">
                        <p className="text-[10px] text-memoir-blue/30 uppercase tracking-[0.2em] font-bold">Nouvelle création</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Progress */}
                <div className="flex items-center justify-center gap-3 mb-16">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-col items-center gap-2">
                            <div
                                className={`h-1.5 rounded-full transition-all duration-500 ${s <= step ? 'w-20 md:w-32 bg-memoir-gold shadow-[0_0_10px_rgba(201,162,77,0.3)]' : 'w-12 md:w-20 bg-memoir-blue/5'
                                    }`}
                            />
                            <span className={`text-[9px] font-bold uppercase tracking-widest ${s === step ? 'text-memoir-gold' : 'text-memoir-blue/20'}`}>
                                {s === 1 ? 'Identité' : s === 2 ? 'Style' : 'Méthode'}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Step 1: Basic Information */}
                {step === 1 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-4">
                            <h1 className="text-5xl md:text-6xl text-memoir-blue mb-4 font-serif italic">
                                {getContextTitle()}
                            </h1>
                            <p className="text-memoir-blue/50 italic text-xl font-light">
                                {getContextSubtitle()}
                            </p>
                            <div className="w-20 h-1 bg-memoir-gold/20 mx-auto rounded-full" />
                        </div>

                        <div className="bg-white rounded-[32px] border border-memoir-gold/10 p-10 shadow-xl shadow-memoir-gold/5 space-y-8">

                            {/* Common Field: Name */}
                            <div>
                                <label className="block text-memoir-blue font-bold text-sm uppercase tracking-widest mb-3">
                                    {context === 'object_memory' ? "Comment appeler cet objet ?" : "Quel est son nom ?"} <span className="text-memoir-gold">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder={context === 'object_memory' ? "Ex: L'horloge d'Émile" : "Marie Dubois"}
                                    className="w-full p-5 bg-memoir-bg/30 border border-memoir-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-memoir-gold/30 text-xl font-serif italic text-memoir-blue placeholder:text-memoir-blue/20 transition-all"
                                />
                            </div>

                            {/* Object Context Fields */}
                            {context === 'object_memory' && (
                                <>
                                    <div>
                                        <label className="block text-memoir-blue font-bold text-sm uppercase tracking-widest mb-3">
                                            De quel type d'objet s'agit-il ? <span className="text-memoir-gold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.objectType}
                                            onChange={(e) => setFormData({ ...formData, objectType: e.target.value })}
                                            placeholder="Meuble, Bijou, Maison, Instrument..."
                                            className="w-full p-5 bg-memoir-bg/30 border border-memoir-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-memoir-gold/30 text-lg font-light text-memoir-blue"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-memoir-blue font-bold text-sm uppercase tracking-widest mb-3">
                                                Origine (Lieu ou époque)
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.objectOrigin}
                                                onChange={(e) => setFormData({ ...formData, objectOrigin: e.target.value })}
                                                placeholder="Ex: Bretagne, vers 1920"
                                                className="w-full p-5 bg-memoir-bg/30 border border-memoir-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-memoir-gold/30 text-lg font-light text-memoir-blue"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-memoir-blue font-bold text-sm uppercase tracking-widest mb-3">
                                                Matière principale
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.objectMaterial}
                                                onChange={(e) => setFormData({ ...formData, objectMaterial: e.target.value })}
                                                placeholder="Ex: Chêne massif, Argent, Soie"
                                                className="w-full p-5 bg-memoir-bg/30 border border-memoir-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-memoir-gold/30 text-lg font-light text-memoir-blue"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Person Context Fields */}
                            {context !== 'object_memory' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-memoir-blue font-bold text-sm uppercase tracking-widest mb-3">
                                            Date de naissance <span className="text-memoir-gold">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.birthDate}
                                            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                            className="w-full p-5 bg-memoir-bg/30 border border-memoir-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-memoir-gold/30 text-lg font-light text-memoir-blue"
                                        />
                                    </div>

                                    {/* Funeral Only */}
                                    {context === 'funeral' && (
                                        <div>
                                            <label className="block text-memoir-blue font-bold text-sm uppercase tracking-widest mb-3">
                                                Date de décès <span className="text-memoir-gold">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.deathDate}
                                                onChange={(e) => setFormData({ ...formData, deathDate: e.target.value })}
                                                className="w-full p-5 bg-memoir-bg/30 border border-memoir-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-memoir-gold/30 text-lg font-light text-memoir-blue"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div>
                                <label className="block text-memoir-blue font-bold text-sm uppercase tracking-widest mb-3">
                                    Une photo pour illustrer (optionnel)
                                </label>
                                <div className="relative group/file">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
                                        className="w-full p-10 border-2 border-dashed border-memoir-gold/20 rounded-3xl hover:border-memoir-gold/50 transition-colors cursor-pointer bg-memoir-bg/10"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-memoir-blue/40 group-hover/file:text-memoir-gold transition-colors">
                                        <div className="text-sm font-medium">Cliquez pour ajouter une photo</div>
                                        <div className="text-[10px] uppercase tracking-widest mt-1">Format JPG, PNG ou WEBP</div>
                                    </div>
                                </div>
                                <p className="text-xs text-memoir-blue/30 mt-3 font-light italic">Elle sera mise en avant sur le mémorial.</p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={handleNext}
                                className="group flex items-center gap-4 bg-memoir-blue text-white px-12 py-5 rounded-full hover:shadow-2xl hover:scale-105 transition-all text-lg font-bold"
                            >
                                <span>Suivant</span>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-memoir-gold transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Literary Style */}
                {step === 2 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-4">
                            <h1 className="text-5xl md:text-6xl text-memoir-blue mb-4 font-serif italic">
                                Choisissez un souffle
                            </h1>
                            <p className="text-memoir-blue/50 italic text-xl font-light max-w-2xl mx-auto">
                                Quel ton souhaitez-vous donner au récit {context === 'object_memory' ? "de cet objet" : "de vie"} ?
                            </p>
                            <div className="w-20 h-1 bg-memoir-gold/20 mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {LITERARY_STYLES.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={`w-full text-left p-10 rounded-[32px] border-2 transition-all duration-500 relative overflow-hidden group ${selectedStyle === style.id
                                        ? 'border-memoir-gold bg-white shadow-2xl shadow-memoir-gold/5'
                                        : 'border-memoir-blue/5 bg-white/50 hover:bg-white hover:border-memoir-gold/20'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-2xl text-memoir-blue font-serif italic">
                                            {style.name}
                                        </h3>
                                        {selectedStyle === style.id && (
                                            <div className="w-6 h-6 rounded-full bg-memoir-gold flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-white" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-memoir-blue/40 text-sm mb-6 font-light uppercase tracking-widest">{style.description}</p>
                                    <div className={`p-6 rounded-2xl italic leading-relaxed transition-all duration-500 ${selectedStyle === style.id ? 'bg-memoir-bg text-memoir-blue' : 'bg-memoir-blue/5 text-memoir-blue/40'}`}>
                                        "{style.example}"
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setStep(1)}
                                className="flex items-center gap-2 text-memoir-blue/40 hover:text-memoir-blue transition-colors px-6 py-3 font-bold text-sm uppercase tracking-widest"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span>Retour</span>
                            </button>
                            <button
                                onClick={handleNext}
                                className="group flex items-center gap-4 bg-memoir-blue text-white px-12 py-5 rounded-full hover:shadow-2xl hover:scale-105 transition-all text-lg font-bold"
                            >
                                <span>Continuer</span>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-memoir-gold transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Choose Creation Mode */}
                {step === 3 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-4">
                            <h1 className="text-5xl md:text-6xl text-memoir-blue mb-4 font-serif italic">
                                Comment donner vie <br /> <span className="text-memoir-gold">à ce récit ?</span>
                            </h1>
                            <p className="text-memoir-blue/50 italic text-xl font-light">
                                Choisissez la méthode qui vous ressemble le plus.
                            </p>
                            <div className="w-20 h-1 bg-memoir-gold/20 mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Alma */}
                            <button
                                onClick={handleStartAlma}
                                className="bg-white border border-memoir-gold/10 rounded-[40px] p-10 hover:border-memoir-gold hover:shadow-2xl hover:shadow-memoir-gold/10 transition-all duration-500 text-left group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 scale-150">
                                    <Sparkles className="w-32 h-32 text-memoir-gold" />
                                </div>
                                <div className="flex items-center justify-center mb-8 bg-memoir-bg w-24 h-24 rounded-3xl group-hover:bg-memoir-gold/10 transition-colors mx-auto">
                                    <img src="/alma-icon-transparent.png" alt="Alma" className="w-16 h-16 group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <h3 className="text-3xl text-memoir-blue font-serif italic mb-4 text-center">
                                    Dialoguer avec Alma
                                </h3>
                                <p className="text-memoir-blue/50 text-center leading-relaxed font-light mb-6">
                                    Une conversation guidée par notre intelligence sensible. Alma vous pose des questions délicates pour faire ressurgir les plus beaux souvenirs.
                                </p>
                                <div className="flex justify-center">
                                    <div className="px-6 py-2 bg-memoir-gold text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                        Conseillé pour l'émotion
                                    </div>
                                </div>
                            </button>

                            {/* Questionnaire */}
                            <button
                                onClick={handleStartQuestionnaire}
                                className="bg-white border border-memoir-gold/10 rounded-[40px] p-10 hover:border-memoir-gold hover:shadow-2xl hover:shadow-memoir-gold/10 transition-all duration-500 text-left group relative overflow-hidden"
                            >
                                 <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 scale-150">
                                    <FileText className="w-32 h-32 text-memoir-gold" />
                                </div>
                                <div className="flex items-center justify-center mb-8 bg-memoir-bg w-24 h-24 rounded-3xl group-hover:bg-memoir-gold/10 transition-colors mx-auto">
                                    <img src="/questionnaire-icon-transparent.png" alt="Questionnaire" className="w-16 h-16 group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <h3 className="text-3xl text-memoir-blue font-serif italic mb-4 text-center">
                                    Écrire à votre rythme
                                </h3>
                                <p className="text-memoir-blue/50 text-center leading-relaxed font-light mb-6">
                                    Un formulaire structuré si vous préférez rédiger librement ou si vous avez déjà tous les éléments en main.
                                </p>
                                <div className="flex justify-center">
                                    <div className="px-6 py-2 bg-memoir-blue/5 text-memoir-blue/40 rounded-full text-[10px] font-bold uppercase tracking-widest border border-memoir-blue/10">
                                        Libre & Structuré
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setStep(2)}
                                className="flex items-center gap-2 text-memoir-blue/30 hover:text-memoir-blue transition-colors px-10 py-4 font-bold text-xs uppercase tracking-[0.2em]"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span>RETOUR</span>
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function CreatePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
            <NewMemorialContent />
        </Suspense>
    );
}
