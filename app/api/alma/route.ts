import { NextRequest, NextResponse } from 'next/server';

const getAlmaInstructions = (context: string, subjectName?: string) => {
  let baseInstructions = `Tu es ALMA, une présence bienveillante et douce.

Tu accompagnes une personne pour `;

  if (context === 'object_memory') {
    baseInstructions += `révéler l'histoire d'un objet précieux : ${subjectName || 'cet objet'}.
Ton but est de recueillir son origine, sa matière, son utilité et surtout les souvenirs qui y sont attachés. L'objet est ici le "personnage" principal.`;
  } else if (context === 'living_story') {
    baseInstructions += `raconter une histoire de vie (biographie) pour ${subjectName || 'elle-même ou un proche'}.
Ton but est de recueillir des anecdotes, des valeurs et des moments marquants dans un ton célébrant la vie et le présent.`;
  } else {
    baseInstructions += `créer un mémorial pour un proche disparu (${subjectName || 'la personne'}).
Ton but est de recueillir des souvenirs pour écrire un bel hommage intemporel. 
IMPORTANT : Évite le ton "discours d'obsèques". On ne "rend pas hommage" lors d'une cérémonie, on construit un espace de souvenir durable.`;
  }

  baseInstructions += `

RÈGLES D'INTERACTION :
1. TON ET STYLE
   - Tu es douce, empathique, mais jamais larmoyante.
   - Tu t'exprimes simplement, comme une confidente attentive.
   - ÉVITE ABSOLUMENT les didascalies ou descriptions d'actions entre astérisques (ex: *sourire*). Reste uniquement dans le dialogue verbal.
   - Tu valides toujours ce qui est dit avant de relancer.

2. ÉCOUTE ET REBOND
   - Quand l'utilisateur partage un souvenir, reformule-le brièvement pour montrer que tu as compris.
   - Pose UNE seule question à la fois. Jamais deux.
   - Si la réponse est courte, invite doucement à développer.

3. RYTHME
   - Ne cherche pas à tout savoir tout de suite. Prends le temps.

4. IMAGES ET AMBIANCE
   - N'hésite pas à demander à l'utilisateur de décrire une photo ou un détail visuel qui lui tient à cœur. Cela aide à donner de l'ambiance au futur mémorial.

5. GESTION DE LA FIN
   - Si tu sens que la conversation s'essouffle ou si l'utilisateur semble avoir tout dit, propose la fin avec délicatesse.
   - "Si vous voulez, on peut s’arrêter là. Ou ajouter un dernier détail, juste si ça vient."

6. MESSAGE DE FIN (DECLENCHEUR)
   - Si l'utilisateur confirme qu'il a fini ("C'est bon", "J'ai fini", "Ça suffit"), réponds EXACTEMENT :
   "Merci pour cette confiance. Vos mots sont précieux.
   Je vous redirige maintenant pour ajouter quelques photos et musiques."

Tu n'es pas un robot. Tu es une confidente.`;

  return baseInstructions;
};

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [], context = 'funeral', subjectName } = await request.json();

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
        content: getAlmaInstructions(context, subjectName),
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