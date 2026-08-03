import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const festivals = [
  { name: 'Guru Purnima', date: 'Jul 29, 2026', desc: 'Worship of spiritual guides & gurus.' },
  { name: 'Krishna Janmashtami', date: 'Sep 03, 2026', desc: 'Birth celebration of Lord Krishna.' },
  { name: 'Ganesh Chaturthi', date: 'Sep 15, 2026', desc: 'Grand ritual honors Lord Ganesha.' }
];

export default function DevotionalAggregatorScreen() {
  const { 
    pushScreen,
    playlist, 
    currentTrackIndex, 
    setCurrentTrackIndex, 
    isPlaying, 
    setIsPlaying, 
    trackProgress, 
    setTrackProgress 
  } = useContext(AppContext);

  const [watchLive, setWatchLive] = useState(false);
  const [liveLoading, setLiveLoading] = useState(false);

  const activeTrack = playlist[currentTrackIndex];

  // Simulating music progress tracking
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTrackProgress(prev => {
          if (prev >= 100) {
            // Next track
            setCurrentTrackIndex(curr => (curr + 1) % playlist.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playlist.length, setCurrentTrackIndex, setTrackProgress]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setTrackProgress(0);
    setCurrentTrackIndex(curr => (curr + 1) % playlist.length);
    setTimeout(() => setIsPlaying(true), 200);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setTrackProgress(0);
    setCurrentTrackIndex(curr => (curr - 1 + playlist.length) % playlist.length);
    setTimeout(() => setIsPlaying(true), 200);
  };

  const startLiveFeed = () => {
    setLiveLoading(true);
    setTimeout(() => {
      setLiveLoading(false);
      setWatchLive(true);
    }, 1500);
  };

  return (
    <div className="bg-navy-bg text-on-surface h-full pb-[100px] pt-16 flex flex-col overflow-y-auto">
      {/* Top Header */}
      <header className="fixed top-0 w-full max-w-md z-45 bg-surface/85 backdrop-blur-md border-b border-white-muted/10 shadow-sm flex justify-between items-center px-margin-main h-16">
        <button 
          onClick={() => pushScreen('home')}
          className="text-white-muted hover:text-gold-secondary transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-display-vertical text-display-vertical text-gold-primary tracking-[0.2em] uppercase">SANKALPAVANI</h1>
        <div className="w-6"></div>
      </header>

      {/* Main Content */}
      <main className="px-margin-main max-w-lg mx-auto mt-6 flex flex-col gap-6 w-full">
        {/* Header Title */}
        <section className="text-center">
          <h2 className="font-headline-lg text-2xl text-gold-primary tracking-wide">DEVOTIONAL HUB</h2>
          <p className="font-body-md text-sm text-white-muted">Immerse yourself in daily spiritual practices.</p>
        </section>

        {/* Verse of the Day */}
        <section className="bg-gradient-to-br from-navy-surface to-navy-bg p-5 rounded-xl border border-gold-primary/20 relative overflow-hidden shadow-lg">
          <div className="absolute top-2 right-2 text-gold-primary/10">
            <span className="material-symbols-outlined text-[60px]" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-label-caps text-[10px] text-gold-primary uppercase tracking-widest mb-1.5 font-bold">Verse of the Day</h3>
            <p className="font-body-md text-black font-semibold text-xs leading-relaxed italic">
              "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."
            </p>
            <p className="text-[10px] text-black/70 mt-2 text-right font-semibold">— Bhagavad Gita, Chapter 2, Verse 47</p>
          </div>
        </section>

        {/* Audio Player Panel */}
        <section className="bg-navy-surface border border-white-muted/10 rounded-xl p-5 shadow-lg space-y-4">
          <h3 className="font-headline-sm text-xs text-gold-primary uppercase tracking-wider border-b border-white-muted/5 pb-1 font-bold">Devotional Audio</h3>
          
          <div className="flex flex-col items-center py-2">
            <p className="font-headline-sm text-sm text-black uppercase text-center truncate max-w-[240px] font-bold">{activeTrack.title}</p>
            <p className="font-body-md text-[11px] text-black/70 text-center mt-0.5 font-semibold">{activeTrack.artist}</p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="w-full h-1 bg-navy-bg rounded-full overflow-hidden">
              <div 
                className="h-full bg-gold-primary transition-all duration-300"
                style={{ width: `${trackProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-black/70 font-semibold">
              <span>0:{(Math.floor(trackProgress * 0.3)).toString().padStart(2, '0')}</span>
              <span>{activeTrack.duration}</span>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex justify-center items-center gap-6">
            <button onClick={handlePrev} className="text-black hover:text-gold-primary transition-colors">
              <span className="material-symbols-outlined text-[28px]">skip_previous</span>
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-gold-primary text-navy-bg flex items-center justify-center hover:bg-gold-secondary transition-colors active:scale-95 shadow-md"
            >
              <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <button onClick={handleNext} className="text-black hover:text-gold-primary transition-colors">
              <span className="material-symbols-outlined text-[28px]">skip_next</span>
            </button>
          </div>
        </section>

        {/* Live Temple Darshan Section */}
        <section className="space-y-3">
          <h3 className="font-headline-sm text-xs text-gold-primary uppercase tracking-wider font-bold">Live Temple Darshan</h3>
          
          {!watchLive ? (
            <div className="relative h-44 rounded-xl overflow-hidden border border-white-muted/10 bg-navy-surface flex flex-col items-center justify-center gap-3">
              <img 
                alt="Temple shrine placeholder" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 filter blur-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDggiCJuZroJAPe2VNlbM2wmKykM7TYwazpclexHTKwlwelVEHwxbknNYhPno1gB4PlRAOauQiUlYsZmlnKberI98v-PnUdMLC4SWLyKdB9fAddtSlkCjsDY9ehd_xkGc9XGFRuKv9XcpWxgy6H1hXKtyJVmk7yy1wr55-6ylqVE78QJogn1SoQ-RH5n07V8fLA2Aa5dlq5jdgqEeUQ9cdi4nKT2qnJLhTKkuqT-JvyXktDu-ooZAGmWjCTXoxD-vbRkXAC6ba8vxM"
              />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-gold-primary text-[42px] animate-pulse">live_tv</span>
                <button 
                  onClick={startLiveFeed}
                  disabled={liveLoading}
                  className="bg-gold-primary text-navy-bg font-label-caps text-xs uppercase px-5 py-2.5 rounded-lg font-bold shadow-md hover:bg-gold-secondary active:scale-95 transition-all"
                >
                  {liveLoading ? 'Connecting Feed...' : 'Watch Live Darshan'}
                </button>
              </div>
            </div>
          ) : (
            <div className="relative h-48 rounded-xl overflow-hidden border-2 border-gold-primary bg-black">
              {/* Fake Live Video stream */}
              <img 
                alt="Live darshan temple feed" 
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDggiCJuZroJAPe2VNlbM2wmKykM7TYwazpclexHTKwlwelVEHwxbknNYhPno1gB4PlRAOauQiUlYsZmlnKberI98v-PnUdMLC4SWLyKdB9fAddtSlkCjsDY9ehd_xkGc9XGFRuKv9XcpWxgy6H1hXKtyJVmk7yy1wr55-6ylqVE78QJogn1SoQ-RH5n07V8fLA2Aa5dlq5jdgqEeUQ9cdi4nKT2qnJLhTKkuqT-JvyXktDu-ooZAGmWjCTXoxD-vbRkXAC6ba8vxM"
              />
              <div className="absolute top-3 left-3 bg-red-600 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                LIVE
              </div>
              <button 
                onClick={() => setWatchLive(false)}
                className="absolute top-3 right-3 bg-navy-surface/80 text-white p-1 rounded-full hover:bg-navy-surface transition-colors"
              >
                <span className="material-symbols-outlined text-xs">close</span>
              </button>
              <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3 justify-between text-[10px] text-white-muted">
                <span>Sri Venkateswara Temple shrine room</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">visibility</span> 4.2k watching</span>
              </div>
            </div>
          )}
        </section>

        {/* Festival Calendar */}
        <section className="space-y-3">
          <h3 className="font-headline-sm text-xs text-gold-primary uppercase tracking-wider font-bold">Spiritual Calendar</h3>
          <div className="space-y-3">
            {festivals.map((fest, idx) => (
              <div key={idx} className="flex gap-4 bg-navy-surface p-3.5 rounded-xl border border-white-muted/5">
                <div className="bg-navy-bg p-2 rounded-lg text-gold-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-black font-semibold text-xs">{fest.name}</h4>
                    <span className="text-[9px] text-gold-primary uppercase font-bold">{fest.date}</span>
                  </div>
                  <p className="text-[10px] text-black/70 mt-1 leading-relaxed">{fest.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Embossed Bottom Nav Bar */}
      <div className="fixed bottom-4 inset-x-0 z-45 px-4 max-w-md mx-auto">
        <nav className="bg-navy-surface/95 backdrop-blur-md border border-white-muted/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex justify-around items-center h-16 px-4">
          {/* HOME */}
          <button
            onClick={() => pushScreen('home')}
            className="flex flex-col items-center justify-center text-white-muted gap-1 hover:text-gold-primary/85 transition-transform duration-300 active:scale-90 w-1/4"
          >
            <span className="material-symbols-outlined text-[22px]">distance</span>
            <span className="text-[8px] font-medium uppercase tracking-wider">HOME</span>
          </button>
          
          {/* BOOKINGS */}
          <button
            onClick={() => pushScreen('bookings-history')}
            className="flex flex-col items-center justify-center text-white-muted gap-1 hover:text-gold-primary/85 transition-transform duration-300 active:scale-90 w-1/4"
          >
            <span className="material-symbols-outlined text-[22px]">event_upcoming</span>
            <span className="text-[8px] font-medium uppercase tracking-wider">BOOKINGS</span>
          </button>
          
          {/* HUB */}
          <button
            onClick={() => pushScreen('devotional-aggregator')}
            className="flex flex-col items-center justify-center text-gold-primary gap-1 transition-transform duration-300 active:scale-90 w-1/4"
          >
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>library_music</span>
            <span className="text-[8px] text-gold-primary font-bold uppercase tracking-wider">HUB</span>
          </button>

          {/* DONATE */}
          <button
            onClick={() => pushScreen('donation')}
            className="flex flex-col items-center justify-center text-white-muted gap-1 hover:text-gold-primary/85 transition-transform duration-300 active:scale-90 w-1/4"
          >
            <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
            <span className="text-[8px] font-medium uppercase tracking-wider">DONATE</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
