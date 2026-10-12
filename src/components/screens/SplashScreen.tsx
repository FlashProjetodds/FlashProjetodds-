import React from 'react';
import { ArrowRight, Sparkles, UserPlus, LogIn } from 'lucide-react';
import { FlashLogo } from '../common/FlashLogo';

interface SplashScreenProps {
  onStart: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onStart,
  onLogin,
  onRegister,
}) => {
  return (
    <div className="relative min-h-full flex flex-col justify-between bg-gradient-to-b from-[#061838] via-[#092B60] to-[#041226] text-white overflow-hidden p-6">
      {/* Background dynamic light energy waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00D2FF]/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-28 w-80 h-80 rounded-full bg-[#0066FF]/25 blur-3xl" />
        <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-sky-400/15 blur-3xl" />

        {/* Abstract electric diagonal trails */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100" x2="600" y2="400" stroke="#00D2FF" strokeWidth="2" strokeDasharray="10 15" />
            <line x1="100" y1="0" x2="700" y2="500" stroke="#0066FF" strokeWidth="3" />
            <line x1="-50" y1="300" x2="550" y2="800" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="8 8" />
          </svg>
        </div>
      </div>

      {/* Top Header Branding */}
      <div className="relative z-10 pt-4 flex flex-col items-center text-center">
        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_4px_24px_rgba(0,102,255,0.3)]">
          <FlashLogo size="xl" showTagline={true} inverted={true} />
        </div>
      </div>

      {/* Middle Hero Visual Art */}
      <div className="relative z-10 my-auto py-6 flex flex-col items-center">
        {/* Dynamic hero image with glowing electric aura */}
        <div className="relative w-full max-w-xs rounded-3xl overflow-hidden border border-sky-400/30 shadow-[0_12px_40px_rgba(0,102,255,0.45)] group">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80"
            alt="FLASH Sport en direct"
            className="w-full h-64 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061838] via-transparent to-transparent" />
          
          {/* Badge indicator on photo */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              Plateforme Haute Performance
            </span>
          </div>
        </div>

        {/* Dynamic Slogan */}
        <div className="mt-6 text-center">
          <h2 className="text-3xl font-black italic tracking-tight font-display uppercase bg-gradient-to-r from-white via-sky-200 to-[#00D2FF] bg-clip-text text-transparent drop-shadow-sm">
            VIVEZ LE SPORT AUTREMENT
          </h2>
          <p className="text-xs text-sky-200/80 mt-1.5 max-w-xs mx-auto leading-relaxed">
            Scores en temps réel, analyses ultra-rapides et interface native optimisée pour l’action.
          </p>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="relative z-10 space-y-3 pb-4">
        {/* Primary CTA */}
        <button
          onClick={onStart}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00D2FF] hover:from-[#0052CC] hover:to-[#00B4D8] text-white font-bold text-sm shadow-[0_8px_25px_rgba(0,102,255,0.4)] flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <span>Accéder à l'application</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Secondary Login / Register buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onLogin}
            className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 backdrop-blur-sm transition-colors active:scale-95"
          >
            <LogIn className="w-3.5 h-3.5 text-sky-400" />
            <span>Connexion</span>
          </button>

          <button
            onClick={onRegister}
            className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 backdrop-blur-sm transition-colors active:scale-95"
          >
            <UserPlus className="w-3.5 h-3.5 text-cyan-300" />
            <span>Créer un compte</span>
          </button>
        </div>

        <p className="text-center text-[10px] text-slate-400 pt-1">
          FLASH Mobile • Édition Android Native Jetpack Compose
        </p>
      </div>
    </div>
  );
};
