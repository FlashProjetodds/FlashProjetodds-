import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Share2,
  Shield,
  Activity,
  MessageSquare,
  TrendingUp,
  Users,
  Info,
} from 'lucide-react';
import { ScreenType } from '../../types';

interface MatchDetailScreenProps {
  onNavigate: (screen: ScreenType) => void;
  dark?: boolean;
}

export const MatchDetailScreen: React.FC<MatchDetailScreenProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'comments' | 'odds' | 'h2h'>('stats');
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 text-slate-800">
      {/* Stadium Top Arena Card matching screenshot */}
      <div className="relative bg-gradient-to-b from-[#061838] via-[#092B60] to-[#0D3878] text-white p-4 pb-6 rounded-b-[36px] shadow-lg">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-bold tracking-wider text-sky-200 uppercase">
            Gabarit Officiel de Rencontre
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm transition-colors ${
                isFavorite
                  ? 'bg-amber-400 text-slate-900'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              aria-label="Favori"
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
            <button
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-colors"
              aria-label="Partager"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* League Title */}
        <div className="text-center mb-3">
          <h2 className="text-sm font-extrabold tracking-wide text-sky-100">
            Ligue des Champions • Phase Finale
          </h2>
          <span className="text-[10px] text-sky-300">
            Structure prête pour flux WebSocket direct
          </span>
        </div>

        {/* Arena VS Display */}
        <div className="flex items-center justify-between px-3 py-2">
          {/* Team 1 Slot */}
          <div className="flex flex-col items-center flex-1 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shadow-inner mb-2">
              <Shield className="w-8 h-8 text-sky-300" />
            </div>
            <span className="text-xs font-bold leading-tight">Équipe Domicile</span>
            <span className="text-[10px] text-sky-200">En attente</span>
          </div>

          {/* Center VS & Status Badge */}
          <div className="flex flex-col items-center px-4">
            <div className="px-3 py-1 rounded-full bg-rose-500/90 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>DIRECT</span>
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-sky-300">
              VS
            </span>
            <span className="text-[10px] text-sky-200 font-medium">00:00</span>
          </div>

          {/* Team 2 Slot */}
          <div className="flex flex-col items-center flex-1 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shadow-inner mb-2">
              <Shield className="w-8 h-8 text-cyan-300" />
            </div>
            <span className="text-xs font-bold leading-tight">Équipe Extérieur</span>
            <span className="text-[10px] text-sky-200">En attente</span>
          </div>
        </div>
      </div>

      {/* Tabs: Stats, Commentaires, Cotes, Face à face */}
      <div className="px-4 -mt-3 relative z-10">
        <div className="bg-white p-1 rounded-2xl shadow-md border border-slate-100 grid grid-cols-4 gap-1 text-center">
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'stats'
                ? 'bg-[#0066FF] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'comments'
                ? 'bg-[#0066FF] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Direct
          </button>
          <button
            onClick={() => setActiveTab('odds')}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'odds'
                ? 'bg-[#0066FF] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Cotes
          </button>
          <button
            onClick={() => setActiveTab('h2h')}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'h2h'
                ? 'bg-[#0066FF] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            H2H
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-4">
        {/* Info card regarding real sports data integration */}
        <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-start gap-2.5 text-xs text-slate-700">
          <Info className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Architecture prête pour flux en direct :</strong> Cette interface
            est conçue pour s’alimenter dynamiquement dès la réception du flux API
            (Sportradar, API-Football ou WebSockets).
          </p>
        </div>

        {/* Tab 1: Stats Layout ready for feed */}
        {activeTab === 'stats' && (
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-5">
            <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider text-center">
              Aperçu de la Possession & Statistiques
            </h4>

            {/* Circular Possession Gauge */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#0066FF"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="110"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-slate-400 font-semibold">Possession</span>
                  <span className="text-sm font-black text-[#0B1A30]">50% / 50%</span>
                  <span className="text-[10px] text-slate-400">Équilibrée</span>
                </div>
              </div>
            </div>

            {/* Metric Comparison Rows */}
            <div className="space-y-3 pt-2">
              {[
                { label: 'Tirs au but', home: '-', away: '-' },
                { label: 'Tirs cadrés', home: '-', away: '-' },
                { label: 'Corners', home: '-', away: '-' },
                { label: 'Cartons jaunes', home: '-', away: '-' },
                { label: 'Fautes commises', home: '-', away: '-' },
              ].map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                  <span className="w-8 text-center font-bold text-slate-700">{metric.home}</span>
                  <span className="flex-1 text-center font-medium text-slate-500">{metric.label}</span>
                  <span className="w-8 text-center font-bold text-slate-700">{metric.away}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 text-center italic">
              Valeurs synchronisées en temps réel lors d’un match officiel
            </p>
          </div>
        )}

        {/* Tab 2: Comments */}
        {activeTab === 'comments' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">
              Commentaires textuels en direct
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Le fil minute par minute (actions clés, occasions, buts) s’affichera dès le coup d’envoi de la rencontre.
            </p>
          </div>
        )}

        {/* Tab 3: Odds */}
        {activeTab === 'odds' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">
              Cotes officielles des marchés
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              1N2, Double Chance, Plus/Moins de 2.5 buts. Les cotes validées par les opérateurs partenaires apparaîtront ici.
            </p>
          </div>
        )}

        {/* Tab 4: H2H */}
        {activeTab === 'h2h' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">
              Face-à-face historique
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Historique des 5 dernières confrontations et séries de victoires entre les deux équipes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
