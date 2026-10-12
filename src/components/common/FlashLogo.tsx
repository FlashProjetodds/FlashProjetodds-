import React from 'react';

interface FlashLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  inverted?: boolean;
  className?: string;
  onClick?: () => void;
}

export const FlashLogo: React.FC<FlashLogoProps> = ({
  size = 'md',
  showTagline = true,
  inverted = false,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl',
  };

  const taglineSizes = {
    sm: 'text-[7px] tracking-[0.18em]',
    md: 'text-[9px] tracking-[0.22em]',
    lg: 'text-[11px] tracking-[0.24em]',
    xl: 'text-xs tracking-[0.26em]',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Dynamic Lightning Bolt Icon */}
        <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
          <svg
            viewBox="0 0 40 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_2px_10px_rgba(0,102,255,0.45)]"
          >
            <defs>
              <linearGradient id="flashBoltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" />
                <stop offset="60%" stopColor="#0066FF" />
                <stop offset="100%" stopColor="#0047CC" />
              </linearGradient>
              <linearGradient id="flashBoltGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Outer lightning polygon */}
            <path
              d="M24 2L4 26H18L14 46L36 18H22L24 2Z"
              fill="url(#flashBoltGrad)"
            />
            {/* Top highlight facet */}
            <path
              d="M24 2L7 24H18L15 36L34 18H22L24 2Z"
              fill="url(#flashBoltGlow)"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Text "FLASH" with slanted electric font styling */}
        <span
          className={`font-black italic tracking-tighter uppercase font-display leading-none ${textSizes[size]} ${
            inverted
              ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]'
              : 'text-[#0B1A30]'
          }`}
          style={{ fontStyle: 'italic', transform: 'skewX(-6deg)' }}
        >
          FLASH
        </span>
      </div>

      {showTagline && (
        <span
          className={`font-bold uppercase text-[#0066FF] mt-1 ${taglineSizes[size]} ${
            inverted ? 'text-sky-300' : 'text-[#0066FF]'
          }`}
        >
          LE SPORT EN TEMPS RÉEL
        </span>
      )}
    </div>
  );
};
