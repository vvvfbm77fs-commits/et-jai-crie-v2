'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSteps } from './steps';
import { QuestionnaireData } from '@/lib/schema';
import Progress from '@/components/Progress';
import StepComponent from '@/components/Step';
import { ChevronLeft, ChevronRight, Save, Home } from 'lucide-react';
import AlmaChatBubble from '@/components/AlmaChatBubble';

function QuestionnaireContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const context = (searchParams.get('context') as 'funeral' | 'living_story' | 'object_memory') || 'funeral';

  const steps = useMemo(() => getSteps(context), [context]);

  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<Partial<QuestionnaireData>>({
    identite: { prenom: '' },
    photoProfil: {},
    style: null,
    caractere: { adjectifs: [] },
    valeurs: { selected: [] },
    liens: { personnes: '' },
    talents: {},
    gouts: {},
    musiqueAudio: {},
    galerie: { photos: [] },
    message: { hasMessage: false },
    medias: [],
    liensWeb: [],
  });

  const currentStep = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  // Charger les données depuis localStorage au montage
  useEffect(() => {
    // Separate storage key per context to avoid mixing data
    const saved = localStorage.getItem(`questionnaire-memoire-${context}`);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Erreur lors du chargement des données sauvegardées');
      }
    }
  }, [context]);

  const handleChange = (field: string, value: any) => {
    setData((prev) => {
      const keys = field.split('.');
      let newData;

      if (keys.length === 1) {
        newData = { ...prev, [field]: value };
      } else {
        const [parent, child] = keys;
        newData = {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof QuestionnaireData] as any),
            [child]: value,
          },
        };
      }

      // Sauvegarde automatique à chaque changement
      localStorage.setItem(`questionnaire-memoire-${context}`, JSON.stringify(newData));
      return newData;
    });
  };

  const handleNext = () => {
    if (!isLastStep) {
      setStepIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setStepIndex((i) => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSave = () => {
    localStorage.setItem(`questionnaire-memoire-${context}`, JSON.stringify(data));
    alert('Vos réponses ont été sauvegardées.');
  };

  const handleSubmit = () => {
    // Sauvegarder les données du questionnaire
    localStorage.setItem('questionnaireData', JSON.stringify(data));
    // Rediriger vers la page médias
    router.push('/medias');
  };

  return (
    <>
      <div className="min-h-screen bg-memoir-bg py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-6 md:mb-8">
            <button
              onClick={() => {
                if (confirm('Voulez-vous vraiment quitter ? Vos modifications non sauvegardées seront perdues.')) {
                  router.push('/');
                }
              }}
              className="inline-flex items-center gap-2 text-memoir-gold hover:text-memoir-gold/80 transition-colors mb-4"
            >
              <Home className="w-5 h-5" />
              <span className="text-sm font-medium">Retour à l'accueil</span>
            </button>
            <h1 className="text-3xl md:text-5xl font-bold text-memoir-blue mb-2 md:mb-4">
              {context === 'object_memory' ? 'Mémoire d\'Objet' : 'Et j\'ai crié – Mémoire'}
            </h1>
            <p className="text-memoir-blue/70 text-base md:text-lg">
              {context === 'object_memory' ? 'Raconter son histoire' : 'Création de votre mémorial'}
            </p>
          </div>

          {/* Barre de progression */}
          <Progress current={stepIndex} total={steps.length} />

          {/* Étape courante */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12 mb-6 md:mb-8">
            <StepComponent step={currentStep} data={data} onChange={handleChange} />
          </div>

          {/* Navigation */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-4">
            <button
              onClick={handlePrevious}
              disabled={isFirstStep}
              className="btn-secondary flex items-center justify-center gap-2 order-1 md:order-1"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="inline">Précédent</span>
            </button>

            <button
              onClick={handleSave}
              className="btn-secondary flex items-center justify-center gap-2 order-3 md:order-2"
              title="Sauvegarder la progression"
            >
              <Save className="w-5 h-5" />
              <span>Sauvegarder</span>
            </button>

            {isLastStep ? (
              <button
                onClick={handleSubmit}
                className="btn-primary flex items-center justify-center gap-2 order-2 md:order-3"
              >
                <span>Continuer vers les médias</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center justify-center gap-2 order-2 md:order-3"
              >
                <span>Suivant</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Indication de sauvegarde */}
          <p className="text-center text-memoir-blue/50 text-xs md:text-sm mt-6">
            Vos réponses sont automatiquement sauvegardées dans votre navigateur
          </p>
        </div>
      </div>

      {/* Bulle ALMA flottante */}
      <AlmaChatBubble />
    </>
  );
}

export default function QuestionnairePage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-memoir-bg">
        <div className="animate-spin w-8 h-8 border-4 border-memoir-gold border-t-transparent rounded-full" />
      </div>
    }>
      <QuestionnaireContent />
    </Suspense>
  );
}