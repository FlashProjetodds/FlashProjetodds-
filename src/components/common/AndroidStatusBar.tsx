import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface AndroidStatusBarProps {
  dark?: boolean;
}

export const AndroidStatusBar: React.FC<AndroidStatusBarProps> = ({ dark = false }) => {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const textColor = dark ? 'text-white' : 'text-slate-800';

  return (
    <div className={`w-full px-5 pt-3 pb-1 flex items-center justify-between text-xs font-semibold select-none z-30 transition-colors ${textColor}`}>
      {/* Time */}
      <span className="tracking-tight text-[13px]">{time}</span>

      {/* Camera Hole Punch centered in Android status bar */}
      <div className="w-3.5 h-3.5 rounded-full bg-slate-900/90 shadow-inner border border-slate-700/40 pointer-events-none" />

      {/* Status Icons */}
      <div className="flex items-center gap-1.5">
        <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
        <span className="text-[10px] font-bold tracking-tight">5G</span>
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
        <BatteryMedium className="w-4 h-4 stroke-[2.2]" />
      </div>
    </div>
  );
};
