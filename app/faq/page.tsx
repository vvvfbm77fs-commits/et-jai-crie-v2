'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Search, ChevronDown, ChevronUp, Mail, Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
    {
        category: "Général",
        questions: [
            {
                q: "Qu'est-ce que Commun Vivant ?",
                a: "Commun Vivant est une plateforme qui permet de créer des espaces de mémoire en ligne pour honorer une personne (vivante ou décédée) ou raconter l'histoire d'un objet précieux. Grâce à un questionnaire guidé et à l'aide d'Alma (notre assistante IA), nous transformons vos réponses en un récit digne et personnel, accessible via une page web unique et un support physique (puce NFC ou plaque QR)."
            },
            {
                q: "Quelle est la différence entre les trois types de mémoriaux ?",
                a: "<strong>Hommage funéraire :</strong> Pour honorer la mémoire d'une personne décédée. Inclut : bougies virtuelles, fleurs, livre d'or pour les hommages.<br/><br/><strong>Récit de vie vivant :</strong> Pour raconter l'histoire d'une personne vivante (retraite, anniversaire, transmission). Inclut : cœurs de soutien, messages d'encouragement.<br/><br/><strong>Mémoire d'objet :</strong> Pour transmettre l'histoire d'un meuble, bijou, objet de famille ou création artisanale. Idéal pour héritage, vente d'antiquité, ou cadeau accompagnant un objet artisanal."
            },
            {
                q: "Combien de temps dure l'hébergement ?",
                a: "5 ans inclus dans tous nos tarifs. Vous recevrez un email 6 mois avant l'expiration pour renouveler si vous le souhaitez (à partir de 9€ pour un objet, 29€ pour une personne).<br/><br/>Vous pouvez aussi choisir un hébergement plus long dès la création :<br/>• +5 ans : +25€<br/>• +10 ans : +45€<br/>• À vie (30 ans) : +90€"
            },
            {
                q: "Est-ce vraiment sans abonnement ?",
                a: "Oui, aucun abonnement. Vous payez une fois, votre mémoire reste en ligne pendant 5 ans (ou plus si vous choisissez une durée étendue). La seule option récurrente est la 'Gestion Premium' (15€/an) qui est totalement facultative et offre des fonctionnalités avancées (modifications illimitées, statistiques...)."
            },
            {
                q: "Mes données sont-elles sécurisées ?",
                a: "Oui. Vos données sont hébergées de manière sécurisée et conforme au RGPD.<br/>✓ Vous êtes propriétaire de votre contenu<br/>✓ Vous pouvez modifier ou supprimer à tout moment<br/>✓ Droit à l'oubli garanti (suppression définitive sur demande)<br/>✓ Aucune revente de données à des tiers"
            },
            {
                q: "Puis-je créer plusieurs mémoriaux avec le même compte ?",
                a: "Oui, vous pouvez créer autant de mémoriaux que vous le souhaitez depuis votre tableau de bord. Chacun sera facturé séparément."
            }
        ]
    },
    {
        category: "IA & Alma",
        questions: [
            {
                q: "Comment fonctionne Alma, votre assistante IA ?",
                a: "Alma vous guide à travers un questionnaire structuré (9 étapes pour les personnes, simplifié pour les objets). À partir de vos réponses, elle génère un texte biographique dans le style que vous choisissez :<br/>• Sobre : factuel, épuré<br/>• Narratif : chaleureux, humain<br/>• Poétique : sensible, littéraire<br/><br/>Vous relisez, validez, et pouvez demander des ajustements avant publication."
            },
            {
                q: "L'IA invente-t-elle des informations ?",
                a: "Non, jamais. Alma respecte strictement les faits que vous fournissez. Elle ne brode pas, n'invente pas de détails, et respecte vos silences. Si vous ne renseignez pas certaines informations (dates, lieux, etc.), elles ne figureront pas dans le récit."
            },
            {
                q: "Puis-je écrire moi-même le texte sans utiliser l'IA ?",
                a: "Oui, vous pouvez choisir de rédiger librement votre texte au lieu de passer par le questionnaire guidé. L'option 'rédaction libre' est disponible lors de la création de votre mémorial."
            },
            {
                q: "Puis-je modifier le texte après génération ?",
                a: "Oui, absolument. Une fois qu'Alma a généré le récit, vous pouvez :<br/>• Le relire et demander des ajustements<br/>• Le modifier manuellement<br/>• Demander une nouvelle génération avec un style différent<br/>Avant publication, vous avez 3 modifications gratuites. Après publication, vous pouvez aussi modifier (2 fois/an en version standard, illimité avec Gestion Premium)."
            }
        ]
    },
    {
        category: "Tarifs",
        questions: [
            {
                q: "Pourquoi les objets sont-ils moins chers que les personnes ?",
                a: "Les mémoires d'objets sont plus courtes et moins complexes (questionnaire simplifié, moins de photos, pas de musique). Elles sont aussi pensées comme un produit d'appel accessible pour découvrir Commun Vivant, notamment lors de ventes d'antiquités, de transmissions familiales ou de cadeaux accompagnant des créations artisanales."
            },
            {
                q: "Y a-t-il des frais cachés ?",
                a: "Non, aucun. Le prix affiché inclut :<br/>• La création de la mémoire<br/>• L'hébergement 5 ans<br/>• Le support physique (puce NFC ou plaque QR)<br/>• Les contributions des proches<br/>• Le livre d'or<br/><br/>Les seules options payantes sont clairement indiquées (photos illimitées, vidéo, thème premium...) et totalement facultatives."
            },
            {
                q: "Comment fonctionne le tarif dégressif pour les objets ?",
                a: "Plus vous immortalisez d'objets appartenant à la même personne/famille, moins vous payez par objet :<br/>• 1 objet : 15€<br/>• 3 objets : 35€ (12€/objet)<br/>• 5 objets : 50€ (10€/objet)<br/>• 10 objets : 80€ (8€/objet)<br/>• 20 objets : 120€ (6€/objet)<br/>Idéal pour vider un appartement, transmettre un héritage, ou préparer une succession."
            },
            {
                q: "Que se passe-t-il si je ne renouvelle pas après 5 ans ?",
                a: "Vous recevrez un email de rappel 6 mois avant l'expiration. Si vous ne renouvelez pas :<br/>• Votre mémoire sera archivée (non supprimée)<br/>• Elle ne sera plus accessible en ligne<br/>• Vous pourrez la réactiver plus tard moyennant les frais de renouvellement<br/>Si vous souhaitez une suppression définitive, vous pouvez en faire la demande (droit à l'oubli)."
            }
        ]
    },
    {
        category: "Supports Physiques",
        questions: [
            {
                q: "Quelle est la différence entre puce NFC et plaque QR ?",
                a: "<strong>Puce NFC :</strong><br/>• Discrète (pastille noire Ø25mm)<br/>• Se colle sous/derrière l'objet (invisible)<br/>• Lecture par approche du smartphone (1-2 cm)<br/>• Compatible tous smartphones récents (iPhone 7+, Android NFC)<br/>• Idéale pour objets<br/><br/><strong>Plaque QR :</strong><br/>• Visible, assumée (mini-plaque ~5x5cm)<br/>• Se fixe sur tombe, cadre photo, mur...<br/>• Lecture par scan QR (appareil photo standard)<br/>• Compatible TOUS les smartphones<br/>• Idéale pour personnes"
            },
            {
                q: "La puce NFC fonctionne-t-elle sur tous les matériaux ?",
                a: "Oui, nos puces NFC sont anti-métal. Elles fonctionnent sur : Bois, Métal (fer, aluminium, inox, laiton...), Verre, Céramique, Marbre, Tissu, Plastique."
            },
            {
                q: "Comment coller la puce NFC ?",
                a: "La puce est équipée d'un adhésif 3M résistant.<br/>Instructions :<br/>1. Nettoyez la surface (sèche, sans poussière)<br/>2. Retirez la protection de l'adhésif<br/>3. Collez fermement sous/derrière l'objet<br/>4. Testez en approchant votre téléphone<br/>Conseil : Collez-la dans un endroit discret mais accessible (sous le plateau d'une table, derrière un cadre, sous un meuble...)."
            },
            {
                q: "Puis-je avoir plusieurs plaques QR ?",
                a: "Oui ! La première plaque est incluse dans le tarif 'Mémoire de personne' (79€). Si vous souhaitez partager le lien physique avec plusieurs membres de la famille (ex: une plaque chez chaque enfant), vous pouvez commander des plaques supplémentaires à 5€/unité. Même chose pour les puces NFC."
            },
            {
                q: "Que faire si la puce ou la plaque ne fonctionne pas ?",
                a: "Vérifications :<br/>• Puce NFC : Vérifiez que le NFC est activé sur votre smartphone (Paramètres > NFC)<br/>• Plaque QR : Assurez-vous d'avoir une bonne luminosité pour scanner<br/>Si le problème persiste, contactez-nous à contact@communvivant.fr. Nous vous enverrons un remplacement gratuit si le support est défectueux."
            },
            {
                q: "Puis-je commander une plaque ou puce plus tard ?",
                a: "Oui, vous pouvez commander des supports supplémentaires à tout moment depuis votre tableau de bord (5€/unité)."
            },
            {
                q: "La plaque QR résiste-t-elle aux intempéries ?",
                a: "Oui, nos plaques sont conçues pour résister aux conditions extérieures (pluie, soleil, gel modéré). Cependant, pour une durabilité maximale sur tombe, nous recommandons un emplacement légèrement abrité si possible."
            }
        ]
    },
    {
        category: "Contenu",
        questions: [
            {
                q: "Combien de photos puis-je ajouter ?",
                a: "<strong>Offre de base :</strong><br/>• Personne : 15 photos<br/>• Objet : 5 photos<br/><br/><strong>Option Galerie étendue :</strong><br/>• Personne : photos illimitées (+15€)<br/>• Objet : jusqu'à 15 photos (+10€)"
            },
            {
                q: "Puis-je ajouter de la musique ?",
                a: "Mémoire de personne : Oui, 1 morceau inclus (format MP3, durée max 10 min).<br/>Mémoire d'objet : Non inclus, mais vous pouvez ajouter un lien vers une playlist externe (Spotify, YouTube...)."
            },
            {
                q: "Puis-je ajouter une vidéo ?",
                a: "Oui, en option payante :<br/>• Personne : +20€ (vidéo jusqu'à 5 min)<br/>• Objet : +15€ (vidéo jusqu'à 3 min)<br/>Formats acceptés : MP4, MOV (taille max : 500 Mo)."
            },
            {
                q: "Puis-je ajouter un message audio (voix de la personne) ?",
                a: "Oui, en option payante : +10€ (audio jusqu'à 3 min). Idéal pour enregistrer la voix d'un proche, un message d'adieu, ou un témoignage oral."
            },
            {
                q: "Qui peut contribuer à enrichir la mémoire ?",
                a: "Vous pouvez inviter jusqu'à 5 personnes à contribuer (ajouter des photos, des messages, des anecdotes). Ces contributeurs reçoivent un lien privé et peuvent participer avant ou après publication."
            },
            {
                q: "La mémoire est-elle publique ou privée ?",
                a: "Vous choisissez le niveau de visibilité :<br/>• <strong>Lien privé (par défaut)</strong> : Accessible uniquement aux personnes à qui vous donnez le lien.<br/>• <strong>Publique</strong> : Visible par tous si vous partagez largement le lien.<br/>• <strong>Protégée par mot de passe</strong> : Accès totalement restreint.<br/>C'est vous qui décidez du niveau de partage dans les paramètres."
            },
            {
                q: "Puis-je modifier la mémoire après publication ?",
                a: "Oui.<br/>Version standard : 2 modifications gratuites par an.<br/>Version Gestion Premium (15€/an) : Modifications illimitées."
            },
            {
                q: "Puis-je exporter la mémoire en PDF ?",
                a: "Oui, en option payante : +15€. Vous recevrez un PDF haute qualité avec mise en page éditoriale, idéal pour imprimer et offrir ou archiver."
            }

        ]
    },
    {
        category: "Vie privée",
        questions: [
            { q: "Qui peut voir la mémoire ?", a: "Vous choisissez le niveau de visibilité :<br/>Lien privé (par défaut)<br/>Accessible uniquement aux personnes à qui vous donnez le lien.<br/>Non indexée par les moteurs de recherche.<br/>Publique<br/>Visible par tous si vous partagez largement le lien (réseaux sociaux, faire-part, avis de décès...).<br/>Tout le monde peut la consulter.<br/>Protégée par mot de passe<br/>Accès totalement restreint. Seules les personnes ayant le mot de passe peuvent consulter la mémoire.<br/>C'est vous qui décidez du niveau de partage dans les paramètres." },
            { q: "Puis-je supprimer définitivement une mémoire ?", a: "Oui, à tout moment. Rendez-vous dans votre tableau de bord > Paramètres > Supprimer définitivement. Attention : Cette action est irréversible. Toutes les données (texte, photos, messages) seront définitivement effacées." },
            { q: "Que deviennent mes données après suppression ?", a: "Elles sont définitivement effacées de nos serveurs (conformément au RGPD). Aucune copie n'est conservée, ni revendue, ni archivée." },
            { q: "Puis-je transférer la propriété d'une mémoire à quelqu'un d'autre ?", a: "Oui. Contactez-nous à contact@communvivant.fr avec les détails, nous procéderons au transfert. Utile en cas de décès du créateur, ou si vous souhaitez confier la gestion à un membre de la famille." }

        ]
    },
    {
        category: "Commande",
        questions: [
            { q: "Comment se passe la commande ?", a: "1. Choisissez votre type de mémorial (Personne, Objet, Pack)<br/>2. Complétez le questionnaire guidé avec Alma<br/>3. Validez le récit généré<br/>4. Choisissez vos options (galerie, vidéo, thème...)<br/>5. Payez en ligne (carte bancaire sécurisée)<br/>6. Recevez votre support physique sous 5-10 jours" },
            { q: "Quels moyens de paiement acceptez-vous ?", a: "Carte bancaire (Visa, Mastercard, Amex) et paiement sécurisé via Stripe. Nous ne stockons aucune donnée bancaire." },
            { q: "Quand vais-je recevoir ma puce NFC ou plaque QR ?", a: "Délai de livraison : 5 à 10 jours ouvrés après validation de votre commande. Vous recevrez un email de confirmation d'expédition avec un numéro de suivi." },
            { q: "Je n'ai pas reçu ma puce/plaque, que faire ?", a: "Contactez-nous à contact@communvivant.fr avec votre numéro de commande. Nous vérifierons le statut de l'envoi et vous enverrons un remplacement si nécessaire." },
            { q: "Livrez-vous à l'international ?", a: "Actuellement, nous livrons en France métropolitaine et DOM-TOM. Pour les livraisons internationales (Europe, autres pays), contactez-nous : nous étudierons votre demande au cas par cas." },
            { q: "Puis-je commander sans support physique ?", a: "Oui, optez pour la version 'Numérique seul' (69€ au lieu de 79€). Vous recevrez uniquement l'accès à votre mémoire en ligne, sans puce ni plaque. Vous pourrez toujours en commander une plus tard (+5€)." }
        ]
    },
    {
        category: "Professionnels",
        questions: [
            { q: "Proposez-vous des tarifs pour les professionnels ?", a: "Oui, nous avons des offres dédiées pour : Pompes funèbres, Assureurs, Antiquaires / Brocanteurs, Artisans créateurs, Entreprises, Collectivités. Contactez-nous à pro@communvivant.fr pour recevoir une grille tarifaire adaptée." },
            { q: "Comment fonctionne le système de commission pour les pompes funèbres ?", a: "Nous proposons une commission de 20 à 30% sur chaque vente apportée par un partenaire professionnel. Vous disposez d'un espace pro dédié pour : Créer des invitations pour vos clients, Suivre vos commissions, Gérer vos dossiers." },
            { q: "Si je passe par une pompe funèbre partenaire, comment ça se passe ?", a: "Si vous créez votre mémorial via une pompe funèbre partenaire de Commun Vivant, le coût est intégré directement dans les frais d'obsèques. Vous n'avez rien à payer séparément. Vous recevrez : ✓ Votre mémorial complet ✓ Votre plaque QR à fixer sur la tombe ✓ L'accompagnement du professionnel." },
            { q: "Puis-je personnaliser les mémoriaux avec mon logo (pompes funèbres) ?", a: "Oui, dans le cadre d'un partenariat professionnel, nous pouvons intégrer discrètement votre logo en pied de page. Contactez-nous pour en discuter : pro@communvivant.fr" }
        ]
    }
];

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openItem, setOpenItem] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        setOpenItem(openItem === id ? null : id);
    };

    const filteredData = FAQ_DATA.map(section => {
        const filteredQuestions = section.questions.filter(q =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return {
            ...section,
            questions: filteredQuestions
        };
    }).filter(section => section.questions.length > 0);

    const displayData = activeCategory
        ? filteredData.filter(section => section.category === activeCategory)
        : filteredData;

    return (
        <div className="min-h-screen bg-memoir-bg flex flex-col font-sans">
            <Header />

            <main className="flex-grow max-w-5xl mx-auto px-6 py-20 w-full">

                <div className="text-center mb-16 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-serif italic text-memoir-blue">Questions Fréquentes</h1>
                    <p className="text-memoir-blue/60 text-lg">Tout savoir sur Commun Vivant, Alma et nos supports.</p>

                    {/* Barre de recherche */}
                    <div className="max-w-xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Rechercher une réponse..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-full border border-memoir-gold/20 focus:border-memoir-gold focus:ring-2 focus:ring-memoir-gold/20 outline-none shadow-sm transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-memoir-blue/40 w-5 h-5" />
                    </div>
                </div>

                {/* Filtres par catégorie */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === null
                                ? 'bg-memoir-blue text-white shadow-md'
                                : 'bg-white text-memoir-blue/60 hover:bg-memoir-blue/5'
                            }`}
                    >
                        Tout voir
                    </button>
                    {FAQ_DATA.map((section) => (
                        <button
                            key={section.category}
                            onClick={() => setActiveCategory(section.category)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === section.category
                                    ? 'bg-memoir-blue text-white shadow-md'
                                    : 'bg-white text-memoir-blue/60 hover:bg-memoir-blue/5'
                                }`}
                        >
                            {section.category}
                        </button>
                    ))}
                </div>

                {/* Liste des questions */}
                <div className="space-y-8">
                    {displayData.map((section, sectionIdx) => (
                        <div key={section.category} className="space-y-4">
                            <h2 className="text-2xl font-serif text-memoir-gold italic mb-4 px-2">{section.category}</h2>
                            <div className="space-y-3">
                                {section.questions.map((item, idx) => {
                                    const id = `${sectionIdx}-${idx}`;
                                    const isOpen = openItem === id;

                                    return (
                                        <div
                                            key={idx}
                                            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-memoir-gold/30 shadow-lg' : 'border-memoir-blue/5 shadow-sm hover:border-memoir-blue/20'
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleItem(id)}
                                                className="w-full text-left px-8 py-6 flex items-center justify-between gap-6 hover:bg-memoir-bg/30 transition-colors"
                                            >
                                                <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-memoir-blue' : 'text-memoir-blue/80'}`}>
                                                    {item.q}
                                                </span>
                                                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-memoir-gold text-white rotate-45' : 'bg-memoir-bg text-memoir-blue/40'}`}>
                                                    <Plus className="w-5 h-5" />
                                                </span>
                                            </button>

                                            <div
                                                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                                    }`}
                                            >
                                                <div className="px-8 pb-8 pt-0 text-memoir-blue/70 leading-relaxed space-y-4">
                                                    <div dangerouslySetInnerHTML={{ __html: item.a }} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {displayData.length === 0 && (
                        <div className="text-center py-20 text-memoir-blue/40">
                            <p>Aucun résultat pour "{searchQuery}"</p>
                            <button onClick={() => setSearchQuery('')} className="text-memoir-gold underline mt-2">Effacer la recherche</button>
                        </div>
                    )}
                </div>

                <div className="mt-20 text-center bg-white rounded-3xl p-10 shadow-sm border border-memoir-blue/5">
                    <h3 className="text-xl font-serif italic text-memoir-blue mb-4">Vous n'avez pas trouvé votre réponse ?</h3>
                    <div className="flex justify-center gap-6">
                        <Link href="mailto:contact@communvivant.fr" className="inline-flex items-center gap-2 bg-memoir-blue text-white px-8 py-3 rounded-full hover:bg-memoir-blue/90 transition-all shadow-md">
                            <Mail className="w-4 h-4" /> Nous contacter
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
