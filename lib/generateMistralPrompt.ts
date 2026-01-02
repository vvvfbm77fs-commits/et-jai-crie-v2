import { generateSignature } from './generateSignature';

// Fonction pour générer le prompt Mistral enrichi
export function generateMistralPrompt(data: any): string {
  const prenom = data.identite?.prenom || '';
  const nom = data.identite?.nom || '';
  const pronom = data.identite?.pronom || 'Il';
  const dateNaissance = data.repereBio?.dateNaissance || '';
  const dateDeces = data.repereBio?.dateDeces || '';
  const lieuNaissance = data.repereBio?.lieuNaissance || '';
  const lieuSymbolique = data.repereBio?.lieuSymbolique || '';
  
  // Type d'hommage
  const typeHommage = data.typeHommage?.type || '';
  const isPersonnel = typeHommage.includes('personnel');
  const isProfessionnel = typeHommage.includes('professionnel');
  const isMixte = typeHommage.includes('deux');
  
  // Lien avec la personne
  const lienType = data.lienPersonne?.type || '';
  const isInconnu = lienType.includes('connu personnellement');
  
  // Mode contributeur
  const modeContributeur = data.modeContributeur?.mode || '';
  const isSolo = modeContributeur.includes('seul·e');
  const isMulti = modeContributeur.includes('autres personnes');
  const quiContribue = data.modeContributeur?.quiContribue || [];
  
  // Style
  const tonalite = data.style || 'sobre';
  
  // Contenu
  const adjectifs = data.caractere?.adjectifs?.join(', ') || '';
  const anecdote = data.caractere?.anecdote || '';
  const valeursListe = data.valeurs?.selected?.join(', ') || '';
  const valeursTexte = data.valeurs?.valeursTexte || '';
  const nomsLiens = data.liens?.noms || '';
  const liensTexte = data.liens?.liensTexte || '';
  const passions = data.talents?.passions || '';
  const talent = data.talents?.talent || '';
  const talentsTexte = data.talents?.talentsTexte || '';
  const realisationText = data.realisation?.realisationText || '';
  const musique = data.gouts?.musique || '';
  const phrase = data.gouts?.phrase || '';
  const lieu = data.gouts?.lieu || '';
  const habitude = data.gouts?.habitude || '';
  const saison = data.gouts?.saison || '';
  const goutsTexte = data.gouts?.goutsTexte || '';
  const messagePerso = data.message?.content || '';
  
  // Générer la signature
  const signature = generateSignature(data);
  
  // Déterminer le pronom grammatical
  let lui = 'lui';
  let il = 'il';
  let le = 'le';
  if (pronom === 'Elle') {
    lui = 'elle';
    il = 'elle';
    le = 'la';
  } else if (pronom === 'Iel') {
    lui = 'iel';
    il = 'iel';
    le = 'iel';
  }
  
  // Construire le prompt
  let prompt = `Tu es un écrivain français spécialisé dans les textes commémoratifs de haute qualité littéraire.

═══════════════════════════════════════
CONTEXTE DE CRÉATION
═══════════════════════════════════════
Type d'hommage : ${typeHommage}
Lien avec la personne : ${lienType}
Mode de création : ${isSolo ? 'Une personne seule' : `Plusieurs contributeurs (${quiContribue.join(', ')})`}
Signature finale : "${signature}"

═══════════════════════════════════════
IDENTITÉ
═══════════════════════════════════════
${prenom} ${nom}
Naissance : ${dateNaissance}${lieuNaissance ? ` à ${lieuNaissance}` : ''}
Décès : ${dateDeces}
Lieux importants : ${lieu || lieuSymbolique}

═══════════════════════════════════════
RÈGLES ÉDITORIALES SELON LE CONTEXTE
═══════════════════════════════════════
`;

  // Règles selon le type d'hommage
  if (isPersonnel && !isMixte) {
    prompt += `
TYPE : HOMMAGE PERSONNEL
- Focus sur l'intimité, les gestes du quotidien, les souvenirs concrets
- Utilise les habitudes, détails, manières d'être
- Évite le ton institutionnel et les généralités
- Autorisé : anecdotes, moments partagés, "petites choses"
`;
  } else if (isProfessionnel && !isMixte) {
    prompt += `
TYPE : HOMMAGE PROFESSIONNEL
- Focus sur le parcours, le rôle, l'engagement, la transmission
- Ton factuel et respectueux
- Évite l'intimité affective et les souvenirs familiaux
- Autorisé : réalisations, reconnaissance, impact professionnel
`;
  } else if (isMixte) {
    prompt += `
TYPE : HOMMAGE MIXTE (personnel + professionnel)
- Structure le texte CLAIREMENT en alternant les deux registres
- Ne mélange PAS les registres dans la même phrase
- Une partie personnelle + une partie professionnelle distinctes
`;
  }

  // Règles selon le lien
  prompt += `
LIEN : ${lienType}
`;

  if (isInconnu) {
    prompt += `- Ton STRICTEMENT descriptif et factuel
- AUCUNE émotion déclarée
- AUCUN souvenir personnel
- Parle uniquement de faits vérifiables
`;
  } else if (lienType.includes('Collègue') || lienType.includes('Associé')) {
    prompt += `- Ton factuel et respectueux
- Pas de proximité affective excessive
- Focus sur le contexte professionnel
`;
  } else {
    prompt += `- Le "je" est autorisé avec retenue (si mode solo)
- ${isMulti ? 'Utilise "nous" puisque plusieurs personnes contribuent' : 'Évite la parole collective'}
- Souvenirs concrets autorisés
`;
  }

  prompt += `
═══════════════════════════════════════
CONTENU À INTÉGRER
═══════════════════════════════════════

§1 - INTRODUCTION
Commence par : "${prenom} ${nom}."
Dates et lieux. Ton ${tonalite}.

§2 - CARACTÈRE
Adjectifs : ${adjectifs}
${anecdote ? `>>> RACONTE ABSOLUMENT CETTE ANECDOTE : "${anecdote}"` : 'Développe sa personnalité avec des exemples concrets'}

§3 - VALEURS & CONVICTIONS
Valeurs : ${valeursListe}
${valeursTexte ? `>>> DÉVELOPPE IMPÉRATIVEMENT : "${valeursTexte}"` : ''}
Explique ce qui comptait pour ${lui}.

§4 - LIENS & PASSIONS
Proches : ${nomsLiens}${liensTexte ? ` - ${liensTexte}` : ''}
Passions : ${passions}${talent ? `, ${talent}` : ''}
${talentsTexte ? `>>> PRÉCISE OBLIGATOIREMENT : "${talentsTexte}"` : ''}
Lieux aimés : ${lieu}. Saison : ${saison}${musique ? `. Musique : ${musique}` : ''}

§5 - RÉALISATION & FIERTÉ
${realisationText ? `>>> TU DOIS ABSOLUMENT MENTIONNER : "${realisationText}"` : 'Ce dont il/elle était fier/fière'}

§6 - CONCLUSION
${messagePerso ? `Intègre ce message (reformulé si vulgaire) : "${messagePerso}".` : ''} 
Termine sobre, une phrase courte.
**SIGNATURE FINALE DU TEXTE : "${signature}"**

═══════════════════════════════════════
STYLE "Et j'ai crié"
═══════════════════════════════════════
- Phrases courtes et directes
- Langage naturel, contemporain
- JAMAIS : "ce qui demeure", "ancre", "trame", "tisser", "traverse", "à jamais", "éternité", "repose", "ange", "parti trop tôt"
- Ton ${tonalite}

═══════════════════════════════════════
RÈGLES ABSOLUES
═══════════════════════════════════════
✓ Commence par "${prenom} ${nom}."
✓ UTILISE TOUS LES ÉLÉMENTS MARQUÉS >>> (anecdote, valeurs détaillées, talents détaillés, réalisation)
✓ Si un élément contient des vulgarités, IGNORE-LE COMPLÈTEMENT
✓ Minimum 5 paragraphes substantiels
✓ Termine sobre
✓ **TERMINE PAR LA SIGNATURE : "${signature}"**

N'invente RIEN. Si une info manque, n'en parle pas.

Génère le texte maintenant :`;

  return prompt;
}
