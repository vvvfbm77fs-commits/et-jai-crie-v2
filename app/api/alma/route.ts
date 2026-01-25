import { NextRequest, NextResponse } from 'next/server';

type MistralMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const extractAssistantMessage = (data: any) => {
  if (Array.isArray(data?.messages)) {
    const assistantMessages = data.messages.filter(
      (message: MistralMessage) => message.role === 'assistant'
    );
    return assistantMessages.at(-1)?.content || '';
  }

  if (Array.isArray(data?.outputs)) {
    const assistantOutputs = data.outputs.filter(
      (output: MistralMessage) => output.role === 'assistant'
    );
    return assistantOutputs.at(-1)?.content || '';
  }

  return data?.message?.content || data?.choices?.[0]?.message?.content || '';
};

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const rawMessages = payload?.inputs || payload?.messages;
    const inputs: MistralMessage[] = Array.isArray(rawMessages)
      ? rawMessages
      : payload?.message
        ? [{ role: 'user', content: payload.message }]
        : [];

    if (inputs.length === 0) {
      return NextResponse.json(
        { error: 'Aucun message fourni pour ALMA.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.MISTRAL_API_KEY?.trim();
    if (!apiKey) {
      console.error('Clé API Mistral manquante');
      return NextResponse.json(
        {
          error:
            'Clé API Mistral manquante. Ajoutez MISTRAL_API_KEY dans .env.local puis redémarrez le serveur.',
          missingEnv: ['MISTRAL_API_KEY'],
        },
        { status: 500 }
      );
    }

    const agentId = process.env.MISTRAL_AGENT_ID?.trim();
    if (!agentId) {
      console.error('Agent ALMA introuvable');
      return NextResponse.json(
        {
          error:
            "L'agent ALMA est introuvable (MISTRAL_AGENT_ID manquant). Ajoutez-le dans .env.local puis redémarrez le serveur.",
          missingEnv: ['MISTRAL_AGENT_ID'],
        },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.mistral.ai/v1/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        agent_id: agentId,
        inputs,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Erreur Mistral (ALMA):', errorDetails);
      return NextResponse.json(
        { error: `Erreur Mistral (ALMA): ${errorDetails}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const message = extractAssistantMessage(data);

    return NextResponse.json({ message, conversation: data });
  } catch (error) {
    console.error('Erreur serveur ALMA:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
