import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

export default function PaymentScreen() {
  const { activeBooking, activeDonation, confirmBooking, confirmDonation, popScreen, pushScreen } = useContext(AppContext);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiProvider, setUpiProvider] = useState('gpay');
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [error, setError] = useState('');

  // Calculate pricing based on source
  const isDonation = activeBooking.service === null;
  const basePrice = activeBooking.service?.price || 0;
  const basePersons = activeBooking.service?.persons || 1;
  const extraPersonCost = activeBooking.service?.extraPersonCost || 0;
  const totalDevotees = activeBooking.devotees?.length || 1;
  const extraDevotees = Math.max(0, totalDevotees - basePersons);
  const sevaFare = basePrice + (extraDevotees * extraPersonCost);

  const convenienceFee = 45;
  const gstAmount = Math.round(sevaFare * 0.18);
  const sevaTotal = sevaFare + convenienceFee + gstAmount;

  const donationTotal = activeDonation.amount || 0;
  const totalAmount = isDonation ? donationTotal : sevaTotal;

  const handlePay = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      if (!cardNumber || cardNumber.length < 16) {
        setError('Please enter a valid 16-digit card number.');
        return;
      }
      if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        setError('Please enter card expiry as MM/YY.');
        return;
      }
      if (!cardCvv || cardCvv.length < 3) {
        setError('Please enter a valid 3-digit CVV.');
        return;
      }
    }
    setError('');
    setLoading(true);
  };

  useEffect(() => {
    let timeout = null;
    if (loading) {
      timeout = setTimeout(() => {
        setLoading(false);
        let referenceId = '';
        if (isDonation) {
          referenceId = confirmDonation();
          pushScreen('payment-success');
        } else {
          referenceId = confirmBooking();
          pushScreen('payment-success');
        }
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [loading, isDonation, confirmBooking, confirmDonation, pushScreen]);

  return (
    <div className="bg-navy-bg text-on-surface font-body-md antialiased min-h-screen flex flex-col pt-16 pb-24 h-full overflow-y-auto">
      {/* Loader Modal Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/80 z-50 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-gold-primary border-t-transparent animate-spin"></div>
          <p className="font-headline-sm text-gold-primary uppercase tracking-widest text-sm">Processing Transaction...</p>
          <p className="text-xs text-white-muted">Do not press back or refresh this page.</p>
        </div>
      )}

      {/* Top Header */}
      <header className="fixed top-0 w-full max-w-md z-45 bg-surface/90 backdrop-blur-md border-b border-white-muted/10 shadow-sm px-margin-main h-16 flex items-center justify-between">
        <button 
          onClick={popScreen}
          className="text-gold-primary hover:text-gold-secondary transition-colors"
          aria-label="Go Back"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="font-headline-md text-base text-gold-primary uppercase tracking-widest text-center flex-1">Secure Checkout</h1>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 px-margin-main py-6 max-w-lg mx-auto w-full flex flex-col gap-6">
        {/* Total Summary */}
        <section className="bg-navy-surface p-4 rounded-xl border border-border-subtle flex justify-between items-center shadow-md">
          <div>
            <p className="font-label-caps text-[10px] text-white-muted uppercase">Paying For</p>
            <p className="text-sm text-black font-semibold">
              {isDonation ? `Donation: ${activeDonation.cause}` : `Seva: ${activeBooking.service?.name}`}
            </p>
          </div>
          <div className="text-right">
            <p className="font-label-caps text-[10px] text-white-muted uppercase">Amount Due</p>
            <p className="font-headline-sm text-xl text-gold-primary font-bold">₹{totalAmount}</p>
          </div>
        </section>

        {error && (
          <div className="bg-error-container/20 border border-error/20 text-error p-3 rounded-lg text-center text-xs">
            {error}
          </div>
        )}

        {/* Payment Methods */}
        <section className="space-y-4">
          <h2 className="font-headline-sm text-xs text-on-surface uppercase tracking-wider">Select Payment Method</h2>
          
          {/* UPI Method */}
          <div className={`border rounded-xl bg-navy-surface overflow-hidden ${paymentMethod === 'upi' ? 'border-gold-primary shadow-lg' : 'border-white-muted/10'}`}>
            <label className="flex items-center gap-3 p-4 cursor-pointer select-none">
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                className="text-gold-primary focus:ring-0 focus:ring-offset-0 w-4 h-4 bg-navy-bg border-white-muted/20"
              />
              <div className="flex-1">
                <p className="text-sm text-black font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-gold-primary text-[20px]">qr_code_2</span>
                  UPI (GPay / PhonePe / Paytm)
                </p>
              </div>
            </label>
            
            {paymentMethod === 'upi' && (
              <div className="px-4 pb-4 grid grid-cols-3 gap-3 border-t border-white-muted/5 pt-3 bg-navy-bg/30">
                <button 
                  onClick={() => setUpiProvider('gpay')}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs gap-1 transition-all ${
                    upiProvider === 'gpay' ? 'border-gold-primary bg-gold-primary/10 text-gold-primary font-bold' : 'border-white-muted/10 text-black/60 font-semibold'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                  Google Pay
                </button>
                <button 
                  onClick={() => setUpiProvider('phonepe')}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs gap-1 transition-all ${
                    upiProvider === 'phonepe' ? 'border-gold-primary bg-gold-primary/10 text-gold-primary font-bold' : 'border-white-muted/10 text-black/60 font-semibold'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                  PhonePe
                </button>
                <button 
                  onClick={() => setUpiProvider('paytm')}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs gap-1 transition-all ${
                    upiProvider === 'paytm' ? 'border-gold-primary bg-gold-primary/10 text-gold-primary font-bold' : 'border-white-muted/10 text-black/60 font-semibold'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                  Paytm
                </button>
              </div>
            )}
          </div>

          {/* Card Method */}
          <div className={`border rounded-xl bg-navy-surface overflow-hidden ${paymentMethod === 'card' ? 'border-gold-primary shadow-lg' : 'border-white-muted/10'}`}>
            <label className="flex items-center gap-3 p-4 cursor-pointer select-none">
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="text-gold-primary focus:ring-0 focus:ring-offset-0 w-4 h-4 bg-navy-bg border-white-muted/20"
              />
              <div className="flex-1">
                <p className="text-sm text-black font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-gold-primary text-[20px]">credit_card</span>
                  Credit / Debit Card
                </p>
              </div>
            </label>
            
            {paymentMethod === 'card' && (
              <div className="px-4 pb-4 border-t border-white-muted/5 pt-3 bg-navy-bg/30 space-y-3">
                <div>
                  <label className="block text-[10px] text-white-muted uppercase mb-1">Card Number</label>
                  <input 
                    type="text" 
                    maxLength="16"
                    className="w-full bg-navy-bg border border-border-subtle rounded-lg px-3 py-2 text-on-surface text-xs focus:border-gold-primary focus:outline-none transition-colors"
                    placeholder="1234 5678 9876 5432"
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g,''))}
                    value={cardNumber}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white-muted uppercase mb-1">Expiry Date</label>
                    <input 
                      type="text" 
                      maxLength="5"
                      className="w-full bg-navy-bg border border-border-subtle rounded-lg px-3 py-2 text-on-surface text-xs focus:border-gold-primary focus:outline-none transition-colors"
                      placeholder="MM/YY"
                      onChange={(e) => setCardExpiry(e.target.value)}
                      value={cardExpiry}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white-muted uppercase mb-1">CVV</label>
                    <input 
                      type="password" 
                      maxLength="3"
                      className="w-full bg-navy-bg border border-border-subtle rounded-lg px-3 py-2 text-on-surface text-xs focus:border-gold-primary focus:outline-none transition-colors"
                      placeholder="•••"
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g,''))}
                      value={cardCvv}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Floating CTA Pay Button */}
      <div className="fixed bottom-0 w-full max-w-md bg-navy-bg border-t border-white-muted/10 p-margin-main pb-safe flex gap-4 z-40">
        <button 
          onClick={handlePay}
          className="flex-grow bg-gold-primary text-navy-bg font-headline-sm text-sm py-4 rounded-xl uppercase tracking-wider hover:bg-gold-secondary transition-colors font-bold shadow-md active:scale-95"
        >
          Pay ₹{totalAmount}
        </button>
      </div>
    </div>
  );
}
