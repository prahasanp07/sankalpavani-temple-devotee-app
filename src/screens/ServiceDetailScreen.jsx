import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function ServiceDetailScreen() {
  const { activeBooking, popScreen, pushScreen, setActiveBooking, selectedTemple } = useContext(AppContext);
  const service = activeBooking.service || { 
    name: 'Maha Aarti', 
    price: 501, 
    desc: 'A grand evening devotion.', 
    persons: 1, 
    extraPersonCost: 0, 
    capacity: 20, 
    timings: '06:00 AM - 12:30 PM',
    instructions: 'Dress code: Traditional attire only. Dhoti/Kurta for men, Saree/Salwar for women. Reporting time: 45 minutes prior to Seva start time.'
  };

  const includesPrasadam = service.hasPrasadam || 
    (service.name && service.name.toLowerCase().includes('prasadam')) ||
    (service.desc && service.desc.toLowerCase().includes('prasadam')) ||
    (service.instructions && service.instructions.toLowerCase().includes('prasadam'));

  const details = [
    { icon: 'schedule', title: 'Performance Timing', value: service.timings || '06:00 AM - 12:30 PM' },
    { icon: 'groups', title: 'Persons per Seva', value: `${service.persons || 1} Person(s)` },
    { icon: 'payments', title: 'Extra Person Cost', value: `₹${service.extraPersonCost || 0}` },
    { icon: 'confirmation_number', title: 'Daily Slot Capacity', value: `${service.capacity || 20} Slots` }
  ];

  return (
    <div className="bg-navy-bg text-on-surface h-full pb-24 flex flex-col overflow-y-auto relative">
      {/* Full Width Header Image (Hero Banner) */}
      <header className="relative w-full h-64 overflow-hidden">
        <img 
          alt={service.name} 
          className="w-full h-full object-cover" 
          src={selectedTemple.img}
        />
        {/* Top Nav Icons (Overlay) */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent">
          <button 
            onClick={popScreen}
            className="material-symbols-outlined text-white text-2xl drop-shadow-md hover:text-gold-primary transition-colors"
            aria-label="Back"
          >
            arrow_back
          </button>
        </div>
        
        {/* Bottom Gradient & Service Title */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-bg via-navy-bg/85 to-transparent pt-20 pb-4 px-margin-main flex flex-col justify-end">
          <h1 className="font-headline-lg text-lg text-white uppercase font-bold tracking-widest drop-shadow-md truncate">{service.name}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-margin-main max-w-lg mx-auto mt-6 flex flex-col gap-6 w-full">
        
        {/* Seva Title & Price Row */}
        <section className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <h2 className="font-headline-lg text-lg text-black uppercase font-bold leading-tight flex-1">{service.name}</h2>
            <span className="font-headline-sm text-sm text-gold-primary font-bold shrink-0 mt-0.5 whitespace-nowrap">
              INR {service.price}/person
            </span>
          </div>
          {service.type && (
            <span className="inline-block bg-gold-primary/10 text-gold-primary border border-gold-primary/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              {service.type} Seva
            </span>
          )}
        </section>

        {/* About Seva (Sthala Mahime) Section */}
        <section className="space-y-2">
          <h3 className="font-headline-sm text-xs font-bold text-gold-primary uppercase tracking-wider border-b border-white-muted/5 pb-1">About Seva (Sthala Mahime)</h3>
          <p className="font-body-md text-sm text-white-muted leading-relaxed bg-navy-surface/40 p-3.5 rounded-xl border border-white-muted/5 whitespace-pre-line">
            {service.sthalaMahime || service.aboutSeva || service.desc || service.about || 'No mythological details or background available for this seva.'}
          </p>
        </section>

        {/* Seva Details Grid */}
        <section className="space-y-3">
          <h3 className="font-headline-sm text-xs font-bold text-gold-primary uppercase tracking-wider border-b border-white-muted/5 pb-1">Seva Details</h3>
          <div className="grid grid-cols-2 gap-3">
            {details.map((detail, idx) => (
              <div key={idx} className="flex gap-2.5 bg-navy-surface p-3 rounded-lg border border-white-muted/5">
                <span className="material-symbols-outlined text-gold-primary text-[18px] shrink-0 mt-0.5">{detail.icon}</span>
                <div>
                  <h4 className="font-body-md text-[10px] text-white-muted uppercase tracking-wider font-semibold">{detail.title}</h4>
                  <p className="text-xs text-on-surface font-bold mt-0.5">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions & Arrival Guidelines Section */}
        <section className="space-y-2">
          <h3 className="font-headline-sm text-xs font-bold text-gold-primary uppercase tracking-wider border-b border-white-muted/5 pb-1">Instructions & Arrival Guidelines</h3>
          <div className="bg-navy-surface border border-gold-primary/30 p-4 rounded-xl shadow-md flex items-start gap-3">
            <span className="material-symbols-outlined text-gold-primary text-lg mt-0.5 shrink-0">info</span>
            <p className="font-body-md text-xs text-white-muted leading-relaxed whitespace-pre-line">
              {service.instructions || service.guidelines || 'Please wear traditional dress (Dhoti/Kurta for men, Saree/Salwar for women) and report 45 minutes before the seva start time.'}
            </p>
          </div>
        </section>

        {/* Prasadam Shipping Toggle */}
        {includesPrasadam && (
          <section className="space-y-3 bg-navy-surface p-4 rounded-xl border border-white-muted/5 shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-headline-sm text-xs font-bold text-gold-primary uppercase tracking-wider">Prasadam Option</h3>
                <p className="text-[10px] text-white-muted/70 mt-0.5">Choose how you want to receive the blessed offerings.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveBooking(prev => ({ ...prev, prasadamDelivery: false }))}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                    !activeBooking.prasadamDelivery
                      ? 'bg-gold-primary text-navy-bg border-gold-primary'
                      : 'bg-navy-bg border-white-muted/15 text-white-muted'
                  }`}
                >
                  In-Person
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBooking(prev => ({ ...prev, prasadamDelivery: true }))}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                    activeBooking.prasadamDelivery
                      ? 'bg-gold-primary text-navy-bg border-gold-primary'
                      : 'bg-navy-bg border-white-muted/15 text-white-muted'
                  }`}
                >
                  Home Delivery
                </button>
              </div>
            </div>
            {activeBooking.prasadamDelivery && (
              <div className="p-3 bg-gold-primary/10 border border-gold-primary/20 rounded-lg text-[10px] text-gold-primary/95 leading-normal flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">local_shipping</span>
                <span>Blessed Prasadam will be physically shipped to your address post-seva performance. Fill in shipping details on the Devotee Info screen.</span>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Floating Price & Select Slot Actions */}
      <div className="fixed bottom-0 w-full max-w-md bg-navy-bg border-t border-white-muted/10 p-margin-main pb-safe flex items-center justify-between gap-4 z-40">
        <div>
          <p className="font-label-caps text-[10px] text-white-muted uppercase">Seva Price</p>
          <p className="font-headline-sm text-lg text-gold-primary font-bold">₹{service.price}</p>
        </div>
        <button 
          onClick={() => pushScreen('calendar-selection')}
          className="bg-gold-primary text-navy-bg font-headline-sm text-sm font-bold uppercase py-3.5 px-6 rounded-xl hover:bg-gold-secondary transition-colors"
        >
          Select Date & Time
        </button>
      </div>
    </div>
  );
}
