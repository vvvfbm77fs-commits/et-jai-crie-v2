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

const GeneratePage = () => {
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState('');
    const [realData, setRealData] = useState<any>(null);

    useEffect(() => {
        // Gather all data
        const loadData = () => {
            const context = localStorage.getItem('context') || 'funeral'; // We should probably have saved this context somewhere if possible, or try all.
            // Try to find any alma conversation
            const almaFuneral = localStorage.getItem('almaConversation_funeral');
            const almaLiving = localStorage.getItem('almaConversation_living_story');
            const almaObject = localStorage.getItem('almaConversation_object_memory');

            const almaData = almaFuneral || almaLiving || almaObject;

            const mediaData = localStorage.getItem('mediaData');

            // For basic info, we might have lost it if not saved.
            // But Alma conversation usually contains the name in the first messages if we parse it, or we rely on Alma content.

            setRealData({
                alma: almaData ? JSON.parse(almaData) : null,
                media: mediaData ? JSON.parse(mediaData) : null
            });
        };
        loadData();
    }, []);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setProgress(0);

        // Steps for UI
        const steps = [
            { text: 'Analyse des souvenirs et de la conversation...', duration: 2000 },
            { text: 'Identification des traits de caractère...', duration: 2500 },
            { text: 'Rédaction de l\'hommage...', duration: 3000 },
            { text: 'Mise en forme finale...', duration: 1500 },
        ];

        // Start UI animation in parallel
        let currentProgress = 0;
        let stepIndex = 0;

        // We will run the API call in background
        const generatePromise = (async () => {
            if (!realData?.alma) return "Texte par défaut (erreur de récupération des données).";

            // Format conversation for prompt
            const conversationText = realData.alma.map((m: any) => `${m.role}: ${m.content}`).join('\n');
            const prompt = `
            Rédige un hommage funéraire émouvant et fidèle basé sur cette conversation avec Alma (l'IA biographe).
            Le texte doit être bien structuré, touchant, et refléter la personnalité décrite.
            Utilise un ton solennel mais chaleureux.
            
            CONVERSATION :
            ${conversationText}
            `;

            try {
                const res = await fetch('/api/generate-memorial', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt })
                });
                const data = await res.json();
                return data.text;
            } catch (e) {
                console.error(e);
                return "Erreur lors de la génération.";
            }
        })();

        const runStep = async () => {
            if (stepIndex >= steps.length) {
                // Wait for generation to finish if it hasn't
                const text = await generatePromise;

                // Save generated text
                localStorage.setItem('generatedMemorialText', text);

                // Redirect
                router.push('/dashboard/1/validate');
                return;
            }

            const step = steps[stepIndex];
            setCurrentStep(step.text);

            const progressIncrement = 100 / steps.length;

            // Animate progress bar for this step
            // We blindly animate for 'duration'
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const p = Math.min(elapsed / step.duration, 1);
                // current overall progress
                const baseProgress = stepIndex * progressIncrement;
                const stepProgress = p * progressIncrement;
                setProgress(baseProgress + stepProgress);

                if (p < 1) requestAnimationFrame(animate);
                else {
                    stepIndex++;
                    runStep();
                }
            };
            animate();
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
                        <p>Cette opération prend généralement quelques secondes</p>
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
                    <Link href="/medias" className="flex items-center gap-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Retour aux médias</span>
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
                        Nous allons créer un texte unique en synthétisant votre conversation avec Alma.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl border border-[#C9A24D]/20 p-6 text-center">
                        <Users className="w-8 h-8 text-[#C9A24D] mx-auto mb-3" />
                        <p className="text-3xl font-medium text-[#0F2A44] mb-1">
                            {realData?.alma ? '1' : '0'}
                        </p>
                        <p className="text-sm text-gray-600">Conversation Alma</p>
                    </div>

                    <div className="bg-white rounded-xl border border-[#C9A24D]/20 p-6 text-center">
                        <FileText className="w-8 h-8 text-[#C9A24D] mx-auto mb-3" />
                        <p className="text-3xl font-medium text-[#0F2A44] mb-1">
                            {realData?.media?.galleryPhotos?.length || 0}
                        </p>
                        <p className="text-sm text-gray-600">Photos ajoutées</p>
                    </div>

                    <div className="bg-white rounded-xl border border-[#C9A24D]/20 p-6 text-center">
                        <Sparkles className="w-8 h-8 text-[#C9A24D] mx-auto mb-3" />
                        <p className="text-3xl font-medium text-[#0F2A44] mb-1">IA</p>
                        <p className="text-sm text-gray-600">Synthèse intelligente</p>
                    </div>
                </div>


                {/* Info Box */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-8">
                    <div className="flex gap-3">
                        <div className="text-blue-600 text-2xl">ℹ️</div>
                        <div>
                            <h3 className="text-blue-900 font-medium mb-2">Comment fonctionne la génération ?</h3>
                            <ul className="text-sm text-blue-800 leading-relaxed space-y-1">
                                <li>• L'IA analyse votre conversation avec Alma</li>
                                <li>• Elle identifie les thèmes, anecdotes et valeurs communes</li>
                                <li>• Le texte est rédigé dans un style solennel et poétique</li>
                                <li>• Vous pourrez ensuite le relire, modifier et approuver</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action */}
                <div className="text-center">
                    {!realData?.alma ? (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                            <p className="text-amber-800">
                                Aucune conversation Alma trouvée. Veuillez recommencer le processus.
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
