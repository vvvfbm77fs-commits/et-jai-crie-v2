'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { Flower2, BookOpen, Armchair, ArrowRight, PenTool, Share2, Box, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Helper function for card styles
  const getCardStyle = (id: string) => {
    const isActive = activeCard === id;
    const baseStyle = "flex flex-col p-8 rounded-2xl transition-all duration-500 group relative overflow-hidden cursor-pointer h-full";

    if (isActive) {
      if (id === 'funeral') return `${baseStyle} bg-gradient-to-br from-[#1a1a2e] to-[#16213e] shadow-[0_0_30px_rgba(100,100,255,0.2)] scale-105 border-white/20`;
      if (id === 'living') return `${baseStyle} bg-gradient-to-br from-[#C9A24D] to-[#E1C97A] text-memoir-blue shadow-[0_0_30px_rgba(201,162,77,0.4)] scale-105 border-white/20`;
      if (id === 'object') return `${baseStyle} bg-gradient-to-br from-[#EE135D] to-[#C90F4D] shadow-[0_0_30px_rgba(238,19,93,0.4)] scale-105 border-white/20`;
    }

    // Default Glassmorphism with Theme-specific Hover Border
    let hoverBorder = "hover:border-memoir-blue/30";
    if (id === 'living') hoverBorder = "hover:border-memoir-gold/30";
    if (id === 'object') hoverBorder = "hover:border-memoir-neon/30";

    return `${baseStyle} bg-white/5 backdrop-blur-sm border border-white/10 ${hoverBorder} hover:bg-white/10`;
  };

  return (
    <div className="min-h-screen bg-memoir-bg flex flex-col font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-memoir-bg">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-memoir-gold/10 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[100px] mix-blend-multiply animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-fade-in">
            <span className="inline-block px-4 py-1.5 bg-memoir-gold/10 text-memoir-gold rounded-full text-xs font-bold tracking-widest uppercase border border-memoir-gold/20">
              Mémoire & Rayonnement
            </span>

            <h1 className="text-memoir-blue text-5xl md:text-7xl font-serif italic font-semibold leading-[1.1] drop-shadow-sm">
              Chaque souvenir <br className="hidden lg:block" />
              <span className="text-memoir-gold">est une lumière</span>
              <span className="text-memoir-neon">.</span>
            </h1>

            <p className="text-memoir-blue/70 text-lg md:text-xl font-serif italic tracking-wide leading-relaxed max-w-lg">
              Créez un espace en ligne unique pour célébrer une vie, raconter une histoire ou préserver la mémoire d’un objet précieux.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link href="#usages" className="bg-memoir-blue text-white px-8 py-4 rounded-full font-medium shadow-xl hover:bg-memoir-blue/90 hover:scale-105 transition-all">
                Démarrer une création
              </Link>
              <Link href="/exemple" className="bg-white/50 backdrop-blur-sm text-memoir-blue border border-memoir-blue/20 px-8 py-4 rounded-full font-medium hover:bg-white transition-all">
                Découvrir un exemple
              </Link>
            </div>

            <div className="flex items-center gap-3 pt-6 animate-fade-in delay-200">
              <span className="text-2xl">💡</span>
              <p className="text-memoir-blue/60 text-sm font-medium italic max-w-md text-left">
                Accompagné·e par <strong className="text-memoir-gold">Alma</strong>, une IA respectueuse qui transforme vos réponses en récit au ton juste.
              </p>
            </div>


          </div>

          {/* Image Storytelling */}
          <div className="order-1 lg:order-2 relative h-[500px] md:h-[650px] w-full animate-slide-up">
            <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
              <Image
                src="/hero-path.jpg"
                alt="Chemin vers la lumière"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />

              {/* Floating Card Detail */}
              <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg transform translate-y-4 hover:translate-y-0 transition-transform">
                <p className="font-serif italic text-white text-lg drop-shadow-md">
                  "C'est dans ces petits détails que réside l'éternité."
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-memoir-neon/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-memoir-gold/20 rounded-full blur-2xl animate-pulse delay-700" />
          </div>

        </div>
      </section>

      {/* Accompagnement / Comment ça marche */}
      <section className="bg-white py-32 px-6 relative overflow-hidden" id="comment-ca-marche">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-memoir-neon/20 to-transparent" />

        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-memoir-blue text-3xl md:text-5xl font-serif italic uppercase tracking-wider">
              Un accompagnement <br /> <span className="text-memoir-gold">en toute simplicité</span><span className="text-memoir-neon">.</span>
            </h2>
            <p className="text-memoir-blue/50 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Laissez-vous guider par un parcours clair, intuitif et sécurisé.
              Pensé pour vous permettre d’écrire, de rassembler et de transmettre, en toute sérénité.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
            {[
              { step: '1', title: 'Choisissez l’usage', desc: 'Funéraire, vivant ou objet : commencez là où vous êtes.', icon: null },
              { step: '2', title: 'Racontez avec Alma', desc: <>Répondez à quelques questions simples. <strong className="text-memoir-blue font-bold">Alma, notre assistante IA</strong>, transforme vos réponses en un récit au ton juste : sobre, narratif ou poétique. Vous choisissez le style. Vous validez le résultat.<br /><br />Aucune invention, seulement votre vérité.</>, icon: <PenTool className="w-6 h-6" /> },
              { step: '3', title: 'Partagez', desc: 'Invitez vos proches à enrichir cet espace avec leurs souvenirs, leurs mots, leurs images.', icon: <Share2 className="w-6 h-6" /> },
              { step: '4', title: 'Ancrez', desc: 'Reliez le numérique au monde physique grâce à des supports discrets : puce NFC ou plaque QR personnalisée.', icon: <Box className="w-6 h-6" /> },
            ].map((item, idx) => (
              <div key={idx} className="relative group text-center md:text-left p-6 rounded-3xl hover:bg-memoir-bg/50 transition-colors duration-500">
                <div className="w-16 h-16 mb-6 bg-memoir-bg rounded-2xl flex items-center justify-center text-memoir-gold shadow-sm group-hover:bg-memoir-gold group-hover:text-white transition-all duration-500 scale-105 group-hover:-rotate-6 mx-auto md:mx-0">
                  {item.icon ? item.icon : <span className="font-serif text-2xl font-bold">{item.step}</span>}
                </div>
                <h3 className="text-memoir-blue text-xl font-bold mb-3">{item.step} — {item.title}</h3>
                <p className="text-memoir-blue/60 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* En Confiance Merged Block */}
          <div className="bg-memoir-bg rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-memoir-gold/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/3 text-center md:text-left space-y-4">
                <h3 className="text-memoir-gold text-sm font-bold tracking-[0.2em] uppercase">En Confiance</h3>
                <h4 className="text-memoir-blue text-2xl font-serif italic font-bold">Votre intimité est notre priorité.</h4>
              </div>

              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  "Vous choisissez ce qui est visible ou non",
                  "Vous décidez qui peut contribuer",
                  "Vos données restent les vôtres",
                  "Le droit à l’oubli est garanti"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm text-memoir-green-light shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-memoir-gold" />
                    </div>
                    <p className="text-memoir-blue font-medium text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Usages / Quel lien souhaitez-vous préserver */}
      <section className="relative bg-memoir-bg py-32 px-6 text-center" id="usages">
        <div className="relative z-10 max-w-7xl mx-auto space-y-20">

          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-memoir-blue text-3xl md:text-5xl font-serif italic uppercase tracking-wider">
              Quel lien souhaitez-vous préserver <span className="text-memoir-neon">?</span>
            </h2>
            <p className="text-memoir-blue/60 text-lg md:text-xl font-light leading-relaxed">
              Choisissez l’usage qui correspond à votre démarche.
              <br />Chaque espace est conçu avec la même attention et la même délicatesse.
            </p>
            <div className="w-24 h-1 bg-memoir-neon mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Carte 1 : Funéraire */}
            <div
              className={getCardStyle('funeral')}
              onMouseEnter={() => setActiveCard('funeral')}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 mb-8 flex items-center justify-center rounded-2xl transition-all duration-500 ${activeCard === 'funeral' ? 'bg-white/20 text-white' : 'bg-memoir-blue/5 border border-memoir-blue/10 text-memoir-blue'}`}>
                  <Flower2 className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-serif italic mb-4 transition-colors ${activeCard === 'funeral' ? 'text-white' : 'text-memoir-blue group-hover:text-memoir-neon'}`}>
                  Hommage funéraire
                </h3>
                <p className={`text-base mb-10 leading-relaxed transition-colors flex-grow ${activeCard === 'funeral' ? 'text-white/80' : 'text-memoir-blue/60'}`}>
                  Un espace de mémoire partagé pour honorer une personne disparue
                  et rassembler les messages, souvenirs et témoignages de ses proches.
                </p>
                <Link
                  href="/create?context=funeral"
                  className={`w-full py-4 px-6 rounded-2xl border transition-all text-center text-sm font-bold flex items-center justify-center gap-2 ${activeCard === 'funeral' ? 'bg-white text-memoir-blue border-white shadow-xl' : 'border-memoir-blue/10 text-memoir-blue hover:bg-memoir-blue hover:text-white'}`}
                >
                  Créer un hommage <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Carte 2 : Vivant */}
            <div
              className={getCardStyle('living')}
              onMouseEnter={() => setActiveCard('living')}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 mb-8 flex items-center justify-center rounded-2xl transition-all duration-500 ${activeCard === 'living' ? 'bg-memoir-blue/10 text-memoir-blue' : 'bg-memoir-gold/10 border border-memoir-gold/20 text-memoir-gold'}`}>
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-serif italic mb-4 transition-colors ${activeCard === 'living' ? 'text-memoir-blue' : 'text-memoir-blue group-hover:text-memoir-neon'}`}>
                  Récit de vie vivant
                </h3>
                <p className={`text-base mb-10 leading-relaxed transition-colors flex-grow ${activeCard === 'living' ? 'text-memoir-blue/80' : 'text-memoir-blue/60'}`}>
                  Transmettre une histoire, partager des valeurs,
                  célébrer un parcours de vie dès maintenant, en famille ou entre ami·es.
                </p>
                <Link
                  href="/create?context=living_story"
                  className={`w-full py-4 px-6 rounded-2xl border transition-all text-center text-sm font-bold flex items-center justify-center gap-2 ${activeCard === 'living' ? 'bg-memoir-blue text-white shadow-2xl' : 'border-memoir-gold/20 text-memoir-gold hover:bg-memoir-gold hover:text-white'}`}
                >
                  Démarrer un récit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Carte 3 : Objet */}
            <div
              className={getCardStyle('object')}
              onMouseEnter={() => setActiveCard('object')}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 mb-8 flex items-center justify-center rounded-2xl transition-all duration-500 ${activeCard === 'object' ? 'bg-white/20 text-white' : 'bg-memoir-neon/10 border border-memoir-neon/20 text-memoir-neon'}`}>
                  <Armchair className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-serif italic mb-4 transition-colors ${activeCard === 'object' ? 'text-white' : 'text-memoir-blue group-hover:text-memoir-neon'}`}>
                  Mémoire d'objet
                </h3>
                <p className={`text-base mb-10 leading-relaxed transition-colors flex-grow ${activeCard === 'object' ? 'text-white/80' : 'text-memoir-blue/60'}`}>
                  Chaque objet a une histoire.
                  Révélez ce qu’il représente, conservez son origine, transmettez son héritage.
                </p>
                <Link
                  href="/create?context=object_memory"
                  className={`w-full py-4 px-6 rounded-2xl border transition-all text-center text-sm font-bold flex items-center justify-center gap-2 ${activeCard === 'object' ? 'bg-white text-memoir-blue border-white shadow-xl' : 'border-memoir-blue/10 text-memoir-blue hover:bg-memoir-blue hover:text-white'}`}
                >
                  Immortaliser un objet <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* À quoi ressemble un espace de mémoire ? */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-memoir-blue text-3xl md:text-5xl font-serif italic uppercase tracking-wider">
            À quoi ressemble un espace de mémoire <span className="text-memoir-neon">?</span>
          </h2>
          <p className="text-memoir-blue/60 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Un espace simple et sensible, composé de mots, de photos, parfois de sons.
            Rien de superflu. Juste l’essentiel.
          </p>
          <div>
            <Link href="/exemple" className="inline-flex items-center gap-2 bg-memoir-blue text-white px-10 py-4 rounded-full font-medium hover:bg-memoir-blue/90 shadow-lg hover:shadow-xl transition-all">
              Voir un exemple <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Du numérique au physique (Supports) */}
      <section className="bg-memoir-bg py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-memoir-gold/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl translate-y-8">
                <Image
                  src="/image-site1.png"
                  alt="Mémorial numérique"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/image-site5.png"
                  alt="Plaque commémorative"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
            <h2 className="text-memoir-blue text-3xl md:text-5xl font-serif italic uppercase tracking-wider">
              Du numérique <br /> <span className="text-memoir-gold">au physique</span><span className="text-memoir-neon">.</span>
            </h2>
            <div className="space-y-6 text-memoir-blue/60 text-lg font-light leading-relaxed">
              <p>
                Votre espace mémoire peut aussi exister ailleurs.
                Sur un objet, un meuble, un lieu, une plaque, un détail.
              </p>
              <p>
                Un lien, un QR code ou une puce NFC permet d’y accéder simplement,
                là où cela fait sens.
              </p>
            </div>

            <div className="pt-4">
              <Link href="/supports-physiques" className="text-memoir-blue border-b border-memoir-blue pb-1 hover:text-memoir-gold hover:border-memoir-gold transition-colors font-medium">
                Découvrir nos supports gravés
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Espace Pro */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto bg-memoir-blue rounded-[40px] p-10 md:p-20 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C6A65E 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-memoir-gold/20 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-12">
            <h2 className="text-white text-3xl md:text-5xl font-serif italic uppercase tracking-wider">
              Vous êtes un·e professionnel·le <span className="text-memoir-neon">?</span>
            </h2>

            <p className="text-white/80 text-xl font-light leading-relaxed">
              Assureur·es, pompes funèbres, artisan·es, antiquaires, collectivités, entreprises :
              nous concevons des solutions sur mesure pour enrichir votre offre
              et accompagner vos client·es, salarié·es ou bénéficiaires.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                "Cadeaux d’entreprise à dimension artisanale et mémorielle",
                "Transmission et mémoire des équipes, des agent·es et des métiers invisibilisés",
                "Valorisation de parcours professionnels, de savoir-faire et d’histoires collectives",
                "Accompagnement des familles et des proches dans des moments sensibles"
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <CheckCircle className="w-6 h-6 text-memoir-gold flex-shrink-0" />
                  <span className="text-white/90 text-sm font-light">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Link href="/partenaires" className="inline-block border text-memoir-gold border-memoir-gold px-12 py-4 rounded-full hover:bg-memoir-gold hover:text-memoir-blue transition-all font-bold tracking-wide">
                Consulter l’Espace Pro
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Footer is imported separately in layout or here if strictly needed by design */}
      <footer className="bg-white py-20 px-6 border-t border-memoir-neon/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
          <h4 className="text-memoir-blue font-serif italic text-2xl font-bold">COMMUN VIVANT</h4>
          <div className="w-12 h-1 bg-memoir-neon rounded-full" />
          <p className="text-memoir-blue/60 text-lg font-light max-w-md mx-auto">
            Un outil simple pour écrire une mémoire à plusieurs,
            sans pression, sans modèle imposé.
          </p>

          <nav className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-memoir-blue/40 uppercase tracking-widest font-medium">
            <Link href="/mentions-legales" className="hover:text-memoir-gold transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-memoir-gold transition-colors">Confidentialité</Link>
            <Link href="mailto:contact@etjaicrie.fr" className="hover:text-memoir-gold transition-colors">Contact</Link>
          </nav>

          <p className="text-xs text-memoir-blue/20 pt-8">© {new Date().getFullYear()} Commun Vivant</p>
        </div>
      </footer>
    </div>
  );
}