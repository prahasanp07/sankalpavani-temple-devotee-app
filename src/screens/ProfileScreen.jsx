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

const rashisList = [
  'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
  'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)',
  'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
];

const languagesList = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' }
];

export default function ProfileScreen() {
  const { 
    currentUser, 
    setCurrentUser, 
    popScreen, 
    pushScreen, 
    logout, 
    bookingsHistory = [], 
    donationsHistory = [],
    favorites = [] 
  } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  
  // Profile form state
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Prahasan P',
    phone: currentUser?.phone || '9876543210',
    email: currentUser?.email || 'prahasan.devotee@sankalpavani.org',
    age: currentUser?.age || 32,
    gender: currentUser?.gender || 'Male',
    gotram: currentUser?.gotram || 'Bharadwaja',
    nakshatram: currentUser?.nakshatram || 'Rohini',
    rashi: currentUser?.rashi || 'Vrishabha (Taurus)',
    kuladevata: currentUser?.kuladevata || 'Sri Lakshmi Narasimha Swamy',
    ishtaDevata: currentUser?.ishtaDevata || 'Lord Venkateswara',
    address: currentUser?.address || '14/2, Temple Road, Basavanagudi',
    city: currentUser?.city || 'Bengaluru',
    state: currentUser?.state || 'Karnataka',
    pincode: currentUser?.pincode || '560004',
    devoteeId: currentUser?.devoteeId || 'SKV-DEV-8921',
    memberSince: currentUser?.memberSince || 'Oct 2024',
    tier: currentUser?.tier || 'Dharma Patron'
  });

  // Family members list for Sankalpa
  const [familyMembers, setFamilyMembers] = useState(() => {
    try {
      const saved = localStorage.getItem('sankalpavani_family_members');
      return saved ? JSON.parse(saved) : [
        { id: 1, name: 'Sita Devi', gotram: 'Bharadwaja', nakshatram: 'Shravana', relationship: 'Spouse' },
        { id: 2, name: 'Aryan Kumar', gotram: 'Bharadwaja', nakshatram: 'Hasta', relationship: 'Son' }
      ];
    } catch (e) {
      return [];
    }
  });

  const [newMember, setNewMember] = useState({ name: '', gotram: 'Bharadwaja', nakshatram: 'Rohini', relationship: 'Family' });
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  // App settings & preferences
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [panchangAlerts, setPanchangAlerts] = useState(true);
  const [sevaReminders, setSevaReminders] = useState(true);
  const [audioAutoplay, setAudioAutoplay] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...(currentUser || {}),
      ...formData
    };
    if (setCurrentUser) {
      setCurrentUser(updatedUser);
    }
    localStorage.setItem('sankalpavani_user', JSON.stringify(updatedUser));
    setIsEditing(false);
    setSaveSuccessMessage('Profile details updated successfully!');
    setTimeout(() => setSaveSuccessMessage(''), 3000);
  };

  const handleAddFamilyMember = (e) => {
    e.preventDefault();
    if (!newMember.name.trim()) return;
    const updated = [...familyMembers, { ...newMember, id: Date.now() }];
    setFamilyMembers(updated);
    localStorage.setItem('sankalpavani_family_members', JSON.stringify(updated));
    setNewMember({ name: '', gotram: 'Bharadwaja', nakshatram: 'Rohini', relationship: 'Family' });
    setShowAddMemberModal(false);
    setSaveSuccessMessage('Family member added to Sankalpa registry!');
    setTimeout(() => setSaveSuccessMessage(''), 3000);
  };

  const handleRemoveFamilyMember = (id) => {
    const updated = familyMembers.filter(m => m.id !== id);
    setFamilyMembers(updated);
    localStorage.setItem('sankalpavani_family_members', JSON.stringify(updated));
  };

  const totalDonationsAmount = donationsHistory.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  return (
    <div className="bg-navy-bg text-on-surface min-h-screen flex flex-col h-full relative overflow-y-auto font-body-md antialiased pb-28">
      {/* Top Header */}
      <header className="sticky top-0 inset-x-0 w-full z-40 bg-surface/90 backdrop-blur-md border-b border-white-muted/10 shadow-sm px-margin-main pt-[max(env(safe-area-inset-top),1.5rem)] pb-3 flex items-center justify-between">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={popScreen}
            className="text-gold-primary hover:text-gold-secondary transition-colors p-1.5 -ml-2 rounded-full flex items-center gap-1 focus:outline-none"
            aria-label="Go Back"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          
          <h1 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider">
            Devotee Profile
          </h1>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-gold-primary hover:text-gold-secondary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-primary/30 bg-gold-primary/10 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">{isEditing ? 'close' : 'edit'}</span>
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
      </header>

      {/* Success Notification Banner */}
      {saveSuccessMessage && (
        <div className="max-w-4xl mx-auto w-full px-4 pt-3">
          <div className="bg-emerald-900/30 border border-emerald-500/50 text-emerald-300 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md animate-[fadeIn_0.2s_ease-out]">
            <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
            <span className="font-semibold">{saveSuccessMessage}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto w-full px-4 py-5 space-y-6">
        
        {/* Devotee Avatar & Identity Card */}
        <section className="bg-gradient-to-br from-navy-surface via-navy-surface/95 to-navy-bg border border-gold-primary/30 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gold-primary/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 relative z-10">
            {/* Avatar with gold ring */}
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gold-primary shadow-xl bg-navy-bg flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gold-primary text-navy-bg p-1 rounded-full shadow-md">
                <span className="material-symbols-outlined text-xs block font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>

            {/* Devotee Details */}
            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="font-headline-lg text-lg sm:text-xl font-extrabold text-on-surface uppercase tracking-wide">
                  {formData.name}
                </h2>
                <span className="bg-gold-primary/20 text-gold-primary border border-gold-primary/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {formData.tier}
                </span>
              </div>

              <p className="text-xs text-white-muted flex items-center justify-center sm:justify-start gap-1.5">
                <span className="material-symbols-outlined text-xs text-gold-primary">call</span>
                <span>+91 {formData.phone}</span>
                <span className="text-white-muted/40">•</span>
                <span className="material-symbols-outlined text-xs text-gold-primary">mail</span>
                <span>{formData.email}</span>
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px]">
                <div className="bg-navy-bg/80 border border-white-muted/15 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <span className="text-white-muted/70">Devotee ID:</span>
                  <span className="font-mono font-bold text-gold-primary">{formData.devoteeId}</span>
                </div>
                <div className="bg-navy-bg/80 border border-white-muted/15 px-2.5 py-1 rounded-lg flex items-center gap-1 text-white-muted/80">
                  <span className="material-symbols-outlined text-xs text-gold-primary">calendar_month</span>
                  <span>Member since {formData.memberSince}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Spiritual Activity Summary */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 pt-5 border-t border-white-muted/10 text-center">
            <div 
              onClick={() => pushScreen('bookings-history')}
              className="bg-navy-bg/60 p-2.5 rounded-xl border border-white-muted/10 hover:border-gold-primary/40 cursor-pointer transition-colors"
            >
              <p className="font-headline-md text-base sm:text-lg font-bold text-gold-primary">{bookingsHistory.length}</p>
              <p className="text-[10px] text-white-muted uppercase tracking-wider font-semibold mt-0.5">Sevas Booked</p>
            </div>
            <div 
              onClick={() => pushScreen('donation')}
              className="bg-navy-bg/60 p-2.5 rounded-xl border border-white-muted/10 hover:border-gold-primary/40 cursor-pointer transition-colors"
            >
              <p className="font-headline-md text-base sm:text-lg font-bold text-gold-primary">₹{totalDonationsAmount.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-white-muted uppercase tracking-wider font-semibold mt-0.5">Contributions</p>
            </div>
            <div 
              onClick={() => pushScreen('temples-list')}
              className="bg-navy-bg/60 p-2.5 rounded-xl border border-white-muted/10 hover:border-gold-primary/40 cursor-pointer transition-colors"
            >
              <p className="font-headline-md text-base sm:text-lg font-bold text-gold-primary">{favorites.length}</p>
              <p className="text-[10px] text-white-muted uppercase tracking-wider font-semibold mt-0.5">Favorites</p>
            </div>
          </div>
        </section>

        {/* Edit / View Devotee Details Form */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          
          {/* Section 1: Spiritual & Sankalpa Credentials */}
          <section className="bg-navy-surface/50 border border-white-muted/10 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-white-muted/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gold-primary text-xl">self_improvement</span>
                <h3 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider">
                  Sankalpa & Spiritual Details
                </h3>
              </div>
              <span className="text-[10px] text-white-muted">Used for Archana & Vedic Sankalpas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Primary Gotram */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-white-muted uppercase tracking-wider">Primary Gotram</label>
                {isEditing ? (
                  <select
                    value={formData.gotram}
                    onChange={(e) => setFormData({ ...formData, gotram: e.target.value })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-xs font-bold text-on-surface focus:outline-none"
                  >
                    {gotramsList.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                ) : (
                  <p className="bg-navy-bg/60 border border-white-muted/10 rounded-xl px-3 py-2 text-xs font-bold text-on-surface">
                    {formData.gotram}
                  </p>
                )}
              </div>

              {/* Janma Nakshatram */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-white-muted uppercase tracking-wider">Janma Nakshatram</label>
                {isEditing ? (
                  <select
                    value={formData.nakshatram}
                    onChange={(e) => setFormData({ ...formData, nakshatram: e.target.value })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-xs font-bold text-on-surface focus:outline-none"
                  >
                    {nakshatramsList.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                ) : (
                  <p className="bg-navy-bg/60 border border-white-muted/10 rounded-xl px-3 py-2 text-xs font-bold text-on-surface">
                    {formData.nakshatram}
                  </p>
                )}
              </div>

              {/* Rashi */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-white-muted uppercase tracking-wider">Rashi (Moon Sign)</label>
                {isEditing ? (
                  <select
                    value={formData.rashi}
                    onChange={(e) => setFormData({ ...formData, rashi: e.target.value })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-xs font-bold text-on-surface focus:outline-none"
                  >
                    {rashisList.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                ) : (
                  <p className="bg-navy-bg/60 border border-white-muted/10 rounded-xl px-3 py-2 text-xs font-bold text-on-surface">
                    {formData.rashi}
                  </p>
                )}
              </div>

              {/* Kuladevata */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-white-muted uppercase tracking-wider">Kuladevata</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.kuladevata}
                    onChange={(e) => setFormData({ ...formData, kuladevata: e.target.value })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-xs font-bold text-on-surface focus:outline-none"
                    placeholder="Enter family deity"
                  />
                ) : (
                  <p className="bg-navy-bg/60 border border-white-muted/10 rounded-xl px-3 py-2 text-xs font-bold text-on-surface">
                    {formData.kuladevata}
                  </p>
                )}
              </div>

              {/* Age */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-white-muted uppercase tracking-wider">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-xs font-bold text-on-surface focus:outline-none"
                  />
                ) : (
                  <p className="bg-navy-bg/60 border border-white-muted/10 rounded-xl px-3 py-2 text-xs font-bold text-on-surface">
                    {formData.age} Years
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-white-muted uppercase tracking-wider">Gender</label>
                {isEditing ? (
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-xs font-bold text-on-surface focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="bg-navy-bg/60 border border-white-muted/10 rounded-xl px-3 py-2 text-xs font-bold text-on-surface">
                    {formData.gender}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Section 2: Prasadam Delivery & Address */}
          <section className="bg-navy-surface/50 border border-white-muted/10 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-white-muted/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gold-primary text-xl">local_shipping</span>
                <h3 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider">
                  Prasadam Delivery Address
                </h3>
              </div>
              <span className="text-[10px] text-white-muted">Used for home postal prasadam delivery</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3 space-y-1">
                <label className="text-[11px] font-semibold text-white-muted uppercase tracking-wider">Address Line</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none"
                  />
                ) : (
                  <p className="bg-navy-bg/60 border border-white-muted/10 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface">
                    {formData.address}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-white-muted uppercase tracking-wider">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none"
                  />
                ) : (
                  <p className="bg-navy-bg/60 border border-white-muted/10 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface">
                    {formData.city}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-white-muted uppercase tracking-wider">State</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none"
                  />
                ) : (
                  <p className="bg-navy-bg/60 border border-white-muted/10 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface">
                    {formData.state}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-white-muted uppercase tracking-wider">Postal PIN Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none"
                  />
                ) : (
                  <p className="bg-navy-bg/60 border border-white-muted/10 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface">
                    {formData.pincode}
                  </p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-gold-primary text-navy-bg font-headline-sm text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl hover:bg-gold-secondary transition-colors shadow-lg active:scale-95 flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">save</span>
                  Save Profile Changes
                </button>
              </div>
            )}
          </section>
        </form>

        {/* Section 3: Registered Family Members for Sankalpa */}
        <section className="bg-navy-surface/50 border border-white-muted/10 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-white-muted/10 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gold-primary text-xl">family_restroom</span>
              <div>
                <h3 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider">
                  Saved Family Registry
                </h3>
                <p className="text-[10px] text-white-muted">Quickly add family members into puja bookings</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAddMemberModal(true)}
              className="text-gold-primary hover:text-gold-secondary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border border-gold-primary/30 bg-gold-primary/10 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Add Member</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {familyMembers.map((member) => (
              <div 
                key={member.id}
                className="bg-navy-bg p-3.5 rounded-xl border border-white-muted/10 flex justify-between items-center group hover:border-gold-primary/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-on-surface uppercase">{member.name}</h4>
                    {member.relationship && (
                      <span className="bg-navy-surface text-white-muted text-[9px] px-1.5 py-0.5 rounded font-medium border border-white-muted/10">
                        {member.relationship}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-white-muted">
                    Gotram: <span className="text-gold-primary font-semibold">{member.gotram}</span> • Nakshatram: <span className="text-gold-primary font-semibold">{member.nakshatram}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveFamilyMember(member.id)}
                  className="text-white-muted hover:text-rose-400 p-1 transition-colors"
                  title="Remove Member"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: App Preferences & Settings */}
        <section className="bg-navy-surface/50 border border-white-muted/10 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-white-muted/10 pb-2.5">
            <span className="material-symbols-outlined text-gold-primary text-xl">tune</span>
            <h3 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider">
              Preferences & App Settings
            </h3>
          </div>

          <div className="space-y-3 divide-y divide-white-muted/10">
            {/* Preferred Language */}
            <div className="pt-2 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-on-surface">App Language</p>
                <p className="text-[10px] text-white-muted">Choose your preferred devotional language</p>
              </div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-navy-bg border border-white-muted/20 text-gold-primary text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                {languagesList.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.native})
                  </option>
                ))}
              </select>
            </div>

            {/* Daily Panchang Notifications */}
            <div className="pt-3 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-on-surface">Daily Panchang & Tithi Alerts</p>
                <p className="text-[10px] text-white-muted">Receive morning Rahukala and auspicious muhurta alerts</p>
              </div>
              <button
                type="button"
                onClick={() => setPanchangAlerts(!panchangAlerts)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  panchangAlerts ? 'bg-gold-primary justify-end' : 'bg-navy-bg border border-white-muted/20 justify-start'
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${panchangAlerts ? 'bg-navy-bg' : 'bg-white-muted'}`} />
              </button>
            </div>

            {/* Seva Reminders */}
            <div className="pt-3 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-on-surface">Puja & Seva Reminders</p>
                <p className="text-[10px] text-white-muted">Notifications for upcoming temple sevas & live streams</p>
              </div>
              <button
                type="button"
                onClick={() => setSevaReminders(!sevaReminders)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  sevaReminders ? 'bg-gold-primary justify-end' : 'bg-navy-bg border border-white-muted/20 justify-start'
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${sevaReminders ? 'bg-navy-bg' : 'bg-white-muted'}`} />
              </button>
            </div>

            {/* Audio Autoplay */}
            <div className="pt-3 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-on-surface">Devotional Hub Autoplay</p>
                <p className="text-[10px] text-white-muted">Play sacred stotrams and suprabhatam automatically</p>
              </div>
              <button
                type="button"
                onClick={() => setAudioAutoplay(!audioAutoplay)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  audioAutoplay ? 'bg-gold-primary justify-end' : 'bg-navy-bg border border-white-muted/20 justify-start'
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${audioAutoplay ? 'bg-navy-bg' : 'bg-white-muted'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Section 5: Support, Security & Logout */}
        <section className="bg-navy-surface/50 border border-white-muted/10 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-white-muted/10 pb-2.5">
            <span className="material-symbols-outlined text-gold-primary text-xl">shield</span>
            <h3 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider">
              Help, Privacy & Account
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => pushScreen('bookings-history')}
              className="flex items-center justify-between p-3 rounded-xl bg-navy-bg border border-white-muted/10 hover:border-gold-primary/30 text-white-muted hover:text-gold-primary transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-lg text-gold-primary">receipt_long</span>
                <span className="font-semibold text-on-surface">Payment Receipts & History</span>
              </div>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>

            <button
              onClick={() => alert('SankalpaVani Devotee Concierge Helpdesk: Toll-free 1800-208-7265 (Available 6:00 AM to 9:00 PM IST)')}
              className="flex items-center justify-between p-3 rounded-xl bg-navy-bg border border-white-muted/10 hover:border-gold-primary/30 text-white-muted hover:text-gold-primary transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-lg text-gold-primary">support_agent</span>
                <span className="font-semibold text-on-surface">Priest Concierge / Support</span>
              </div>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={logout}
              className="w-full bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 font-headline-sm text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Sign Out from Device
            </button>
          </div>
        </section>

      </main>

      {/* Add Family Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-navy-surface border border-gold-primary/30 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-white-muted/10 pb-2.5">
              <h3 className="font-headline-sm text-sm font-bold text-gold-primary uppercase tracking-wide flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">person_add</span>
                Add Family Member
              </h3>
              <button onClick={() => setShowAddMemberModal(false)} className="text-white-muted hover:text-white">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleAddFamilyMember} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-white-muted uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter devotee name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-on-surface font-semibold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-white-muted uppercase">Gotram</label>
                  <select
                    value={newMember.gotram}
                    onChange={(e) => setNewMember({ ...newMember, gotram: e.target.value })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-on-surface font-semibold focus:outline-none"
                  >
                    {gotramsList.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-white-muted uppercase">Nakshatram</label>
                  <select
                    value={newMember.nakshatram}
                    onChange={(e) => setNewMember({ ...newMember, nakshatram: e.target.value })}
                    className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-on-surface font-semibold focus:outline-none"
                  >
                    {nakshatramsList.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-white-muted uppercase">Relationship</label>
                <input
                  type="text"
                  placeholder="e.g. Spouse, Son, Daughter, Parent"
                  value={newMember.relationship}
                  onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value })}
                  className="w-full bg-navy-bg border border-white-muted/20 focus:border-gold-primary rounded-xl px-3 py-2 text-on-surface font-semibold focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 rounded-xl text-white-muted hover:text-white border border-white-muted/20 font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-primary text-navy-bg hover:bg-gold-secondary font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
