import React, { useState } from 'react';
import { ArrowLeft, Ticket, ShieldCheck, PlusCircle } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';
import { ScreenType } from '../../types';

interface MyBetsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  dark?: boolean;
}

export const MyBetsScreen: React.FC<MyBetsScreenProps> = ({
  onNavigate,
  dark = false,
}) => {
  const [filter, setFilter] = useState<'ongoing' | 'won' | 'lost' | 'all'>('ongoing');

  const tabs = [
    { id: 'ongoing' as const, label: 'En cours', count: 0 },
    { id: 'won' as const, label: 'Gagnés', count: 0 },
    { id: 'lost' as const, label: 'Perdus', count: 0 },
    { id: 'all' as const, label: 'Tous', count: 0 },
  ];

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
            <Ticket className="w-5 h-5 text-[#0066FF]" />
            <h2 className="text-base font-extrabold text-[#0B1A30]">
              Mes Paris Sportifs
            </h2>
          </div>
        </div>

        <button
          onClick={() => onNavigate('history')}
          className="text-xs font-bold text-[#0066FF] hover:underline"
        >
          Historique
        </button>
      </div>

      {/* Segmented Filter Bar */}
      <div className="p-3 bg-white border-b border-slate-100">
        <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-100">
          {tabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#0066FF] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1 opacity-75">({tab.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area adhering to Data Integrity */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-center">
        <EmptyState
          type="bets"
          title={
            filter === 'ongoing'
              ? 'Aucun pari en cours'
              : filter === 'won'
              ? 'Aucun pari gagné'
              : filter === 'lost'
              ? 'Aucun pari perdu'
              : 'Aucun pari enregistré'
          }
          description="Consultez les prochaines affiches et validez vos pronostics simples ou combinés pour les voir apparaître ici en temps réel."
          actionText="Découvrir les rencontres"
          onAction={() => onNavigate('home')}
        />

        {/* Security & Regulatory notice */}
        <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-100 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Gestion des tickets certifiée • Cotes officielles sécurisées</span>
        </div>
      </div>
    </div>
  );
};
