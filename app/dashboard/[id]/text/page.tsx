'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Check, Edit2, RotateCw, Save, X } from 'lucide-react';

export default function TextEditorPage() {
    const params = useParams();
    const memoryId = params?.id as string;
    const router = useRouter();
    const supabase = createClient();

    // Modes
    const [mode, setMode] = useState<'view' | 'edit' | 'regenerate'>('view');
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);

    // Data
    const [memory, setMemory] = useState<any>(null);
    const [currentStyle, setCurrentStyle] = useState('narratif');
    const [selectedRegenStyle, setSelectedRegenStyle] = useState('narratif');

    // Tiptap Editor
    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        onUpdate: ({ editor }) => {
            // autosave local handling if needed
        },
    });

    // Fetch Data
    useEffect(() => {
        const fetchMemory = async () => {
            const { data } = await supabase.from('memories').select('*').eq('id', memoryId).single();
            if (data) {
                setMemory(data);
                setCurrentStyle(data.style || 'narratif');
                const content = data.generated_text_edited || data.generated_text_original || data.bio || '';
                if (editor && !editor.isDestroyed) {
                    editor.commands.setContent(content);
                }
            }
            setLoading(false);
        };
        fetchMemory();
    }, [memoryId, editor]);

    // Handle Save (Edit Mode)
    const handleSaveEdit = async () => {
        if (!editor) return;
        const html = editor.getHTML();
        const text = editor.getText(); // Plain text for bio column if needed

        await supabase.from('memories').update({
            generated_text_edited: html, // Assuming storing HTML
            bio: text, // Fallback for plain text display
            text_manually_edited: true
        }).eq('id', memoryId);

        setMode('view');
        // Refresh local
        setMemory((prev: any) => ({ ...prev, generated_text_edited: html, bio: text }));
    };

    // Handle Regenerate
    const handleRegenerate = async () => {
        setGenerating(true);
        try {
            const res = await fetch('/api/regenerate-text', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ memory_id: memoryId, new_style: selectedRegenStyle })
            });
            const data = await res.json();

            // Update local state is usually handled by refetching or using response
            if (data.generated_text) {
                setMemory((prev: any) => ({
                    ...prev,
                    generated_text_original: data.generated_text,
                    generated_text_edited: null, // Reset edited on regen
                    style: selectedRegenStyle,
                    regeneration_count: (prev.regeneration_count || 0) + 1
                }));
                if (editor) editor.commands.setContent(data.generated_text);
                setMode('view');
            }
        } catch (e) {
            console.error(e);
            alert('Erreur lors de la régénération.');
        } finally {
            setGenerating(false);
        }
    };

    if (loading) return <div>Chargement...</div>;

    const styles = [
        { id: 'sobre', name: 'Sobre et factuel', desc: 'Ton direct, sans fioritures.' },
        { id: 'narratif', name: 'Narratif et chaleureux', desc: 'Ton fluide, émotionnel.' },
        { id: 'poetique', name: 'Poétique et sensible', desc: 'Ton littéraire, métaphorique.' },
    ];

    const currentText = memory?.generated_text_edited || memory?.generated_text_original || memory?.bio;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
            <h1 className="text-3xl font-serif text-[#1A1A2E] mb-8">Votre récit généré</h1>

            {/* VIEW MODE */}
            {mode === 'view' && (
                <div className="animate-in fade-in">
                    <div className="bg-stone-50 p-4 rounded mb-8 text-sm text-stone-500">
                        Style utilisé : <span className="font-bold text-[#1A1A2E] uppercase">{styles.find(s => s.id === currentStyle)?.name || currentStyle}</span>
                    </div>

                    <div className="prose prose-lg text-stone-700 leading-relaxed mb-12 bg-white p-6 border border-stone-100 shadow-sm rounded-xl">
                        <div dangerouslySetInnerHTML={{ __html: currentText }} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 border-t border-stone-100 pt-8">
                        <button onClick={() => setMode('edit')} className="flex items-center justify-center gap-2 py-4 border border-stone-200 rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all font-bold text-sm uppercase tracking-wide">
                            <Edit2 className="w-4 h-4" /> Modifier
                        </button>
                        <button onClick={() => setMode('regenerate')} className="flex items-center justify-center gap-2 py-4 border border-stone-200 rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all font-bold text-sm uppercase tracking-wide">
                            <RotateCw className="w-4 h-4" /> Regénérer
                        </button>
                        <button onClick={() => router.push(`/dashboard/${memoryId}`)} className="flex items-center justify-center gap-2 py-4 bg-[#1A1A2E] text-white rounded-lg hover:shadow-lg transition-all font-bold text-sm uppercase tracking-wide">
                            <Check className="w-4 h-4" /> Valider
                        </button>
                    </div>
                </div>
            )}

            {/* EDIT MODE */}
            {mode === 'edit' && (
                <div className="animate-in fade-in">
                    <div className="bg-blue-50 text-blue-800 p-4 rounded mb-6 text-sm">
                        Modifiez le texte librement. Pensez à sauvegarder.
                    </div>

                    <div className="border border-stone-300 rounded-xl overflow-hidden mb-8 min-h-[400px]">
                        {editor && <EditorContent editor={editor} className="prose prose-lg max-w-none p-6 outline-none" />}
                    </div>

                    <div className="flex justify-end gap-4">
                        <button onClick={() => setMode('view')} className="px-6 py-3 text-stone-500 hover:text-stone-800">
                            Annuler
                        </button>
                        <button onClick={handleSaveEdit} className="px-8 py-3 bg-[#1A1A2E] text-white rounded-full font-bold shadow-lg flex items-center gap-2">
                            <Save className="w-4 h-4" /> Enregistrer
                        </button>
                    </div>
                </div>
            )}

            {/* REGENERATE MODE */}
            {mode === 'regenerate' && (
                <div className="animate-in fade-in">
                    <div className="bg-orange-50 text-orange-800 p-4 rounded mb-8 text-sm flex items-center gap-2">
                        ⚠️ Attention : Regénérer remplacera votre texte actuel définitivement. {3 - (memory?.regeneration_count || 0)} essais restants.
                    </div>

                    <div className="space-y-4 mb-12">
                        {styles.map(s => (
                            <div
                                key={s.id}
                                onClick={() => setSelectedRegenStyle(s.id)}
                                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${selectedRegenStyle === s.id ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-stone-100 hover:border-stone-200'}`}
                            >
                                <h3 className="font-bold text-[#1A1A2E] mb-1">{s.name}</h3>
                                <p className="text-sm text-stone-500">{s.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-4">
                        <button onClick={() => setMode('view')} className="px-6 py-3 text-stone-500 hover:text-stone-800">
                            Annuler
                        </button>
                        <button
                            onClick={handleRegenerate}
                            disabled={generating}
                            className="px-8 py-3 bg-[#D4AF37] text-white rounded-full font-bold shadow-lg flex items-center gap-2 hover:bg-[#C49F27]"
                        >
                            {generating ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <RotateCw className="w-4 h-4" />}
                            Confirmer la régénération
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
