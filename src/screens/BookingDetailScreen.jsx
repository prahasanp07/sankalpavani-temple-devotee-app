import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function BookingDetailScreen() {
  const { activeBooking, popScreen, pushScreen } = useContext(AppContext);
  const [agreed, setAgreed] = useState(false);

  const seva = activeBooking.service || { name: 'Maha Aarti', price: 501 };
  const date = activeBooking.date || { fullDate: '12 Oct 2026' };
  const slot = activeBooking.slot || { time: '06:00 AM', name: 'Suprabhatam' };
  const devotees = activeBooking.devotees || [];

  const basePrice = seva.price || 0;
  const basePersons = seva.persons || 1;
  const extraPersonCost = seva.extraPersonCost || 0;
  const totalDevotees = devotees.length || 1;
  const extraDevotees = Math.max(0, totalDevotees - basePersons);
  const sevaFare = basePrice + (extraDevotees * extraPersonCost);

  const convenienceFee = 45;
  const gstAmount = Math.round(sevaFare * 0.18);
  const totalAmount = sevaFare + convenienceFee + gstAmount;

  const handleProceed = () => {
    if (agreed) {
      pushScreen('payment');
    }
  };

  return (
    <div className="bg-navy-bg text-on-surface font-body-md antialiased min-h-screen flex flex-col pt-16 pb-24 h-full overflow-y-auto">
      {/* Top Header */}
      <header className="fixed top-0 w-full max-w-md z-45 bg-surface/90 backdrop-blur-md border-b border-white-muted/10 shadow-sm px-margin-main h-16 flex items-center justify-between">
        <button 
          onClick={popScreen}
          className="text-gold-primary hover:text-gold-secondary transition-colors"
          aria-label="Go Back"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="font-headline-md text-base text-gold-primary uppercase tracking-widest text-center flex-1">Review Booking</h1>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 px-margin-main py-6 max-w-lg mx-auto w-full flex flex-col gap-6">
        
        {/* Booking Summary Card */}
        <section className="bg-navy-surface rounded-xl p-4 border border-border-subtle shadow-md space-y-3">
          <h2 className="font-headline-sm text-sm text-gold-primary uppercase tracking-wider border-b border-white-muted/5 pb-1 font-bold">Seva Details</h2>
          <div>
            <p className="font-label-caps text-[10px] text-white-muted uppercase">Temple</p>
            <p className="text-sm text-black font-semibold">{activeBooking.temple}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-label-caps text-[10px] text-white-muted uppercase">Seva / Service</p>
              <p className="text-sm text-black font-semibold">{seva.name}</p>
            </div>
            <div>
              <p className="font-label-caps text-[10px] text-white-muted uppercase">Date & Time Slot</p>
              <p className="text-sm text-black font-semibold">{date.fullDate} ({slot.time})</p>
            </div>
          </div>
        </section>

        {/* Devotees List */}
        <section className="bg-navy-surface rounded-xl p-4 border border-border-subtle shadow-md space-y-3">
          <h2 className="font-headline-sm text-sm text-gold-primary uppercase tracking-wider border-b border-white-muted/5 pb-1 font-bold">
            Devotees ({devotees.length})
          </h2>
          <div className="space-y-3 divide-y divide-white-muted/5 max-h-[180px] overflow-y-auto pr-1">
            {devotees.map((devotee, idx) => (
              <div key={idx} className={`pt-2 ${idx === 0 ? 'pt-0' : ''} text-xs space-y-1`}>
                <p className="text-black font-semibold">
                  {idx + 1}. {devotee.name} {devotee.type === 'Primary' ? '(Primary)' : ''}
                </p>
                <div className="grid grid-cols-2 gap-2 text-black/70">
                  {devotee.gotram && <p>Gotram: {devotee.gotram}</p>}
                  {devotee.nakshatram && <p>Nakshatram: {devotee.nakshatram}</p>}
                  {devotee.age && <p>Age: {devotee.age}</p>}
                  {devotee.gender && <p>Gender: {devotee.gender}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping details review card */}
        {activeBooking.prasadamDelivery && activeBooking.shippingAddress && (
          <section className="bg-navy-surface rounded-xl p-4 border border-border-subtle shadow-md space-y-3">
            <h2 className="font-headline-sm text-sm text-gold-primary uppercase tracking-wider border-b border-white-muted/5 pb-1 font-bold">
              Prasadam Shipping Address
            </h2>
            <div className="text-xs space-y-1 text-black">
              <p className="font-bold">{activeBooking.shippingAddress.recipientName}</p>
              <p className="text-black/80">{activeBooking.shippingAddress.addressLine}</p>
              <p className="text-black/80">{activeBooking.shippingAddress.city}, {activeBooking.shippingAddress.state} - {activeBooking.shippingAddress.pincode}</p>
              <p className="text-black/80 font-bold mt-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">phone</span>
                {activeBooking.shippingAddress.phone}
              </p>
            </div>
          </section>
        )}

        {/* Price Breakdown */}
        <section className="bg-navy-surface rounded-xl p-4 border border-border-subtle shadow-md space-y-3">
          <h2 className="font-headline-sm text-sm text-gold-primary uppercase tracking-wider border-b border-white-muted/5 pb-1 font-bold">Fare Details</h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-black/70">Base Seva Fare (for up to {basePersons} person{basePersons > 1 ? 's' : ''})</span>
              <span className="text-black font-semibold">₹{basePrice}</span>
            </div>
            {extraDevotees > 0 && (
              <div className="flex justify-between animate-[fadeIn_0.2s_ease-out]">
                <span className="text-black/70">Extra Pilgrim Surcharge ({extraDevotees} × ₹{extraPersonCost})</span>
                <span className="text-black font-semibold">₹{extraDevotees * extraPersonCost}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-black/70">Convenience Fee</span>
              <span className="text-black font-semibold">₹{convenienceFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/70">GST (18% integrated)</span>
              <span className="text-black font-semibold">₹{gstAmount}</span>
            </div>
            <div className="flex justify-between border-t border-white-muted/10 pt-2 font-bold text-sm text-black">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </section>

        {/* Terms Agreement Checkbox */}
        <section className="flex items-start gap-3 px-1">
          <input 
            type="checkbox" 
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 rounded bg-navy-bg border-white-muted/20 text-gold-primary focus:ring-gold-primary focus:ring-0 w-5 h-5 cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs text-black/80 leading-relaxed cursor-pointer select-none">
            I agree to the temple reporting guidelines, code of conduct, and terms of service. I understand that bookings are non-refundable.
          </label>
        </section>

      </main>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 w-full max-w-md bg-navy-bg border-t border-white-muted/10 p-margin-main pb-safe flex gap-4 z-40">
        <button 
          onClick={handleProceed}
          disabled={!agreed}
          className={`flex-grow font-headline-sm text-sm py-4 rounded-xl uppercase tracking-wider transition-colors font-bold ${
            agreed 
              ? 'bg-gold-primary text-navy-bg hover:bg-gold-secondary cursor-pointer' 
              : 'bg-white-muted/10 text-white-muted/30 cursor-not-allowed'
          }`}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
