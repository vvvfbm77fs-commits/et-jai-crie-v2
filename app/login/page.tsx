'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, User } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get('token');

  const [mode, setMode] = useState<'login' | 'signup' | 'invite'>(
    inviteToken ? 'invite' : 'login'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        const { data: userData } = await supabase
          .from('users')
          .select('role, funeral_home_id')
          .eq('id', data.user.id)
          .single();

        if (userData?.role === 'admin') {
          router.push('/admin');
        } else if (userData?.role === 'funeral_partner') {
          router.push('/dashboard-pro');
        } else {
          router.push('/dashboard');
        }

      } else if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } }
        });

        if (error) throw error;

        alert('Compte créé ! Vérifiez votre email pour confirmer.');
        setMode('login');

      } else if (mode === 'invite') {
        if (!inviteToken) throw new Error('Token manquant');

        const { data: invitation } = await supabase
          .from('invitations')
          .select('*')
          .eq('token', inviteToken)
          .eq('used', false)
          .single();

        if (!invitation || new Date(invitation.expires_at) < new Date()) {
          throw new Error('Lien invalide ou expiré');
        }

        const { data, error } = await supabase.auth.signUp({
          email: invitation.email,
          password,
          options: {
            data: {
              name,
              funeral_home_id: invitation.funeral_home_id
            }
          }
        });

        if (error) throw error;

        await supabase
          .from('invitations')
          .update({ used: true })
          .eq('id', invitation.id);

        alert('Compte créé avec succès !');
        router.push('/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F2A44] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/logo.jpg"
            alt="Et j'ai crié"
            width={120}
            height={120}
            className="w-28 h-28 mx-auto mb-4 rounded-full"
          />
          <h1 className="text-[#C9A24D] text-3xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {mode === 'login' ? 'Connexion' : mode === 'invite' ? 'Créer votre compte' : 'Inscription'}
          </h1>
          {mode === 'invite' && (
            <p className="text-[#F5F4F2]/60 text-sm mt-2">
              Vous avez été invité à créer un mémorial
            </p>
          )}
        </div>

        {/* Mode sélection pour login */}
        {mode === 'login' && !inviteToken ? (
          <div className="space-y-4">
            {/* Boutons OAuth */}
            <button
              onClick={() => setMode('signup')}
              className="w-full bg-white/10 border border-[#C9A24D]/30 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Continuer avec Email
            </button>

            <button
              onClick={async () => {
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: { redirectTo: `${window.location.origin}/dashboard` }
                });
                if (error) setError(error.message);
              }}
              className="w-full bg-white text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continuer avec Google
            </button>

            <button
              onClick={async () => {
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: 'apple',
                  options: { redirectTo: `${window.location.origin}/dashboard` }
                });
                if (error) setError(error.message);
              }}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Continuer avec Apple
            </button>

            <div className="text-center mt-4">
              <p className="text-white/60 text-sm">
                Vous avez déjà un compte ?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-[#C9A24D] hover:underline"
                >
                  Connectez-vous
                </button>
              </p>
            </div>
          </div>
        ) : (
          // Formulaire email/password pour signup et invite
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-[#C9A24D]/20">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {(mode === 'signup' || mode === 'invite') && (
                <div>
                  <label className="block text-[#C9A24D] text-sm mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-[#C9A24D]/30 rounded-lg text-white placeholder-white/40 focus:border-[#C9A24D] focus:outline-none"
                    placeholder="Votre nom"
                  />
                </div>
              )}

              <div>
                <label className="block text-[#C9A24D] text-sm mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={mode === 'invite'}
                  className="w-full px-4 py-3 bg-white/10 border border-[#C9A24D]/30 rounded-lg text-white placeholder-white/40 focus:border-[#C9A24D] focus:outline-none disabled:opacity-50"
                  placeholder="votre@email.fr"
                />
              </div>

              <div>
                <label className="block text-[#C9A24D] text-sm mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-white/10 border border-[#C9A24D]/30 rounded-lg text-white placeholder-white/40 focus:border-[#C9A24D] focus:outline-none"
                  placeholder="••••••••"
                />
                <p className="text-white/50 text-xs mt-2">Minimum 6 caractères</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9A24D] text-[#0F2A44] py-3 rounded-lg font-medium hover:bg-[#E1C97A] transition-colors disabled:opacity-50"
              >
                {loading ? 'Chargement...' : 'Créer mon compte'}
              </button>
            </div>

            {mode === 'signup' && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-white/60 hover:text-[#C9A24D] transition-colors text-sm"
                >
                  Déjà un compte ? Connectez-vous
                </button>
              </div>
            )}
          </form>
        )}

        {/* Retour */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/')}
            className="text-white/60 hover:text-[#C9A24D] transition-colors text-sm"
          >
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0F2A44] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#C9A24D] border-t-transparent rounded-full" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}