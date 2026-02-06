'use client';

import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MemorialLayout from '@/components/MemorialLayout';
import { getTemplate } from '@/lib/templates';
import { BlockType } from '@/lib/layouts';
import {
    ProfileBlock,
    TextBlock,
    GalleryBlock,
    TributeBlock,
    LinksBlock,
    GoutsBlock,
} from '@/components/memorial-blocks';
import PersonalMessages from '@/components/PersonalMessages';

type ExampleType = 'funeraire' | 'vivant' | 'objet';

// --- CONFIGURATION FACILE ---
// C'est ici que tu peux changer les textes et le cadrage des images sans tout casser !
const EXAMPLES_CONFIG: Record<string, {
    tributeLabels?: any; // Textes personnalisés pour les hommages/soutiens
    coverImagePosition?: string; // Cadrage de l'image de couverture (ex: 'center', 'top', 'bottom', 'center 20%')
}> = {
    funeraire: {
        // Pour le funéraire, on garde les textes par défaut (Bougies, Fleurs...)
        tributeLabels: undefined,
        coverImagePosition: 'center',
    },
    vivant: {
        tributeLabels: {
            title: "On l'aime ❤️",
            subtitle: "Dites-lui avec un cœur !",
            heartLabel: "J'aime",
            thankYouMessage: "Merci pour tout cet amour !"
        },
        coverImagePosition: 'center',
    },
    objet: {
        tributeLabels: {
            title: "Coup de cœur ?",
            subtitle: "Un petit like pour ce fauteuil incroyable",
            heartLabel: "J'adore",
            thankYouMessage: "Merci, il est flatté (si, si) !"
        },
        coverImagePosition: 'center 60%', // On descend un peu le focus pour mieux voir le fauteuil
    }
};

