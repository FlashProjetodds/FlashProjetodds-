import React from 'react';
import { Smartphone, Monitor, Code2, Database } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  isDeviceMode: boolean;
  onToggleDeviceMode: () => void;
  onOpenCodeViewer: () => void;
  onOpenBackendConfig: () => void;
  dark?: boolean;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  isDeviceMode,
  onToggleDeviceMode,
  onOpenCodeViewer,
  onOpenBackendConfig,
  dark = false,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-0 sm:p-4 select-none overflow-x-hidden">
      {/* Top Floating Utility Bar */}
      <header className="w-full max-w-5xl py-2 px-4 mb-2 flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] animate-pulse" />
          <span className="font-extrabold text-white tracking-wide">
            FLASH NATIVE ANDROID
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-[11px] text-slate-400">
            Jetpack Compose & Kotlin Foundation
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Kotlin Code Viewer Button */}
          <button
            onClick={onOpenCodeViewer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#00D2FF] font-semibold text-xs transition-colors border border-slate-700"
            title="Consulter le code Kotlin Jetpack Compose"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Code Jetpack Compose</span>
            <span className="md:hidden">Kotlin</span>
          </button>

          {/* Backend Spec Button */}
          <button
            onClick={onOpenBackendConfig}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors border border-slate-700"
            title="Configuration Backend & Données Réelles"
          >
            <Database className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Spécifications Backend</span>
            <span className="md:hidden">Backend</span>
          </button>

          {/* Frame Toggle */}
          <button
            onClick={onToggleDeviceMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs transition-colors"
            title={isDeviceMode ? 'Passer en plein écran' : 'Passer en mode cadre Android'}
          >
            {isDeviceMode ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Plein Écran</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cadre Android</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex items-center justify-center flex-1">
        {isDeviceMode ? (
          /* Realistic Android Pixel Smartphone Frame */
          <div className="relative w-full max-w-[420px] h-[92vh] max-h-[880px] bg-slate-900 rounded-[50px] p-3 shadow-[0_25px_70px_rgba(0,102,255,0.25)] border-[5px] border-slate-800 flex flex-col overflow-hidden">
            {/* Outer Device Bezel Gloss / Reflection */}
            <div className="absolute inset-0 rounded-[45px] pointer-events-none border border-slate-700/60" />

            {/* Inner Android Display Screen */}
            <div
              className={`relative w-full h-full rounded-[40px] overflow-hidden flex flex-col shadow-inner ${
                dark ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'
              }`}
            >
              {children}
            </div>
          </div>
        ) : (
          /* Full Responsive Viewport */
          <div
            className={`w-full max-w-md min-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-slate-800 ${
              dark ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'
            }`}
          >
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
