import React from 'react';
import {
  ArrowLeft,
  Settings as SettingsIcon,
  User,
  Shield,
  SlidersHorizontal,
  Bell,
  Globe,
  Sun,
  LogOut,
  ChevronRight,
  Camera,
} from 'lucide-react';
import { ScreenType, UserProfile } from '../../types';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  dark?: boolean;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  user,
  dark = false,
}) => {
  const profileOptions = [
    {
      id: 'personal_info',
      icon: User,
      label: 'Informations personnelles',
      onClick: () => {},
    },
    {
      id: 'security',
      icon: Shield,
      label: 'Sécurité du compte',
      onClick: () => onNavigate('settings'),
    },
    {
      id: 'preferences',
      icon: SlidersHorizontal,
      label: 'Préférences sportives',
      onClick: () => onNavigate('favorites'),
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      onClick: () => onNavigate('notifications'),
    },
  ];

  return (
    <div className={`flex-1 overflow-y-auto ${dark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
      {/* Top Header with Wave Arc */}
      <div className="relative bg-gradient-to-tr from-[#0047CC] via-[#0066FF] to-[#00D2FF] text-white p-4 pb-12 rounded-b-[40px] shadow-md">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-extrabold text-white">Mon Profil</h2>
          <button
            onClick={() => onNavigate('settings')}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-colors"
            aria-label="Paramètres"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-2">
            <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] flex items-center justify-center text-white">
                <User className="w-10 h-10" />
              </div>
            </div>
            <button
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
              aria-label="Modifier la photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <h3 className="text-lg font-black tracking-tight">{user.name}</h3>
          <p className="text-xs text-sky-200 mt-0.5">{user.memberSince}</p>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="p-4 -mt-6 relative z-10 space-y-3">
        {/* Core Profile Links matching screenshot */}
        <div className="bg-white rounded-3xl p-2 border border-slate-100 shadow-sm space-y-1">
          {profileOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={opt.onClick}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {opt.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            );
          })}
        </div>

        {/* Preferences / Quick Settings */}
        <div className="bg-white rounded-3xl p-2 border border-slate-100 shadow-sm space-y-1">
          <button
            onClick={() => onNavigate('settings')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Globe className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Langue
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <span>Français</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <Sun className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Thème d’affichage
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <span>{dark ? 'Sombre' : 'Clair'}</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => onNavigate('login')}
          className="w-full py-3.5 px-5 rounded-2xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors active:scale-98 shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  );
};
