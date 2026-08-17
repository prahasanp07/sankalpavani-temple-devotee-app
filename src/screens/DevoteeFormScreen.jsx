import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const gotramsList = [
  'Bharadwaja',
  'Kashyapa',
  'Vashishta',
  'Gautama',
  'Atri',
  'Vishwamitra',
  'Jamadagni',
  'Angirasa',
  'Shandilya',
  'Haritasa',
  'Kaundinya',
  'Srivatsa'
];

const nakshatramsList = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Poorva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Moola', 'Poorvashadha', 'Uttarashadha', 'Shravana', 'Dhanishta',
  'Shatabhisha', 'Poorvabhadra', 'Uttarabhadra', 'Revati'
];

export default function DevoteeFormScreen() {
  const { activeBooking, popScreen, saveDevotees, currentUser } = useContext(AppContext);
  const service = activeBooking.service || {};
  const basePrice = service.price || 500;
  const basePersons = service.personsPerSeva || service.persons || 1;
  const extraPersonCost = service.extraPersonCost || 0;

  // Primary Devotee State (Fetched from User Registration / currentUser)
  const [primaryName, setPrimaryName] = useState(currentUser?.name || 'Anand Kumar');
  const [primaryGotram, setPrimaryGotram] = useState(currentUser?.gotram || 'Bharadwaja');
  const [primaryNakshatram, setPrimaryNakshatram] = useState(currentUser?.nakshatram || 'Rohini');
  const [primaryPhone] = useState(currentUser?.phone || '9876543210');

  // Family Members List State
  const [familyMembers, setFamilyMembers] = useState([]);
  const [error, setError] = useState('');

  // Shipping details state
  const [recipientName, setRecipientName] = useState(currentUser?.name || '');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [shippingPhone, setShippingPhone] = useState(currentUser?.phone || '');

  const handleAddMember = () => {
    setFamilyMembers(prev => [
      ...prev, 
      { id: Date.now() + Math.random(), name: '', gotram: 'Bharadwaja', nakshatram: 'Rohini' }
    ]);
  };

  const handleRemoveMember = (id) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleMemberChange = (id, field, value) => {
    setFamilyMembers(prev => prev.map(member => {
      if (member.id === id) {
        return { ...member, [field]: value };
      }
      return member;
    }));
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (!primaryName.trim()) {
      setError('Primary devotee name is required.');
      return;
    }
    if (!primaryGotram) {
      setError('Please select a Gotram for the primary devotee.');
      return;
    }
    
    // Validate family member inputs
    for (let i = 0; i < familyMembers.length; i++) {
      const member = familyMembers[i];
      if (!member.name.trim()) {
        setError(`Please enter a name for Family Member #${i + 1}.`);
        return;
      }
      if (!member.gotram) {
        setError(`Please select a Gotram for Family Member #${i + 1}.`);
        return;
      }
    }

    // Validate shipping details if delivery option is selected
    if (activeBooking.prasadamDelivery) {
      if (!recipientName.trim()) {
        setError('Recipient Name is required for Prasadam home delivery.');
        return;
      }
      if (!addressLine.trim()) {
        setError('Shipping Address is required for Prasadam home delivery.');
        return;
      }
      if (!city.trim()) {
        setError('City is required for Prasadam home delivery.');
        return;
      }
      if (!state.trim()) {
        setError('State is required for Prasadam home delivery.');
        return;
      }
      if (!pincode.trim() || !/^\d{6}$/.test(pincode)) {
        setError('Please enter a valid 6-digit Pincode.');
        return;
      }
      if (!shippingPhone.trim() || shippingPhone.length < 10) {
        setError('Please enter a valid Contact Phone Number.');
        return;
      }
    }

    setError('');
    const devoteesList = [
      { 
        name: primaryName, 
        gotram: primaryGotram, 
        nakshatram: primaryNakshatram, 
        phone: primaryPhone, 
        age: currentUser?.age || null, 
        gender: currentUser?.gender || null, 
        type: 'Primary' 
      },
      ...familyMembers.map(m => ({ 
        name: m.name, 
        gotram: m.gotram, 
        nakshatram: m.nakshatram, 
        phone: '', 
        type: 'Family' 
      }))
    ];

    const shippingAddress = activeBooking.prasadamDelivery ? {
      recipientName,
      addressLine,
      city,
      state,
      pincode,
      phone: shippingPhone
    } : null;

    saveDevotees(devoteesList, shippingAddress);
  };

  const totalDevotees = 1 + familyMembers.length;
  const extraDevotees = Math.max(0, totalDevotees - basePersons);
  const totalPrice = basePrice + (extraDevotees * extraPersonCost);

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
          <h1 className="font-headline-md text-base text-gold-primary uppercase tracking-widest text-center flex-1">Devotee Details</h1>
          <div className="w-6"></div> {/* Spacer */}
        </div>
      </header>

      <main className="flex-1 px-margin-main py-6 w-full max-w-xl mx-auto md:p-8 md:border md:border-white-muted/10 md:rounded-2xl md:bg-navy-surface md:shadow-sm md:mt-6 flex flex-col gap-6">
        
        {error && (
          <div className="bg-error-container/20 border border-error/20 text-error p-3 rounded-lg text-center text-xs">
            {error}
          </div>
        )}

        {/* Primary Devotee Info */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gold-primary">person</span>
            <h2 className="font-headline-sm text-sm text-on-surface uppercase font-bold">Primary Devotee</h2>
          </div>
          <div className="bg-navy-surface rounded-xl p-4 border border-border-subtle shadow-md space-y-4">
            <div>
              <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase" htmlFor="fullName">Full Name *</label>
              <input 
                className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface text-sm focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                id="fullName" 
                onChange={(e) => setPrimaryName(e.target.value)}
                placeholder="Enter full name" 
                type="text" 
                value={primaryName}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase" htmlFor="gotram">Gotram *</label>
                <select
                  className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface text-sm focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                  id="gotram"
                  onChange={(e) => setPrimaryGotram(e.target.value)}
                  value={primaryGotram}
                >
                  <option value="">Select Gotram</option>
                  {gotramsList.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase" htmlFor="nakshatram">Nakshatram</label>
                <select
                  className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface text-sm focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                  id="nakshatram"
                  onChange={(e) => setPrimaryNakshatram(e.target.value)}
                  value={primaryNakshatram}
                >
                  <option value="">Select Nakshatram</option>
                  {nakshatramsList.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Family Members Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gold-primary">group</span>
              <h2 className="font-headline-sm text-sm text-on-surface uppercase font-bold">Family Members</h2>
            </div>
            <button 
              type="button"
              onClick={handleAddMember}
              className="text-gold-primary font-label-caps text-xs uppercase hover:text-gold-secondary transition-colors flex items-center gap-1 font-bold"
            >
              <span className="material-symbols-outlined text-sm font-bold">add</span> Add New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familyMembers.map((member, idx) => (
              <div 
                key={member.id}
                className="bg-navy-surface rounded-xl p-4 border border-border-subtle shadow-md relative group space-y-3"
              >
                <button 
                  type="button"
                  onClick={() => handleRemoveMember(member.id)}
                  className="absolute top-3 right-3 text-white-muted hover:text-error transition-colors"
                  aria-label="Remove member"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
                <p className="font-label-caps text-xs text-gold-primary uppercase font-bold">Family Member #{idx + 1}</p>
                
                <div>
                  <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase">Full Name *</label>
                  <input 
                    className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2 text-on-surface text-xs focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                    onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                    placeholder="Enter full name" 
                    type="text" 
                    value={member.name}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase">Gotram *</label>
                    <select
                      className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2 text-on-surface text-xs focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                      onChange={(e) => handleMemberChange(member.id, 'gotram', e.target.value)}
                      value={member.gotram}
                    >
                      <option value="">Select Gotram</option>
                      {gotramsList.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase">Nakshatram</label>
                    <select
                      className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2 text-on-surface text-xs focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                      onChange={(e) => handleMemberChange(member.id, 'nakshatram', e.target.value)}
                      value={member.nakshatram}
                    >
                      <option value="">Select Nakshatram</option>
                      {nakshatramsList.map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {familyMembers.length === 0 && (
              <p className="text-center text-xs text-white-muted/40 py-4 bg-navy-surface/30 rounded-xl border border-white-muted/5">
                No family members added. Tap "+ Add New" to perform Seva for family.
              </p>
            )}
          </div>
        </section>

        {/* Prasadam Home Delivery Shipping Details */}
        {activeBooking.prasadamDelivery && (
          <section className="space-y-3 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gold-primary">local_shipping</span>
              <h2 className="font-headline-sm text-sm text-on-surface uppercase font-bold">Prasadam Shipping Address</h2>
            </div>
            <div className="bg-navy-surface rounded-xl p-4 border border-border-subtle shadow-md space-y-4">
              <div>
                <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase">Recipient Name *</label>
                <input 
                  className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface text-sm focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Enter recipient full name" 
                  type="text" 
                  value={recipientName}
                />
              </div>
              <div>
                <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase">Flat / House No / Street *</label>
                <input 
                  className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface text-sm focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="Enter flat, house no, street details" 
                  type="text" 
                  value={addressLine}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase">City *</label>
                  <input 
                    className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface text-sm focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city" 
                    type="text" 
                    value={city}
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase">State *</label>
                  <input 
                    className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface text-sm focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter state" 
                    type="text" 
                    value={state}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase">Pincode *</label>
                  <input 
                    className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface text-sm focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="6-digit pin" 
                    type="text" 
                    value={pincode}
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-[10px] text-white-muted mb-1 uppercase">Contact Phone Number *</label>
                  <input 
                    className="w-full bg-navy-bg border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface text-sm focus:border-gold-primary focus:ring-1 focus:ring-gold-primary focus:outline-none transition-colors"
                    onChange={(e) => setShippingPhone(e.target.value)}
                    placeholder="10-digit number" 
                    type="tel" 
                    value={shippingPhone}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Dynamic Summary Floating Bar */}
      <div className="fixed bottom-0 inset-x-0 w-full bg-navy-bg border-t border-white-muted/10 p-margin-main pb-safe flex justify-center z-40">
        <div className="max-w-4xl w-full flex items-center justify-between gap-4">
          <div>
            <p className="font-label-caps text-[10px] text-white-muted uppercase">
              Total ({totalDevotees} Devotee{totalDevotees > 1 ? 's' : ''})
            </p>
            <div className="flex flex-col">
              <p className="font-headline-sm text-xl text-gold-primary font-bold">₹{totalPrice}</p>
              {extraDevotees > 0 ? (
                <p className="text-[9px] text-white-muted">
                  (Base: ₹{basePrice} for {basePersons} + {extraDevotees} extra @ ₹{extraPersonCost}/each)
                </p>
              ) : (
                <p className="text-[9px] text-white-muted">
                  (Base allocation: up to {basePersons} {basePersons === 1 ? 'devotee' : 'devotees'})
                </p>
              )}
            </div>
          </div>
          <button 
            onClick={handleProceed}
            className="bg-gold-primary text-navy-bg font-headline-sm text-sm font-bold uppercase py-3.5 px-6 rounded-xl hover:bg-gold-secondary transition-colors"
          >
            Proceed to Review
          </button>
        </div>
      </div>
    </div>
  );
}
