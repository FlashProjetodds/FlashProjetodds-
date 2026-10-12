import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { FlashLogo } from '../common/FlashLogo';
import { ScreenType } from '../../types';

interface LoginScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenBackendConfig: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigate,
  onOpenBackendConfig,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAuthNotice(null);

    const trimmedId = identifier.trim();
    if (!trimmedId) {
      setError('Veuillez renseigner votre email ou votre numéro de téléphone.');
      return;
    }

    // Validate email or phone format
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedId);
    const isPhone = /^[+0-9\s-]{6,20}$/.test(trimmedId);

    if (!isEmail && !isPhone) {
      setError('Format invalide. Entrez une adresse email valide ou un numéro de téléphone.');
      return;
    }

    if (!password) {
      setError('Veuillez saisir votre mot de passe.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    // Respect instruction: "Do not simulate successful login or registration. Clearly identify any backend configuration required for real authentication."
    setAuthNotice(
      'Validation locale réussie. Pour authentifier un utilisateur réel, le backend Firebase Auth ou l’API JWT doit être connecté.'
    );
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-white text-slate-800">
      {/* Top Graphic Banner with Curved Arc */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden rounded-b-[40px] bg-gradient-to-tr from-[#0047CC] via-[#0066FF] to-[#00D2FF] shadow-md">
        {/* Stadium backdrop image */}
        <img
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80"
          alt="FLASH Sports"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
        />
        {/* Dynamic curved light overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Main Login Form Container */}
      <div className="relative -mt-10 px-6 z-10 flex-1 flex flex-col justify-center">
        {/* Flash Brand Logo */}
        <div className="flex flex-col items-center mb-6">
          <FlashLogo size="lg" showTagline={true} />
          <h2 className="text-xl font-extrabold text-[#0B1A30] mt-3">
            Bienvenue sur FLASH
          </h2>
          <p className="text-xs text-slate-500 text-center max-w-xs mt-1">
            Connectez-vous à votre compte pour accéder à votre espace personnel.
          </p>
        </div>

        {/* Informative notice if submitted */}
        {authNotice && (
          <div className="mb-4 p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex flex-col gap-2 animate-in fade-in">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
              <span>{authNotice}</span>
            </div>
            <button
              type="button"
              onClick={onOpenBackendConfig}
              className="text-left font-bold text-[#0066FF] hover:underline text-[11px]"
            >
              Consulter les paramètres du backend &rarr;
            </button>
          </div>
        )}

        {/* Validation Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email or Phone Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 ml-1">
              Email ou numéro de téléphone
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setError(null);
                }}
                placeholder="ex: nom@email.com ou +33612345678"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm font-medium transition-all bg-slate-50/50"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 ml-1">
              Mot de passe
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Votre mot de passe"
                className="w-full pl-10 pr-11 py-3 rounded-2xl border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm font-medium transition-all bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password link */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate('forgot_password')}
              className="text-xs font-semibold text-[#0066FF] hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-5 rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm shadow-[0_4px_16px_rgba(0,102,255,0.3)] flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>Connexion</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">ou</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Secondary Button: Create Account */}
        <button
          onClick={() => onNavigate('register')}
          className="w-full py-3 px-5 rounded-2xl border border-blue-200 hover:border-blue-300 bg-blue-50/50 hover:bg-blue-50 text-[#0066FF] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors active:scale-98"
        >
          <UserPlus className="w-4 h-4 stroke-[2.2]" />
          <span>Créer un compte</span>
        </button>
      </div>

      {/* Footer Security Badge */}
      <div className="p-4 flex items-center justify-center gap-2 text-xs text-slate-400 border-t border-slate-50 mt-4">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Connexion sécurisée • Votre espace personnel FLASH</span>
      </div>
    </div>
  );
};
