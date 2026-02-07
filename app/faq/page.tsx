'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Search, Plus, Mail } from 'lucide-react';

const FAQ_DATA = [
    {
        category: "Général",
        questions: [
            {
                q: "Qu'est-ce que Commun Vivant ?",
                a: "Commun Vivant est une plateforme qui permet de créer des espaces de mémoire en ligne pour trois intentions : <strong>Fêter</strong> une personne vivante (anniversaire, retraite, hommage), <strong>Transmettre</strong> l'histoire d'objets précieux ou de souvenirs familiaux, ou <strong>Honorer</strong> la mémoire d'une personne décédée. Grâce à un questionnaire guidé et à l'aide d'Alma (notre assistante IA), nous transformons vos réponses en un récit digne et personnel, accessible via une page web unique et un support physique (puce NFC ou plaque QR)."
            },
            {
                q: "Quelle est la différence entre Fêter, Transmettre et Honorer ?",
                a: "<strong>Fêter :</strong> Créer un hommage vivant pour célébrer une personne (retraite, anniversaire, reconnaissance). Inclut : cœurs de soutien, messages d'encouragement, galerie de souvenirs.<br/><br/><strong>Transmettre :</strong> Raconter l'histoire d'objets de famille, meubles anciens, bijoux ou créations artisanales. Idéal pour l'héritage, la transmission ou accompagner une vente/un cadeau.<br/><br/><strong>Honorer :</strong> Créer un mémorial pour une personne décédée. Inclut : bougies virtuelles, livre d'or, messages d'hommage, galerie photo."
            },
            {
                q: "Combien de temps dure l'hébergement ?",
                a: "5 ans inclus dans tous nos tarifs. Vous recevrez un email 6 mois avant l'expiration pour renouveler si vous le souhaitez (à partir de 25€).<br/><br/>Vous pouvez aussi choisir un hébergement plus long dès la création :<br/>• +5 ans : +25€<br/>• À vie (30 ans) : +90€"
            },
            {
                q: "Est-ce vraiment sans abonnement ?",
                a: "Oui, aucun abonnement. Vous payez une fois, votre mémoire reste en ligne pendant 5 ans (ou plus si vous choisissez une durée étendue). Aucun frais caché, aucun renouvellement automatique."
            },
            {
                q: "Mes données sont-elles sécurisées ?",
                a: "Oui. Vos données sont hébergées de manière sécurisée et conforme au RGPD.<br/>✓ Vous êtes propriétaire de votre contenu<br/>✓ Vous pouvez modifier ou supprimer à tout moment<br/>✓ Droit à l'oubli garanti (suppression définitive sur demande)<br/>✓ Aucune revente de données à des tiers"
            },
            {
                q: "Puis-je créer plusieurs mémoires avec le même compte ?",
                a: "Oui, vous pouvez créer autant de mémoires que vous le souhaitez depuis votre tableau de bord. Chacune sera facturée séparément, ou vous pouvez opter pour un pack famille."
            }
        ]
    },
    {
        category: "IA & Alma",
        questions: [
            {
                q: "Comment fonctionne Alma, votre assistante IA ?",
                a: "Alma vous guide à travers un questionnaire structuré (11 étapes pour les personnes, simplifié pour les objets). À partir de vos réponses, elle génère un texte biographique dans le style que vous choisissez :<br/>• Sobre : factuel, épuré<br/>• Narratif : chaleureux, humain<br/>• Poétique : sensible, littéraire<br/><br/>Vous relisez, validez, et pouvez demander des ajustements avant publication."
            },
            {
                q: "L'IA invente-t-elle des informations ?",
                a: "Non, jamais. Alma respecte strictement les faits que vous fournissez. Elle ne brode pas, n'invente pas de détails, et respecte vos silences. Si vous ne renseignez pas certaines informations (dates, lieux, etc.), elles ne figureront pas dans le récit."
            },
            {
                q: "Puis-je écrire moi-même le texte sans utiliser l'IA ?",
                a: "Oui, vous pouvez choisir de rédiger librement votre texte au lieu de passer par le questionnaire guidé. L'option 'écriture libre' est disponible lors de la création de votre mémoire."
            },
            {
                q: "Puis-je modifier le texte après génération ?",
                a: "Oui, absolument. Une fois qu'Alma a généré le récit, vous pouvez :<br/>• Le relire et demander des ajustements<br/>• Le modifier manuellement<br/>• Demander une nouvelle génération avec un style différent (jusqu'à 3 fois)<br/>Vous gardez le contrôle total avant publication."
            }
        ]
    },
    {
        category: "Tarifs",
        questions: [
            {
                q: "Quels sont vos tarifs ?",
                a: "<strong>Formules individuelles :</strong><br/>• Mémoire d'Objet : 49€ (Transmettre)<br/>• Hommage Vivant : 79€ (Fêter)<br/>• Mémorial en Ligne : 79€ (Honorer)<br/><br/><strong>Packs famille :</strong><br/>• Pack Transmission : 149€ (1 Personne + 5 Objets)<br/>• Pack Transmission Étendu : 199€ (1 Personne + 10 Objets)<br/><br/><strong>Objets multiples (tarifs dégressifs) :</strong><br/>• 1 objet : 49€<br/>• 3 objets : 119€ (-19%)<br/>• 5 objets : 179€ (-27%)<br/>• 10 objets : 299€ (-39%)"
            },
            {
                q: "Pourquoi les objets sont-ils moins chers que les personnes ?",
                a: "Les mémoires d'objets sont plus courtes et moins complexes (questionnaire simplifié, moins de photos, pas de fonctionnalités comme les bougies virtuelles). Elles sont pensées comme une porte d'entrée accessible pour découvrir Commun Vivant, notamment lors de transmissions familiales, ventes d'antiquités ou cadeaux accompagnant des objets."
            },
            ```