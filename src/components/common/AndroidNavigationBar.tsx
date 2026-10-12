import React from 'react';

interface AndroidNavigationBarProps {
  onBack?: () => void;
  onHome?: () => void;
}

export const AndroidNavigationBar: React.FC<AndroidNavigationBarProps> = ({ onHome }) => {
  return (
    <div className="w-full py-2.5 flex items-center justify-center select-none bg-transparent">
      {/* Native Android gesture pill bar */}
      <button
        onClick={onHome}
        aria-label="Navigation principale"
        className="w-32 h-1 rounded-full bg-slate-400/70 hover:bg-slate-600 transition-colors active:scale-95"
      />
    </div>
  );
};
