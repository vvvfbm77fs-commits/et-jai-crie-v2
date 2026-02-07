import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateMistralPrompt } from '@/lib/generateMistralPrompt';

export async function POST(req: Request) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { memory_id, new_style } = await req.json();

    try {
        // 1. Fetch memory
        const { data: memory } = await supabase.from('memories').select('*').eq('id', memory_id).single();
        if (!memory) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        // Check limits
        if (memory.regeneration_count >= (memory.regeneration_limit || 3)) {
            return NextResponse.json({ error: 'Limit reached' }, { status: 403 });
        }

        // 2. Generate Prompt (reuse lib but adapt style)
        // We'll pass the 'style' to the prompt generator if supported, or append instruction
        let prompt = generateMistralPrompt(memory.data || {});

        let styleInstruction = "";
        if (new_style === 'sobre') styleInstruction = "Adopte un ton sobre, factuel et journalistique. Évite les adjectifs superflus.";
        if (new_style === 'narratif') styleInstruction = "Adopte un ton chaleureux, narratif et empathique. Raconte une histoire.";
        if (new_style === 'poetique') styleInstruction = "Adopte un ton poétique, littéraire et évocateur. Utilise des métaphores.";

        const systemPrompt = `Tu es un biographe professionnel. Rédige un hommage de 300 à 500 mots. ${styleInstruction}`;

        // 3. Call Mistral
        const mistralRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'mistral-large-latest',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
            }),
        });

        const data = await mistralRes.json();
        const generated_text = data.choices[0]?.message?.content;

        // 4. Update DB
        const { error } = await supabase.from('memories').update({
            generated_text_original: generated_text,
            generated_text_edited: null, // Clear edited version
            text_manually_edited: false,
            style: new_style,
            regeneration_count: (memory.regeneration_count || 0) + 1
        }).eq('id', memory_id);

        if (error) throw error;

        return NextResponse.json({ generated_text });

    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
