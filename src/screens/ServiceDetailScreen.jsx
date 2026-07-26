import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function ServiceDetailScreen() {
  const { activeBooking, popScreen, pushScreen } = useContext(AppContext);
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

  const details = [
    { icon: 'schedule', title: 'Performance Timing', value: service.timings || '06:00 AM - 12:30 PM' },
    { icon: 'groups', title: 'Persons per Seva', value: `${service.persons || 1} Person(s)` },
    { icon: 'payments', title: 'Extra Person Cost', value: `₹${service.extraPersonCost || 0}` },
    { icon: 'confirmation_number', title: 'Daily Slot Capacity', value: `${service.capacity || 20} Slots` }
  ];

  return (
    <div className="bg-navy-bg text-on-surface h-full pb-24 pt-16 flex flex-col overflow-y-auto">
      {/* Top Header */}
      <header className="fixed top-0 w-full max-w-md z-45 bg-surface/85 backdrop-blur-md border-b border-white-muted/10 shadow-sm flex justify-between items-center px-margin-main h-16">
        <button 
          onClick={popScreen}
          className="text-white-muted hover:text-gold-secondary transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-headline-md text-base text-gold-primary uppercase tracking-widest truncate max-w-[200px]">{service.name}</h1>
        <div className="w-6"></div>
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

        {/* About Seva Section */}
        <section className="space-y-2">
          <h3 className="font-headline-sm text-xs font-bold text-gold-primary uppercase tracking-wider border-b border-white-muted/5 pb-1">About Seva</h3>
          <p className="font-body-md text-sm text-white-muted leading-relaxed">
            {service.desc || service.about || 'No details available.'}
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

        {/* Instructions Section */}
        <section className="space-y-2">
          <h3 className="font-headline-sm text-xs font-bold text-gold-primary uppercase tracking-wider border-b border-white-muted/5 pb-1">Instructions</h3>
          <p className="font-body-md text-xs text-white-muted leading-relaxed bg-navy-surface p-4 rounded-xl border border-white-muted/5 whitespace-pre-line">
            {service.instructions || 'Please wear traditional dress and report 45 minutes before the seva start time.'}
          </p>
        </section>
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
