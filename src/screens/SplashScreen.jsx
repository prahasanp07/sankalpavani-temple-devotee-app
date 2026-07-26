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
    <div className="bg-navy-bg h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface/50 to-navy-bg pointer-events-none z-0"></div>
      
      {/* Main Content Container */}
      <div className="z-10 flex flex-col items-center justify-center flex-1 w-full px-margin-main relative">
        {/* Logo Area */}
        <div className="flex flex-col items-center justify-center fade-in-up delay-100 mb-stack-md">
          {/* Icon placeholder - represents the temple/spiritual motif */}
          <div className="w-32 h-32 mb-stack-sm rounded-full bg-navy-surface border border-gold-primary/20 flex items-center justify-center shadow-[0_0_40px_rgba(220,176,107,0.15)] pulse-gold relative">
            <span className="material-symbols-outlined text-gold-primary" style={{ fontSize: '64px', fontVariationSettings: "'FILL' 1" }}>
              temple_hindu
            </span>
            <div className="absolute inset-0 rounded-full border border-gold-primary/30 animate-[spin_10s_linear_infinite] border-t-transparent border-l-transparent"></div>
          </div>
          {/* Brand Typography */}
          <h1 className="font-headline-lg text-headline-lg text-gold-primary tracking-widest uppercase text-center mt-stack-sm">
            Sankalpavani
          </h1>
          <div className="h-[2px] w-16 bg-gold-secondary/50 mt-stack-sm rounded-full"></div>
        </div>
      </div>
      
      {/* Loading State at bottom */}
      <div className="z-10 absolute bottom-stack-lg w-full flex flex-col items-center justify-center fade-in-up delay-500">
        <p className="font-label-caps text-label-caps text-white-muted uppercase tracking-[0.2em] mb-4">
          Awakening...
        </p>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-gold-primary pulse-gold" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 rounded-full bg-gold-primary pulse-gold" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-gold-primary pulse-gold" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
