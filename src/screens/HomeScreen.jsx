import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import indiaMapClean from '../assets/india_map_clean.png';
import { templesData } from './templesData';

const mapBounds = {
  north: 13.030,
  south: 12.900,
  west: 77.530,
  east: 77.640
};

const getPinPositionFromLatLng = (lat, lng) => {
  const top = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * 100;
  const left = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;
  return {
    top: `${Math.max(0, Math.min(100, top))}%`,
    left: `${Math.max(0, Math.min(100, left))}%`
  };
};

const featuredBanners = [
  {
    id: 'b1',
    title: 'Benne Alankara Special',
    subtitle: '100kg Butter Puja at Dodda Ganesha',
    tag: 'SPECIAL PUJA',
    img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    cta: 'Book Seva',
    templeId: 'dodda-ganesha-basavanagudi'
  },
  {
    id: 'b2',
    title: 'Kadalekai Parishe Heritage',
    subtitle: 'Nandi Archana at Bull Temple',
    tag: 'LIMITED SLOTS',
    img: 'https://images.unsplash.com/photo-1600100397990-14b5850b5e6b?auto=format&fit=crop&w=600&q=80',
    cta: 'Check Slots',
    templeId: 'bull-temple-basavanagudi'
  },
  {
    id: 'b3',
    title: 'Nandishwara Teertha Seva',
    subtitle: 'Natural Spring Abhisheka at Kadu Malleshwara',
    tag: 'HERITAGE PUJA',
    img: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80',
    cta: 'Sponsor Now',
    templeId: 'kadu-malleshwara'
  }
];

const popularSevas = [
  {
    name: 'Benne Alankara Seva',
    templeName: 'Dodda Ganesha Temple',
    templeId: 'dodda-ganesha-basavanagudi',
    price: 501,
    icon: 'volunteer_activism'
  },
  {
    name: 'Maha Nandi Abhisheka',
    templeName: 'Bull Temple (Basavanagudi)',
    templeId: 'bull-temple-basavanagudi',
    price: 350,
    icon: 'temple_hindu'
  },
  {
    name: 'Rahukala Lemon Lamp Puja',
    templeName: 'Banashankari Amma Temple',
    templeId: 'banashankari-amma',
    price: 251,
    icon: 'nights_stay'
  },
  {
    name: 'Sankalpa Hanuman Chalisa',
    templeName: 'Ragigudda Anjaneya Temple',
    templeId: 'ragigudda-anjaneya',
    price: 151,
    icon: 'wb_sunny'
  }
];

