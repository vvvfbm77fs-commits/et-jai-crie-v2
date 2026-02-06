'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import { Heart, Clock, Box, Users, PenTool, Share2, Anchor, Mail, ArrowRight, XCircle, CheckCircle } from 'lucide-react';

export default function AproposPage() {
    return (
        <div className="min-h-screen bg-memoir-bg flex flex-col font-sans text-memoir-blue">
            <Header />

            <main className="flex-grow w-full">

                {/* Hero Section */}
                <section className="relative py-24 px-6 overflow-hidden">
                    {/* Pink/Neon Blob added for 'gai' effect */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-memoir-neon/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-memoir-blue/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                    <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                        <span className="inline-block px-4 py-1.5 bg-memoir-gold/10 text-memoir-gold rounded-full text-xs font-bold tracking-widest uppercase border border-memoir-gold/20">
                            L'histoire de commun vivant
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif italic text-memoir-blue">
                            Pour ceux qui veulent <br />
                            <span className="text-memoir-gold">transmettre ce qui compte</span>
                            <span className="text-memoir-neon">.</span>
                        </h1>
                    </div>
                </section>

                {/* Grid Situations */}
                <section className="px-6 pb-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Heart,
                                text: "Vous avez perdu quelqu'un et vous ne savez pas comment rassembler les souvenirs.",
                                color: "text-memoir-neon"
                            },
                            {
                                icon: Clock,
                                text: "Vous avez un parent âgé et vous voulez recueillir son histoire avant qu'il ne soit trop tard.",
                                color: "text-memoir-gold"
                            },
                            {
                                icon: Box,
                                text: "Vous videz un appartement et chaque objet vous raconte quelque chose que vous ne voulez pas perdre.",
                                color: "text-memoir-blue"
                            },
                            {
                                icon: Users,
                                text: "Vous côtoyez des gens extraordinaires — des invisibles — dont personne ne racontera jamais l'histoire.",
                                color: "text-memoir-blue"
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-memoir-blue/5 hover:shadow-md transition-all group hover:border-memoir-neon/20">
                                <item.icon className={`w-8 h-8 mb-4 ${item.color}`} />
                                <p className="text-memoir-blue/80 leading-relaxed font-medium">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <h3 className="text-2xl font-serif italic text-memoir-blue">
                            Commun Vivant existe pour vous
                            <span className="text-memoir-neon">.</span>
                        </h3>
                    </div>
                </section>

                {/* Comment c'est né */}
                <section className="py-20 px-6 bg-white relative">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl font-serif italic text-memoir-blue mb-8">
                            Comment c'est né
                            <span className="text-memoir-neon">.</span>
                        </h2>

                        <div className="prose prose-lg text-memoir-blue/70">
                            <p>
                                En 2022, j'ai perdu mon père. Quelqu'un de bien, qui avait fait beaucoup de choses.
                                Ses amis lointains n'ont pas pu venir aux obsèques. J'aurais voulu créer un espace où ils pourraient
                                témoigner, être avec nous, même de loin.
                            </p>
                            <p className="font-medium text-memoir-blue">
                                Mais dans le chaos du deuil, je n'ai rien fait. Et j'ai eu peur que sa mémoire s'efface.
                            </p>
                            <p>
                                Trois ans plus tard, en 2025, après un burn-out, je me suis mise à retaper des meubles.
                                En les touchant, je me racontais leur histoire. D'où ils venaient, qui les avait fabriqués,
                                combien de mains les avaient portés.
                            </p>
                            <p>
                                Un ami m'a dit : "Tu devrais écrire ces histoires."
                            </p>
                            <div className="bg-memoir-bg p-8 rounded-2xl border-l-4 border-memoir-gold my-8 italic text-memoir-blue font-serif text-xl border-y border-r border-memoir-blue/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-memoir-neon/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                                <span className="relative z-10">
                                    "J'ai compris que les objets ont une mémoire, les personnes aussi.
                                    Et que cette mémoire mérite mieux qu'un post Facebook qui disparaît dans le flux."
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ce que ça offre */}
                <section className="py-20 px-6 bg-memoir-blue text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-memoir-gold/10 rounded-full blur-[120px] mix-blend-overlay" />

                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-serif italic mb-6">
                                Ce que Commun Vivant vous offre
                                <span className="text-memoir-neon">.</span>
                            </h2>
                            <p className="text-xl text-white/80 mb-8 font-light">Un espace digne pour transmettre ce qui compte.</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-white/40 line-through decoration-white/40 px-4 py-2 bg-white/5 rounded-full w-fit">
                                    <XCircle className="w-5 h-5 flex-shrink-0 text-memoir-neon opacity-70" />
                                    <span>Pas un CV</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/40 line-through decoration-white/40 px-4 py-2 bg-white/5 rounded-full w-fit">
                                    <XCircle className="w-5 h-5 flex-shrink-0 text-memoir-neon opacity-70" />
                                    <span>Pas un faire-part numérique</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/40 line-through decoration-white/40 px-4 py-2 bg-white/5 rounded-full w-fit">
                                    <XCircle className="w-5 h-5 flex-shrink-0 text-memoir-neon opacity-70" />
                                    <span>Pas un réseau social</span>
                                </div>
                            </div>

                            <Link href="/create" className="inline-flex items-center gap-2 bg-memoir-gold text-memoir-blue px-8 py-4 rounded-full font-bold hover:bg-white transition-all">
                                Commencer à transmettre <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="bg-memoir-gold text-memoir-blue w-8 h-8 rounded-full flex items-center justify-center text-sm">✓</span>
                                Un lieu où vous pouvez :
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    { icon: PenTool, text: "Raconter l'histoire d'une personne (vivante ou décédée) sans pression, sans modèle imposé" },
                                    { icon: Box, text: "Transmettre la mémoire d'un objet de famille avant qu'elle ne se perde" },
                                    { icon: Users, text: "Célébrer les invisibles — ceux qu'on ne voit pas mais qui comptent énormément" }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <item.icon className="w-6 h-6 text-memoir-gold flex-shrink-0 mt-1" />
                                        <span className="text-white/90 leading-relaxed">{item.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <p className="text-sm text-white/70 italic">
                                    <strong className="text-white not-italic">Avec l'aide d'Alma</strong>, notre assistante IA.
                                    Elle transforme vos réponses en un récit au ton juste. C'est votre vérité.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pourquoi le nom */}
                <section className="py-24 px-6 bg-memoir-bg">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <h2 className="text-3xl font-serif italic text-memoir-blue">
                            Pourquoi "Commun Vivant" <span className="text-memoir-neon">?</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-memoir-gold hover:text-memoir-neon transition-colors">
                                    <Share2 className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-memoir-blue">La mémoire se partage</h3>
                                <p className="text-sm text-memoir-blue/60">Elle n'appartient pas qu'à une seule personne. Elle vit entre nous.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-memoir-gold hover:text-memoir-neon transition-colors">
                                    <Heart className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-memoir-blue">Les disparus restent vivants</h3>
                                <p className="text-sm text-memoir-blue/60">Ils continuent d'exister dans les histoires qu'on raconte d'eux.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-memoir-gold hover:text-memoir-neon transition-colors">
                                    <Anchor className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-memoir-blue">Ce qui nous relie</h3>
                                <p className="text-sm text-memoir-blue/60">"Commun", c'est le lien. "Vivant", c'est ce qui continue malgré tout.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* À qui s'adresse... */}
                <section className="py-20 px-6 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-serif italic text-memoir-blue mb-12 text-center">
                            À qui s'adresse Commun Vivant <span className="text-memoir-neon">?</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "Aux familles en deuil", desc: "Qui veulent rassembler les témoignages et créer un espace de retrouvailles, même de loin." },
                                { title: "Aux vivants qui transmettent", desc: "Leur histoire avant qu'il ne soit trop tard. Pour un départ en retraite ou une transmission anticipée." },
                                { title: "À ceux qui vident un lieu", desc: "Et réalisent que chaque objet porte une mémoire qu'ils ne veulent pas perdre." },
                                { title: "Aux entreprises & collectivités", desc: "Pour honorer les parcours, valoriser les métiers invisibilisés et la mémoire collective." },
                                { title: "Aux artisan·e·s", desc: "Qui fabriquent des objets avec leurs mains et veulent leur donner une histoire à transmettre." }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-memoir-bg rounded-2xl border border-memoir-blue/5 hover:border-memoir-neon/30 transition-all hover:bg-memoir-neon/5">
                                    <h3 className="font-bold text-memoir-blue mb-2">{item.title}</h3>
                                    <p className="text-sm text-memoir-blue/70">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Ce que ce n'est pas + Qui je suis */}
                <section className="py-20 px-6 bg-memoir-blue/5">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Ce que ce n'est pas */}
                        <div className="space-y-8">
                            <h2 className="text-2xl font-serif italic text-memoir-blue">Ce que Commun Vivant n'est pas</h2>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-memoir-blue/70 bg-white p-4 rounded-xl border border-transparent hover:border-memoir-neon/30 transition-colors">
                                    <XCircle className="w-5 h-5 text-memoir-neon flex-shrink-0" />
                                    Pas une plateforme impersonnelle.
                                </li>
                                <li className="flex gap-3 text-memoir-blue/70 bg-white p-4 rounded-xl border border-transparent hover:border-memoir-neon/30 transition-colors">
                                    <XCircle className="w-5 h-5 text-memoir-neon flex-shrink-0" />
                                    Pas un algorithme qui génère du contenu creux.
                                </li>
                                <li className="flex gap-3 text-memoir-blue/70 bg-white p-4 rounded-xl border border-transparent hover:border-memoir-neon/30 transition-colors">
                                    <XCircle className="w-5 h-5 text-memoir-neon flex-shrink-0" />
                                    Pas un service qui vous prend en otage avec un abonnement.
                                </li>
                            </ul>
                            <div className="bg-memoir-gold/10 p-6 rounded-2xl border border-memoir-gold/20 flex gap-4">
                                <Heart className="w-10 h-10 text-memoir-gold flex-shrink-0" />
                                <div>
                                    <strong className="block text-memoir-blue mb-1">C'est un projet personnel</strong>
                                    <p className="text-sm text-memoir-blue/80">
                                        Que j'ai créé pour moi, et que je vous offre. Imparfait. Sincère. Fait avec soin.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Qui suis-je */}
                        <div className="space-y-8 lg:pl-8 lg:border-l border-memoir-blue/10">
                            <h2 className="text-2xl font-serif italic text-memoir-blue">
                                Qui suis-je <span className="text-memoir-neon">?</span>
                            </h2>
                            <div className="prose text-memoir-blue/80">
                                <p><strong>Je m'appelle Aline.</strong></p>
                                <p>
                                    Je ne suis pas développeuse de formation. Je ne suis pas entrepreneuse aguerrie.
                                    Je suis quelqu'un qui a perdu son père, fait un burn-out, et qui a décidé de construire
                                    ce qui lui manquait.
                                </p>
                                <p>
                                    <strong>Commun Vivant, c'est mon projet.</strong> Né de mon deuil, de ma colère contre l'oubli,
                                    de mon envie que les histoires — toutes les histoires — puissent être racontées avec dignité.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-24 px-6 bg-white relative overflow-hidden">
                    <div className="max-w-4xl mx-auto bg-memoir-blue rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">

                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/bg-grain.png')] opacity-20 mix-blend-overlay" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-serif italic text-white mb-6">
                                Une histoire à transmettre <span className="text-memoir-neon">?</span>
                            </h2>
                            <p className="text-white/70 mb-10 max-w-xl mx-auto">
                                Une question, un témoignage, ou simplement envie de discuter du projet ? Écrivez-moi.
                            </p>

                            <form className="max-w-md mx-auto space-y-4 text-left">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-bold">Votre message</label>
                                    <textarea
                                        className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-memoir-neon resize-none h-32 backdrop-blur-sm transition-all"
                                        placeholder="Bonjour Aline..."
                                    ></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Votre Nom"
                                        className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-memoir-neon backdrop-blur-sm transition-all"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Votre Email"
                                        className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-memoir-neon backdrop-blur-sm transition-all"
                                    />
                                </div>
                                <button className="w-full bg-memoir-gold text-memoir-blue font-bold py-4 rounded-xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 mt-4 group">
                                    Envoyer mon message
                                    <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>

                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
