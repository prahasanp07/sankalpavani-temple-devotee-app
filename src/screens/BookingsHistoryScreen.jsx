import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function BookingsHistoryScreen() {
  const { bookingsHistory, pushScreen } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const upcomingBookings = bookingsHistory.filter(b => b.status === 'Upcoming');
  const pastBookings = bookingsHistory.filter(b => b.status === 'Completed');

  const visibleBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  const getReportingTime = (timeStr) => {
    if (!timeStr) return '30 minutes before performance';
    const parts = timeStr.split(' ');
    if (parts.length === 2) {
      const timeParts = parts[0].split(':');
      if (timeParts.length === 2) {
        let hrs = parseInt(timeParts[0]);
        let mins = parseInt(timeParts[1]);
        mins -= 30;
        if (mins < 0) {
          mins += 60;
          hrs -= 1;
          if (hrs <= 0) {
            hrs = 12;
          }
        }
        const padMins = String(mins).padStart(2, '0');
        const padHrs = String(hrs).padStart(2, '0');
        return `${padHrs}:${padMins} ${parts[1]}`;
      }
    }
    return '30 minutes before performance';
  };

  const getEntryGate = (sevaName) => {
    if (!sevaName) return 'Gate 1 - Main Entrance';
    const name = sevaName.toLowerCase();
    if (name.includes('special') || name.includes('darshan')) return 'Special Entry Gate (North Gopuram)';
    if (name.includes('homa') || name.includes('abhishekam')) return 'Yaga Shala / Inner Sanctum Entry';
    return 'Gate 1 - Main Entrance';
  };

  return (
    <div className="bg-navy-bg text-on-surface h-full pb-[100px] pt-16 flex flex-col overflow-y-auto">
      {/* Top Header */}
      <header className="fixed top-0 w-full max-w-md z-40 bg-surface/85 backdrop-blur-md border-b border-white-muted/10 shadow-sm flex justify-between items-center px-margin-main h-16">
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
          <h2 className="font-headline-lg text-2xl text-gold-primary tracking-wide">MY BOOKINGS</h2>
          <p className="font-body-md text-sm text-white-muted">Manage your upcoming and past temple sevas.</p>
        </section>

        {/* Tab Toggle */}
        <div className="flex border-b border-white-muted/10">
          <button 
            onClick={() => { setActiveTab('upcoming'); setSelectedTicket(null); }}
            className={`flex-1 text-center py-3 font-label-caps text-xs uppercase transition-colors border-b-2 font-bold ${
              activeTab === 'upcoming' ? 'text-gold-primary border-gold-primary' : 'text-white-muted border-transparent hover:text-white'
            }`}
          >
            Upcoming Sevas ({upcomingBookings.length})
          </button>
          <button 
            onClick={() => { setActiveTab('past'); setSelectedTicket(null); }}
            className={`flex-1 text-center py-3 font-label-caps text-xs uppercase transition-colors border-b-2 font-bold ${
              activeTab === 'past' ? 'text-gold-primary border-gold-primary' : 'text-white-muted border-transparent hover:text-white'
            }`}
          >
            Past Sevas ({pastBookings.length})
          </button>
        </div>

        {/* Bookings List */}
        <section className="space-y-4">
          {visibleBookings.map((booking) => (
            <div 
              key={booking.id}
              className="bg-navy-surface border border-white-muted/10 rounded-xl p-4 flex flex-col gap-3 shadow-md hover:border-gold-primary/20 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-black font-semibold text-sm truncate max-w-[200px]">{booking.temple}</h3>
                  <p className="text-gold-primary font-bold text-xs mt-0.5">{booking.service}</p>
                </div>
                <span className={`px-2 py-0.5 rounded font-label-caps text-[9px] uppercase font-bold ${
                  booking.status === 'Upcoming' ? 'bg-gold-primary/20 text-gold-primary' : 'bg-white-muted/10 text-white-muted'
                }`}>
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-black/70 border-t border-b border-white-muted/5 py-3.5 my-1">
                <div>
                  <p className="uppercase text-[9px] tracking-wider text-black/50">Date & Slot</p>
                  <p className="text-black font-semibold mt-0.5">{booking.date}</p>
                  <p className="text-[11px] mt-0.5">{booking.timeSlot}</p>
                </div>
                <div>
                  <p className="uppercase text-[9px] tracking-wider text-black/50">Devotees & Total</p>
                  <p className="text-black font-semibold mt-0.5">{booking.devotees.length} Devotee{booking.devotees.length > 1 ? 's' : ''}</p>
                  <p className="text-gold-primary font-semibold mt-0.5">₹{booking.price}</p>
                </div>
              </div>

              <div className="flex gap-3 justify-between items-center">
                <span className="text-[10px] text-black/60">ID: {booking.id}</span>
                {booking.status === 'Upcoming' ? (
                  <button 
                    onClick={() => setSelectedTicket(booking)}
                    className="bg-gold-primary text-navy-bg font-label-caps text-xs uppercase px-4 py-2 rounded-lg font-bold hover:bg-gold-secondary transition-colors"
                  >
                    View E-Ticket
                  </button>
                ) : (
                  <button className="border border-white-muted/20 text-black/70 font-label-caps text-[10px] uppercase px-3 py-1.5 rounded hover:border-gold-primary hover:text-gold-primary transition-all">
                    Download Invoice
                  </button>
                )}
              </div>
            </div>
          ))}

          {visibleBookings.length === 0 && (
            <p className="text-center text-white-muted/40 py-12 bg-navy-surface/30 rounded-xl border border-white-muted/5 text-xs">
              No sevas registered under this section.
            </p>
          )}
        </section>
      </main>

      {/* Ticket E-Ticket Dialog Modal */}
      {selectedTicket && (
        <div className="absolute inset-0 bg-black/75 z-50 flex items-center justify-center p-6">
          <div className="bg-navy-surface border border-gold-primary/20 rounded-xl w-full max-w-sm overflow-hidden shadow-2xl relative text-black">
            <div className="p-4 border-b border-white-muted/10 flex justify-between items-center bg-navy-bg">
              <h3 className="font-headline-sm text-gold-primary">Sacred E-Receipt</h3>
              <button onClick={() => setSelectedTicket(null)} className="text-white-muted hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4 text-left w-full">
              {/* Seva details */}
              <div className="text-center pb-2 border-b border-dashed border-white-muted/15">
                <h4 className="text-black font-bold text-sm uppercase">{selectedTicket.temple}</h4>
                <p className="text-gold-primary text-xs font-bold mt-1 uppercase tracking-wide">{selectedTicket.service}</p>
                <p className="text-black/60 text-[9px] mt-0.5 uppercase">Digital Seva Confirmation Receipt</p>
              </div>

              {/* Booking Details Grid */}
              <div className="space-y-2.5 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="uppercase text-[9px] tracking-wider text-black/50">Reference ID</p>
                    <p className="font-semibold text-gold-primary">{selectedTicket.id}</p>
                  </div>
                  <div>
                    <p className="uppercase text-[9px] tracking-wider text-black/50">Reporting Time</p>
                    <p className="font-bold text-amber-600">{getReportingTime(selectedTicket.timeSlot)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="uppercase text-[9px] tracking-wider text-black/50">Sanctum Entry Gate</p>
                    <p className="font-semibold text-emerald-600">{getEntryGate(selectedTicket.service)}</p>
                  </div>
                  <div>
                    <p className="uppercase text-[9px] tracking-wider text-black/50">Date & Slot</p>
                    <p className="font-semibold">{selectedTicket.date} ({selectedTicket.timeSlot})</p>
                  </div>
                </div>

                {/* Devotees List */}
                <div>
                  <p className="uppercase text-[9px] tracking-wider text-black/50">Devotees ({selectedTicket.devotees.length})</p>
                  <div className="mt-1 space-y-1.5 max-h-[110px] overflow-y-auto pr-1">
                    {selectedTicket.devotees.map((devotee, idx) => (
                      <div key={idx} className="bg-navy-bg/30 border border-white-muted/5 p-2 rounded-lg text-[10px] space-y-0.5">
                        <p className="text-black font-semibold">
                          {idx + 1}. {devotee.name} {devotee.type === 'Primary' ? '(Primary)' : ''}
                        </p>
                        <p className="text-[9px] text-black/60">
                          Gotram: {devotee.gotram || 'N/A'} {devotee.nakshatram && ` | Nakshatram: ${devotee.nakshatram}`}
                          {devotee.age && ` | Age: ${devotee.age}`} {devotee.gender && ` | Gender: ${devotee.gender}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedTicket.prasadamDelivery && selectedTicket.shippingAddress && (
                  <div className="border-t border-dashed border-white-muted/15 pt-2 space-y-0.5">
                    <p className="uppercase text-[9px] tracking-wider text-black/50">Prasadam Shipping Details</p>
                    <p className="font-semibold text-[10px]">{selectedTicket.shippingAddress.recipientName}</p>
                    <p className="text-black/70 text-[10px] leading-tight">
                      {selectedTicket.shippingAddress.addressLine}, {selectedTicket.shippingAddress.city}, {selectedTicket.shippingAddress.state} - {selectedTicket.shippingAddress.pincode}
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-dashed border-white-muted/15 flex justify-between items-center text-xs">
                  <span className="text-black/60 uppercase text-[9px] tracking-wider">Total Paid</span>
                  <span className="text-black font-bold text-sm">₹{selectedTicket.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Embossed Bottom Nav Bar */}
      <div className="fixed bottom-4 inset-x-0 z-45 px-4 max-w-md mx-auto">
        <nav className="bg-navy-surface/95 backdrop-blur-md border border-white-muted/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex justify-around items-center h-16 px-4">
          {/* HOME */}
          <button
            onClick={() => pushScreen('home')}
            className="flex flex-col items-center justify-center text-white-muted/60 gap-1 hover:text-gold-primary/85 transition-transform duration-300 active:scale-90 w-1/4"
          >
            <span className="material-symbols-outlined text-[20px]">distance</span>
            <span className="text-[8px] uppercase tracking-wider">HOME</span>
          </button>
          
          {/* BOOKINGS */}
          <button
            onClick={() => pushScreen('bookings-history')}
            className="flex flex-col items-center justify-center text-gold-primary gap-1 transition-transform duration-300 active:scale-90 w-1/4"
          >
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>event_upcoming</span>
            <span className="text-[8px] text-gold-primary font-bold uppercase tracking-wider">BOOKINGS</span>
          </button>
          
          {/* HUB */}
          <button
            onClick={() => pushScreen('devotional-aggregator')}
            className="flex flex-col items-center justify-center text-white-muted/60 gap-1 hover:text-gold-primary/85 transition-transform duration-300 active:scale-90 w-1/4"
          >
            <span className="material-symbols-outlined text-[20px]">library_music</span>
            <span className="text-[8px] uppercase tracking-wider">HUB</span>
          </button>

          {/* DONATE */}
          <button
            onClick={() => pushScreen('donation')}
            className="flex flex-col items-center justify-center text-white-muted/60 gap-1 hover:text-gold-primary/85 transition-transform duration-300 active:scale-90 w-1/4"
          >
            <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
            <span className="text-[8px] uppercase tracking-wider">DONATE</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
