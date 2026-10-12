import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, ShieldAlert, CheckCircle2, ArrowRight, KeyRound, Info } from 'lucide-react';
import { FlashLogo } from '../common/FlashLogo';
import { ScreenType } from '../../types';

interface PasswordRecoveryScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenBackendConfig: () => void;
}

export const PasswordRecoveryScreen: React.FC<PasswordRecoveryScreenProps> = ({
  onNavigate,
  onOpenBackendConfig,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = contact.trim();
    if (!trimmed) {
      setError('Veuillez renseigner votre email ou votre numéro de téléphone.');
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    const isPhone = /^[+0-9\s-]{6,20}$/.test(trimmed);

    if (!isEmail && !isPhone) {
      setError('Format invalide. Entrez un email valide ou un numéro de téléphone.');
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!code || code.length < 4) {
      setError('Veuillez entrer le code de vérification à 4 ou 6 chiffres.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError('Le nouveau mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    setSuccessNotice(
      'Validation du formulaire terminée. En production, cette réinitialisation fait appel à la passerelle SMS ou à Firebase Auth SendPasswordResetEmail.'
    );
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-white text-slate-800 p-6">
      {/* Top Bar with Back Button */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('login')}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <FlashLogo size="sm" showTagline={false} />
          <div className="w-9" />
        </div>

        {/* Heading */}
        <div className="text-center my-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#0066FF] flex items-center justify-center mx-auto mb-3 shadow-sm">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-extrabold text-[#0B1A30]">
            Mot de passe oublié
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            {step === 1
              ? 'Recevez un code sécurisé par SMS ou email pour réinitialiser votre accès.'
              : `Entrez le code reçu au ${contact} et choisissez un nouveau mot de passe.`}
          </p>
        </div>

        {/* Success Notice */}
        {successNotice && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successNotice}</span>
            </div>
            <button
              onClick={onOpenBackendConfig}
              className="text-left font-bold text-emerald-700 hover:underline text-[11px]"
            >
              Voir la configuration backend &rarr;
            </button>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1 Form */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4 mt-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 ml-1">
                Email ou numéro de téléphone associé
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    setError(null);
                  }}
                  placeholder="ex: nom@email.com ou +33612345678"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm font-medium transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm shadow-[0_4px_16px_rgba(0,102,255,0.3)] flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <span>Continuer</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        )}

        {/* Step 2 Form */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-3.5 mt-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 ml-1">
                Code de vérification (OTP)
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(null);
                }}
                maxLength={6}
                placeholder="ex: 123456"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold text-center tracking-widest bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 ml-1">
                Nouveau mot de passe
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="Minimum 6 caractères"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm font-medium transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 ml-1">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="Répétez le mot de passe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm font-medium transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm shadow-[0_4px_16px_rgba(0,102,255,0.3)] flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <span>Enregistrer le mot de passe</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 text-center"
            >
              Modifier l’adresse ou le numéro
            </button>
          </form>
        )}
      </div>

      {/* Backend requirement notice */}
      <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-2 text-[11px] text-slate-600">
        <Info className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
        <span>
          En production, l’envoi de codes SMS nécessite l’intégration d’une passerelle de messagerie (ex: Twilio / Firebase Phone Auth).
        </span>
      </div>
    </div>
  );
};
