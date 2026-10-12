import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Filter } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';
import { ScreenType } from '../../types';

interface HistoryScreenProps {
  onNavigate: (screen: ScreenType) => void;
  dark?: boolean;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  onNavigate,
  dark = false,
}) => {
  const [period, setPeriod] = useState<'7days' | '30days' | 'all'>('7days');

  return (
    <div className={`flex-1 flex flex-col ${dark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
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
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#0066FF]" />
            <h2 className="text-base font-extrabold text-[#0B1A30]">
              Historique des Activités
            </h2>
          </div>
        </div>

        <button
          onClick={() => onNavigate('favorites')}
          className="text-xs font-bold text-[#0066FF] hover:underline"
        >
          Mes Favoris
        </button>
      </div>

      {/* Period Filter */}
      <div className="p-3 bg-white border-b border-slate-100 flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#0066FF]" />
          Période :
        </span>

        <div className="flex items-center gap-1.5">
          {[
            { id: '7days' as const, label: '7 jours' },
            { id: '30days' as const, label: '30 jours' },
            { id: 'all' as const, label: 'Tout' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPeriod(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                period === item.id
                  ? 'bg-blue-50 text-[#0066FF] border border-blue-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content adhering to Data Integrity */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-center">
        <EmptyState
          type="history"
          title="Aucun historique pour le moment"
          description="Toutes vos prises de paris, gains, retraits et transactions confirmées seront répertoriés dans cette section."
          actionText="Retour à l'accueil"
          onAction={() => onNavigate('home')}
        />
      </div>
    </div>
  );
};
