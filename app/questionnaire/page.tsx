'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { steps } from './steps';
import { QuestionnaireData } from '@/lib/schema';
import Progress from '@/components/Progress';
import Step from '@/components/Step';
import { ChevronLeft, ChevronRight, Save, Home } from 'lucide-react';
import Link from 'next/link';

export default function QuestionnairePage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<Partial<QuestionnaireData>>({
    identite: {},
    style: null,
    caractere: { adjectifs: [] },
    valeurs: { selected: [] },
    liens: { personnes: '' },
    talents: {},
    gouts: {},
    message: { hasMessage: false },
    medias: [],
    liensWeb: [],
  });

  const currentStep = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  useEffect(() => {
    const saved = localStorage.getItem('questionnaire-memoire');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Erreur chargement');
      }
    }
  }, []);

  const handleChange = (field: string, value: any) => {
    setData((prev) => {
      const keys = field.split('.');
      if (keys.length === 1) {
        return { ...prev, [field]: value };
      }
      const [parent, child] = keys;
      return {
        ...prev,
        [parent]: {
          ...(prev[parent as keyof QuestionnaireData] as any),
          [child]: value,
        },
      };
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
    localStorage.setItem('questionnaire-memoire', JSON.stringify(data));
    alert('Sauvegardé');
  };

  const handleSubmit = () => {
    handleSave();
    router.push('/apercu');
  };

  return (
    <main className="min-h-screen py-12 px-4 bg-memoir-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-memoir-gold hover:text-memoir-gold/80 transition-colors mb-4">
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Retour</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-memoir-blue mb-4">Et j'ai crié – Mémoire</h1>
          <p className="text-memoir-blue/70 text-lg">Création de votre mémorial</p>
        </div>
        <Progress current={stepIndex} total={steps.length} />
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <Step step={currentStep} data={data} onChange={handleChange} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <button onClick={handlePrevious} disabled={isFirstStep} className="btn-secondary flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />Précédent
          </button>
          <button onClick={handleSave} className="btn-secondary flex items-center gap-2">
            <Save className="w-5 h-5" />Sauvegarder
          </button>
          {isLastStep ? (
            <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
              Terminer<ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary flex items-center gap-2">
              Suivant<ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
