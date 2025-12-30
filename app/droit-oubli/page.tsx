import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';

export default function DroitOubli() {
  return (
    <main className="min-h-screen bg-memoir-bg py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-memoir-gold hover:text-memoir-gold/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Retour</span>
        </Link>

        <h1 className="text-4xl font-bold text-memoir-blue mb-8">
          Droit à l'oubli
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <p className="text-memoir-blue/80 mb-6 text-lg leading-relaxed">
            Vous souhaitez supprimer définitivement un mémorial ou demander la dépublication d'un contenu ? 
            Nous comprenons que cette décision est importante et sensible.
          </p>

          <div className="bg-memoir-blue/5 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-memoir-blue mb-3">
              Ce que vous pouvez demander :
            </h2>
            <ul className="space-y-2 text-memoir-blue/80">
              <li className="flex items-start gap-2">
                <span className="text-memoir-gold mt-1">•</span>
                <span>La suppression totale des données d'un mémorial</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memoir-gold mt-1">•</span>
                <span>La dépublication d'un contenu (le mémorial reste en privé)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memoir-gold mt-1">•</span>
                <span>La rectification d'informations inexactes</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-memoir-blue/10 pt-6">
            <h2 className="text-xl font-bold text-memoir-blue mb-4">
              Comment faire votre demande ?
            </h2>
            
            <div className="bg-memoir-gold/10 rounded-lg p-6 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-6 h-6 text-memoir-gold" />
                <p className="text-lg font-medium text-memoir-blue">
                  Envoyez-nous un email
                </p>
              </div>
              <a 
                href="mailto:contact@etjaicrie.fr?subject=Demande de suppression - Droit à l'oubli"
                className="text-memoir-gold hover:underline text-lg font-medium"
              >
                contact@etjaicrie.fr
              </a>
            </div>

            <div className="text-memoir-blue/70 text-sm space-y-2">
              <p><strong>Dans votre email, merci d'indiquer :</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Le prénom et nom de la personne concernée</li>
                <li>• L'URL du mémorial (si publié)</li>
                <li>• Votre demande précise (suppression, dépublication, rectification)</li>
                <li>• Votre lien avec la personne (famille, ayant droit)</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-memoir-blue/10">
            <p className="text-memoir-blue/60 text-sm">
              Votre demande sera traitée dans un délai raisonnable. Nous vous confirmerons la prise 
              en compte et l'exécution de votre demande par email.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/confidentialite"
            className="text-memoir-gold hover:underline text-sm"
          >
            Consulter la politique de confidentialité complète
          </Link>
        </div>
      </div>
    </main>
  );
}
