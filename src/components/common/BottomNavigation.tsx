import React from 'react';
import { Home, Radio, Ticket, CalendarClock, Gamepad2 } from 'lucide-react';
import { ScreenType } from '../../types';

interface BottomNavigationProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  dark?: boolean;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentScreen,
  onNavigate,
  dark = false,
}) => {
  const navItems = [
    {
      id: 'home' as ScreenType,
      label: 'Accueil',
      icon: Home,
    },
    {
      id: 'direct' as ScreenType,
      label: 'Direct',
      icon: Radio,
    },
    {
      id: 'my_bets' as ScreenType,
      label: 'Mes paris',
      icon: Ticket,
    },
    {
      id: 'search' as ScreenType,
      label: 'À venir',
      icon: CalendarClock,
    },
    {
      id: 'gaming' as ScreenType,
      label: 'Gaming',
      icon: Gamepad2,
    },
  ];

  return (
    <nav
      className={`border-t px-2 py-1.5 flex items-center justify-around z-20 backdrop-blur-md transition-colors ${
        dark
          ? 'bg-slate-900/95 border-slate-800 text-slate-400'
          : 'bg-white/95 border-slate-100 text-slate-500 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]'
      }`}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all active:scale-95 ${
              isActive
                ? 'text-[#0066FF] font-bold'
                : 'hover:text-slate-700 text-slate-400'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                }`}
              />
              {isActive && (
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              )}
            </div>
            <span className="text-[11px] mt-1 tracking-tight leading-none">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