export default async function GenericExamplePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: rawSlug } = await params;
    const slug = rawSlug as ExampleType;

    if (!['funeraire', 'vivant', 'objet'].includes(slug)) {
        return notFound();
    }

    const config = EXAMPLES_CONFIG[slug] || {};

    // --- DATA MOCKING ---
    const getExampleData = (type: ExampleType) => {
        switch (type) {
            case 'funeraire':
                return {
                    templateId: 'bleu-dore',
                    customColors: {
                        bg: "#16213e",
                        text: "#FFFFFF",
                        accent: "#BFDBFE", // blue-200
                        textSecondary: "#DBEAFE"
                    },
                    data: {
                        identite: {
                            prenom: "Jean-Pierre",
                            nom: "Delacroix",
                            dateNaissance: "1954-01-15",
                            dateDeces: "2024-02-14",
                            photoProfilUrl: "",
                        },
                        texteGenere: "Né un matin d'hiver à Saint-Malo, Jean-Pierre a toujours porté en lui l'appel du large. Fils de pêcheur, il a appris très tôt à lire le ciel et à respecter la colère des flots. \n\nAprès une carrière dans la marine marchande qui l'a mené aux quatre coins du monde, du Japon au Chili, il a posé ses valises pour fonder sa famille. Mais jamais il n'a quitté la mer des yeux. \n\nAmoureux des mots, il passait ses soirées plongé dans les récits de Conrad et de Victor Hugo. Il nous a enseigné la patience, l'humilité et la valeur du silence partagé. Il s'est éteint paisiblement, entouré des siens, nous laissant en héritage son courage et son infinie tendresse.",
                        coverImage: "/image-site1.png",
                        media: [
                            { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600&auto=format&fit=crop", type: 'image', caption: "Ses débuts en mer" },
                            { url: "https://images.unsplash.com/photo-1629248231902-12a806c99c51?q=80&w=600&auto=format&fit=crop", type: 'image', caption: "Sur le port, 1985" },
                            { url: "https://images.unsplash.com/photo-1543503666-acbc7754388e?q=80&w=600&auto=format&fit=crop", type: 'image', caption: "Avec Marie, 2010" }
                        ],
                        messages: [
                            { author: "Michel, son frère", content: "Jean-Pierre, tu étais mon roc. Je n'oublierai jamais nos traversées, ni tes éclats de rire face au vent. Bon vent, mon frère.", date: "2024-02-15" },
                            { author: "Sophie", content: "Merci pour tout ce que tu nous as appris. Tu resteras à jamais notre capitaine.", date: "2024-02-16" },
                            { author: "L'équipe du port", content: "Un grand marin s'en est allé. Le quai semblera bien vide sans ta silhouette. Nos pensées vont à ta famille.", date: "2024-02-14" }
                        ]
                    }
                };
            case 'vivant':
                return {
                    templateId: 'custom',
                    customColors: {
                        bg: "#FDFCFB",
                        text: "#2C3E50",
                        accent: "#d4af37", // gold
                        textSecondary: "#5D6D7E"
                    },
                    data: {
                        identite: {
                            prenom: "Julie",
                            nom: "Morel",
                            dateNaissance: "1994-06-20",
                            photoProfilUrl: "",
                        },
                        texteGenere: "J'ai grandi dans une maison pleine de musique et de lumière. Mon père jouait du piano le dimanche matin, et ma mère peignait dans le jardin. Ces premières années ont forgé ma sensibilité artistique. \n\nDe l'Inde au Pérou, chaque voyage a changé ma vision du monde. J'ai découvert que le bonheur se cachait souvent dans les choses les plus simples : un sourire partagé, un repas offert, un coucher de soleil sur les montagnes. \n\nChaque jour est une nouvelle page. Voici celles que je veux partager avec vous pour ne jamais oublier d'où je viens.",
                        coverImage: "/image-site4.png",
                        media: [
                            { url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=600&auto=format&fit=crop", type: 'image', caption: "Voyage au Pérou" },
                            { url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop", type: 'image', caption: "Cinque Terre" }
                        ],
                        messages: [
                            { author: "Maman", content: "Quel bonheur de voir toutes ces photos rassemblées. Tu as une vie magnifique, ma chérie.", date: "2024-03-10" },
                            { author: "Thomas", content: "Hâte de voir les prochains chapitres ! Surtout celui sur notre rencontre 😉", date: "2024-03-12" }
                        ]
                    }
                };
            case 'objet':
                return {
                    templateId: 'custom',
                    customColors: {
                        bg: "#000000",
                        text: "#FFFFFF",
                        accent: "#EE135D", // neon pink
                        textSecondary: "#A3A3A3"
                    },
                    data: {
                        identite: {
                            prenom: "Fauteuil",
                            nom: "Voltaire",
                            dateNaissance: "1890-01-01",
                        },
                        texteGenere: "Fabriqué en 1890 par un artisan ébéniste du Faubourg Saint-Antoine à Paris. Il a été acquis par mon arrière-grand-père, Henri, pour son cabinet de lecture. Il a survécu à deux guerres et à cinq déménagements.\n\nEn 1985, le velours rouge d'origine, trop usé, a été remplacé par un tissu plus moderne, mais la structure en noyer massif est restée intacte. Les ressorts ont été retendus à l'ancienne.\n\nIl paraît que l'arrière-grand-père y cachait ses lettres d'amour dans la doublure du dossier. Nous n'avons jamais osé vérifier, de peur d'abîmer ce témoin silencieux de notre histoire familiale.",
                        coverImage: "/image-site3.png", // Close up of chair
                        media: [],
                        messages: []
                    }
                }
        }
        return null;
    }

    const mock = getExampleData(slug);
    if (!mock) return notFound();

    const template = getTemplate(mock.templateId, mock.customColors);

    // Explicitly define typography if needed for specific templates
    if (slug === 'funeraire') template.typography = 'serif';
    if (slug === 'vivant') template.typography = 'sans-serif';
    if (slug === 'objet') template.fonts.heading = 'font-mono uppercase tracking-widest';

    const blocksObject = {
        profile: (
            <ProfileBlock
                prenom={mock.data.identite.prenom}
                nom={mock.data.identite.nom}
                dateNaissance={mock.data.identite.dateNaissance}
                dateDeces={mock.data.identite.dateDeces}
                coverImage={mock.data.coverImage}
                template={template}
                coverImagePosition={config.coverImagePosition} // Custom positioning!
            />
        ),
        text: (
            <TextBlock
                texte={mock.data.texteGenere}
                template={template}
                isLightBg={slug === 'vivant'}
            />
        ),
        gallery: mock.data.media.length > 0 ? (
            <GalleryBlock
                medias={mock.data.media}
                template={template}
                isLightBg={slug === 'vivant'}
            />
        ) : null,
        gouts: (
            <div className="mb-8">
                <GoutsBlock
                    gouts={{ musique: "Mélodie du souvenir" }}
                    audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    template={template}
                    isLightBg={slug === 'vivant'}
                />
            </div>
        ),
        candle: (
            <TributeBlock
                prenom={mock.data.identite.prenom}
                memorialId={`example-${slug}`}
                template={template}
                type={slug}
                labels={config.tributeLabels} // Custom Labels!
            />
        ),
        messages: mock.data.messages.length > 0 ? (
            <PersonalMessages
                messages={mock.data.messages}
                accentColor={template.colors.accent}
                textColor={template.colors.text}
                bgColor={template.colors.bg}
                typography={template.typography}
            />
        ) : null,
        links: null,
        family: null,
        location: null,
        contribute: null,
        quote: null
    };

    const blockOrder: BlockType[] = ['profile', 'text', 'gouts', 'gallery', 'candle', 'messages'];


    return (
        <div className={`min-h-screen font-sans`} style={{ backgroundColor: template.colors.bg, color: template.colors.text }}>
            <Header />

            {/* Back Button */}
            <div className="fixed top-24 left-6 z-50">
                <Link href="/exemple" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-sm font-medium text-white mix-blend-difference">
                    <ArrowLeft className="w-4 h-4" /> Retour
                </Link>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <MemorialLayout
                    layout="classic"
                    blockOrder={blockOrder}
                    blocks={blocksObject}
                />
            </main>

        </div>
    );
}
