import React from 'react';
import {
  X,
  User,
  Home,
  Ticket,
  Clock,
  Bell,
  Star,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Database,
} from 'lucide-react';
import { ScreenType, UserProfile } from '../../types';
import { FlashLogo } from './FlashLogo';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenBackendConfig: () => void;
  user: UserProfile;
  unreadCount?: number;
  dark?: boolean;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenBackendConfig,
  user,
  unreadCount = 3,
  dark = false,
}) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      id: 'home' as ScreenType,
      label: 'Accueil',
      icon: Home,
    },
    {
      id: 'my_bets' as ScreenType,
      label: 'Mes paris',
      icon: Ticket,
    },
    {
      id: 'history' as ScreenType,
      label: 'Historique',
      icon: Clock,
    },
    {
      id: 'notifications' as ScreenType,
      label: 'Notifications',
      icon: Bell,
      badge: unreadCount,
    },
    {
      id: 'favorites' as ScreenType,
      label: 'Favoris',
      icon: Star,
    },
    {
      id: 'settings' as ScreenType,
      label: 'Paramètres',
      icon: Settings,
    },
    {
      id: 'profile' as ScreenType,
      label: 'Aide & Support',
      icon: HelpCircle,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        className={`relative w-[85%] max-w-sm h-full flex flex-col shadow-2xl z-10 transition-transform ${
          dark ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'
        }`}
      >
        {/* Top Header with Brand & Close */}
        <div className="p-4 border-b border-blue-50/80 flex items-center justify-between">
          <FlashLogo size="sm" showTagline={false} />
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div
          onClick={() => {
            onNavigate('profile');
            onClose();
          }}
          className="p-4 bg-gradient-to-r from-blue-50/70 via-sky-50/50 to-white flex items-center justify-between cursor-pointer border-b border-blue-50 hover:bg-blue-50/90 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] p-0.5 shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#0066FF]">
                <User className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="font-bold text-[#0B1A30] text-sm">
                {user.name || 'Mon compte'}
              </div>
              <div className="text-xs text-[#0066FF] font-medium">
                Voir mon profil
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0066FF] transition-all group text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-blue-100/60 flex items-center justify-center text-slate-500 group-hover:text-[#0066FF] transition-colors">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && item.badge > 0 ? (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0066FF] transition-colors" />
                </div>
              </button>
            );
          })}

          {/* Backend Config & API Status link */}
          <button
            onClick={() => {
              onOpenBackendConfig();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold text-sky-800 bg-sky-50/70 hover:bg-sky-100 transition-all text-left mt-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-bold">Architecture & Backend</span>
                <span className="text-[10px] text-sky-600">Configuration requise</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-sky-400" />
          </button>
        </div>

        {/* Footer with logout and branding */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
          <button
            onClick={() => {
              onNavigate('login');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>

          <div className="pt-2 text-center flex flex-col items-center">
            <FlashLogo size="sm" showTagline={true} />
            <span className="text-[10px] text-slate-400 mt-2">
              Version 1.0.0 (Native Jetpack Compose Foundation)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
