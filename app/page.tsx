'use client';


import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {



  return (
    <div className="min-h-screen bg-memoir-blue flex flex-col font-sans">

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[500px] h-[60vh] md:h-[600px] flex items-center justify-center overflow-hidden bg-memoir-blue">
        {/* Animated Background - Photo Vivante */}
        <div className="absolute inset-0 z-0 animate-alive overflow-hidden">
          <Image
            src="/image-site4.png"
            alt="Fleurs au soleil"
            fill
            className="object-cover"
            priority
          />
          {/* Effet de lumière/Soleil */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 animate-sunlight" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-memoir-blue/40 mix-blend-multiply z-10"></div>

        <div className="relative z-20 text-center px-6 w-full max-w-5xl mx-auto">
          <p className="text-memoir-gold text-lg md:text-2xl mb-6 font-light italic tracking-wide animate-fade-in">
            Une interface pour se souvenir
          </p>
          <h1 className="text-memoir-light text-4xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-lg font-sans animate-slide-up">
            Un mémorial, pour de vrai.
          </h1>
        </div>
      </section>




      {/* Section Image + Texte */}
      <section className="bg-memoir-blue py-16 md:py-24 px-6" id="apropos">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[450px_1fr] gap-16 items-center">
            {/* Image */}
            <div className="flex items-start justify-center order-2 md:order-1 relative">
              <div className="relative w-full max-w-[400px] h-[500px]">
                <Image
                  src="/image-site2.png"
                  alt="Souvenirs"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>

            {/* Texte */}
            <div className="space-y-10 md:space-y-14 order-1 md:order-2">
              <h2 className="text-memoir-gold text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-center md:text-left font-serif italic">
                À votre rythme, à son image
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <h3 className="text-memoir-gold text-2xl mb-4 font-sans">
                    Faites vivre la mémoire
                  </h3>
                  <p className="text-memoir-light/80 text-lg italic mb-6 leading-relaxed">
                    Photos, textes, musique : partagez ce qui compte vraiment.
                  </p>
                  <button className="text-memoir-light underline hover:text-memoir-gold transition-colors text-base">
                    Notre accompagnement
                  </button>
                </div>

                <div>
                  <h3 className="text-memoir-gold text-2xl mb-4 font-sans">
                    Besoin d'aide ?
                  </h3>
                  <p className="text-memoir-light/80 text-lg italic mb-6 leading-relaxed">
                    Nos conseillers sont là pour vous accompagner.
                  </p>
                  <button className="text-memoir-light underline hover:text-memoir-gold transition-colors text-base">
                    Prendre rendez-vous
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-memoir-gold/30 w-full"></div>

      {/* Section 3 colonnes */}
      <section className="bg-memoir-blue/95 py-20 px-6" id="services">
        <h2 className="text-memoir-gold text-4xl md:text-6xl text-center mb-16 font-normal leading-tight font-serif italic">
          Créez l'hommage que vous souhaitez lui rendre
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Carte 1 - Alma */}
          <div className="flex flex-col items-center bg-white/5 border border-memoir-gold/20 p-8 rounded-2xl hover:-translate-y-2 hover:shadow-2xl hover:border-memoir-gold/50 transition-all duration-300 group">
            <div className="w-56 h-56 mb-8 relative flex items-center justify-center p-6 bg-memoir-blue/50 rounded-full border border-memoir-gold/30 group-hover:border-memoir-gold transition-colors">
              <img
                src="/alma-icon-transparent.png"
                alt="Alma"
                className="w-40 h-40 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <h3 className="text-memoir-gold text-2xl md:text-3xl mb-4 font-medium text-center font-sans">
              Avec Alma
            </h3>
            <p className="text-memoir-light/80 text-center italic text-lg leading-relaxed mb-8 flex-grow">
              Une intelligence artificielle bienveillante qui vous guide pas à pas.
            </p>
            <Link
              href="/alma"
              className="text-memoir-gold border border-memoir-gold px-8 py-3 rounded hover:bg-memoir-gold hover:text-memoir-blue transition-all text-lg font-sans"
            >
              Découvrir Alma
            </Link>
          </div>

          {/* Carte 2 - Questionnaire */}
          <div className="flex flex-col items-center bg-white/5 border border-memoir-gold/20 p-8 rounded-2xl hover:-translate-y-2 hover:shadow-2xl hover:border-memoir-gold/50 transition-all duration-300 group">
            <div className="w-56 h-56 mb-8 relative flex items-center justify-center p-6 bg-memoir-blue/50 rounded-full border border-memoir-gold/30 group-hover:border-memoir-gold transition-colors">
              <img
                src="/questionnaire-icon-transparent.png"
                alt="Questionnaire"
                className="w-40 h-40 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <h3 className="text-memoir-gold text-2xl md:text-3xl mb-4 font-medium text-center font-sans">
              En autonomie
            </h3>
            <p className="text-memoir-light/80 text-center italic text-lg leading-relaxed mb-8 flex-grow">
              Répondez à un questionnaire structuré pour créer votre mémorial.
            </p>
            <Link
              href="/questionnaire"
              className="text-memoir-gold border border-memoir-gold px-8 py-3 rounded hover:bg-memoir-gold hover:text-memoir-blue transition-all text-lg font-sans"
            >
              Commencer
            </Link>
          </div>

          {/* Carte 3 - Liberté */}
          <div className="flex flex-col items-center bg-white/5 border border-memoir-gold/20 p-8 rounded-2xl hover:-translate-y-2 hover:shadow-2xl hover:border-memoir-gold/50 transition-all duration-300 group">
            <div className="w-56 h-56 mb-8 relative flex items-center justify-center p-6 bg-memoir-blue/50 rounded-full border border-memoir-gold/30 group-hover:border-memoir-gold transition-colors">
              <img
                src="/liberte-icon-transparent.png"
                alt="Liberté"
                className="w-40 h-40 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <h3 className="text-memoir-gold text-2xl md:text-3xl mb-4 font-medium text-center font-sans">
              Toujours modifiable
            </h3>
            <p className="text-memoir-light/80 text-center italic text-lg leading-relaxed mb-8 flex-grow">
              Vous gardez le contrôle total. Modifiez, complétez ou supprimez.
            </p>
            <Link
              href="/dashboard/new"
              className="text-memoir-gold border border-memoir-gold px-8 py-3 rounded hover:bg-memoir-gold hover:text-memoir-blue transition-all text-lg font-sans"
            >
              Créer un espace
            </Link>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="h-px bg-memoir-gold/30 mt-20"></div>
      </section>


      {/* Section Modèles */}
      <section className="bg-memoir-blue py-16 md:py-24 px-6" id="modeles">
        <h2 className="text-memoir-gold text-4xl md:text-5xl text-center mb-4 font-normal font-serif italic">
          Un mémorial accessible partout
        </h2>
        <p className="text-memoir-light/80 text-center mb-16 md:mb-20 italic text-base md:text-lg px-4">
          Créez votre mémorial en ligne, puis commandez une plaque avec QR code ou puce NFC
        </p>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-[350px_350px_1fr] gap-12 items-center lg:items-center">
            {/* Image 1 */}
            <div className="flex items-center justify-center w-full max-w-[350px]">
              <div className="relative w-full h-[300px] md:h-[450px]">
                <Image
                  src="/image-site1.png"
                  alt="Mémorial numérique"
                  fill
                  className="object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Image 2 */}
            <div className="flex items-center justify-center w-full max-w-[350px]">
              <div className="relative w-full h-[300px] md:h-[450px]">
                <Image
                  src="/image-site5.png"
                  alt="Plaque commémorative"
                  fill
                  className="object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Texte */}
            <div className="flex flex-col justify-center px-4 lg:px-8 text-center lg:text-left h-full py-8 lg:py-0">
              <h3 className="text-memoir-gold text-2xl md:text-3xl mb-6 font-light font-sans">
                Du numérique au physique
              </h3>
              <p className="text-memoir-light/80 text-lg italic mb-10 leading-relaxed">
                Après avoir créé votre mémorial en ligne, commandez une plaque gravée avec QR code ou puce NFC. Un simple scan donnera accès au mémorial complet.
              </p>
              <div className="flex justify-center lg:justify-start">
                <button
                  className="bg-memoir-gold text-memoir-blue py-3 md:py-4 px-10 rounded-lg text-lg font-medium hover:bg-memoir-gold/80 transition-colors w-fit shadow-lg font-sans"
                >
                  Voir les plaques
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20 md:mt-24">
          <div className="h-px bg-memoir-gold/30 mb-12"></div>
          <h3 className="text-memoir-gold text-2xl md:text-3xl text-center font-normal font-serif italic">
            Nos formats de plaques
          </h3>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-memoir-gold/30 py-12 px-6 bg-memoir-blue mt-auto" id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className="text-center md:text-left">
              <p className="font-medium text-memoir-gold text-xl mb-1 font-sans">
                Et j'ai crié
              </p>
              <p className="text-memoir-light/60 text-sm">Marque sensible et éclairée</p>
            </div>

            <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <a href="/mentions-legales" className="text-memoir-light/60 hover:text-memoir-gold transition-colors text-base">
                Mentions légales
              </a>
              <a href="/confidentialite" className="text-memoir-light/60 hover:text-memoir-gold transition-colors text-base">
                Confidentialité
              </a>
              <a href="/droit-oubli" className="text-memoir-light/60 hover:text-memoir-gold transition-colors text-base">
                Droit à l'oubli
              </a>
              <a href="mailto:contact@etjaicrie.fr" className="text-memoir-light/60 hover:text-memoir-gold transition-colors text-base">
                Contact
              </a>
            </nav>
          </div>

          <div className="text-center pt-6 border-t border-memoir-gold/20 text-memoir-light/50 text-xs">
            <p>© {new Date().getFullYear()} Et j'ai crié • Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
}