export default function HomeScreen() {
  const { pushScreen, logout, selectedTemple, setSelectedTemple, setActiveBooking, playlist, currentTrackIndex, isPlaying, setIsPlaying } = useContext(AppContext);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Advanced interactive zoom & pan state
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragMovement, setDragMovement] = useState(0);
  const [touchStartDist, setTouchStartDist] = useState(null);
  const [initialScale, setInitialScale] = useState(1);
  const [containerSize, setContainerSize] = useState({ width: 400, height: 400 });
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  const containerRef = useRef(null);

  // Carousel auto-loop states & refs
  const topCarouselRef = useRef(null);
  const [topCardIndex, setTopCardIndex] = useState(0);

  const offersCarouselRef = useRef(null);
  const [offersIndex, setOffersIndex] = useState(0);

  const sevasCarouselRef = useRef(null);

  // Auto-loop for Top Banner Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (topCarouselRef.current) {
        const nextIndex = (topCardIndex + 1) % 3;
        const container = topCarouselRef.current;
        const cardWidth = container.firstElementChild ? container.firstElementChild.clientWidth + 14 : 320;
        container.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth'
        });
        setTopCardIndex(nextIndex);
      }
    }, 3500);
    return () => clearInterval(timer);
  }, [topCardIndex]);

  // Auto-loop for Sacred Offers & Updates Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (offersCarouselRef.current) {
        const nextIndex = (offersIndex + 1) % featuredBanners.length;
        const container = offersCarouselRef.current;
        const cardWidth = container.firstElementChild ? container.firstElementChild.clientWidth + 16 : 320;
        container.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth'
        });
        setOffersIndex(nextIndex);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [offersIndex]);

  // Dynamic search filtering for temples and sevas
  const queryLower = searchQuery.toLowerCase().trim();

  const filteredTemples = templesData.filter(temple => {
    if (!queryLower) return true;
    const nameMatch = temple.name.toLowerCase().includes(queryLower);
    const locMatch = temple.location.toLowerCase().includes(queryLower);
    const sevasMatch = popularSevas.some(s => s.templeId === temple.id && s.name.toLowerCase().includes(queryLower));
    return nameMatch || locMatch || sevasMatch;
  });

  const filteredSevas = popularSevas.filter(seva => {
    if (!queryLower) return true;
    return seva.name.toLowerCase().includes(queryLower) || seva.templeName.toLowerCase().includes(queryLower);
  });

  // Auto-loop for Popular Sevas Carousel
  useEffect(() => {
    let currentIdx = 0;
    const timer = setInterval(() => {
      if (sevasCarouselRef.current) {
        currentIdx = (currentIdx + 1) % popularSevas.length;
        const container = sevasCarouselRef.current;
        const cardWidth = container.firstElementChild ? container.firstElementChild.clientWidth + 16 : 220;
        container.scrollTo({
          left: currentIdx * cardWidth,
          behavior: 'smooth'
        });
      }
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Disable browser scrolling/bouncing while interacting with the map
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchMovePrevent = (e) => {
      // Prevent default page scrolling behavior when dragging or pinching the map
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    container.addEventListener('touchmove', handleTouchMovePrevent, { passive: false });
    return () => {
      container.removeEventListener('touchmove', handleTouchMovePrevent);
    };
  }, []);

  // Bounded position generator to prevent map dragging out of frame
  const getBoundedPosition = (x, y, currentScale) => {
    if (currentScale <= 1) return { x: 0, y: 0 };
    const width = containerSize.width;
    const height = containerSize.height;

    // Scale centers around the middle, meaning horizontal overflow is containerSize * (scale - 1)
    const maxPX = (width * (currentScale - 1)) / 2;
    const maxPY = (height * (currentScale - 1)) / 2;

    return {
      x: Math.max(-maxPX, Math.min(maxPX, x)),
      y: Math.max(-maxPY, Math.min(maxPY, y))
    };
  };

  // Re-bound map position on scale or container resize
  useEffect(() => {
    setPosition(prev => getBoundedPosition(prev.x, prev.y, scale));
  }, [scale, containerSize]);

  // Update container size dynamically on load/layout change
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    }
  }, []);

  const handleMouseDown = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    }
    setIsDragging(true);
    setIsScrollEnabled(false);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    setDragMovement(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    const { x, y } = getBoundedPosition(newX, newY, scale);
    setPosition({ x, y });
    setDragMovement(prev => prev + Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsScrollEnabled(true);
  };

  const handleTouchStart = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    }
    setIsScrollEnabled(false);
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
      setDragMovement(0);
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStartDist(dist);
      setInitialScale(scale);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      const { x, y } = getBoundedPosition(newX, newY, scale);
      setPosition({ x, y });
      setDragMovement(prev => prev + 5);
    } else if (e.touches.length === 2 && touchStartDist) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const newScale = Math.min(Math.max(initialScale * (dist / touchStartDist), 1), 4);
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchStartDist(null);
    setIsScrollEnabled(true);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const zoomOut = () => {
    setScale(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handlePinClick = (temple, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragMovement > 15) return;

    setSelectedTemple(temple);
    setIsSheetOpen(true);

    // Centering selection UX: auto pan/zoom directly onto selected pin
    const pinPos = getPinPositionFromLatLng(temple.lat, temple.lng);
    const leftPercent = parseFloat(pinPos.left) / 100;
    const topPercent = parseFloat(pinPos.top) / 100;

    // Zoom in slightly on selection if not already zoomed
    const targetScale = Math.max(scale, 2.2);
    setScale(targetScale);

    const targetX = containerSize.width / 2 - (containerSize.width * leftPercent) * targetScale;
    const targetY = containerSize.height / 2 - (containerSize.height * topPercent) * targetScale;

    const bounded = getBoundedPosition(targetX, targetY, targetScale);
    setPosition(bounded);
  };

  return (
    <div className="bg-navy-bg text-on-surface flex flex-col h-full relative overflow-hidden">
      {/* Top Profile Welcome Bar */}
      <header className="fixed top-0 w-full max-w-md z-40 bg-navy-bg/90 backdrop-blur-md border-b border-white-muted/10 shadow-sm flex justify-between items-center px-4 h-16">
        <div className="flex items-center gap-3">
          {/* Interactive Profile Picture (Clicking opens side drawer menu) */}
          <div
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold-primary shadow-md cursor-pointer hover:border-gold-secondary transition-all active:scale-95"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Prahasan P"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Welcome User Text */}
          <div>
            <p className="text-[10px] text-white-muted uppercase tracking-wider font-semibold">Welcome Back</p>
            <h3 className="font-extrabold text-sm text-gold-primary tracking-wide">Prahasan P</h3>
          </div>
        </div>

        {/* Notification bell button */}
        <button
          onClick={() => setShowNotifications(prev => !prev)}
          className="w-10 h-10 rounded-full bg-navy-surface border border-white-muted/10 flex items-center justify-center text-white-muted hover:text-gold-primary relative shadow-sm transition-colors"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-lg">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
        </button>
      </header>

      {/* Main Content Area - Scrollable for home screen content */}
      <main className={`flex-grow pt-16 pb-28 no-scrollbar scroll-smooth relative z-10 flex flex-col justify-start ${isScrollEnabled ? 'overflow-y-auto' : 'overflow-hidden'}`}>

        {/* Search temples and sevas */}
        <div className="px-4 mt-4">
          <div className="w-full bg-navy-surface border border-white-muted/10 focus-within:border-gold-primary/50 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-inner transition-colors">
            <span className="material-symbols-outlined text-white-muted text-base">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search temples and sevas..."
              className="w-full bg-transparent text-xs text-on-surface focus:outline-none placeholder:text-white-muted/40 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-white-muted hover:text-gold-primary transition-colors flex items-center justify-center p-0.5"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
          </div>

          {/* Active Search Result Tag / Clear Bar */}
          {searchQuery.trim() && (
            <div className="flex justify-between items-center mt-2 px-1 text-[11px] text-white-muted animate-[fadeIn_0.2s_ease-out]">
              <span>
                Found <span className="text-gold-primary font-bold">{filteredTemples.length}</span> temple{filteredTemples.length !== 1 ? 's' : ''} & <span className="text-gold-primary font-bold">{filteredSevas.length}</span> seva{filteredSevas.length !== 1 ? 's' : ''} for <span className="text-gold-primary font-bold">"{searchQuery}"</span>
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-gold-primary hover:underline font-bold text-[10px] uppercase tracking-wider"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Prominent SankalpaVani App Banner */}
        <div className="px-4 mt-4 flex-shrink-0">
          <div className="bg-gradient-to-br from-gold-primary via-gold-secondary to-amber-700 p-5 rounded-2xl relative overflow-hidden shadow-lg border border-gold-primary/20 flex gap-4 items-center">

            {/* Left side: content */}
            <div className="flex-1 flex flex-col justify-between gap-4 z-10">
              <div className="space-y-2">
                <span className="inline-block bg-navy-bg/85 backdrop-blur-sm text-gold-primary text-[8px] font-bold tracking-widest px-2.5 py-0.5 rounded-full uppercase">
                  SankalpaVani App
                </span>
                <h3 className="font-display-vertical text-base font-extrabold text-navy-bg leading-snug uppercase">
                  Your Gateway to Divine Blessings
                </h3>
                <p className="text-[10px] text-navy-bg/85 leading-relaxed font-semibold">
                  Book authentic sevas, check live darshan timings, and track your spiritual journey.
                </p>
              </div>

              <button
                onClick={() => pushScreen('about-sankalpavani')}
                className="bg-navy-bg text-gold-primary hover:bg-navy-surface hover:text-black text-[10px] font-bold uppercase tracking-wider py-2.5 px-5 rounded-full w-max shadow-md transition-colors active:scale-95"
              >
                Know More About Sankalpavani
              </button>
            </div>

            {/* Right side: Temple Gopuram silhouette SVG */}
            <div className="flex-shrink-0 flex items-center justify-center z-10 pl-1">
              <svg className="w-20 h-24 text-navy-bg/80 drop-shadow-md" viewBox="0 0 100 120" fill="currentColor">
                {/* Kalasha / Finials at the top */}
                <path d="M47 5 H53 V10 H47 Z" />
                <circle cx="50" cy="5" r="2.5" />
                <circle cx="45" cy="8" r="1.5" />
                <circle cx="55" cy="8" r="1.5" />

                {/* Tier 1 */}
                <path d="M42 12 H58 L56 22 H44 Z" />
                {/* Tier 2 */}
                <path d="M38 24 H62 L59 36 H41 Z" />
                {/* Tier 3 */}
                <path d="M34 38 H66 L63 52 H37 Z" />
                {/* Tier 4 */}
                <path d="M30 54 H70 L67 70 H33 Z" />
                {/* Tier 5 */}
                <path d="M26 72 H74 L71 90 H29 Z" />
                {/* Tier 6 (Base) */}
                <path d="M22 92 H78 V112 H22 Z" />

                {/* Entrance gate */}
                <path d="M44 112 A 6 6 0 0 1 56 112 Z" fill="#E2B774" />

                {/* dividers */}
                <rect x="40" y="22" width="20" height="2" rx="0.5" fill="#E2B774" />
                <rect x="36" y="36" width="28" height="2" rx="0.5" fill="#E2B774" />
                <rect x="32" y="52" width="36" height="2" rx="0.5" fill="#E2B774" />
                <rect x="28" y="70" width="44" height="2" rx="0.5" fill="#E2B774" />
                <rect x="24" y="90" width="52" height="2" rx="0.5" fill="#E2B774" />

                {/* windows */}
                <path d="M48 18 A 2 2 0 0 1 52 18 V22 H48 Z" fill="#E2B774" />
                <path d="M47 30 A 3 3 0 0 1 53 30 V36 H47 Z" fill="#E2B774" />
                <path d="M47 45 A 3 3 0 0 1 53 45 V52 H47 Z" fill="#E2B774" />
                <path d="M47 61 A 3 3 0 0 1 53 61 V70 H47 Z" fill="#E2B774" />
                <path d="M47 80 A 3 3 0 0 1 53 80 V90 H47 Z" fill="#E2B774" />
              </svg>
            </div>

          </div>
        </div>

        {/* Explore Temples Section - 2 Column Grid */}
        <section className="mt-6 px-4 flex-shrink-0">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-headline-sm text-xs text-on-surface font-bold uppercase tracking-wider">
              {searchQuery.trim() ? `Temples (${filteredTemples.length})` : 'Explore Temples'}
            </h3>
            <button
              onClick={() => pushScreen('temples-list')}
              className="text-gold-primary text-[10px] font-bold uppercase tracking-widest hover:text-gold-secondary transition-colors flex items-center gap-0.5"
            >
              View All <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            </button>
          </div>

          {filteredTemples.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {(searchQuery.trim() ? filteredTemples : filteredTemples.slice(0, 8)).map((temple) => (
                <div
                  key={temple.id}
                  onClick={() => {
                    setSelectedTemple(temple);
                    pushScreen('temple-detail');
                  }}
                  className="w-full bg-navy-surface rounded-xl overflow-hidden border border-white-muted/10 shadow-sm flex flex-col cursor-pointer group hover:border-gold-primary/40 transition-all transform active:scale-95"
                >
                  <div className="h-28 w-full relative overflow-hidden">
                    <img
                      alt={temple.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={temple.img}
                    />
                    <div className="absolute top-2 right-2 bg-navy-bg/85 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] border border-white-muted/10 flex items-center gap-0.5 shadow">
                      <span className="material-symbols-outlined text-gold-primary text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-bold text-on-surface">{temple.rating}</span>
                    </div>
                  </div>
                  <div className="p-2.5 flex-grow flex flex-col justify-between gap-1">
                    <div>
                      <h4 className="font-headline-sm text-xs text-gold-primary leading-snug truncate uppercase font-semibold">{temple.name}</h4>
                      <p className="text-[10px] text-white-muted truncate flex items-center gap-0.5 mt-0.5">
                        <span className="material-symbols-outlined text-[10px] text-gold-primary/80">location_on</span>
                        {temple.location.split(',').slice(-2).join(',').trim()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-1 pt-1 border-t border-white-muted/10">
                      <span className="text-[9px] font-bold text-white-muted/80 uppercase tracking-wide">{temple.distance}</span>
                      <span className="material-symbols-outlined text-[12px] text-gold-primary group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-navy-surface/50 border border-white-muted/10 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-2">
              <span className="material-symbols-outlined text-3xl text-gold-primary/40">temple_hindu</span>
              <p className="text-xs text-on-surface font-semibold">No temples found matching "{searchQuery}"</p>
              <p className="text-[10px] text-white-muted">Try searching with a different temple name or location.</p>
            </div>
          )}
        </section>

        {/* Sacred Offers & Updates Section (Moved below temples section with Auto-Loop) */}
        <section className="mt-6 px-4 flex-shrink-0">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-headline-sm text-xs text-on-surface font-bold uppercase tracking-wider">Sacred Offers & Updates</h3>
            <div className="flex gap-1.5">
              {featuredBanners.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${offersIndex === idx ? 'w-4 bg-gold-primary' : 'w-1.5 bg-on-surface/20'
                    }`}
                ></span>
              ))}
            </div>
          </div>
          <div
            ref={offersCarouselRef}
            className="flex overflow-x-auto gap-4 pb-2 scrollbar-none snap-x snap-mandatory"
          >
            {featuredBanners.map((banner) => (
              <div
                key={banner.id}
                onClick={() => {
                  if (banner.templeId) {
                    const target = templesData.find(t => t.id === banner.templeId);
                    if (target) {
                      setSelectedTemple(target);
                      pushScreen('temple-detail');
                    }
                  } else if (banner.screen) {
                    pushScreen(banner.screen);
                  }
                }}
                className="flex-shrink-0 w-80 h-36 bg-navy-surface rounded-xl overflow-hidden border border-white-muted/10 relative shadow-md snap-center cursor-pointer group hover:border-gold-primary/30 transition-all"
              >
                <img
                  alt={banner.title}
                  className="w-full h-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
                  src={banner.img}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-bg via-navy-bg/60 to-transparent p-4 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-gold-primary/20 text-gold-primary border border-gold-primary/30 uppercase tracking-widest">
                      {banner.tag}
                    </span>
                    <h4 className="font-headline-md text-sm text-on-surface font-bold mt-2 leading-tight uppercase truncate">{banner.title}</h4>
                    <p className="text-xs text-white-muted leading-tight mt-0.5 truncate">{banner.subtitle}</p>
                  </div>
                  <button className="self-start text-[10px] font-bold text-gold-primary hover:text-gold-secondary flex items-center gap-1 uppercase tracking-wider transition-colors mt-2">
                    {banner.cta} <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Sevas List with Auto-Loop */}
        <section className="mt-6 px-4 flex-shrink-0">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-headline-sm text-xs text-on-surface font-bold uppercase tracking-wider">
              {searchQuery.trim() ? `Matching Sevas (${filteredSevas.length})` : 'Popular Sevas'}
            </h3>
            <button
              onClick={() => {
                setSelectedTemple(templesData[0]);
                pushScreen('services-list');
              }}
              className="text-gold-primary text-[10px] font-bold uppercase tracking-widest hover:text-gold-secondary transition-colors"
            >
              Bookings
            </button>
          </div>
          {filteredSevas.length > 0 ? (
            <div
              ref={sevasCarouselRef}
              className="flex overflow-x-auto gap-4 pb-2 scrollbar-none snap-x snap-mandatory"
            >
              {filteredSevas.map((seva, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const target = templesData.find(t => t.id === seva.templeId) || templesData[0];
                    setSelectedTemple(target);
                    setActiveBooking(prev => ({ ...prev, temple: target.name, service: { name: seva.name, price: seva.price } }));
                    pushScreen('calendar-selection');
                  }}
                  className="flex-shrink-0 w-52 bg-navy-surface p-3 rounded-xl border border-white-muted/10 flex flex-col justify-between gap-3 shadow-md hover:border-gold-primary/30 transition-all cursor-pointer group snap-center"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-gold-primary/10 border border-gold-primary/25 flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-navy-bg transition-colors">
                      <span className="material-symbols-outlined text-lg">{seva.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline-sm text-[11px] text-on-surface font-bold leading-tight truncate uppercase">{seva.name}</h4>
                      <p className="text-[9px] text-white-muted truncate mt-0.5">{seva.templeName}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-headline-md text-xs text-gold-primary font-bold">₹{seva.price}</span>
                    <button className="bg-gold-primary/20 text-gold-primary hover:bg-gold-primary hover:text-navy-bg font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded transition-colors">
                      Quick Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-navy-surface/50 border border-white-muted/10 rounded-xl p-4 text-center">
              <p className="text-xs text-white-muted font-medium">No sevas found matching "{searchQuery}"</p>
            </div>
          )}
        </section>

        {/* Devotional Music Quick Player & Insights */}
        <section className="mt-6 mb-8 px-4 grid grid-cols-1 gap-4 flex-shrink-0">
          {/* Music Widget */}
          <div className="bg-gradient-to-r from-navy-surface to-navy-bg p-4 rounded-xl border border-white-muted/5 shadow-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-10 h-10 rounded-full bg-gold-primary/15 flex items-center justify-center text-gold-primary border border-gold-primary/20 flex-shrink-0 ${isPlaying ? 'animate-spin [animation-duration:8s]' : ''}`}>
                <span className="material-symbols-outlined text-xl">music_note</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[8px] font-bold text-gold-primary uppercase tracking-widest">NOW PLAYING</p>
                <h4 className="font-headline-sm text-xs text-black font-bold leading-tight truncate mt-0.5">
                  {playlist[currentTrackIndex]?.title || 'Spiritual Chant'}
                </h4>
                <p className="text-[10px] text-white-muted truncate mt-0.5">
                  {playlist[currentTrackIndex]?.artist || 'SankalpaVani'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
                className="w-8 h-8 rounded-full bg-gold-primary text-navy-bg flex items-center justify-center shadow hover:bg-gold-secondary transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <span className="material-symbols-outlined text-sm font-bold">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <button
                onClick={() => pushScreen('devotional-aggregator')}
                className="w-8 h-8 rounded-full bg-navy-surface border border-white-muted/10 flex items-center justify-center text-white-muted hover:text-gold-primary transition-colors"
                aria-label="Open Devotional Hub"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>

          {/* Daily Quote / Upanishad Insight */}
          <div className="bg-navy-surface/30 p-4 rounded-xl border border-white-muted/5 flex flex-col gap-2 relative overflow-hidden">
            <span className="absolute top-2 right-4 text-white-muted/5 font-display-vertical text-5xl select-none pointer-events-none">ॐ</span>
            <p className="text-[9px] font-bold text-gold-primary tracking-widest uppercase">Mantra of the Day</p>
            <p className="font-headline-sm text-xs text-black/25 leading-relaxed italic mt-1 font-semibold">
              "Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality."
            </p>
            <p className="text-[9px] text-white-muted uppercase tracking-wider self-end mt-1">— Brihadaranyaka Upanishad</p>
          </div>
        </section>

        {/* Selected Temple Slide-up Bottom Sheet Modal */}
        <div className={`fixed bottom-20 left-0 right-0 max-w-md mx-auto z-40 bg-navy-bg rounded-t-3xl pt-2 px-margin-main pb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.6)] border-t border-white-muted/10 transition-transform duration-300 ease-out transform ${(isSheetOpen && selectedTemple) ? 'translate-y-0' : 'translate-y-full opacity-0 pointer-events-none'}`}>
          {/* Pull Bar Handle and Close Button */}
          <div className="relative flex justify-between items-center mb-3 pt-1">
            <div className="w-12 h-1.5 bg-white-muted/20 rounded-full mx-auto cursor-pointer" onClick={() => setIsSheetOpen(false)}></div>
            <button
              onClick={() => setIsSheetOpen(false)}
              className="absolute right-0 top-0 text-white-muted hover:text-white transition-colors"
              aria-label="Close sheet"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <h2 className="font-headline-lg text-lg text-white mb-2 tracking-wide">Selected Temple</h2>

          {selectedTemple && (
            <div className="bg-navy-surface rounded-xl overflow-hidden border border-border-subtle shadow-lg flex flex-col group relative">
              {/* Image Container */}
              <div className="relative h-44 w-full">
                <img
                  alt={selectedTemple.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={selectedTemple.img}
                />
                {/* Distance Chip */}
                <div className="absolute top-4 right-4 bg-navy-surface/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border-subtle flex items-center gap-1 shadow-md">
                  <span className="material-symbols-outlined text-gold-primary text-[16px]">navigation</span>
                  <span className="font-label-caps text-label-caps text-on-surface">{selectedTemple.distance}</span>
                </div>
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-navy-surface to-transparent"></div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-headline-md text-headline-md text-gold-primary truncate">{selectedTemple.name}</h3>
                <div className="flex items-center text-white-muted gap-1">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <p className="font-body-md text-body-md truncate">{selectedTemple.location}</p>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-gold-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface">{selectedTemple.rating}</span>
                    <span className="font-body-md text-body-md text-white-muted">({selectedTemple.reviews})</span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveBooking(prev => ({ ...prev, temple: selectedTemple.name }));
                      pushScreen('temple-detail');
                    }}
                    className="bg-gold-primary text-navy-bg font-headline-sm text-headline-sm px-5 py-2 rounded-lg uppercase tracking-wider hover:bg-gold-secondary transition-colors active:scale-95 shadow-md font-bold"
                  >
                    View Details
                  </button>
                </div>
              </div>
              {/* Decorative Gold Line */}
              <div className="absolute top-44 w-full h-[3px] bg-gold-primary opacity-80"></div>
            </div>
          )}
        </div>
      </main>

      {/* Notifications Dialog overlay */}
      {showNotifications && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
          <div className="bg-navy-surface border border-white-muted/15 rounded-xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white-muted/10 flex justify-between items-center bg-navy-bg">
              <h3 className="font-headline-sm text-gold-primary">Spiritual Updates</h3>
              <button onClick={() => setShowNotifications(false)} className="text-white-muted hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
              <div className="border-l-2 border-gold-primary pl-3 py-1">
                <p className="text-body-md text-white font-semibold">Suprabhatha Seva Booked</p>
                <p className="text-xs text-white-muted">Your booking for Sri Venkateswara Temple is successful.</p>
              </div>
              <div className="border-l-2 border-gold-primary pl-3 py-1">
                <p className="text-body-md text-white font-semibold">Annadanam Donation Successful</p>
                <p className="text-xs text-white-muted">Thank you for contributing ₹1,000 for free meals.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Side Menu Drawer */}
      {isMenuOpen && (
        <div className="absolute inset-0 z-50 flex">
          <div className="w-64 bg-navy-bg border-r border-white-muted/10 h-full flex flex-col justify-between p-6 shadow-2xl">
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div className="font-display-vertical text-headline-sm text-gold-primary tracking-widest uppercase">
                  Sankalpavani
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-white-muted hover:text-white">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <nav className="space-y-4">
                <button
                  onClick={() => { setIsMenuOpen(false); pushScreen('home'); }}
                  className="flex items-center gap-3 text-gold-primary font-body-lg text-left w-full py-2"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>distance</span>
                  Home
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); pushScreen('devotional-aggregator'); }}
                  className="flex items-center gap-3 text-white-muted hover:text-gold-primary font-body-lg text-left w-full py-2 transition-colors"
                >
                  <span className="material-symbols-outlined">library_music</span>
                  Devotional Hub
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); pushScreen('donation'); }}
                  className="flex items-center gap-3 text-white-muted hover:text-gold-primary font-body-lg text-left w-full py-2 transition-colors"
                >
                  <span className="material-symbols-outlined">volunteer_activism</span>
                  Donation Center
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); pushScreen('bookings-history'); }}
                  className="flex items-center gap-3 text-white-muted hover:text-gold-primary font-body-lg text-left w-full py-2 transition-colors"
                >
                  <span className="material-symbols-outlined">history</span>
                  My Bookings
                </button>
              </nav>
            </div>

            <button
              onClick={() => { setIsMenuOpen(false); logout(); }}
              className="flex items-center gap-3 text-error hover:text-red-400 font-label-caps text-label-caps uppercase pt-4 border-t border-white-muted/10 w-full text-left"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Logout Session
            </button>
          </div>
          {/* Overlay to close menu */}
          <div onClick={() => setIsMenuOpen(false)} className="flex-1 bg-black/50"></div>
        </div>
      )}

      {/* Floating Embossed Bottom Nav Bar */}
      <div className="fixed bottom-4 inset-x-0 z-40 px-4 max-w-md mx-auto">
        <nav className="bg-navy-surface/95 backdrop-blur-md border border-white-muted/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex justify-around items-center h-16 px-4">
          {/* HOME */}
          <button
            onClick={() => pushScreen('home')}
            className="flex flex-col items-center justify-center text-gold-primary gap-1 transition-transform duration-300 active:scale-90 w-1/4"
          >
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>distance</span>
            <span className="text-[8px] text-gold-primary font-bold uppercase tracking-wider">HOME</span>
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
            className="flex flex-col items-center justify-center text-white-muted gap-1 hover:text-gold-primary/85 transition-transform duration-300 active:scale-90 w-1/4"
          >
            <span className="material-symbols-outlined text-[22px]">library_music</span>
            <span className="text-[8px] font-medium uppercase tracking-wider">HUB</span>
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
