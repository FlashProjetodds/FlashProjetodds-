import React, { useState } from 'react';
import { ArrowLeft, Search, X, ChevronRight, TrendingUp, Sparkles } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';
import { ScreenType } from '../../types';

interface SearchScreenProps {
  onNavigate: (screen: ScreenType) => void;
  dark?: boolean;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onNavigate,
  dark = false,
}) => {
  const [query, setQuery] = useState('');

  const popularSearches = [
    { id: 1, name: 'Ligue des Champions', type: 'Compétition Football', icon: '🏆' },
    { id: 2, name: 'Premier League', type: 'Championnat Angleterre', icon: '🦁' },
    { id: 3, name: 'Real Madrid', type: 'Club de football', icon: '⚽' },
    { id: 4, name: 'FC Barcelone', type: 'Club de football', icon: '⚽' },
    { id: 5, name: 'Tennis Grand Chelem', type: 'Tournoi majeur', icon: '🎾' },
    { id: 6, name: 'NBA Playoffs', type: 'Basketball USA', icon: '🏀' },
  ];

  return (
    <div className={`flex-1 flex flex-col ${dark ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'}`}>
      {/* Search Header Bar */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <button
          onClick={() => onNavigate('home')}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Retour"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Input Field */}
        <div className="flex-1 relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un match, une équipe, un championnat..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm font-medium transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 text-slate-400 hover:text-slate-600"
              aria-label="Effacer la recherche"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {query.trim() === '' ? (
          <div>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#0066FF]" />
                Recherches populaires
              </h3>
              <span className="text-[11px] text-sky-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Tendances
              </span>
            </div>

            {/* Popular Items List matching screenshot */}
            <div className="space-y-2">
              {popularSearches.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setQuery(item.name)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-100 hover:border-blue-100 transition-all cursor-pointer group active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0066FF] transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0066FF] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Search results state complying with data integrity */
          <div className="py-6">
            <EmptyState
              type="search"
              title={`Aucun résultat trouvé pour « ${query} »`}
              description="Aucune compétition officielle ou équipe correspondante n'est actuellement indexée dans le catalogue local."
              actionText="Effacer la saisie"
              onAction={() => setQuery('')}
            />
          </div>
        )}
      </div>
    </div>
  );
};
