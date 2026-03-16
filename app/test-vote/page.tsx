'use client';

import { useMemo, useState } from 'react';

type CandidateKey = 'dati' | 'gregoire' | 'bournazel' | 'chikirou';

type Option = {
  label: string;
  preference: number;
  impact: string;
  feasibility: number;
  alignment: Record<CandidateKey, number>;
};

type Question = {
  id: string;
  title: string;
  impossible: string;
  options: Option[];
};

const candidates: Record<CandidateKey, { name: string; tag: string; badge: string }> = {
  dati: {
    name: 'Rachida Dati',
    tag: 'Ordre public et attractivité',
    badge: 'bg-white text-[#1f3a8a] border-[#1f3a8a]/30',
  },
  gregoire: {
    name: 'Emmanuel Grégoire',
    tag: 'Équilibre social et transition',
    badge: 'bg-[#1f3a8a] text-white border-[#1f3a8a]',
  },
  bournazel: {
    name: 'Pierre-Yves Bournazel',
    tag: 'Pragmatisme municipal',
    badge: 'bg-white text-[#374151] border-[#374151]/30',
  },
  chikirou: {
    name: 'Sophia Chikirou',
    tag: 'Rupture sociale',
    badge: 'bg-[#c81d25] text-white border-[#c81d25]',
  },
};

const questions: Question[] = [
  {
    id: 'logement',
    title: 'Logement : quelle trajectoire te semble la plus sérieuse ?',
    impossible: 'La ville ne peut pas imposer seule une baisse rapide de tous les loyers privés.',
    options: [
      {
        label: 'Produire du logement + limiter les locations touristiques',
        preference: 3,
        feasibility: 3,
        alignment: { dati: 2, gregoire: 3, bournazel: 2, chikirou: 2 },
        impact: 'Effet graduel sur l’offre et meilleure stabilité à moyen terme.',
      },
      {
        label: 'Encadrement maximal immédiat',
        preference: 2,
        feasibility: 1,
        alignment: { dati: 1, gregoire: 2, bournazel: 1, chikirou: 3 },
        impact: 'Mesure socialement lisible mais juridiquement fragile.',
      },
      {
        label: 'Intervention publique minimale',
        preference: 1,
        feasibility: 2,
        alignment: { dati: 3, gregoire: 1, bournazel: 2, chikirou: 1 },
        impact: 'Lisibilité économique, protection sociale plus faible.',
      },
    ],
  },
  {
    id: 'mobilite',
    title: 'Mobilité : quelle priorité de mandat ?',
    impossible: 'Supprimer totalement pollution et congestion en un mandat n’est pas réaliste.',
    options: [
      {
        label: 'Transport public + vélo + marche',
        preference: 3,
        feasibility: 3,
        alignment: { dati: 2, gregoire: 3, bournazel: 2, chikirou: 2 },
        impact: 'Bénéfices durables sur la santé et les temps de trajet.',
      },
      {
        label: 'Fluidité automobile prioritaire',
        preference: 1,
        feasibility: 2,
        alignment: { dati: 3, gregoire: 1, bournazel: 2, chikirou: 1 },
        impact: 'Soulagement ponctuel, effet limité sur l’air.',
      },
      {
        label: 'Gratuité totale immédiate des transports',
        preference: 2,
        feasibility: 1,
        alignment: { dati: 1, gregoire: 2, bournazel: 1, chikirou: 3 },
        impact: 'Mesure attractive mais lourde en financement.',
      },
    ],
  },
  {
    id: 'budget',
    title: 'Budget : quelle méthode te paraît la plus crédible ?',
    impossible: 'Promettre “tout financer, sans choix” n’est pas soutenable.',
    options: [
      {
        label: 'Plan priorisé avec calendrier et budget détaillé',
        preference: 3,
        feasibility: 3,
        alignment: { dati: 2, gregoire: 3, bournazel: 3, chikirou: 2 },
        impact: 'Permet d’évaluer les résultats et de corriger.',
      },
      {
        label: 'Mesures massives immédiates',
        preference: 2,
        feasibility: 1,
        alignment: { dati: 1, gregoire: 2, bournazel: 1, chikirou: 3 },
        impact: 'Choc social initial, risque budgétaire important.',
      },
      {
        label: 'Réduction forte de la dépense publique',
        preference: 1,
        feasibility: 2,
        alignment: { dati: 3, gregoire: 1, bournazel: 2, chikirou: 1 },
        impact: 'Dépense contenue, pression sur la qualité de service.',
      },
    ],
  },
];

