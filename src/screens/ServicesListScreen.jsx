import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const allServices = [
  {
    id: 'maha-aarti',
    name: 'Maha Aarti',
    desc: 'A grand evening devotion featuring elaborate lamp offerings, chanting, and divine blessings.',
    price: 501,
    persons: 1,
    extraPersonCost: 0,
    capacity: 100,
    timings: '06:00 PM - 07:30 PM',
    type: 'Daily',
    instructions: 'Be seated in the main hall by 05:45 PM.\nDress code: Decent traditional/formal attire.'
  },
  {
    id: 'rudrabhishekam',
    name: 'Rudrabhishekam',
    desc: 'Sacred bathing of the Shiva Lingam for peace, prosperity, and spiritual purification.',
    price: 1116,
    persons: 2,
    extraPersonCost: 200,
    capacity: 20,
    timings: '08:00 AM - 10:00 AM',
    type: 'Special',
    instructions: 'Devotees sit around the inner sanctum. Milk/honey will be provided by the temple.\nDress code: Strict traditional attire only (Dhoti for men, Saree for women).'
  },
  {
    id: 'ganapathi-homa',
    name: 'Ganapathi Homa',
    desc: 'Invoke Lord Ganesha to remove obstacles and bless new beginnings through sacred fire.',
    price: 2100,
    persons: 4,
    extraPersonCost: 500,
    capacity: 10,
    timings: '07:30 AM - 11:30 AM',
    type: 'Special',
    instructions: 'Performed at the main homam pit. Complete family participation allowed.\nDress code: Strict traditional attire.'
  },
  {
    id: 'friday-abhishekam',
    name: 'Friday Abhishekam',
    desc: 'Holy bathing ritual of the main deity.',
    price: 500,
    persons: 2,
    extraPersonCost: 100,
    capacity: 15,
    timings: '08:00 AM - 10:30 AM',
    type: 'Weekly',
    instructions: 'Holy prasadam and vastram will be distributed after the bathing ritual.\nDress code: Saree/Salwar for women, Dhoti/Veshti with shalya for men.'
  },
  {
    id: 'sankashta-chaturthi',
    name: 'Sankashta Chaturthi',
    desc: 'Monthly Ganesha puja for obstacle removal.',
    price: 300,
    persons: 1,
    extraPersonCost: 50,
    capacity: 50,
    timings: '05:30 PM - 08:00 PM',
    type: 'Monthly',
    instructions: 'Performed on Chaturthi evening. Modak prasadam will be provided to pilgrims.\nDress code: Traditional attire.'
  },
  {
    id: 'dhanur-masa-archana',
    name: 'Dhanur Masa Archana',
    desc: 'Early morning special worship in Margazhi.',
    price: 150,
    persons: 1,
    extraPersonCost: 0,
    capacity: 50,
    timings: '05:00 AM - 06:30 AM',
    type: 'Dhanur Masa',
    instructions: 'Early morning Margazhi worship. Pongal prasadam is distributed to all devotees.\nDress code: Traditional attire.'
  },
  {
    id: 'pushpanjali',
    name: 'Pushpanjali',
    desc: 'An offering of fragrant, fresh flowers accompanied by chanting of specific mantras.',
    price: 251,
    persons: 1,
    extraPersonCost: 0,
    capacity: 150,
    timings: '09:00 AM - 08:30 PM',
    type: 'Daily',
    instructions: 'Devotees receive flower petals to offer. Chants are led by chief priests.\nDress code: Decent casual/traditional attire.'
  }
];

export default function ServicesListScreen() {
  const { pushScreen, selectService } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Daily', 'Weekly', 'Monthly', 'Special', 'Dhanur Masa'];

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-navy-bg text-on-surface h-full pb-[100px] pt-16 flex flex-col overflow-y-auto">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full max-w-md z-40 bg-surface/85 backdrop-blur-md border-b border-white-muted/10 shadow-sm flex justify-between items-center px-margin-main h-16">
        <button 
          onClick={() => pushScreen('home')}
          className="text-white-muted hover:text-gold-secondary transition-colors scale-95 active:duration-150"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-display-vertical text-display-vertical text-gold-primary tracking-[0.2em] uppercase">SANKALPAVANI</h1>
        <div className="w-6"></div>
      </header>

      {/* Main Content */}
      <main className="px-margin-main max-w-lg mx-auto mt-6 flex flex-col gap-6 w-full">
        {/* Header Section */}
        <section className="flex flex-col gap-2 text-center">
          <h2 className="font-headline-lg text-2xl text-gold-primary tracking-wide">SACRED SEVAS</h2>
          <p className="font-body-md text-sm text-white-muted max-w-xs mx-auto">Explore our spiritual offerings and find the perfect ceremony for your devotion.</p>
        </section>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <input 
            type="text"
            className="w-full bg-navy-surface border border-white-muted/10 text-on-surface text-sm rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all duration-300 placeholder:text-white-muted/30"
            placeholder="Search Sevas (e.g. Aarti, Homa)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="material-symbols-outlined absolute left-3 text-white-muted/40 text-[20px] pointer-events-none">search</span>
        </div>

        {/* Category Pill Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-gold-primary text-navy-bg border-gold-primary'
                  : 'bg-navy-surface border-white-muted/10 text-white-muted hover:border-gold-primary/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <section className="grid grid-cols-1 gap-4">
          {filteredServices.map((service) => (
            <article 
              key={service.id}
              className="bg-navy-surface border border-white-muted/10 rounded-xl overflow-hidden flex flex-col shadow-sm transition-all duration-300 hover:border-gold-primary/30"
            >
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-headline-md text-lg text-gold-primary uppercase mb-1">{service.name}</h3>
                <p className="font-body-md text-xs text-white-muted mb-4 leading-relaxed">{service.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white-muted/10">
                  <span className="font-headline-sm text-base text-gold-primary font-bold">₹{service.price}</span>
                  <button 
                    onClick={() => selectService(service)}
                    className="bg-gold-primary text-navy-bg font-label-caps text-xs uppercase px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-gold-secondary transition-colors active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))}
          
          {filteredServices.length === 0 && (
            <p className="text-center text-white-muted/50 py-8">No matching services found.</p>
          )}
        </section>
      </main>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 w-full max-w-md z-40 border-t border-white-muted/5 bg-navy-surface shadow-[0_-4px_20px_rgba(0,0,0,0.4)] flex justify-around items-center h-20 pb-safe">
        <button 
          onClick={() => pushScreen('home')}
          className="flex flex-col items-center justify-center text-white-muted/60 gap-1 hover:text-gold-primary/80 transition-transform duration-300 active:scale-90 w-1/3"
        >
          <span className="material-symbols-outlined text-[24px]">distance</span>
          <span className="font-label-caps text-[10px] uppercase">HOME</span>
        </button>
        <button 
          onClick={() => pushScreen('bookings-history')}
          className="flex flex-col items-center justify-center text-gold-primary gap-1 transition-transform duration-300 active:scale-90 w-1/3"
        >
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>event_upcoming</span>
          <span className="font-label-caps text-[10px] text-gold-primary font-bold uppercase">BOOKINGS</span>
        </button>
        <button 
          onClick={() => pushScreen('devotional-aggregator')}
          className="flex flex-col items-center justify-center text-white-muted/60 gap-1 hover:text-gold-primary/80 transition-transform duration-300 active:scale-90 w-1/3"
        >
          <span className="material-symbols-outlined text-[24px]">library_music</span>
          <span className="font-label-caps text-[10px] uppercase">HUB</span>
        </button>
      </nav>
    </div>
  );
}
