import React from 'react';
import { CalendarX, Search, TicketX, BellOff, Trophy, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  type?: 'matches' | 'search' | 'bets' | 'notifications' | 'favorites' | 'history' | 'generic';
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'matches',
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  const getDefaultContent = () => {
    switch (type) {
      case 'matches':
        return {
          icon: CalendarX,
          defaultTitle: 'Aucun match disponible pour le moment',
          defaultDesc: 'Les rencontres et cotes apparaîtront automatiquement dès la synchronisation avec le flux de données sportives en direct.',
        };
      case 'search':
        return {
          icon: Search,
          defaultTitle: 'Aucun résultat trouvé',
          defaultDesc: 'Vérifiez l’orthographe ou essayez un autre nom de club, de joueur ou de compétition sportive.',
        };
      case 'bets':
        return {
          icon: TicketX,
          defaultTitle: 'Aucun pari disponible pour le moment',
          defaultDesc: 'Placez vos premiers pronostics lors des prochaines rencontres sportives officielles.',
        };
      case 'notifications':
        return {
          icon: BellOff,
          defaultTitle: 'Aucune notification pour le moment',
          defaultDesc: 'Vous serez alerté en temps réel lors des coups d’envoi, des buts et des offres exclusives.',
        };
      case 'favorites':
        return {
          icon: Trophy,
          defaultTitle: 'Aucun favori enregistré',
          defaultDesc: 'Appuyez sur l’étoile pour ajouter vos équipes, ligues et tournois favoris et les retrouver instantanément.',
        };
      case 'history':
        return {
          icon: TicketX,
          defaultTitle: 'Aucun historique pour le moment',
          defaultDesc: 'L’historique complet de vos pronostics et transactions sera archivé ici en toute transparence.',
        };
      default:
        return {
          icon: CalendarX,
          defaultTitle: 'Aucune information disponible',
          defaultDesc: 'En attente de connexion avec le serveur de données temps réel.',
        };
    }
  };

  const config = getDefaultContent();
  const IconComponent = config.icon;
  const displayTitle = title || config.defaultTitle;
  const displayDesc = description || config.defaultDesc;

  return (
    <div className={`flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-blue-50 shadow-sm ${className}`}>
      {/* Visual illustration ring matching reference screenshot */}
      <div className="relative mb-4 flex items-center justify-center">
        {/* Soft glowing concentric rings */}
        <div className="absolute w-28 h-28 rounded-full bg-blue-100/40 animate-pulse" />
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-blue-50 to-sky-100 border border-blue-100/80" />
        <div className="relative w-14 h-14 rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,102,255,0.12)] border border-blue-100 flex items-center justify-center text-[#0066FF]">
          <IconComponent className="w-7 h-7 stroke-[1.75]" />
        </div>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-[#0B1A30] max-w-xs leading-snug">
        {displayTitle}
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-2 leading-relaxed">
        {displayDesc}
      </p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066FF] text-xs sm:text-sm font-semibold transition-all active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
