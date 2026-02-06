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
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-fade-in mt-24">
            <span className="inline-block px-4 py-1.5 bg-memoir-blue/10 text-memoir-blue rounded-full text-xs font-bold tracking-widest uppercase border border-memoir-blue/20">
              Créer un mémorial numérique
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
      <section className="bg-white py-20 px-6 relative overflow-hidden" id="comment-ca-marche">
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
              { step: '1', title: 'Quel est votre projet ?', desc: 'Honorer une personne disparue, célébrer un vivant ou raconter un objet. Sélectionnez le format adapté à votre intention.', icon: null },
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
              Choisissez l’usage qui correspond à votre démarche.<br />
              Chaque espace est conçu avec la même attention et la même délicatesse.
            </p>
            <div className="w-24 h-1 bg-memoir-neon mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Carte 1 : Funéraire */}
            <div className="bg-white rounded-[32px] overflow-hidden flex flex-col text-left shadow-lg border border-white/20 relative group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/image-site4.png"
                  alt="Hommage funéraire"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-memoir-blue/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-4 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm">
                  <Flower2 className="w-6 h-6 text-memoir-blue" />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow pt-6">
                <h3 className="text-2xl font-serif italic text-memoir-blue mb-2">Hommage funéraire</h3>
                <p className="text-memoir-blue/60 text-sm mb-6 min-h-[40px]">Un espace de mémoire partagé pour honorer une personne disparue.</p>

                <div className="mb-6 w-full pt-6 border-t border-memoir-blue/5">
                  <p className="text-4xl font-bold text-memoir-blue mb-1">79€</p>
                  <p className="text-xs text-memoir-blue/40 uppercase tracking-wide">Plaque QR incluse • Hébergement 5 ans</p>
                </div>

                <ul className="w-full space-y-3 mb-8 flex-grow">
                  {["Questionnaire guidé (9 étapes)", "Génération IA personnalisée", "Jusqu'à 15 photos + musique", "Livre d'or illimité", "Contributions (5 personnes)", "Plaque QR élégante incluse"].map((feat, i) => (
                    <li key={i} className="flex gap-3 text-sm text-memoir-blue/70">
                      <CheckCircle className="w-4 h-4 text-memoir-gold flex-shrink-0" />
                      <span className="text-left">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/create?context=funeral" className="w-full py-4 text-center rounded-full bg-memoir-blue text-white font-bold shadow-lg hover:bg-memoir-blue/90 transition-all">Créer un hommage</Link>
              </div>
            </div>

            {/* Carte 2 : Vivant */}
            <div className="bg-white rounded-[32px] overflow-hidden flex flex-col text-left shadow-lg border border-memoir-gold/20 relative group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute top-4 right-4 z-10 bg-memoir-gold text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-md">Nouveau</div>

              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/photo-roman-kraft-unsplash.jpg"
                  alt="Récit de vie"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-memoir-gold/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-4 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm">
                  <BookOpen className="w-6 h-6 text-memoir-gold" />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow pt-6">
                <h3 className="text-2xl font-serif italic text-memoir-blue mb-2">Récit de vie vivant</h3>
                <p className="text-memoir-blue/60 text-sm mb-6 min-h-[40px]">Célébrer un parcours de vie dès maintenant, en famille ou entre ami·es.</p>

                <div className="mb-6 w-full pt-6 border-t border-memoir-gold/10">
                  <p className="text-4xl font-bold text-memoir-blue mb-1">79€</p>
                  <p className="text-xs text-memoir-blue/40 uppercase tracking-wide">Plaque QR incluse • Hébergement 5 ans</p>
                </div>

                <ul className="w-full space-y-3 mb-8 flex-grow">
                  {["Questionnaire guidé (9 étapes)", "Génération IA personnalisée", "Jusqu'à 15 photos + musique", "Cœurs et encouragements", "Contributions (5 personnes)", "Plaque QR pour cadre/lieu"].map((feat, i) => (
                    <li key={i} className="flex gap-3 text-sm text-memoir-blue/70">
                      <CheckCircle className="w-4 h-4 text-memoir-gold flex-shrink-0" />
                      <span className="text-left">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/create?context=living_story" className="w-full py-4 text-center rounded-full bg-memoir-gold text-white font-bold shadow-lg hover:bg-memoir-gold/90 transition-all">Démarrer un récit</Link>
              </div>
            </div>

            {/* Carte 3 : Objet */}
            <div className="bg-white rounded-[32px] overflow-hidden flex flex-col text-left shadow-lg border border-white/20 relative group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/marlon-corona-1tMc27CFUbA-unsplash.jpg"
                  alt="Mémoire d'objet"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-memoir-blue/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-4 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm">
                  <Armchair className="w-6 h-6 text-memoir-neon" />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow pt-6">
                <h3 className="text-2xl font-serif italic text-memoir-blue mb-2">Mémoire d'objet</h3>
                <p className="text-memoir-blue/60 text-sm mb-6 min-h-[40px]">Révélez ce qu’il représente, conservez son origine, transmettez son héritage.</p>

                <div className="mb-6 w-full pt-6 border-t border-memoir-blue/5">
                  <p className="text-4xl font-bold text-memoir-blue mb-1">15€</p>
                  <p className="text-xs text-memoir-blue/40 uppercase tracking-wide">Puce NFC incluse • Hébergement 5 ans</p>
                </div>

                <ul className="w-full space-y-3 mb-8 flex-grow">
                  {["Questionnaire simplifié", "Génération IA (sobre/narratif)", "Jusqu'à 5 photos", "Livre d'or pour témoignages", "Puce NFC anti-métal incluse", "Tarifs dégressifs (dès 3 objets)"].map((feat, i) => (
                    <li key={i} className="flex gap-3 text-sm text-memoir-blue/70">
                      <CheckCircle className="w-4 h-4 text-memoir-neon flex-shrink-0" />
                      <span className="text-left">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/create?context=object_memory" className="w-full py-4 text-center rounded-full bg-memoir-neon text-white font-bold shadow-lg hover:bg-white hover:text-memoir-neon border border-transparent hover:border-memoir-neon transition-all">Immortaliser un objet</Link>
              </div>
            </div>

          </div>
        </div>
      </section>





      {/* IA Alma */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-memoir-gold/20 to-memoir-neon/20 rounded-full blur-[100px]" />
            <div className="relative z-10 bg-white/80 backdrop-blur-xl p-8 rounded-[40px] border border-white/50 shadow-2xl skew-y-3">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-memoir-blue text-white rounded-full flex items-center justify-center font-serif italic text-xl">A</div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-memoir-blue/40 font-bold">L'Assistant</p>
                    <p className="font-serif text-xl text-memoir-blue">Alma</p>
                  </div>
                </div>
                <p className="text-lg font-serif italic text-memoir-blue/80">"Racontez-moi simplement ce qui vous vient. Je me charge de trouver les mots justes."</p>
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-memoir-gold rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <span className="inline-block px-4 py-1.5 bg-memoir-blue/5 text-memoir-blue rounded-full text-xs font-bold tracking-widest uppercase">Intelligence Artificielle</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-memoir-blue">Une IA au service de <br /><span className="text-memoir-gold">votre mémoire</span>.</h2>
            <p className="text-memoir-blue/60 text-lg leading-relaxed">
              Pas de page blanche intimidante. <strong>Alma</strong> vous guide pas à pas et compose un récit digne à partir de vos réponses.
              L'intelligence artificielle au service de l'authenticité humaine.
            </p>

            <div className="space-y-6">
              {[
                { title: "Trois tonalités possibles", desc: "Sobre et factuel, narratif et humain, ou poétique et sensible." },
                { title: "Respect absolu de vos mots", desc: "Aucune invention, aucun artifice. Seule votre vérité compte." },
                { title: "Vous validez avant publication", desc: "Relisez, ajustez, modifiez jusqu'à ce que ce soit juste." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-memoir-gold/10 flex items-center justify-center text-memoir-gold shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-memoir-blue">{item.title}</h4>
                    <p className="text-memoir-blue/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Du numérique au physique */}
      <section className="bg-memoir-bg py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image Side */}
          <div className="relative h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl skew-y-1 lg:order-2">
            <Image
              src="/marielle-ursua-wRrhYoqYIvM-unsplash.jpg"
              alt="Souvenir physique"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-memoir-blue/40 to-transparent" />
          </div>

          {/* Text Content Side */}
          <div className="space-y-12 lg:order-1 text-center lg:text-left">
            <div>
              <h2 className="text-memoir-blue text-3xl md:text-5xl font-serif italic uppercase tracking-wider mb-6">
                Du numérique <br /> <span className="text-memoir-gold">au physique</span><span className="text-memoir-neon">.</span>
              </h2>
              <p className="text-memoir-blue/60 text-xl font-light leading-relaxed">
                Un lien simple — puce NFC ou QR code — permet d’accéder à la mémoire là où cela fait sens.
                Retrouvez l'émotion d'un souvenir tangible.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 text-left">
              {/* Box Objet */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-memoir-blue/5 hover:border-memoir-neon/30 transition-all group flex items-start gap-6">
                <div className="w-14 h-14 bg-memoir-neon/10 text-memoir-neon rounded-2xl flex items-center justify-center text-3xl shrink-0">🏺</div>
                <div>
                  <h3 className="text-xl font-serif italic text-memoir-blue mb-2">Pour les objets</h3>
                  <p className="text-xs font-bold text-memoir-neon uppercase tracking-wide mb-3">Puce NFC discrète incluse</p>
                  <p className="text-sm text-memoir-blue/70 leading-relaxed mb-4">
                    Une puce invisible (Ø25mm) qui se colle sous l'objet. Il suffit d'approcher son téléphone pour lire son histoire.
                  </p>
                  <Link href="/supports-physiques" className="text-sm font-bold underline decoration-memoir-neon/30 hover:decoration-memoir-neon text-memoir-blue transition-all">En savoir plus</Link>
                </div>
              </div>

              {/* Box Personne */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-memoir-blue/5 hover:border-memoir-gold/30 transition-all group flex items-start gap-6">
                <div className="w-14 h-14 bg-memoir-gold/10 text-memoir-gold rounded-2xl flex items-center justify-center text-3xl shrink-0">👤</div>
                <div>
                  <h3 className="text-xl font-serif italic text-memoir-blue mb-2">Pour les personnes</h3>
                  <p className="text-xs font-bold text-memoir-gold uppercase tracking-wide mb-3">Plaque QR élégante incluse</p>
                  <p className="text-sm text-memoir-blue/70 leading-relaxed mb-4">
                    Une mini-plaque esthétique et résistante, à apposer sur un sépulture ou un lieu de mémoire.
                  </p>
                  <Link href="/supports-physiques" className="text-sm font-bold underline decoration-memoir-gold/30 hover:decoration-memoir-gold text-memoir-blue transition-all">En savoir plus</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Intimité */}
      <section className="bg-white py-24 px-6 border-t border-memoir-blue/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/3">
            <h3 className="text-memoir-gold text-sm font-bold tracking-[0.2em] uppercase mb-4">En Confiance</h3>
            <h4 className="text-memoir-blue text-3xl font-serif italic font-bold">Votre intimité est notre priorité.</h4>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              "Vous choisissez ce qui est visible ou non",
              "Vous décidez qui peut contribuer",
              "Vos données restent les vôtres",
              "Le droit à l’oubli est garanti"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-memoir-bg flex items-center justify-center shadow-sm text-memoir-blue shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <p className="text-memoir-blue font-medium text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À quoi ressemble un espace de mémoire ? */}


      {/* Du numérique au physique (Supports) */}


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