'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Sparkles, Users, FileText, CheckCircle } from 'lucide-react';

const MOCK_TESTIMONIES = [
    { name: 'Vous (Aline Weber)', status: 'complete' },
    { name: 'Marie Dupont', status: 'complete' },
    { name: 'Paul Martin', status: 'pending' },
];

export default function GeneratePage() {
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState('');

    const completedTestimonies = MOCK_TESTIMONIES.filter(t => t.status === 'complete');
    const canGenerate = completedTestimonies.length >= 1;

    const handleGenerate = () => {
        setIsGenerating(true);
        setProgress(0);

        // Simulate AI generation steps
        const steps = [
            { text: 'Analyse des témoignages...', duration: 2000 },
            { text: 'Identification des thèmes communs...', duration: 2500 },
            { text: 'Harmonisation des voix...', duration: 2000 },
            { text: 'Rédaction du texte synthétisé...', duration: 3000 },
            { text: 'Finalisation...', duration: 1500 },
        ];

        let currentProgress = 0;
        let stepIndex = 0;

        const runStep = () => {
            if (stepIndex >= steps.length) {
                // Generation complete
                setTimeout(() => {
                    router.push('/dashboard/1/validate');
                }, 500);
                return;
            }

            const step = steps[stepIndex];
            setCurrentStep(step.text);

            const progressIncrement = 100 / steps.length;
            const interval = setInterval(() => {
                currentProgress += 2;
                setProgress(Math.min(currentProgress, (stepIndex + 1) * progressIncrement));
            }, step.duration / (progressIncrement / 2));

            setTimeout(() => {
                clearInterval(interval);
                stepIndex++;
                runStep();
            }, step.duration);
        };

        runStep();
    };

    if (isGenerating) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#0F2A44] to-[#1C3B5A] flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl p-12 max-w-2xl w-full text-center">
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#C9A24D] to-[#E1C97A] rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                            <Sparkles className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-3xl text-[#0F2A44] mb-3 font-normal" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                            Création de votre mémorial
                        </h2>
                        <p className="text-lg text-gray-600 italic">{currentStep}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#C9A24D] to-[#E1C97A] transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}%</p>
                    </div>

                    <div className="text-sm text-gray-500 italic">
                        <p>Cette opération prend généralement 30 à 60 secondes</p>
                        <p className="mt-1">Merci de patienter...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F4F2] to-white">
            {/* Header */}
            <header className="bg-white border-b border-[#C9A24D]/20 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/dashboard/1" className="flex items-center gap-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Retour</span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#C9A24D]/20 to-[#E1C97A]/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-[#C9A24D]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl text-[#0F2A44] mb-3 font-normal" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                        Générer le mémorial
                    </h1>
                    <p className="text-xl text-gray-600 italic max-w-2xl mx-auto">
                        Nous allons créer un texte unique en synthétisant tous les témoignages recueillis
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl border border-[#C9A24D]/20 p-6 text-center">
                        <Users className="w-8 h-8 text-[#C9A24D] mx-auto mb-3" />
                        <p className="text-3xl font-medium text-[#0F2A44] mb-1">
                            {completedTestimonies.length}
                        </p>
                        <p className="text-sm text-gray-600">Témoignages complétés</p>
                    </div>

                    <div className="bg-white rounded-xl border border-[#C9A24D]/20 p-6 text-center">
                        <FileText className="w-8 h-8 text-[#C9A24D] mx-auto mb-3" />
                        <p className="text-3xl font-medium text-[#0F2A44] mb-1">Sobre</p>
                        <p className="text-sm text-gray-600">Style littéraire choisi</p>
                    </div>

                    <div className="bg-white rounded-xl border border-[#C9A24D]/20 p-6 text-center">
                        <Sparkles className="w-8 h-8 text-[#C9A24D] mx-auto mb-3" />
                        <p className="text-3xl font-medium text-[#0F2A44] mb-1">IA</p>
                        <p className="text-sm text-gray-600">Synthèse intelligente</p>
                    </div>
                </div>

                {/* Testimonies List */}
                <div className="bg-white rounded-2xl border border-[#C9A24D]/20 p-8 mb-8">
                    <h2 className="text-xl text-[#0F2A44] font-medium mb-6">Témoignages à intégrer</h2>
                    <div className="space-y-3">
                        {MOCK_TESTIMONIES.map((testimony, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    {testimony.status === 'complete' ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                                    )}
                                    <span className="text-[#0F2A44]">{testimony.name}</span>
                                </div>
                                <span className={`text-sm ${testimony.status === 'complete' ? 'text-green-600' : 'text-gray-400'}`}>
                                    {testimony.status === 'complete' ? 'Complété' : 'En attente'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-8">
                    <div className="flex gap-3">
                        <div className="text-blue-600 text-2xl">ℹ️</div>
                        <div>
                            <h3 className="text-blue-900 font-medium mb-2">Comment fonctionne la génération ?</h3>
                            <ul className="text-sm text-blue-800 leading-relaxed space-y-1">
                                <li>• L'IA analyse tous les témoignages complétés</li>
                                <li>• Elle identifie les thèmes, anecdotes et valeurs communes</li>
                                <li>• Le texte est rédigé dans le style littéraire choisi</li>
                                <li>• Vous pourrez ensuite le relire, modifier et approuver</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action */}
                <div className="text-center">
                    {!canGenerate ? (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                            <p className="text-amber-800">
                                Vous devez avoir au moins un témoignage complété pour générer le mémorial
                            </p>
                        </div>
                    ) : (
                        <button
                            onClick={handleGenerate}
                            className="inline-flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-[#C9A24D] to-[#E1C97A] text-white rounded-xl hover:shadow-xl transition-all font-medium text-lg"
                        >
                            <Sparkles className="w-6 h-6" />
                            <span>Générer le mémorial</span>
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}
