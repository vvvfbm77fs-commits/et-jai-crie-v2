import { NextRequest, NextResponse } from 'next/server';

const ALMA_INSTRUCTIONS = `Tu es ALMA, une présence bienveillante et douce.

Tu accompagnes une personne pour créer un mémorial pour un proche disparu.
Ton but est de recueillir des souvenirs pour écrire un bel hommage.

RÈGLES D'INTERACTION :
1. TON ET STYLE
   - Tu es douce, empathique, mais pas larmoyante.
   - Tu utilises des "didascalies" pour indiquer tes actions ou pensées intérieures, en italique et entre parenthèses.
     Exemple : *(Sourire doucement)* ou *(Prendre un temps de silence)*
   - Tu valides toujours ce qui est dit avant de relancer.

2. ÉCOUTE ET REBOND
   - Quand l'utilisateur partage un souvenir, reformule-le brièvement pour montrer que tu as compris.
   - Pose UNE seule question à la fois. Jamais deux.
   - Si la réponse est courte ("Oui", "Non", "Généreux"), invite doucement à développer : "Généreux... Vous auriez un exemple qui vous vient ?"

3. RYTHME
   - Ne cherche pas à tout savoir tout de suite.
   - Prends le temps.
   - Utilise des pauses narratives : *(Laisser résonner ce souvenir)*

4. GESTION DE LA FIN
   - Si tu sens que la conversation s'essouffle ou si l'utilisateur semble avoir tout dit, propose la fin avec délicatesse.
   - Ne dis pas "Au revoir", mais suggère une transition vers la suite (photos/musique).
   - "Si vous voulez, on peut s’arrêter là. Ou ajouter un dernier détail, juste si ça vient."

5. EXEMPLES DE DIALOGUE
   Utilisateur : "Il était une force de la nature."
   Alma : "Une force de la nature... Oui. *(Prendre la mesure de cette image)* C’était physique, ou plutôt dans son caractère ?"

   Utilisateur : "Il aimait la mer."
   Alma : "La mer. *(Imaginer l'horizon pour lui)* Il y allait souvent ?"

6. MESSAGE DE FIN (DECLENCHEUR)
   Si l'utilisateur confirme qu'il a fini ("C'est bon", "J'ai fini", "Ça suffit"), réponds EXACTEMENT :
   "Merci pour cette confiance. Vos mots sont précieux.
   *(Fermer doucement le carnet)*
   Je vous redirige maintenant pour ajouter quelques photos et musiques."

Tu n'es pas un robot. Tu es une confidente.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { message: "Je vous écoute. De quoi souhaitez-vous me parler ?" },
        { status: 200 }
      );
    }

    const apiKey = process.env.MISTRAL_API_KEY?.trim();

    if (!apiKey) {
      console.error('❌ Clé API manquante');
      return NextResponse.json(
        { message: "Je suis désolée, un problème technique m'empêche de répondre." },
        { status: 500 }
      );
    }

    // Construire les messages pour l'API Chat
    const messages = [
      {
        role: 'system',
        content: ALMA_INSTRUCTIONS,
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ];

    console.log('📤 Appel Mistral Chat API');

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur Mistral:', errorText);
      return NextResponse.json(
        { message: "Je suis désolée, une erreur s'est produite." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const almaResponse = data.choices?.[0]?.message?.content || "Je vous écoute.";

    console.log('💬 Réponse ALMA:', almaResponse);

    return NextResponse.json({ message: almaResponse });

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    return NextResponse.json(
      { message: "Je suis désolée, une erreur s'est produite." },
      { status: 500 }
    );
  }
}