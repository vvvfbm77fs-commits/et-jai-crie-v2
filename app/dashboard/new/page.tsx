'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function NewMemorialPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        deathDate: '',
        photo: null as File | null,
        literaryStyle: '',
    });
    const [selectedStyle, setSelectedStyle] = useState('');

    const handleNext = () => {
        if (step === 1) {
            if (!formData.name || !formData.birthDate || !formData.deathDate) {
                alert('Veuillez remplir tous les champs requis');
                return;
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
        // For now, redirect to existing questionnaire
        // In real implementation, this would create the memorial and redirect
        router.push('/questionnaire');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F4F2] to-white">
            {/* Header */}
            <header className="bg-white border-b border-[#C9A24D]/20">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Retour au tableau de bord</span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Progress */}
                <div className="flex items-center justify-center gap-2 mb-12">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`h-2 rounded-full transition-all ${s <= step ? 'w-16 bg-[#C9A24D]' : 'w-8 bg-gray-200'
                                }`}
                        />
                    ))}
                </div>

                {/* Step 1: Basic Information */}
                {step === 1 && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl text-[#0F2A44] mb-4 font-normal text-center" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                                Créer un mémorial
                            </h1>
                            <p className="text-center text-gray-600 italic text-lg">
                                Quelques informations pour commencer
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-[#C9A24D]/20 p-8 space-y-6">
                            <div>
                                <label className="block text-[#0F2A44] font-medium mb-2">
                                    Nom complet <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Marie Dubois"
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-lg"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[#0F2A44] font-medium mb-2">
                                        Date de naissance <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.birthDate}
                                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#0F2A44] font-medium mb-2">
                                        Date de décès <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.deathDate}
                                        onChange={(e) => setFormData({ ...formData, deathDate: e.target.value })}
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#0F2A44] font-medium mb-2">
                                    Photo principale (optionnel)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
                                />
                                <p className="text-sm text-gray-500 mt-2 italic">Vous pourrez ajouter d'autres photos plus tard</p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 bg-[#C9A24D] text-[#0F2A44] px-8 py-4 rounded-xl hover:bg-[#E1C97A] transition-all text-lg font-medium"
                            >
                                <span>Continuer</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Literary Style */}
                {step === 2 && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl text-[#0F2A44] mb-4 font-normal text-center" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                                Choisissez un style
                            </h1>
                            <p className="text-center text-gray-600 italic text-lg max-w-2xl mx-auto">
                                Ce style guidera l'écriture de votre mémorial. Lisez les exemples et choisissez celui qui vous ressemble le plus.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {LITERARY_STYLES.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${selectedStyle === style.id
                                        ? 'border-[#C9A24D] bg-[#C9A24D]/5 shadow-lg'
                                        : 'border-gray-200 hover:border-[#C9A24D]/50 bg-white'
                                        }`}
                                >
                                    <h3 className="text-2xl text-[#0F2A44] font-medium mb-2" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                                        {style.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">{style.description}</p>
                                    <div className="bg-[#0F2A44]/5 p-4 rounded-lg italic text-gray-700 leading-relaxed">
                                        "{style.example}"
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep(1)}
                                className="flex items-center gap-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors px-6 py-3"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span>Retour</span>
                            </button>
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 bg-[#C9A24D] text-[#0F2A44] px-8 py-4 rounded-xl hover:bg-[#E1C97A] transition-all text-lg font-medium"
                            >
                                <span>Continuer</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Choose Creation Mode */}
                {step === 3 && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl text-[#0F2A44] mb-4 font-normal text-center" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                                Comment souhaitez-vous créer ce mémorial ?
                            </h1>
                            <p className="text-center text-gray-600 italic text-lg">
                                Choisissez la méthode qui vous convient le mieux
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Alma */}
                            <button
                                onClick={() => router.push('/alma')}
                                className="bg-white border-2 border-[#C9A24D]/30 rounded-2xl p-8 hover:border-[#C9A24D] hover:shadow-xl transition-all text-left group"
                            >
                                <div className="flex items-center justify-center mb-6">
                                    <img src="/alma-icon-transparent.png" alt="Alma" className="w-24 h-24 opacity-90 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-2xl text-[#0F2A44] font-medium mb-3 text-center" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                                    Avec Alma
                                </h3>
                                <p className="text-gray-600 italic text-center leading-relaxed">
                                    Une conversation douce et bienveillante qui vous guide pas à pas dans vos souvenirs.
                                </p>
                            </button>

                            {/* Questionnaire */}
                            <button
                                onClick={handleStartQuestionnaire}
                                className="bg-white border-2 border-[#C9A24D]/30 rounded-2xl p-8 hover:border-[#C9A24D] hover:shadow-xl transition-all text-left group"
                            >
                                <div className="flex items-center justify-center mb-6">
                                    <img src="/questionnaire-icon-transparent.png" alt="Questionnaire" className="w-24 h-24 opacity-90 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-2xl text-[#0F2A44] font-medium mb-3 text-center" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                                    Questionnaire
                                </h3>
                                <p className="text-gray-600 italic text-center leading-relaxed">
                                    Un formulaire structuré pour créer votre mémorial à votre propre rythme.
                                </p>
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setStep(2)}
                                className="flex items-center gap-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors px-6 py-3"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span>Retour</span>
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
