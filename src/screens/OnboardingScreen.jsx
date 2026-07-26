import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const slides = [
  {
    id: 1,
    title: 'SACRED JOURNEYS',
    desc: 'Experience the divine presence. Book sevas and connect with ancient traditions globally.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcAkh32OzQ2dIPBmBbO6vbQgLvvGziifR2sbnwTb2P8Oll9obhAXuaCyfGoxYtT7u59rYcw5V_oGA6SHooCC7FBQnV-BFe49qE96HkdpxRrzfHQRjDQkMaf6VTRpdd0hfPx7mO2NjE8HH9t06T6_yAQgB6UxbSJTaA-gzEb6sgsVRD2YKt75GfiAamWkF0pdqQCZvgPhUn6mT6cgpJHy1KbxTffmp5nX_L8SnyKei5sNwr57L1QxoAacHciWNEW8vwirhjepU3YY0',
    alt: 'Temple gopuram against navy sky'
  },
  {
    id: 2,
    title: 'AUTHENTIC SEVAS',
    desc: 'Select from verified temple rituals, pujas, and homa services performed directly in your name.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEV2Lzv-sFBT3BX19Y-T96xpp_PNf1Otgt5aeJSeZNGQL-xk2f0sTsrT-FSuFjiOtb2Q6SUmz7jvYV_vboJdvuNcbyhPFEPjrv2y-0vtGnbIWmw_sJQhIC13W9xKNXKp7rFfmWh-7nFrPvp2EmY9WayZFj0hskJGPaBgufV0CDMxUtwEvcphq5HPhhBe5QXZXR6ZFJpNV1lcW6Q0gnXD5E4ti9pz9EPAVGpT1fJsuO9SCCkQeg9uDL-nQ9Gh6s0wqMdtn09_x4vHc',
    alt: 'Aarti ceremony'
  },
  {
    id: 3,
    title: 'DEVOTION SIMPLIFIED',
    desc: 'Track spiritual bookings, receive live updates, download certificates, and view live darshans.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrxVkl-n9q6SbnGEx5CZXbZmDHGZ_GmPiaJ3mHZU6cb10TC1t0q7NJis_RLUF_HsrPrmdAePVEWnqXeIcBWctareGFB9liYqaBlD5jVr7JH2J_G9nuu9t7KZCwAN3IpFAg2E5AtNjU2Nff-YImwNHzIgUkWhPd21Me_XOdfNqC3EceSN3ff8p_viXTmA75B_a-sWSyDzSpOrk-4tI3vAm3piIBkKzdmh2fmD5eGMGl2Tb_3CxYKbCBxRSKw3KD4SNwlHmBn2EhE3c',
    alt: 'Ornate oil lamp in temple'
  }
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { pushScreen } = useContext(AppContext);

  // Auto-loop carousel timer (slides automatically every 4s)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      pushScreen('login');
    }
  };

  const handleSkip = () => {
    pushScreen('login');
  };

  return (
    <div className="bg-navy-bg text-on-background h-full flex flex-col justify-between overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gold-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-surface-container-lowest/50 blur-[120px]"></div>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center relative px-margin-main pb-[100px] z-10">
        <div className="w-full max-w-md mx-auto flex flex-col items-center z-10">
          {/* Carousel Image */}
          <div className="relative w-64 h-64 mb-section-gap rounded-full overflow-hidden border-4 border-gold-primary shadow-[0_0_40px_rgba(220,176,107,0.2)]">
            <img 
              alt={slides[currentSlide].alt} 
              className="w-full h-full object-cover animate-subtle-scale" 
              src={slides[currentSlide].img}
            />
            <div className="absolute inset-0 border-[6px] border-surface-container-lowest/30 rounded-full pointer-events-none"></div>
          </div>

          {/* Carousel Progress Indicators */}
          <div className="flex gap-2 mb-stack-md">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-gold-primary' : 'w-2 bg-white-muted/20'
                }`}
              ></div>
            ))}
          </div>

          {/* Carousel Content */}
          <div className="text-center w-full px-4 min-h-[140px]">
            <h1 className="font-headline-lg text-headline-lg text-gold-primary mb-stack-sm tracking-wide transition-all uppercase">
              {slides[currentSlide].title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[280px] mx-auto leading-relaxed transition-all">
              {slides[currentSlide].desc}
            </p>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Actions */}
      <div className="absolute bottom-0 left-0 w-full p-margin-main bg-gradient-to-t from-navy-bg via-navy-bg to-transparent pb-safe z-20">
        <div className="max-w-md mx-auto w-full">
          <button 
            onClick={handleNext}
            className="w-full h-14 bg-gold-primary text-navy-bg font-headline-sm text-headline-sm uppercase tracking-wider rounded-lg flex items-center justify-center hover:bg-gold-secondary transition-colors duration-300 shadow-[0_4px_14px_rgba(220,176,107,0.3)] active:scale-95"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </button>
          <div className="mt-4 text-center">
            <button 
              onClick={handleSkip}
              className="font-label-caps text-label-caps text-white-muted hover:text-gold-primary transition-colors uppercase tracking-widest"
            >
              Skip Introduction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
