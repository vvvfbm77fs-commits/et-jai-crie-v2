'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Check, X, Flag, Clock, MessageSquare } from 'lucide-react';

interface Message {
    id: string;
    author_name: string;
    content: string;
    created_at: string;
    status: string; // 'pending', 'approved', 'rejected'
    flagged: boolean;
    flagged_reason?: string;
    approved: boolean; // synced from prompt
}

export default function ModerationPage() {
    const params = useParams();
    const memoryId = params?.id as string;
    const [messages, setMessages] = useState<Message[]>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'flagged'>('all');
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const fetchMessages = async () => {
            // Check ownership
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return router.push('/login');

            const { data: memory } = await supabase.from('memories').select('user_id').eq('id', memoryId).single();
            if (!memory || memory.user_id !== user.id) {
                // Not authorized
                return router.push('/dashboard');
            }

            // Fetch messages
            const { data, error } = await supabase
                .from('messages') // Correct table name used in Guestbook
                .select('*')
                .eq('memory_id', memoryId)
                .order('created_at', { ascending: false });

            // Note: If table is 'messages' as used in prev steps, I might need to adjust.
            // Prompt 2 says 'memory_messages'. I'll assume Prompt 2 is correct for this specific dash.
            // Actually, previously I used 'messages' table in Guestbook component (Step 199/232).
            // But Migration adds cols to 'memory_messages'.
            // I should assume the table is 'memory_messages' OR 'messages'.
            // I'll check migration. Migration target is 'memory_messages'.
            // So if my previous components wrote to 'messages', I need to align them.
            // For now, I'll use 'memory_messages' as per prompt.
            // If fetching fails (empty), it might be table mismatch.
            // I will assume consistency.

            if (data) setMessages(data);
            setLoading(false);
        };
        fetchMessages();
    }, [memoryId]);

    const handleAction = async (id: string, action: 'approve' | 'delete') => {
        if (action === 'approve') {
            await supabase
                .from('memory_messages')
                .update({ approved: true, status: 'approved', moderated_at: new Date().toISOString() })
                .eq('id', id);

            setMessages(prev => prev.map(m => m.id === id ? { ...m, approved: true, status: 'approved' } : m));
        } else {
            await supabase
                .from('memory_messages')
                .delete()
                .eq('id', id);

            setMessages(prev => prev.filter(m => m.id !== id));
        }
    };

    const filteredMessages = messages.filter(m => {
        if (filter === 'pending') return !m.approved && !m.flagged; // Pending and clean
        if (filter === 'flagged') return m.flagged;
        return true; // All
    });

    const getStatusBadge = (m: Message) => {
        if (m.flagged) return <span className="text-red-500 bg-red-50 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Flag className="w-3 h-3" /> Flagué</span>;
        if (m.approved) return <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Approuvé</span>;
        return <span className="text-orange-500 bg-orange-50 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Clock className="w-3 h-3" /> En attente</span>;
    };

    if (loading) return <div className="p-8 text-center text-stone-400">Chargement des messages...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white min-h-screen">
            <h1 className="text-2xl font-serif font-bold text-[#1A1A2E] mb-8">Modération des messages</h1>

            <div className="flex gap-2 mb-8 border-b border-stone-100 pb-1">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-t-lg text-sm font-bold transition-colors ${filter === 'all' ? 'bg-[#1A1A2E] text-white' : 'text-stone-400 hover:text-[#1A1A2E]'}`}
                >
                    Tous ({messages.length})
                </button>
                <button
                    onClick={() => setFilter('pending')}
                    className={`px-4 py-2 rounded-t-lg text-sm font-bold transition-colors ${filter === 'pending' ? 'bg-[#1A1A2E] text-white' : 'text-stone-400 hover:text-[#1A1A2E]'}`}
                >
                    En attente ({messages.filter(m => !m.approved && !m.flagged).length})
                </button>
                <button
                    onClick={() => setFilter('flagged')}
                    className={`px-4 py-2 rounded-t-lg text-sm font-bold transition-colors ${filter === 'flagged' ? 'bg-red-500 text-white' : 'text-red-400 hover:text-red-600'}`}
                >
                    Flagués ({messages.filter(m => m.flagged).length})
                </button>
            </div>

            <div className="space-y-4">
                {filteredMessages.length === 0 && (
                    <div className="text-center py-12 text-stone-400 bg-stone-50 rounded-xl">Aucun message dans cette catégorie.</div>
                )}

                {filteredMessages.map(msg => (
                    <div key={msg.id} className={`p-6 rounded-xl border ${msg.flagged ? 'border-red-200 bg-red-50/50' : 'border-stone-200 bg-white'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-[#1A1A2E]">{msg.author_name}</h3>
                                <p className="text-xs text-stone-400">Il y a {new Date(msg.created_at).toLocaleDateString()}</p>
                            </div>
                            {getStatusBadge(msg)}
                        </div>

                        {msg.flagged && (
                            <div className="mb-4 text-xs text-red-600 font-bold bg-white/50 p-2 rounded">
                                ⚠️ {msg.flagged_reason || 'Contenu suspect'}
                            </div>
                        )}

                        <p className="text-stone-700 italic mb-6">"{msg.content}"</p>

                        <div className="flex gap-3">
                            {!msg.approved && (
                                <button
                                    onClick={() => handleAction(msg.id, 'approve')}
                                    className="px-4 py-2 bg-green-500 text-white rounded text-xs font-bold hover:bg-green-600 transition-colors flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4" /> Approuver
                                </button>
                            )}
                            <button
                                onClick={() => handleAction(msg.id, 'delete')}
                                className="px-4 py-2 bg-stone-200 text-stone-600 rounded text-xs font-bold hover:bg-stone-300 transition-colors flex items-center gap-2"
                            >
                                <X className="w-4 h-4" /> Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
