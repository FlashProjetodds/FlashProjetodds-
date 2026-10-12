import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, Trophy, Search } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';
import { ScreenType } from '../../types';

interface FavoritesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  dark?: boolean;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  onNavigate,
  dark = false,
}) => {
  const [favoriteTab, setFavoriteTab] = useState<'all' | 'teams' | 'leagues'>('all');

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
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-base font-extrabold text-[#0B1A30]">
              Mes Équipes & Favoris
            </h2>
          </div>
        </div>

        <button
          onClick={() => onNavigate('search')}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Rechercher des favoris"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="p-3 bg-white border-b border-slate-100">
        <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-100 text-center">
          {[
            { id: 'all' as const, label: 'Tous (0)' },
            { id: 'teams' as const, label: 'Équipes (0)' },
            { id: 'leagues' as const, label: 'Compétitions (0)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFavoriteTab(tab.id)}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                favoriteTab === tab.id
                  ? 'bg-[#0066FF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-center">
        <EmptyState
          type="favorites"
          title="Aucun favori enregistré"
          description="Ajoutez vos équipes de cœur et tournois majeurs en favori avec l'icône étoile pour recevoir des alertes de but instantanées."
          actionText="Explorer les championnats"
          onAction={() => onNavigate('home')}
        />
      </div>
    </div>
  );
};
