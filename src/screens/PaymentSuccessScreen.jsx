import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function PaymentSuccessScreen() {
  const { activeBooking, activeDonation, resetNavigation } = useContext(AppContext);
  const [downloading, setDownloading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const isDonation = activeBooking.service === null;
  const seva = activeBooking.service || { name: 'Maha Aarti', price: 501 };
  const basePrice = seva.price || 0;
  const basePersons = seva.persons || 1;
  const extraPersonCost = seva.extraPersonCost || 0;
  const totalDevotees = activeBooking.devotees?.length || 1;
  const extraDevotees = Math.max(0, totalDevotees - basePersons);
  const sevaFare = basePrice + (extraDevotees * extraPersonCost);

  const convenienceFee = 45;
  const gstAmount = Math.round(sevaFare * 0.18);
  const sevaTotal = sevaFare + convenienceFee + gstAmount;

  const donationTotal = activeDonation.amount || 0;
  const totalAmount = isDonation ? donationTotal : sevaTotal;

  // Mock unique reference ID
  const [refId] = useState(() =>
    (isDonation ? 'DN-' : 'SV-') + Math.floor(100000 + Math.random() * 900000)
  );

  const handleDownload = () => {
    setDownloading(true);
    setToastMsg('');
    setTimeout(() => {
      setDownloading(false);
      setToastMsg('Receipt downloaded successfully!');
      setTimeout(() => setToastMsg(''), 3000);
    }, 1500);
  };

  const handleGoToBookings = () => {
    resetNavigation('bookings-history');
  };

  const handleGoHome = () => {
    resetNavigation('home');
  };

  return (
    <div className="bg-navy-bg text-on-surface font-body-md antialiased h-full flex flex-col justify-between overflow-y-auto pb-6 relative">

      {/* Toast Alert */}
      {toastMsg && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gold-primary text-navy-bg font-semibold px-4 py-2.5 rounded-lg shadow-xl text-xs z-50 animate-bounce">
          {toastMsg}
        </div>
      )}

      <main className="flex-grow flex flex-col items-center justify-center px-margin-main py-section-gap pt-16 z-10">
        <div className="w-full max-w-md mx-auto flex flex-col items-center text-center gap-6">
          {/* Animated/Glowing Checkmark */}
          <div className="w-24 h-24 rounded-full bg-navy-surface border-2 border-gold-primary flex items-center justify-center shadow-[0_0_30px_rgba(220,176,107,0.25)] animate-[pulse_1.5s_infinite] relative">
            <span className="material-symbols-outlined text-gold-primary text-[50px] font-bold">check</span>
            <div className="absolute inset-0 rounded-full border border-gold-primary/30 animate-[ping_2s_infinite]"></div>
          </div>

          <div className="space-y-2">
            <h1 className="font-headline-lg text-2xl text-gold-primary uppercase tracking-wide">Payment Successful!</h1>
            <p className="font-body-md text-sm text-black/70 font-semibold">Your spiritual transaction is securely completed.</p>
          </div>

          {/* Details Card */}
          <div className="bg-navy-surface rounded-xl p-5 border border-white-muted/5 shadow-2xl w-full text-left space-y-4">
            <div>
              <p className="font-label-caps text-[10px] text-white-muted uppercase">Transaction Ref ID</p>
              <p className="text-sm text-gold-primary font-bold">{refId}</p>
            </div>

            <div className="border-t border-white-muted/5 pt-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-black/70">Cause / Service</span>
                <span className="text-black font-semibold truncate max-w-[180px]">
                  {isDonation ? activeDonation.cause : seva.name}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-black/70">Recipient</span>
                <span className="text-black font-semibold">{activeBooking.temple}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-black/70">Amount Paid</span>
                <span className="text-black font-bold text-gold-primary">₹{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Download Action */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center justify-center gap-2 bg-navy-surface border border-white-muted/10 text-black hover:text-gold-primary hover:border-gold-primary/50 py-3.5 px-6 rounded-xl text-xs uppercase font-label-caps font-bold transition-all w-full active:scale-95 shadow-sm"
          >
            {downloading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-gold-primary border-t-transparent animate-spin"></div>
                Generating PDF...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">download</span>
                Download Receipt
              </>
            )}
          </button>
        </div>
      </main>

      {/* Action Buttons Footer */}
      <div className="w-full max-w-md mx-auto px-margin-main flex flex-col gap-3">
        <button
          onClick={handleGoToBookings}
          className="w-full bg-gold-primary text-navy-bg font-headline-sm text-sm uppercase tracking-wider py-4 rounded-xl font-bold hover:bg-gold-secondary transition-colors active:scale-95 shadow-md"
        >
          Go to My Bookings
        </button>
        <button
          onClick={handleGoHome}
          className="w-full bg-transparent border border-white-muted/20 text-black hover:border-gold-primary/50 font-label-caps text-xs uppercase py-3 rounded-xl transition-all font-semibold"
        >
          Back to Temples Screen
        </button>
      </div>
    </div>
  );
}
