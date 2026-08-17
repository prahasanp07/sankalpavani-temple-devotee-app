import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const causes = [
  { id: 'anna', name: 'Annadanam (Free Meals)', desc: 'Contribute to daily free food distribution for visiting pilgrims.' },
  { id: 'renov', name: 'Temple Renovation Fund', desc: 'Support repair and preservation of ancient Dravidian stone structures.' },
  { id: 'veda', name: 'Veda Patashala Support', desc: 'Support children studying ancient scriptures and traditional chanting.' }
];

export default function DonationScreen() {
  const { activeDonation, setActiveDonation, setActiveBooking, popScreen, pushScreen } = useContext(AppContext);
  const [selectedCause, setSelectedCause] = useState(causes[0]);
  const [amount, setAmount] = useState('1000');
  const [pan, setPan] = useState('');
  const [name, setName] = useState('Anand Kumar');
  const [error, setError] = useState('');

  const handlePresetSelect = (value) => {
    setAmount(value.toString());
  };

  const handleDonate = (e) => {
    e.preventDefault();
    const parsedAmount = parseInt(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }
    if (!name.trim()) {
      setError('Please enter donor full name.');
      return;
    }
    setError('');

    // Set donation states
    setActiveDonation({
      cause: selectedCause.name,
      amount: parsedAmount,
      pan: pan,
      name: name
    });
    
    // Clear seva booking service state to signal a donation transaction in Payments Screen
    setActiveBooking(prev => ({ ...prev, service: null }));
    
    pushScreen('payment');
  };

  return (
    <div className="bg-navy-bg text-on-surface font-body-md antialiased min-h-screen flex flex-col pt-24 pb-24 h-full overflow-y-auto">
      {/* Top Header */}
      <header className="fixed top-0 inset-x-0 w-full z-45 bg-surface/90 backdrop-blur-md border-b border-white-muted/10 shadow-sm px-margin-main pt-[max(env(safe-area-inset-top),1.5rem)] pb-3 flex items-center">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <button 
            onClick={popScreen}
            className="text-gold-primary hover:text-gold-secondary transition-colors"
            aria-label="Go Back"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="font-headline-md text-base text-gold-primary uppercase tracking-widest text-center flex-1">Temple Donations</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="flex-1 px-margin-main py-6 w-full max-w-xl mx-auto md:p-8 md:border md:border-white-muted/10 md:rounded-2xl md:bg-navy-surface md:shadow-sm md:mt-6 flex flex-col gap-6">
        
        {error && (
          <div className="bg-error-container/20 border border-error/20 text-error p-3 rounded-lg text-center text-xs">
            {error}
          </div>
        )}

        {/* Selection of Cause */}
        <section className="space-y-3">
          <h2 className="font-headline-sm text-xs text-on-surface uppercase tracking-wider">Select Donation Cause</h2>
          <div className="space-y-3">
            {causes.map((cause) => {
              const isSelected = selectedCause.id === cause.id;
              return (
                <div 
                  key={cause.id}
                  onClick={() => setSelectedCause(cause)}
                  className={`bg-navy-surface p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected ? 'border-gold-primary shadow-lg bg-gold-primary/5' : 'border-white-muted/10 hover:border-gold-primary/40'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`font-headline-sm text-sm ${isSelected ? 'text-gold-primary' : 'text-white'}`}>{cause.name}</h3>
                    <input 
                      type="radio" 
                      name="cause" 
                      checked={isSelected}
                      onChange={() => setSelectedCause(cause)}
                      className="text-gold-primary focus:ring-0 focus:ring-offset-0 w-4 h-4 bg-navy-bg border-white-muted/20"
                    />
                  </div>
                  <p className="text-[11px] text-white-muted leading-relaxed">{cause.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Amount Input */}
        <section className="space-y-3 bg-navy-surface p-4 rounded-xl border border-white-muted/10 shadow-md">
          <h2 className="font-headline-sm text-xs text-gold-primary uppercase tracking-wider font-bold">Donation Amount</h2>
          
          <div className="relative flex items-center">
            <span className="absolute left-4 font-headline-sm text-lg text-white-muted pointer-events-none">₹</span>
            <input 
              type="number"
              className="w-full bg-navy-bg border border-white-muted/20 text-on-surface font-headline-sm text-lg rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all duration-300"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Presets */}
          <div className="grid grid-cols-3 gap-3">
            {[500, 1000, 5000].map((preset) => (
              <button 
                key={preset}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`py-2 rounded-lg border text-xs font-semibold transition-all ${
                  amount === preset.toString() ? 'border-gold-primary bg-gold-primary/10 text-gold-primary' : 'border-white-muted/10 text-white-muted hover:border-gold-primary/40'
                }`}
              >
                ₹{preset}
              </button>
            ))}
          </div>
        </section>

        {/* Tax Exemption Form */}
        <section className="space-y-3 bg-navy-surface p-4 rounded-xl border border-white-muted/10 shadow-md">
          <div className="flex justify-between items-center border-b border-white-muted/5 pb-2">
            <h2 className="font-headline-sm text-xs text-gold-primary uppercase tracking-wider font-bold">Tax Exemption Details</h2>
            <span className="bg-gold-primary/20 text-gold-primary text-[9px] uppercase px-2 py-0.5 rounded font-bold">Section 80G</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] text-white-muted uppercase mb-1">Donor Full Name *</label>
              <input 
                type="text"
                className="w-full bg-navy-bg border border-border-subtle rounded-lg px-3 py-2 text-on-surface text-xs focus:border-gold-primary focus:outline-none transition-colors"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] text-white-muted uppercase mb-1">PAN Card Number (Optional)</label>
              <input 
                type="text"
                maxLength="10"
                className="w-full bg-navy-bg border border-border-subtle rounded-lg px-3 py-2 text-on-surface text-xs focus:border-gold-primary focus:outline-none transition-colors placeholder:text-white-muted/20 uppercase"
                placeholder="ABCDE1234F"
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
              />
              <p className="text-[9px] text-white-muted/40 mt-1">Provide PAN card number to claim tax deductions under Section 80G.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Floating CTA Pay Button */}
      <div className="fixed bottom-0 inset-x-0 w-full bg-navy-bg border-t border-white-muted/10 p-margin-main pb-safe flex justify-center z-40">
        <div className="max-w-4xl w-full flex gap-4">
          <button 
            onClick={handleDonate}
            className="flex-grow bg-gold-primary text-navy-bg font-headline-sm text-sm py-4 rounded-xl uppercase tracking-wider hover:bg-gold-secondary transition-colors font-bold shadow-md active:scale-95"
          >
            Donate ₹{amount || 0}
          </button>
        </div>
      </div>
    </div>
  );
}
