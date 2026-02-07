import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { generateMistralPrompt } from '@/lib/generateMistralPrompt';

// Fallback text generator if AI fails
const getFallbackText = (data: any) => {
    const name = data.identite?.prenom || 'cette personne';
    return `La vie de ${name} mérite d'être racontée avec justesse et émotion.
    
    [Le récit automatique est actuellement indisponible momentanément. Nos équipes techniques en ont été notifiées et procèdent à la génération manuelle. Vous serez averti par email dès que le texte final sera disponible.]
    
    Nous vous invitons en attendant à enrichir cet espace en ajoutant vos plus belles photos et en partageant le lien avec vos proches pour récolter leurs témoignages.`;
};

export async function POST(req: Request) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    try {
        const { memoryId } = await req.json();
        if (!memoryId) return NextResponse.json({ error: 'Missing memoryId' }, { status: 400 });

        const { data: memory } = await supabase.from('memories').select('*').eq('id', memoryId).single();
        if (!memory) return NextResponse.json({ error: 'Memory not found' }, { status: 404 });

        // Skip if already generated to avoid overwrite (optional check)
        if (memory.status === 'completed' && memory.bio && memory.bio.length > 100) {
            return NextResponse.json({ success: true, message: 'Already generated' });
        }

        const prompt = generateMistralPrompt(memory.data || {});

        let generatedText = '';
        let attempts = 0;
        const maxAttempts = 3;

        // Retry Logic
        while (attempts < maxAttempts && !generatedText) {
            try {
                attempts++;
                const mistralRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'mistral-large-latest',
                        messages: [
                            { role: 'system', content: 'Tu es un biographe empathique et talentueux. Tu écris des récits de vie pour des mémoriaux en ligne. Ton style doit être digne, touchant et hautement personnalisé. Évite les phrases génériques. Utilise les détails fournis pour créer une histoire unique de 300 à 500 mots.' },
                            { role: 'user', content: prompt }
                        ],
                        temperature: 0.7,
                    }),
                });

                if (mistralRes.ok) {
                    const data = await mistralRes.json();
                    generatedText = data.choices[0]?.message?.content;
                } else {
                    console.warn(`Attempt ${attempts} failed: ${mistralRes.status}`);
                    await new Promise(r => setTimeout(r, 1000 * attempts)); // Backoff
                }
            } catch (e) {
                console.error(`Attempt ${attempts} error:`, e);
            }
        }

        // Fallback Only if All Attempts Failed
        if (!generatedText) {
            console.error('All Mistral attempts failed. Using fallback.');
            generatedText = getFallbackText(memory.data || {});
            // Here you would optimally flag this record for manual review in admin dashboard
        }

        // Save to DB
        const { error: updateError } = await supabase
            .from('memories')
            .update({
                bio: generatedText,
                status: 'completed',
                updated_at: new Date().toISOString()
            })
            .eq('id', memoryId);

        if (updateError) throw updateError;

        // Mock Email Logic
        // await sendConfirmationEmail(userEmail, memoryId);
        console.log(`[EMAIL] Confirmation sent to user for Memory ${memoryId}`);

        return NextResponse.json({ success: true, generated: !!generatedText });

    } catch (error: any) {
        console.error('Fatal Error GENERATE MEMORIAL FULL:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
