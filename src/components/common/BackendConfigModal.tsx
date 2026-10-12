import React from 'react';
import { X, ShieldCheck, Key, Radio, Smartphone, CheckCircle2 } from 'lucide-react';

interface BackendConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendConfigModal: React.FC<BackendConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 z-10 border border-blue-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0066FF] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#0B1A30] text-base">
                Architecture & Backend Requis
              </h3>
              <p className="text-xs text-slate-500">
                Spécifications techniques pour le mode production
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 pt-4 text-xs sm:text-sm text-slate-600">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-slate-700">
            <p className="font-semibold text-[#0066FF] mb-1">
              Respect strict de l’intégrité des données
            </p>
            <p className="text-xs leading-relaxed text-slate-600">
              Conformément aux directives de développement, aucune fausse donnée
              (faux matches, scores simulés, faux soldes) n’est injectée. L’interface
              affiche des états vides officiels en attendant la connexion aux API.
            </p>
          </div>

          {/* Module 1: Auth */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-2">
              <Key className="w-4 h-4 text-[#0066FF]" />
              <span>1. Authentification & Sécurité Utilisateur</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 pl-6 list-disc">
              <li>
                <strong>Firebase Authentication</strong> ou service JWT REST API
                pour la gestion des sessions utilisateur sécurisées.
              </li>
              <li>
                <strong>Passerelle SMS OTP</strong> (Twilio, Infobip ou Orange SMS API)
                pour la vérification de téléphone et récupération de mot de passe.
              </li>
              <li>
                Chiffrement des mots de passe avec sel cryptographique (Argon2 / BCrypt).
              </li>
            </ul>
          </div>

          {/* Module 2: Live Sports Feed */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-2">
              <Radio className="w-4 h-4 text-[#0066FF]" />
              <span>2. Flux Sportif Temps Réel (Live Feeds)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 pl-6 list-disc">
              <li>
                <strong>WebSockets sécurisés (WSS)</strong> pour les scores en direct
                et variations de cotes instantanées (ex: Sportradar, API-Football).
              </li>
              <li>
                Gestion des événements : coup d’envoi, buts, cartons, possession et
                statistiques détaillées.
              </li>
            </ul>
          </div>

          {/* Module 3: Native Android Jetpack Compose */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-2">
              <Smartphone className="w-4 h-4 text-[#0066FF]" />
              <span>3. Socle Android Natif (Kotlin + Jetpack Compose)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 pl-6 list-disc">
              <li>
                Code Kotlin natif complet disponible dans le dossier <code>/android</code>.
              </li>
              <li>
                Architecture MVVM (Model-View-ViewModel), StateFlow, Retrofit2, OkHttp3
                et Hilt/Koin pour l’injection de dépendances.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Architecture validée
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
