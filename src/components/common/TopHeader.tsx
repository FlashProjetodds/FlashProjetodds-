import React from 'react';
import { Menu, Wallet, User, Bell } from 'lucide-react';
import { FlashLogo } from './FlashLogo';
import { UserProfile, ScreenType } from '../../types';

interface TopHeaderProps {
  onOpenDrawer: () => void;
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  unreadCount?: number;
  dark?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenDrawer,
  onNavigate,
  user,
  unreadCount = 3,
  dark = false,
}) => {
  return (
    <header
      className={`px-4 pt-2 pb-2.5 flex items-center justify-between border-b transition-colors ${
        dark
          ? 'bg-slate-900 border-slate-800 text-white'
          : 'bg-white border-blue-50/60 text-slate-800'
      }`}
    >
      {/* Drawer Toggle & Brand */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenDrawer}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors active:scale-95"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-5 h-5 stroke-[2.2]" />
        </button>

        <FlashLogo
          size="sm"
          showTagline={false}
          onClick={() => onNavigate('home')}
        />
      </div>

      {/* Right Controls: Balance + Notifications + Avatar */}
      <div className="flex items-center gap-2">
        {/* Solde Pill: "Solde 0 FCFA >" adhering to zero fake balance */}
        <button
          onClick={() => onNavigate('my_bets')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-100/80 text-[#0066FF] hover:bg-blue-100 transition-all text-xs font-bold active:scale-95 shadow-sm"
          title="Consulter le solde du compte"
        >
          <Wallet className="w-3.5 h-3.5 text-[#0066FF]" />
          <span className="text-[11px] font-semibold text-slate-600">Solde</span>
          <span className="text-[11px] font-bold text-[#0066FF]">
            {user.balance} {user.currency}
          </span>
        </button>

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => onNavigate('notifications')}
          className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 stroke-[2]" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => onNavigate('profile')}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] p-0.5 shadow-sm active:scale-95 transition-transform"
          aria-label="Mon profil"
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#0066FF]">
            <User className="w-4 h-4" />
          </div>
        </button>
      </div>
    </header>
  );
};
