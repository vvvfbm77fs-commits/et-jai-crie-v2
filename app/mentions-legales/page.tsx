import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-memoir-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-memoir-gold hover:text-memoir-gold/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Retour</span>
        </Link>

        <h1 className="text-4xl font-bold text-memoir-blue mb-8">
          Mentions légales
        </h1>

        <div className="prose prose-lg max-w-none text-memoir-blue/80 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Éditeur du site</h2>
            <p><strong>Nom du projet :</strong> Et j'ai crié</p>
            <p><strong>Éditeur du site :</strong> Et j'ai crié</p>
            <p><strong>Responsable de la publication et du traitement des données :</strong> Et j'ai crié</p>
            <p><strong>Contact :</strong> <a href="mailto:contact@etjaicrie.fr" className="text-memoir-gold hover:underline">contact@etjaicrie.fr</a></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">À propos du projet</h2>
            <p>
              Le site Et j'ai crié propose une expérience narrative et mémorielle permettant de générer, 
              conserver et, le cas échéant, publier des textes, images ou contenus liés à la mémoire 
              d'une personne décédée.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Hébergement</h2>
            <p>
              Le site est hébergé par un prestataire situé dans l'Union européenne ou dans un pays 
              offrant un niveau de protection adéquat au sens du RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, design) est protégé par 
              le droit d'auteur. Toute reproduction, même partielle, est soumise à autorisation préalable.
            </p>
            <p>
              Les contenus mémoriels créés par les familles leur appartiennent. Et j'ai crié agit comme 
              outil de médiation et de création, sans revendiquer de droits sur ces contenus personnels.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
