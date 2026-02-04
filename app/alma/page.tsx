'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AlmaChat from '@/components/AlmaChat';
import { Home } from 'lucide-react';

function AlmaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const context = (searchParams.get('context') as 'funeral' | 'living_story' | 'object_memory') || 'funeral';

  return (
    <div className="h-screen flex flex-col bg-memoir-bg">
      {/* Header */}
      <div className="bg-white border-b border-memoir-blue/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm('Voulez-vous vraiment quitter ? Votre conversation sera sauvegardée.')) {
                router.push('/');
              }
            }}
            className="flex items-center gap-2 text-memoir-blue/60 hover:text-memoir-blue transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Retour à l'accueil</span>
          </button>

          <div className="text-center flex-1">
            <h1 className="text-xl font-bold text-memoir-blue">Et j'ai crié – Mémoire</h1>
          </div>

          <div className="w-32"></div> {/* Spacer pour centrer le titre */}
        </div>
      </div>

      {/* Alma Chat pleine hauteur */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full">
          <AlmaChat context={context} />
        </div>
      </div>
    </div>
  );
}

export default function AlmaPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-memoir-bg">
        <div className="animate-spin w-8 h-8 border-4 border-memoir-gold border-t-transparent rounded-full" />
      </div>
    }>
      <AlmaContent />
    </Suspense>
  );
}