export default function TestVotePage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const allAnswered = questions.every((question) => answers[question.id] !== undefined);

  const ranking = useMemo(() => {
    if (!allAnswered) return null;

    const score: Record<CandidateKey, number> = {
      dati: 0,
      gregoire: 0,
      bournazel: 0,
      chikirou: 0,
    };

    questions.forEach((question) => {
      const selected = question.options[answers[question.id]];
      if (!selected) return;

      (Object.keys(score) as CandidateKey[]).forEach((candidate) => {
        score[candidate] += selected.preference * selected.alignment[candidate] + selected.feasibility;
      });
    });

    return (Object.keys(score) as CandidateKey[])
      .map((key) => ({ key, score: score[key] }))
      .sort((a, b) => b.score - a.score);
  }, [answers, allAnswered]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="h-1 w-full bg-gradient-to-r from-[#1f3a8a] via-white to-[#c81d25]" />
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">République • Paris • Orientation</p>
            <h1 className="text-xl md:text-2xl font-bold text-[#1f3a8a]">Test citoyen de compatibilité</h1>
          </div>
          <span className="text-xs md:text-sm px-3 py-1 rounded-full border border-[#1f3a8a]/20 bg-[#1f3a8a]/5 text-[#1f3a8a]">
            Municipales
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <p className="text-slate-700 leading-relaxed">
            Un format simple pour comparer des orientations politiques avec un angle concret :
            <strong> ce qui est faisable</strong>, <strong>ce que ça change</strong>, et <strong>la cohérence globale</strong>.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Barème transparent : score = somme (<span className="text-[#1f3a8a] font-semibold">préférence × proximité</span>) +
            <span className="text-[#c81d25] font-semibold"> faisabilité</span>.
          </p>
        </section>

        {questions.map((question, qIndex) => (
          <section key={question.id} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-8 w-8 rounded-full bg-[#1f3a8a] text-white text-sm font-bold flex items-center justify-center">
                {qIndex + 1}
              </span>
              <h2 className="text-lg md:text-xl font-semibold">{question.title}</h2>
            </div>

            <p className="mb-5 text-sm rounded-xl border border-[#c81d25]/20 bg-[#c81d25]/5 p-3 text-[#8a1117]">
              ⚠️ Faisabilité : {question.impossible}
            </p>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const selected = answers[question.id] === index;
                return (
                  <button
                    key={option.label}
                    onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: index }))}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selected
                        ? 'border-[#1f3a8a] bg-[#1f3a8a] text-white'
                        : 'border-slate-200 bg-white hover:border-[#1f3a8a]/50'
                    }`}
                  >
                    <p className="font-semibold">{option.label}</p>
                    <p className={`mt-1 text-sm ${selected ? 'text-white/85' : 'text-slate-600'}`}>
                      Conséquence : {option.impact}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        {ranking && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-[#1f3a8a] mb-5">Résultat de compatibilité</h2>
            <div className="space-y-3">
              {ranking.map((entry, index) => (
                <div key={entry.key} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
                  <div>
                    <p className="font-semibold">#{index + 1} — {candidates[entry.key].name}</p>
                    <p className="text-sm text-slate-600">{candidates[entry.key].tag}</p>
                  </div>
                  <span className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm ${candidates[entry.key].badge}`}>
                    Score {entry.score}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
