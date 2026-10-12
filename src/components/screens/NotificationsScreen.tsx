import React, { useState } from 'react';
import { ArrowLeft, Zap, Bell, Trophy, Gift, Trash2, CheckCheck } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';
import { ScreenType, AppNotification } from '../../types';

interface NotificationsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  dark?: boolean;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onNavigate,
  dark = false,
}) => {
  const [filter, setFilter] = useState<'all' | 'favorites' | 'info'>('all');

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: '1',
      title: 'Bienvenue sur FLASH !',
      description: 'Profitez d’une expérience sportive unique, fluide et ultra-dynamique.',
      timeAgo: 'Il y a 2 min',
      category: 'system',
      iconType: 'lightning',
      read: false,
    },
    {
      id: '2',
      title: 'Mise à jour des matches',
      description: 'De nouvelles rencontres et championnats majeurs seront bientôt disponibles.',
      timeAgo: 'Il y a 1 h',
      category: 'infos',
      iconType: 'bell',
      read: false,
    },
    {
      id: '3',
      title: 'Nouveautés & Fonctionnalités',
      description: 'Découvrez bientôt les notifications push personnalisées et alertes de buts instantanées.',
      timeAgo: 'Il y a 1 jour',
      category: 'infos',
      iconType: 'trophy',
      read: false,
    },
    {
      id: '4',
      title: 'Offre spéciale de bienvenue',
      description: 'Profitez d’une interface conçue pour les passionnés de statistiques et de paris sportifs.',
      timeAgo: 'Il y a 2 jours',
      category: 'infos',
      iconType: 'gift',
      read: false,
    },
  ]);

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'favorites') return n.category === 'favoris';
    if (filter === 'info') return n.category === 'infos' || n.category === 'system';
    return true;
  });

  const getIcon = (type: AppNotification['iconType']) => {
    switch (type) {
      case 'lightning':
        return <Zap className="w-4 h-4 text-[#0066FF]" />;
      case 'bell':
        return <Bell className="w-4 h-4 text-sky-500" />;
      case 'trophy':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'gift':
        return <Gift className="w-4 h-4 text-emerald-500" />;
      default:
        return <Bell className="w-4 h-4 text-[#0066FF]" />;
    }
  };

  return (
    <div className={`flex-1 flex flex-col ${dark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
      {/* Header matching screenshot 1 */}
      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-extrabold text-[#0B1A30]">
            Notifications
          </h2>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 p-1"
              title="Tout marquer comme lu"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={handleClearAll}
              className="text-xs font-bold text-[#0066FF] hover:underline"
            >
              Tout effacer
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs matching screenshot */}
      <div className="p-3 bg-white border-b border-slate-100">
        <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-100 text-center">
          {[
            { id: 'all' as const, label: 'Toutes' },
            { id: 'favorites' as const, label: 'Favoris' },
            { id: 'info' as const, label: 'Infos' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === tab.id
                  ? 'bg-[#0066FF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                notif.read
                  ? 'bg-white border-slate-100 opacity-80'
                  : 'bg-white border-blue-100 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notif.iconType)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B1A30] truncate">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {notif.timeAgo}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {notif.description}
                  </p>
                </div>

                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-[#0066FF] shrink-0 mt-2" />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col justify-center">
            <EmptyState
              type="notifications"
              title="Aucune notification"
              description="Votre boîte de notifications est à jour. Vous recevrez des alertes lors des événements importants."
            />
          </div>
        )}
      </div>
    </div>
  );
};
