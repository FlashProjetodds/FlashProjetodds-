import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Info, LogIn } from 'lucide-react';
import { FlashLogo } from '../common/FlashLogo';
import { ScreenType } from '../../types';

interface RegisterScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenBackendConfig: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigate,
  onOpenBackendConfig,
}) => {
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [regNotice, setRegNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRegNotice(null);

    if (!fullName.trim()) {
      setError('Veuillez renseigner votre nom complet.');
      return;
    }

    const trimmedId = identifier.trim();
    if (!trimmedId) {
      setError('Veuillez renseigner votre email ou votre numéro de téléphone.');
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedId);
    const isPhone = /^[+0-9\s-]{6,20}$/.test(trimmedId);

    if (!isEmail && !isPhone) {
      setError('Entrez une adresse email valide ou un numéro de téléphone.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    if (!agreeTerms) {
      setError('Veuillez accepter les conditions d’utilisation et la politique de confidentialité.');
      return;
    }

    // Do not simulate fake registration
    setRegNotice(
      'Formulaire validé avec succès. Pour enregistrer ce compte dans la base de données de production, configurez Firebase Authentication ou un serveur d’authentification sécurisé.'
    );
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-white text-slate-800">
      {/* Top Graphic Banner with Curved Arc */}
      <div className="relative w-full h-36 overflow-hidden rounded-b-[40px] bg-gradient-to-tr from-[#0047CC] via-[#0066FF] to-[#00D2FF] shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Main Registration Form Container */}
      <div className="relative -mt-10 px-6 z-10 flex-1 flex flex-col justify-center">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-5">
          <FlashLogo size="md" showTagline={true} />
          <h2 className="text-xl font-extrabold text-[#0B1A30] mt-3">
            Créer un compte
          </h2>
          <p className="text-xs text-slate-500 text-center max-w-xs mt-1">
            Rejoignez la communauté FLASH pour suivre vos équipes préférées.
          </p>
        </div>

        {/* Backend Info Notice */}
        {regNotice && (
          <div className="mb-4 p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex flex-col gap-2 animate-in fade-in">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
              <span>{regNotice}</span>
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

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Nom complet */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 ml-1">
              Nom complet
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setError(null);
                }}
                placeholder="ex: Jonathan Astro"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm font-medium transition-all bg-slate-50/50"
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm font-medium transition-all bg-slate-50/50"
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
                placeholder="Au moins 6 caractères"
                className="w-full pl-10 pr-11 py-2.5 rounded-2xl border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm font-medium transition-all bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Masquer' : 'Afficher'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 ml-1">
              Confirmer le mot de passe
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Répétez le mot de passe"
                className="w-full pl-10 pr-11 py-2.5 rounded-2xl border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm font-medium transition-all bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showConfirmPassword ? 'Masquer' : 'Afficher'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  setError(null);
                }}
                className="mt-0.5 w-4 h-4 rounded text-[#0066FF] focus:ring-[#0066FF] border-slate-300"
              />
              <span className="text-xs text-slate-600 leading-tight">
                J’accepte les{' '}
                <span className="text-[#0066FF] underline font-medium">conditions d’utilisation</span>{' '}
                et la{' '}
                <span className="text-[#0066FF] underline font-medium">politique de confidentialité</span>.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm shadow-[0_4px_16px_rgba(0,102,255,0.3)] flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>Créer mon compte</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Divider */}
        <div className="my-3 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">ou</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Back to Login */}
        <button
          onClick={() => onNavigate('login')}
          className="w-full py-2.5 px-5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors active:scale-98"
        >
          <LogIn className="w-4 h-4" />
          <span>J’ai déjà un compte</span>
        </button>
      </div>

      {/* Footer Security Badge */}
      <div className="p-4 flex items-center justify-center gap-2 text-xs text-slate-400 border-t border-slate-50 mt-3">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Connexion sécurisée</span>
      </div>
    </div>
  );
};
