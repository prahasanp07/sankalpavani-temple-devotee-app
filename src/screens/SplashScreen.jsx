import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function SplashScreen() {
  const { pushScreen } = useContext(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      pushScreen('onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [pushScreen]);

  return (
    <div className="bg-navy-bg min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface/50 to-navy-bg pointer-events-none z-0"></div>
      
      {/* Main Content Flex Flow */}
      <div className="z-10 flex flex-col items-center justify-center gap-6 w-full max-w-sm mx-auto text-center my-auto">
        {/* Animated Temple Icon */}
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-navy-surface border border-gold-primary/30 flex items-center justify-center shadow-[0_0_50px_rgba(220,176,107,0.2)] relative">
          <span className="material-symbols-outlined text-gold-primary text-5xl md:text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            temple_hindu
          </span>
          <div className="absolute inset-0 rounded-full border-2 border-gold-primary/40 animate-[spin_10s_linear_infinite] border-t-transparent border-l-transparent"></div>
        </div>

        {/* Brand Typography */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-headline-lg text-2xl md:text-3xl text-gold-primary tracking-widest uppercase font-bold">
            Sankalpavani
          </h1>
          <div className="h-0.5 w-16 bg-gold-secondary/50 rounded-full"></div>
          <p className="text-xs text-white-muted uppercase tracking-wider mt-1">
            Devotee Rituals & Darshan
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <p className="text-xs font-semibold text-gold-primary/80 uppercase tracking-[0.25em]">
            Awakening...
          </p>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
