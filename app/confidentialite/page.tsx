import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Confidentialite() {
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
          Politique de confidentialité
        </h1>

        <div className="prose prose-lg max-w-none text-memoir-blue/80 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Esprit général</h2>
            <p>
              Et j'ai crié est un projet sensible. Il manipule des mots, des souvenirs, des traces de vie.
            </p>
            <p>
              Les données confiées sont traitées avec respect, retenue et attention, dans le seul objectif 
              de permettre une expérience mémorielle choisie et assumée.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Données collectées</h2>
            <p>Selon l'usage du service, les données suivantes peuvent être collectées :</p>
            <ul>
              <li>Réponses au questionnaire mémoriel</li>
              <li>Contenus textuels fournis par la famille ou les proches</li>
              <li>Éventuellement un prénom, un pseudonyme ou une adresse email de contact</li>
              <li>Contenus générés à partir des réponses (textes narratifs)</li>
            </ul>
            <p>Aucune donnée n'est collectée à l'insu des utilisateurs.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Finalité du traitement</h2>
            <p>Les données sont collectées exclusivement pour :</p>
            <ul>
              <li>Générer un texte mémoriel personnalisé</li>
              <li>Conserver ce contenu à la demande de la famille</li>
              <li>Permettre, si la famille le souhaite, une publication volontaire du contenu</li>
            </ul>
            <p>Les données ne sont ni revendues, ni utilisées à des fins commerciales ou publicitaires.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Consentement et responsabilité familiale</h2>
            <p>En utilisant le service Et j'ai crié, la famille ou les ayants droit déclarent et reconnaissent :</p>
            <ul>
              <li>Disposer de la légitimité nécessaire pour transmettre ces contenus</li>
              <li>Agir dans le respect de la mémoire et de la volonté présumée du défunt</li>
              <li>Prendre acte que la personne concernée n'a pas exprimé d'opposition connue à cette démarche mémorielle</li>
              <li>Assumer collectivement la décision de publication, lorsqu'elle est activée</li>
            </ul>
            <p>
              Et j'ai crié agit comme outil de médiation et de création, et ne peut être tenu responsable 
              d'un différend familial ou d'une contestation ultérieure entre ayants droit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Publication des contenus</h2>
            <p>La publication d'un contenu mémoriel est toujours optionnelle.</p>
            <p>Elle ne peut intervenir que :</p>
            <ul>
              <li>Sur demande explicite de la famille</li>
              <li>Après validation consciente de cette publication</li>
            </ul>
            <p>La famille reconnaît que :</p>
            <ul>
              <li>La publication peut rendre le contenu accessible à des tiers</li>
              <li>Cette décision est réfléchie, assumée et réversible dans les conditions prévues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Durée de conservation</h2>
            <p>Les données sont conservées :</p>
            <ul>
              <li>Pendant la durée nécessaire à la réalisation de l'expérience mémorielle</li>
              <li>Puis jusqu'à demande explicite de suppression</li>
              <li>Ou selon la durée choisie par la famille lorsque cette option est proposée</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Vos droits (RGPD)</h2>
            <p>Conformément au Règlement Général sur la Protection des Données, vous disposez des droits suivants :</p>
            <ul>
              <li>Droit d'accès</li>
              <li>Droit de rectification</li>
              <li>Droit de suppression</li>
              <li>Droit à la limitation du traitement</li>
            </ul>
            <p>
              Toute demande peut être adressée à : <a href="mailto:contact@etjaicrie.fr" className="text-memoir-gold hover:underline">contact@etjaicrie.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Suppression des données</h2>
            <p>À tout moment, la famille peut demander :</p>
            <ul>
              <li>La suppression totale des données</li>
              <li>La dépublication d'un contenu</li>
              <li>L'arrêt de toute conservation</li>
            </ul>
            <p>La demande sera traitée dans un délai raisonnable.</p>
            <p>
              <Link href="/droit-oubli" className="text-memoir-gold hover:underline font-medium">
                → Demander la suppression de mes données
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-memoir-blue mb-3">Sécurité</h2>
            <p>
              Les données sont hébergées et traitées avec des mesures de sécurité adaptées afin d'éviter 
              toute perte, accès non autorisé ou détournement.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
