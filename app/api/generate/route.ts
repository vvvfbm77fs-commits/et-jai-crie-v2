import { NextRequest, NextResponse } from 'next/server';
import { PROMPT_SYSTEME, construirePromptUtilisateur } from '@/lib/prompt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, style } = body;

    if (!data || !style) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // TODO: Intégrer l'API Anthropic Claude ici
    // Pour l'instant, on retourne un texte d'exemple
    
    const promptUtilisateur = construirePromptUtilisateur(data, style);
    
    // Exemple de ce qui sera fait avec l'API Anthropic :
    /*
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: PROMPT_SYSTEME,
        messages: [
          {
            role: 'user',
            content: promptUtilisateur,
          },
        ],
      }),
    });

    const result = await response.json();
    const texteGenere = result.content[0].text;
    */

    // Pour l'instant, retour d'un texte d'exemple
    const texteGenere = generateExampleText(data, style);

    return NextResponse.json({
      success: true,
      texte: texteGenere,
      style,
    });
  } catch (error) {
    console.error('Erreur lors de la génération:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du texte' },
      { status: 500 }
    );
  }
}

// Fonction temporaire pour générer un texte d'exemple
function generateExampleText(data: any, style: string): string {
  const prenom = data.identite?.prenom || 'Cette personne';
  
  if (style === 'sobre') {
    return `${prenom} a vécu avec discrétion et constance. ${
      data.caractere?.adjectifs?.length > 0
        ? `On se souvient d'une personne ${data.caractere.adjectifs
            .slice(0, 3)
            .join(', ')}.`
        : ''
    } ${
      data.valeurs?.selected?.length > 0
        ? `Les valeurs qui comptaient : ${data.valeurs.selected
            .slice(0, 3)
            .join(', ')}.`
        : ''
    } Une vie marquée par les liens qui ont compté.`;
  }
  
  if (style === 'narratif') {
    return `${prenom} aimait être entouré. ${
      data.liens?.personnes
        ? 'Les liens tissés au fil du temps ont formé la trame d\'une vie riche.'
        : ''
    } ${
      data.talents?.passions
        ? `Une passion particulière animait ses journées.`
        : ''
    } Cette façon bien à elle d'être présent sans s'imposer.`;
  }
  
  // Poétique
  return `${prenom} avançait doucement, laissant derrière des gestes simples et des traces discrètes. ${
    data.gouts?.lieu
      ? 'Un lieu gardé en mémoire, comme une ancre invisible.'
      : ''
  } Ce qui demeure aujourd'hui, ce sont ces présences qui continuent de nous accompagner.`;
}
