import React, { useState } from 'react';
import {
  ArrowLeft,
  Globe,
  Sun,
  Moon,
  Bell,
  Shield,
  HelpCircle,
  Info,
  Smartphone,
  Fingerprint,
  Zap,
} from 'lucide-react';
import { ScreenType, AppSettings } from '../../types';

interface SettingsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onOpenBackendConfig: () => void;
  dark?: boolean;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigate,
  settings,
  onUpdateSettings,
  onOpenBackendConfig,
  dark = false,
}) => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className={`flex-1 overflow-y-auto ${dark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
      {/* Header */}
      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-extrabold text-[#0B1A30]">Paramètres</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* General Appearance & Language */}
        <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm space-y-2">
          <div className="px-3 pt-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Général & Affichage
          </div>

          {/* Langue */}
          <div
            onClick={() => setShowLanguageModal(true)}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Langue
              </span>
            </div>
            <span className="text-xs font-semibold text-[#0066FF] bg-blue-50 px-2.5 py-1 rounded-lg">
              {settings.language}
            </span>
          </div>

          {/* Dark / Light Theme functional toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                {settings.theme === 'dark' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  Thème d’affichage
                </span>
                <span className="text-[10px] text-slate-400">
                  {settings.theme === 'dark' ? 'Mode Sombre activé' : 'Mode Clair (recommandé)'}
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                onUpdateSettings({
                  theme: settings.theme === 'dark' ? 'light' : 'dark',
                })
              }
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.theme === 'dark' ? 'bg-[#0066FF]' : 'bg-slate-300'
              }`}
              aria-label="Basculer le thème"
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notifications & Alertes Toggles */}
        <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm space-y-2">
          <div className="px-3 pt-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Alertes & Notifications
          </div>

          {/* Push Notifications Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  Notifications Push
                </span>
                <span className="text-[10px] text-slate-400">
                  Alertes de matches et offres
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                onUpdateSettings({ pushNotifications: !settings.pushNotifications })
              }
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.pushNotifications ? 'bg-[#0066FF]' : 'bg-slate-300'
              }`}
              aria-label="Activer les notifications push"
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Goal Alerts Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  Alertes de Buts en Direct
                </span>
                <span className="text-[10px] text-slate-400">
                  Vibrations instantanées sur les buts
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                onUpdateSettings({ goalAlerts: !settings.goalAlerts })
              }
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.goalAlerts ? 'bg-[#0066FF]' : 'bg-slate-300'
              }`}
              aria-label="Activer les alertes de buts"
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.goalAlerts ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Biometrics Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Fingerprint className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  Biométrie / Empreinte
                </span>
                <span className="text-[10px] text-slate-400">
                  Déverrouillage rapide de session
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                onUpdateSettings({ biometricLogin: !settings.biometricLogin })
              }
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.biometricLogin ? 'bg-[#0066FF]' : 'bg-slate-300'
              }`}
              aria-label="Activer la biométrie"
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.biometricLogin ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Security & System Info */}
        <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm space-y-2">
          <div className="px-3 pt-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Système & Informations
          </div>

          <div
            onClick={onOpenBackendConfig}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Spécifications Backend Requis
              </span>
            </div>
            <span className="text-xs font-semibold text-sky-600">Détails &rarr;</span>
          </div>

          <div
            onClick={() => setShowAboutModal(true)}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                À propos de FLASH
              </span>
            </div>
            <span className="text-xs text-slate-400">v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl border border-slate-100 space-y-3">
            <h3 className="font-extrabold text-sm text-[#0B1A30]">
              Sélectionnez votre langue
            </h3>
            <div className="space-y-1.5">
              {[
                { code: 'Français', flag: '🇫🇷' },
                { code: 'English', flag: '🇬🇧' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onUpdateSettings({ language: lang.code });
                    setShowLanguageModal(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                    settings.language === lang.code
                      ? 'bg-blue-50 text-[#0066FF]'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.code}</span>
                  </span>
                  {settings.language === lang.code && <span>✓</span>}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowLanguageModal(false)}
              className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0066FF] flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#0B1A30]">
              FLASH - Le Sport en Temps Réel
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Application native conçue avec l’architecture moderne Kotlin et Jetpack Compose.
              Optimisée pour une réactivité extrême, une fluidité absolue et une consommation minimale de données.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 font-mono">
              Build 2026.10.12 • Jetpack Compose UI
            </div>
            <button
              onClick={() => setShowAboutModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0066FF] text-white text-xs font-bold"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
