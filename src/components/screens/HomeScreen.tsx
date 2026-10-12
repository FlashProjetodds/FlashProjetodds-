import React, { useState, useEffect } from 'react';
import {
  Search,
  Zap,
  Calendar,
  CalendarClock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { EmptyState } from '../common/EmptyState';
import { ScreenType, MatchTab, SportCategory } from '../../types';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  dark?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  dark = false,
}) => {
  const [activeTab, setActiveTab] = useState<MatchTab>('direct');
  const [activeCategory, setActiveCategory] = useState<SportCategory>('football');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // High definition sports banners matching reference images
  const promotionalBanners = [
    {
      id: 1,
      title: 'Vivez la passion du sport',
      subtitle: 'Matches en direct, statistiques et analyses approfondies',
      image:
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80',
      badge: 'Football Direct',
    },
    {
      id: 2,
      title: 'L’intensité des parquets',
      subtitle: 'Vivez les plus grands dunks et l’adrénaline de la ligue',
      image:
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
      badge: 'Basketball Live',
    },
    {
      id: 3,
      title: 'Chaque échange compte',
      subtitle: 'Les plus grands tournois du Grand Chelem en continu',
      image:
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80',
      badge: 'Tennis Pro',
    },
    {
      id: 4,
      title: 'Vitesse & puissance pure',
      subtitle: 'Hockey sur glace et tournois multisports haute tension',
      image:
        'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=1200&q=80',
      badge: 'Multisports',
    },
  ];

  // Auto rotate banner carousel every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % promotionalBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [promotionalBanners.length]);

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % promotionalBanners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex(
      (prev) => (prev - 1 + promotionalBanners.length) % promotionalBanners.length
    );
  };

  // Sport categories matching screenshot circular icons
  const categories = [
    {
      id: 'football' as SportCategory,
      label: 'Football',
      emoji: '⚽',
      color: 'bg-blue-50 text-[#0066FF] border-blue-200',
    },
    {
      id: 'basketball' as SportCategory,
      label: 'Basketball',
      emoji: '🏀',
      color: 'bg-orange-50 text-orange-600 border-orange-200',
    },
    {
      id: 'tennis' as SportCategory,
      label: 'Tennis',
      emoji: '🎾',
      color: 'bg-lime-50 text-lime-700 border-lime-200',
    },
    {
      id: 'handball' as SportCategory,
      label: 'Handball',
      emoji: '🤾',
      color: 'bg-sky-50 text-sky-600 border-sky-200',
    },
    {
      id: 'hockey' as SportCategory,
      label: 'Hockey',
      emoji: '🏒',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
    {
      id: 'more' as SportCategory,
      label: 'Plus',
      emoji: '⠿',
      color: 'bg-slate-100 text-slate-700 border-slate-200',
    },
  ];

  // Match navigation tabs
  const matchTabs = [
    {
      id: 'direct' as MatchTab,
      label: 'Direct',
      icon: Zap,
      activeColor: 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20',
    },
    {
      id: 'today' as MatchTab,
      label: "Aujourd'hui",
      icon: Calendar,
      activeColor: 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20',
    },
    {
      id: 'upcoming' as MatchTab,
      label: 'À venir',
      icon: CalendarClock,
      activeColor: 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20',
    },
    {
      id: 'finished' as MatchTab,
      label: 'Terminés',
      icon: CheckCircle,
      activeColor: 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20',
    },
  ];

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'direct':
        return 'Matches en direct';
      case 'today':
        return "Matches d'aujourd'hui";
      case 'upcoming':
        return 'Matches à venir';
      case 'finished':
        return 'Matches terminés';
    }
  };

  // Popular football leagues list matching screenshot 2
  const popularLeagues = [
    { id: 'ucl', name: 'Ligue des Champions', icon: '🏆', country: 'Europe' },
    { id: 'epl', name: 'Premier League', icon: '🦁', country: 'Angleterre' },
    { id: 'laliga', name: 'La Liga', icon: '🇪🇸', country: 'Espagne' },
    { id: 'seriea', name: 'Serie A', icon: '🇮🇹', country: 'Italie' },
    { id: 'bundesliga', name: 'Bundesliga', icon: '🇩🇪', country: 'Allemagne' },
    { id: 'ligue1', name: 'Ligue 1', icon: '🇫🇷', country: 'France' },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
      {/* 1. Interactive Search Bar */}
      <div
        onClick={() => onNavigate('search')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all cursor-pointer group shadow-sm ${
          dark
            ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-blue-500'
            : 'bg-white border-blue-100 text-slate-400 hover:border-[#0066FF]'
        }`}
      >
        <Search className="w-4 h-4 text-[#0066FF] shrink-0 group-hover:scale-110 transition-transform" />
        <span className="text-xs sm:text-sm font-medium truncate flex-1">
          Rechercher un match, une équipe, un championnat...
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-lg bg-blue-50 text-[#0066FF] font-bold">
          FLASH
        </span>
      </div>

      {/* 2. Promotional Banner Carousel */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-blue-100 group">
        <div className="relative h-44 sm:h-52 w-full overflow-hidden">
          {promotionalBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentBannerIndex
                  ? 'opacity-100 z-10'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Dynamic electric blue overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061838] via-[#061838]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/30 to-transparent mix-blend-color" />

              {/* Banner Text Content */}
              <div className="absolute bottom-4 left-4 right-12 z-20 text-white">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0066FF]/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-300" />
                  {banner.badge}
                </span>
                <h3 className="text-base sm:text-lg font-black italic tracking-tight font-display leading-tight drop-shadow-md">
                  {banner.title}
                </h3>
                <p className="text-[11px] text-sky-100/90 line-clamp-1 mt-0.5 max-w-sm">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Left / Right Carousel Controls */}
          <button
            onClick={prevBanner}
            aria-label="Bannière précédente"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextBanner}
            aria-label="Bannière suivante"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-2.5 right-4 z-20 flex items-center gap-1.5">
          {promotionalBanners.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentBannerIndex(dotIdx)}
              aria-label={`Aller à la diapositive ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                dotIdx === currentBannerIndex
                  ? 'w-5 bg-[#00D2FF]'
                  : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. Sport Categories Selector */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center gap-1.5 min-w-[54px] p-1.5 rounded-2xl transition-all active:scale-95 ${
                isSelected
                  ? 'bg-blue-50/80 font-bold scale-105'
                  : 'hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl shadow-sm transition-transform ${
                  isSelected
                    ? 'ring-2 ring-[#0066FF] shadow-blue-200'
                    : 'border-slate-100 bg-white'
                } ${cat.color}`}
              >
                <span>{cat.emoji}</span>
              </div>
              <span
                className={`text-[11px] tracking-tight leading-none ${
                  isSelected ? 'text-[#0066FF] font-bold' : 'text-slate-600'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Match Navigation Tabs (Segmented Control) */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/60">
        {matchTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all active:scale-95 ${
                isActive
                  ? tab.activeColor
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isActive ? 'text-white' : 'text-slate-500'
                }`}
              />
              <span className="text-[11px] sm:text-xs truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 5. Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          {activeTab === 'direct' && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
          )}
          <h2 className="text-sm font-extrabold text-[#0B1A30]">
            {getSectionTitle()}
          </h2>
        </div>

        {/* View Layout Prototype link */}
        <button
          onClick={() => onNavigate('match_detail')}
          className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1"
        >
          <span>Gabarit de match</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 6. Clean Empty State (Data Integrity) */}
      <EmptyState
        type="matches"
        title="Aucun match disponible pour le moment"
        description="Les rencontres et cotes apparaîtront automatiquement dès la synchronisation avec le flux de données sportives en direct."
        actionText="Actualiser le flux"
        onAction={() => {}}
      />

      {/* 7. Popular Leagues Quick-access Grid (from Screenshot 2) */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#0066FF]" />
            Compétitions principales
          </span>
          <span className="text-[11px] text-slate-400">Flux officiel</span>
        </div>

        <div className="space-y-1.5">
          {popularLeagues.map((league) => (
            <div
              key={league.id}
              onClick={() => onNavigate('match_detail')}
              className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-blue-50/50 border border-slate-100 hover:border-blue-100 transition-all cursor-pointer shadow-sm group active:scale-98"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{league.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#0066FF] transition-colors">
                    {league.name}
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {league.country}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0066FF] transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
