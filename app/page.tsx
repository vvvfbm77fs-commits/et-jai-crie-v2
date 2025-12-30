import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Heart, Feather } from 'lucide-react';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-memoir-blue">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo.jpg"
              alt="Et j'ai crié"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Et j'ai crié
          </h1>
          <p className="text-xl md:text-2xl text-memoir-gold mb-4 font-light italic">
            Marque sensible et éclairée
          </p>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-12">
            Un mémorial pour honorer une vie, transmettre l'essentiel,
            et créer un texte de mémoire avec dignité et humanité.
          </p>
          <Link
            href="/questionnaire"
            className="inline-block bg-memoir-gold text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-memoir-gold/90 transition-colors"
          >
            Créer un mémorial
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-memoir-gold/10 mb-4">
                <BookOpen className="w-8 h-8 text-memoir-gold" />
              </div>
              <h3 className="text-xl font-semibold text-memoir-blue mb-3">
                Mémorial guidé
              </h3>
              <p className="text-memoir-blue/70">
                Des questions pensées pour capter l'essentiel : caractère, valeurs,
                liens, passions, médias et moments qui ont compté.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-memoir-gold/10 mb-4">
                <Feather className="w-8 h-8 text-memoir-gold" />
              </div>
              <h3 className="text-xl font-semibold text-memoir-blue mb-3">
                Trois styles d'écriture
              </h3>
              <p className="text-memoir-blue/70">
                Choisissez le ton qui vous ressemble : sobre et factuel,
                narratif et humain, ou poétique et sensible.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-memoir-gold/10 mb-4">
                <Heart className="w-8 h-8 text-memoir-gold" />
              </div>
              <h3 className="text-xl font-semibold text-memoir-blue mb-3">
                Avec dignité
              </h3>
              <p className="text-memoir-blue/70">
                Un texte écrit avec sobriété et humanité, qui honore la mémoire
                sans tomber dans le cliché ou l'excès.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 bg-memoir-bg">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl italic text-memoir-blue/80 leading-relaxed">
            "Ce qui demeure, ce sont ces présences invisibles
            qui continuent de nous accompagner."
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-memoir-blue mb-6">
            Prêt à transmettre ?
          </h2>
          <p className="text-memoir-blue/70 mb-8 text-lg">
            Le mémorial prend environ 20-30 minutes à compléter.
            Vous pouvez le sauvegarder et y revenir à tout moment.
          </p>
          <Link
            href="/questionnaire"
            className="inline-block bg-memoir-gold text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-memoir-gold/90 transition-colors"
          >
            Créer mon mémorial
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
