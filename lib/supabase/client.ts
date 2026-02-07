import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createClient = () => {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase URL and Key must be defined!');
    }
    return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};
