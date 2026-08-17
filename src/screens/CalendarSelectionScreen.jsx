import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const timeSlots = [
  { id: 't1', time: '06:00 AM', name: 'Suprabhatam', available: true, icon: 'wb_sunny' },
  { id: 't2', time: '08:30 AM', name: 'Archana', available: true, icon: 'wb_sunny' },
  { id: 't3', time: '10:00 AM', name: 'Alankaram', available: false, icon: 'block' },
  { id: 't4', time: '05:30 PM', name: 'Sandhya Aarti', available: true, icon: 'bedtime' },
  { id: 't5', time: '07:30 PM', name: 'Ekantha Seva', available: false, icon: 'block' }
];

// Robust date parsing helper
const parseBookingDate = (dateVal) => {
  if (!dateVal) return '';
  if (typeof dateVal !== 'string') return '';

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) {
    return dateVal;
  }

  const parts = dateVal.split(' ');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const monthStr = parts[1];
    const year = parts[2];

    const months = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    const month = months[monthStr] || '01';
    return `${year}-${month}-${day}`;
  }

  return dateVal;
};

// Safe date string formatter
const formatDateString = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export default function CalendarSelectionScreen() {
  const { activeBooking, popScreen, pushScreen, setActiveBooking } = useContext(AppContext);
  const service = activeBooking.service || { name: 'Archana Pooja', capacity: 20 };

  const category = (service.category || service.type || 'Daily').toLowerCase();
  const selectedDays = service.selectedDays || [];
  const selectedDate = service.selectedDate || null;
  const dateFrom = service.dateFrom || null;
  const dateTo = service.dateTo || null;

  // Navigation states
  const [currentDate, setCurrentDate] = useState(() => {
    if ((category === 'monthly' || category === 'annually' || category === 'special') && selectedDate) {
      const parsed = new Date(selectedDate);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    if (category === 'dhanur masa' && dateFrom) {
      const parsed = new Date(dateFrom);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    const now = new Date();
    if (now.getFullYear() < 2026) {
      return new Date(2026, 6, 25); // July 25, 2026
    }
    return now;
  });

  // Dynamic date locking based on Seva category and constraints
  const isDateLocked = (dateStr, cellDate) => {
    if (category === 'weekly') {
      let days = selectedDays;
      if (!days || days.length === 0) {
        const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const matched = fullDayNames.filter(d => 
          service.name?.toLowerCase().includes(d.toLowerCase()) || 
          service.desc?.toLowerCase().includes(d.toLowerCase()) ||
          service.instructions?.toLowerCase().includes(d.toLowerCase())
        );
        if (matched.length > 0) {
          days = matched;
        }
      }

      if (days && days.length > 0) {
        const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = fullDayNames[cellDate.getDay()];
        const selectedDaysLower = days.map(d => String(d).toLowerCase());
        return !selectedDaysLower.includes(dayName.toLowerCase());
      }
    }
    
    if (category === 'monthly' || category === 'annually' || category === 'special') {
      if (selectedDate) {
        return dateStr !== selectedDate;
      }
    }
    
    if (category === 'dhanur masa') {
      if (dateFrom && dateStr < dateFrom) return true;
      if (dateTo && dateStr > dateTo) return true;
    }
    
    return false;
  };

  const [selectedDateStr, setSelectedDateStr] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  // Load bookings from both devotee and admin storage keys
  useEffect(() => {
    const loadedBookings = [];

    // 1. Devotee bookings
    const devB = localStorage.getItem('sankalpavani_bookings');
    if (devB) {
      try {
        const parsed = JSON.parse(devB);
        if (Array.isArray(parsed)) loadedBookings.push(...parsed);
      } catch (e) { }
    }

    // 2. Admin bookings
    const admB = localStorage.getItem('sankalpvani_bookings');
    if (admB) {
      try {
        const parsed = JSON.parse(admB);
        if (Array.isArray(parsed)) loadedBookings.push(...parsed);
      } catch (e) { }
    }

    setBookings(loadedBookings);
  }, []);

  // Determine availability status based on actual bookings count & service capacity
  const getDayStatus = (dateStr) => {
    const count = bookings.filter(b => {
      const bDateStr = parseBookingDate(b.date || b.bookingDate);
      const bService = b.service || b.sevaName;
      return bDateStr === dateStr && bService?.toLowerCase() === service.name?.toLowerCase();
    }).length;

    const capacityLimit = service.dailyCapacityLimit || service.capacity || 20;
    if (count >= capacityLimit) return 'Fully Booked';

    // Fallback deterministic statuses so other dates look visually detailed and active
    const d = new Date(dateStr);
    const day = d.getDay();
    const dateNum = d.getDate();

    if (day === 0 || day === 6) { // Weekends
      if (dateNum % 3 === 0) return 'Fully Booked';
      return 'Filling Fast';
    }
    if (day === 2) { // Tuesday
      if (dateNum % 4 === 0) return 'Fully Booked';
      return 'Filling Fast';
    }
    if (dateNum % 5 === 0) return 'Filling Fast';
    return 'Available';
  };

  // Retrieve occupancy numbers for selection
  const getOccupancyStats = (dateStr) => {
    if (!dateStr) return { capacity: 20, filledSlots: 0, availableSlots: 20 };

    const capacity = service.dailyCapacityLimit || service.capacity || 20;
    const count = bookings.filter(b => {
      const bDateStr = parseBookingDate(b.date || b.bookingDate);
      const bService = b.service || b.sevaName;
      return bDateStr === dateStr && bService?.toLowerCase() === service.name?.toLowerCase();
    }).length;

    let filledSlots = count;
    if (filledSlots === 0) {
      const status = getDayStatus(dateStr);
      if (status === 'Fully Booked') {
        filledSlots = capacity;
      } else if (status === 'Filling Fast') {
        filledSlots = Math.round(capacity * 0.8);
      } else {
        filledSlots = Math.round(capacity * 0.15);
      }
    }

    return {
      capacity,
      filledSlots: Math.min(capacity, filledSlots),
      availableSlots: Math.max(0, capacity - filledSlots)
    };
  };

  // Navigations
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Generate Calendar cells
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  const cells = [];

  // Previous month padding
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = new Date(currentYear, currentMonth - 1, prevMonthDays - i);
    cells.push({
      date: d,
      isCurrentMonth: false,
      dateStr: formatDateString(d)
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(currentYear, currentMonth, i);
    cells.push({
      date: d,
      isCurrentMonth: true,
      dateStr: formatDateString(d)
    });
  }

  // Next month padding
  const totalCellsNeeded = cells.length > 35 ? 42 : 35;
  const nextMonthDaysNeeded = totalCellsNeeded - cells.length;
  for (let i = 1; i <= nextMonthDaysNeeded; i++) {
    const d = new Date(currentYear, currentMonth + 1, i);
    cells.push({
      date: d,
      isCurrentMonth: false,
      dateStr: formatDateString(d)
    });
  }

  // Selection Proceed handler
  const handleProceed = () => {
    if (!selectedDateStr) {
      setError('Please select a date.');
      return;
    }
    if (!selectedSlot) {
      setError('Please select a time slot.');
      return;
    }

    const d = new Date(selectedDateStr);
    const dayName = dayNames[d.getDay()];
    const dayNum = d.getDate();
    const month = monthNames[d.getMonth()];

    // Construct target format expected by devotee form
    const dateObj = {
      dayName,
      dayNum,
      month,
      fullDate: `${dayNum} ${month} ${d.getFullYear()}`
    };

    setActiveBooking(prev => ({
      ...prev,
      date: dateObj,
      slot: selectedSlot
    }));

    setShowBottomSheet(false);
    pushScreen('devotee-form');
  };

  const selectedStats = getOccupancyStats(selectedDateStr);

  return (
    <div className="bg-navy-bg font-body-md text-on-surface antialiased min-h-screen flex flex-col pt-24 pb-24 h-full overflow-y-auto">
      {/* TopAppBar */}
      <header className="fixed top-0 inset-x-0 w-full z-45 bg-surface/80 backdrop-blur-md border-b border-white-muted/10 shadow-sm flex items-center px-margin-main pt-[max(env(safe-area-inset-top),1.5rem)] pb-3">
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
          <button
            onClick={popScreen}
            className="text-white-muted hover:text-gold-secondary transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-display-vertical text-display-vertical uppercase tracking-widest text-gold-primary tracking-[0.1em]">SELECT DATE</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="flex-grow px-margin-main py-6 flex flex-col gap-6 max-w-4xl mx-auto w-full">
        {/* Context header */}
        <section className="text-center space-y-1">
          <h2 className="font-headline-lg text-lg text-gold-primary uppercase font-bold">{service.name}</h2>
          <p className="text-xs text-white-muted">Select a date from the calendar roster to check slot availability.</p>
        </section>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-black p-3 rounded-lg text-center text-xs font-bold shadow-sm">
            {error}
          </div>
        )}

        {/* Legend */}
        <section className="bg-navy-surface border border-white-muted/5 rounded-xl p-3.5 flex justify-around text-[10px] uppercase font-bold tracking-wider text-black/80 shadow-md">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Filling Fast</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Fully Booked</span>
          </div>
        </section>

        {/* Calendar Card Panel */}
        <section className="bg-navy-surface border border-white-muted/10 rounded-xl p-4 shadow-lg flex flex-col gap-4">

          {/* Calendar Month Navigation Header */}
          <div className="flex justify-between items-center px-1">
            <button
              onClick={prevMonth}
              className="w-8 h-8 rounded-full border border-white-muted/10 flex items-center justify-center text-white-muted hover:text-gold-primary hover:border-gold-primary/50 transition-colors"
            >
              <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
            </button>
            <span className="font-headline-lg text-base text-gold-primary font-bold uppercase tracking-wider">
              {fullMonthNames[currentMonth]} {currentYear}
            </span>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-full border border-white-muted/10 flex items-center justify-center text-white-muted hover:text-gold-primary hover:border-gold-primary/50 transition-colors"
            >
              <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
            </button>
          </div>

          {/* Days of Week Header Grid */}
          <div className="grid grid-cols-7 text-center font-label-caps text-[9px] font-bold text-gold-primary/60 border-b border-white-muted/5 pb-2">
            {dayNames.map((d, i) => (
              <span key={i} className={d === 'Sun' ? 'text-rose-400' : ''}>{d}</span>
            ))}
          </div>

          {/* Calendar Day Cells Grid */}
          <div className="grid grid-cols-7 gap-y-3.5 gap-x-1.5 text-center text-xs">
            {cells.map((cell, idx) => {
              const cellDate = new Date(cell.date);
              cellDate.setHours(0, 0, 0, 0);

              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const isPast = cellDate < today;
              const isSelected = selectedDateStr === cell.dateStr;
              const isLocked = isDateLocked(cell.dateStr, cellDate);
              const status = getDayStatus(cell.dateStr);

              let statusDotColor = 'bg-emerald-500';
              let isFullyBooked = false;

              if (status === 'Fully Booked') {
                statusDotColor = 'bg-rose-500';
                isFullyBooked = true;
              } else if (status === 'Filling Fast') {
                statusDotColor = 'bg-amber-500';
              }

              return (
                <button
                  key={idx}
                  disabled={!cell.isCurrentMonth || isPast || isLocked}
                  onClick={() => {
                    if (isFullyBooked) {
                      setError('This date is fully booked. Please select another date.');
                      return;
                    }
                    setError('');
                    setSelectedDateStr(cell.dateStr);
                    setShowBottomSheet(true);
                  }}
                  className={`flex flex-col items-center justify-between py-1.5 h-12 rounded-lg border transition-all ${!cell.isCurrentMonth
                      ? 'border-transparent text-white-muted/20 opacity-0 pointer-events-none'
                      : (isPast || isLocked)
                        ? 'border-transparent bg-white-muted/5 text-black/30 cursor-not-allowed opacity-30'
                        : isSelected
                          ? 'border-gold-primary bg-gold-primary/10 text-gold-primary font-bold shadow-md'
                          : isFullyBooked
                            ? 'border-transparent bg-rose-500/5 text-black/40 cursor-not-allowed opacity-50'
                            : 'border-white-muted/5 bg-navy-bg/30 text-black hover:border-gold-primary/30'
                    }`}
                >
                  <span className="font-semibold text-[11px]">{cell.date.getDate()}</span>
                  {!isPast && !isLocked ? (
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor}`}></span>
                  ) : (
                    <span className="w-1.5 h-1.5 bg-transparent"></span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {/* Premium Time Slots Bottom Sheet Modal */}
      {showBottomSheet && selectedDateStr && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          {/* Backdrop click closes sheet */}
          <div className="absolute inset-0" onClick={() => setShowBottomSheet(false)}></div>

          {/* Sheet Container */}
          <div className="relative w-full max-w-lg mx-auto bg-navy-bg border border-white-muted/10 rounded-t-3xl md:rounded-3xl md:mb-8 p-6 space-y-6 z-50 shadow-2xl max-h-[85vh] overflow-y-auto animate-[slideUp_0.25s_ease-out]">

            {/* Grab Handle */}
            <div className="w-12 h-1 bg-white-muted/20 rounded-full mx-auto -mt-2 mb-2"></div>

            {/* Header info */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-gold-primary font-bold uppercase tracking-widest">Select time slot</span>
                <h3 className="font-headline-lg text-base text-black font-bold mt-1">
                  {new Date(selectedDateStr).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                </h3>
              </div>
              <button
                onClick={() => setShowBottomSheet(false)}
                className="text-white-muted hover:text-white p-1"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Allowed vs Booked status stats bar */}
            <div className="bg-navy-surface border border-white-muted/5 p-4 rounded-xl space-y-2">
              {selectedStats.filledSlots >= selectedStats.capacity ? (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-2.5 rounded-lg text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 animate-pulse">
                  <span className="material-symbols-outlined text-sm">block</span>
                  Fully Booked
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-xs font-semibold text-black/70">
                    <span>Bookings Allowed (Max)</span>
                    <span className="text-black font-bold">{selectedStats.capacity}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-black/70 border-t border-white-muted/5 pt-2">
                    <span>Filled Slots</span>
                    <span className="text-black font-bold">{selectedStats.filledSlots} / {selectedStats.capacity}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-black/70 border-t border-white-muted/5 pt-2">
                    <span>Remaining Available</span>
                    <span className="text-emerald-500 font-bold">{selectedStats.availableSlots} seats left</span>
                  </div>
                </>
              )}
            </div>

            {/* Grid of Slots */}
            <div className="grid grid-cols-2 gap-3.5">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                // Check if slot itself or entire day is booked
                const isSlotBooked = !slot.available || 
                  (selectedStats.filledSlots >= selectedStats.capacity) || 
                  (selectedStats.filledSlots >= Math.round(selectedStats.capacity * 0.8) && (slot.id === 't3' || slot.id === 't5'));

                if (isSlotBooked) {
                  return (
                    <div
                      key={slot.id}
                      className="rounded-xl border border-white-muted/5 p-3 flex flex-col items-center justify-center bg-navy-surface/30 opacity-40 cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-white-muted/40 text-xs mb-1.5">block</span>
                      <span className="font-semibold text-xs text-white-muted/40 line-through">{slot.time}</span>
                      <span className="text-[9px] text-rose-400 mt-1 uppercase font-bold">Filled</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-xl border p-3 flex flex-col items-center justify-center cursor-pointer bg-navy-surface relative overflow-hidden transition-all duration-200 ${isSelected
                        ? 'border-gold-primary bg-gold-primary/10 text-gold-primary ring-1 ring-gold-primary'
                        : 'border-white-muted/20 hover:border-gold-primary/40'
                      }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 bg-gold-primary text-navy-bg w-5 h-5 flex items-center justify-center rounded-bl-lg">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      </div>
                    )}
                    <span className={`material-symbols-outlined text-sm mb-1 ${isSelected ? 'text-gold-primary' : 'text-white-muted'}`}>
                      {slot.icon}
                    </span>
                    <span className={`font-bold text-xs ${isSelected ? 'text-gold-primary' : 'text-black'}`}>
                      {slot.time}
                    </span>
                    <span className={`text-[9px] mt-0.5 uppercase ${isSelected ? 'text-gold-primary/80' : 'text-white-muted'}`}>
                      {slot.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Sheet Confirm CTA Action */}
            <div className="pt-2">
              <button
                disabled={selectedStats.filledSlots >= selectedStats.capacity}
                onClick={handleProceed}
                className={`w-full font-headline-sm text-sm uppercase tracking-wider py-4 rounded-xl font-bold transition-all shadow-md active:scale-95 ${
                  selectedStats.filledSlots >= selectedStats.capacity
                    ? 'bg-white-muted/10 text-white-muted/30 cursor-not-allowed border border-white-muted/5'
                    : 'bg-gold-primary text-navy-bg hover:bg-gold-secondary'
                }`}
              >
                {selectedStats.filledSlots >= selectedStats.capacity ? 'Fully Booked' : 'Confirm & Proceed to Devotee Details'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
