import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { templesData } from './templesData';

export default function TemplesListScreen() {
  const { popScreen, pushScreen, setSelectedTemple } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', 'Basavanagudi', 'Malleswaram', 'Gavipuram', 'Ulsoor', 'Jayanagar'];

  const filteredTemples = templesData.filter(temple => {
    const matchesSearch = temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          temple.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || temple.location.toLowerCase().includes(selectedRegion.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="bg-navy-bg text-on-surface min-h-screen flex flex-col h-full relative overflow-hidden font-body-md">
      {/* Fixed Top Header */}
      <header className="fixed top-0 w-full max-w-md z-40 bg-surface/90 backdrop-blur-md border-b border-white-muted/10 shadow-sm flex items-center justify-between px-margin-main h-16">
        <button
          onClick={popScreen}
          className="text-gold-primary hover:text-gold-secondary transition-colors p-1.5 -ml-2 rounded-full focus:outline-none"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <h1 className="font-display-vertical text-display-vertical text-gold-primary tracking-[0.2em] uppercase text-center flex-grow">
          BENGALURU TEMPLES
        </h1>
        <div className="w-8"></div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-grow pt-20 pb-24 px-margin-main overflow-y-auto no-scrollbar relative z-10 flex flex-col gap-5">
        {/* Search Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-primary text-sm">
            search
          </span>
          <input
            type="text"
            placeholder="Search Bangalore temples or locality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-surface border border-white-muted/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-on-surface placeholder:text-white-muted/50 focus:outline-none focus:border-gold-primary transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white-muted/60 hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>

        {/* Region Filter Chips */}
        <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all whitespace-nowrap border ${
                selectedRegion === region
                  ? 'bg-gold-primary text-navy-bg border-gold-primary shadow-md'
                  : 'bg-navy-surface text-white-muted border-white-muted/10 hover:border-gold-primary/30'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Count Label */}
        <div className="flex items-center justify-between text-[11px] text-white-muted font-bold tracking-wider uppercase px-0.5">
          <span>Showing {filteredTemples.length} Shrines</span>
          <span className="text-gold-primary text-[10px]">Bengaluru Local Shrines</span>
        </div>

        {/* 2-Column Temples Grid */}
        {filteredTemples.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredTemples.map((temple) => (
              <div
                key={temple.id}
                onClick={() => {
                  setSelectedTemple(temple);
                  pushScreen('temple-detail');
                }}
                className="w-full bg-navy-surface rounded-xl overflow-hidden border border-white-muted/10 shadow-md flex flex-col cursor-pointer group hover:border-gold-primary/40 transition-all transform active:scale-95"
              >
                <div className="h-32 w-full relative overflow-hidden">
                  <img
                    alt={temple.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={temple.img}
                  />
                  <div className="absolute top-2 right-2 bg-navy-bg/85 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] border border-white-muted/10 flex items-center gap-0.5 shadow">
                    <span className="material-symbols-outlined text-gold-primary text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="font-bold text-on-surface">{temple.rating}</span>
                  </div>
                </div>
                <div className="p-3 flex-grow flex flex-col justify-between gap-1.5">
                  <div>
                    <h4 className="font-headline-sm text-xs text-gold-primary leading-snug truncate uppercase font-semibold">
                      {temple.name}
                    </h4>
                    <p className="text-[10px] text-white-muted truncate flex items-center gap-0.5 mt-0.5">
                      <span className="material-symbols-outlined text-[11px] text-gold-primary/80">location_on</span>
                      {temple.location}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white-muted/10">
                    <span className="text-[9px] font-bold text-white-muted/80 uppercase tracking-wide">
                      {temple.distance}
                    </span>
                    <span className="material-symbols-outlined text-[12px] text-gold-primary group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center text-white-muted gap-3">
            <span className="material-symbols-outlined text-4xl text-gold-primary/50">search_off</span>
            <p className="text-xs font-semibold">No temples found matching your criteria</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}
              className="text-[10px] font-bold text-gold-primary uppercase tracking-wider underline mt-1"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
