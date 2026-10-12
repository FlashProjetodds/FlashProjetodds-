import React, { useState } from 'react';
import { ArrowLeft, Gamepad2, Sparkles, ChevronRight, Flame, ShieldCheck, Dice6, Dna } from 'lucide-react';
import { ScreenType } from '../../types';

interface GamingScreenProps {
  onNavigate: (screen: ScreenType) => void;
  dark?: boolean;
}

export const GamingScreen: React.FC<GamingScreenProps> = ({
  onNavigate,
  dark = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tous les jeux' },
    { id: 'virtual', label: 'Sports Virtuels' },
    { id: 'casino', label: 'Casino en direct' },
    { id: 'crash', label: 'Crash & Mines' },
    { id: 'jackpot', label: 'Jackpots' },
  ];

  const featuredOfferCards = [
    {
      id: 1,
      title: 'Tennis Virtuel',
      subtitle: 'Vivez l’intensité instantanée',
      tag: 'Virtuel 24/7',
      image:
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      title: 'Hockey Challenge',
      subtitle: 'Ressentez la vitesse sur glace',
      tag: 'Rapide & Fluide',
      image:
        'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      title: 'Multisports Arena',
      subtitle: 'Tout le sport au même endroit',
      tag: 'Nouveau',
      image:
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className={`flex-1 overflow-y-auto ${dark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
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
            <Gamepad2 className="w-5 h-5 text-[#0066FF]" />
            <h2 className="text-base font-extrabold text-[#0B1A30]">
              Espace Gaming & Offres
            </h2>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0066FF] text-[10px] font-black uppercase tracking-wider">
          FLASH GAMING
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Promotional Banner matching screenshot 2 "Nos offres" */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-blue-100">
          <div className="relative h-48 w-full">
            <img
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80"
              alt="FLASH Gaming Hero"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061838] via-[#061838]/50 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/90 text-[10px] font-extrabold uppercase tracking-wide mb-1.5 shadow-sm">
                <Sparkles className="w-2.5 h-2.5" />
                EXPÉRIENCE IMMERSIVE
              </span>
              <h3 className="text-lg font-black italic tracking-tight font-display leading-tight">
                Plus qu’un jeu, une passion
              </h3>
              <p className="text-xs text-sky-200 mt-0.5 mb-3 max-w-xs">
                Découvrez des simulations virtuelles et des animations en temps réel.
              </p>
              <button className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold transition-all shadow-md active:scale-95">
                Découvrir l’univers
              </button>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0066FF] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Category Cards matching Screenshot 2 */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              Univers Virtuels en Vedette
            </h4>
            <span className="text-[11px] text-slate-400">Certifié</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {featuredOfferCards.map((card) => (
              <div
                key={card.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white cursor-pointer hover:shadow-md transition-all active:scale-95"
              >
                <div className="relative h-28 w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-blue-600/90 text-[8px] font-bold text-white tracking-wide uppercase">
                    {card.tag}
                  </span>
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <h5 className="text-[11px] font-extrabold leading-tight">
                      {card.title}
                    </h5>
                    <p className="text-[8px] text-sky-200 line-clamp-1 mt-0.5">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Catalog integration state */}
        <div className="p-4 rounded-2xl bg-white border border-slate-100 text-center space-y-2">
          <Dice6 className="w-8 h-8 text-[#0066FF] mx-auto opacity-70" />
          <h4 className="text-xs font-bold text-slate-800">
            Intégration des fournisseurs de jeux
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Le catalogue de jeux virtuels et instantanés respecte les normes de jeu responsable. Les sessions s’activeront dès la validation du compte utilisateur.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-100 text-slate-500 text-[11px] flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Jeu responsable • Réservé aux personnes majeures (+18 ans)</span>
        </div>
      </div>
    </div>
  );
};
