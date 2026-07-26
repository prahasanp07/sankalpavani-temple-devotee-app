import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const initialBookings = [
  {
    id: 'SV-491823',
    temple: 'Sri Venkateswara Temple',
    service: 'Archana',
    date: '10 Jun 2026',
    timeSlot: '08:30 AM',
    price: 500,
    devotees: [
      { name: 'Anand Kumar', gotram: 'Bharadwaja', nakshatram: 'Rohini', phone: '9876543210' }
    ],
    status: 'Completed',
    receiptUrl: '#'
  },
  {
    id: 'SV-124985',
    temple: 'Sri Venkateswara Temple',
    service: 'Ganapathi Homa',
    date: '02 May 2026',
    timeSlot: '06:00 AM',
    price: 2100,
    devotees: [
      { name: 'Anand Kumar', gotram: 'Bharadwaja', nakshatram: 'Rohini', phone: '9876543210' },
      { name: 'Sita Kumar', gotram: 'Bharadwaja', nakshatram: 'Sravana', phone: '9876543210' }
    ],
    status: 'Completed',
    receiptUrl: '#'
  }
];

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sankalpavani_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [bookingsHistory, setBookingsHistory] = useState(() => {
    const saved = localStorage.getItem('sankalpavani_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [donationsHistory, setDonationsHistory] = useState(() => {
    const saved = localStorage.getItem('sankalpavani_donations');
    return saved ? JSON.parse(saved) : [];
  });

  // Navigation state management
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [screenStack, setScreenStack] = useState(['splash']);

  const pushScreen = (screen) => {
    setCurrentScreen(screen);
    setScreenStack((prev) => [...prev, screen]);
  };

  const popScreen = () => {
    if (screenStack.length > 1) {
      const newStack = [...screenStack];
      newStack.pop(); // Remove current
      const previousScreen = newStack[newStack.length - 1];
      setCurrentScreen(previousScreen);
      setScreenStack(newStack);
    }
  };

  const resetNavigation = (screen) => {
    setCurrentScreen(screen);
    setScreenStack([screen]);
  };

  // Active booking process state
  const [activeBooking, setActiveBooking] = useState({
    temple: 'Sri Venkateswara Temple',
    service: null, // { name: 'Maha Aarti', price: 501 }
    date: null, // { dayName: 'Thu', dayNum: 12, month: 'Oct', fullDate: '12 Oct 2026' }
    slot: null, // { time: '06:00 AM', name: 'Suprabhatam' }
    devotees: [] // Array of { name, gotram, nakshatram, phone }
  });

  // Active donation state
  const [activeDonation, setActiveDonation] = useState({
    cause: null, // e.g. 'Annadanam (Free Meals)'
    amount: null,
    pan: '',
    name: ''
  });

  // Selected temple state (used globally across home and detail screens)
  const [selectedTemple, setSelectedTemple] = useState({
    id: 'dodda-ganesha-basavanagudi',
    name: 'Dodda Ganesha Temple',
    location: 'Basavanagudi, Bengaluru',
    rating: '4.9',
    reviews: '2.4k',
    distance: '3.5 km',
    img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
  });

  // Save states to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sankalpavani_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sankalpavani_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sankalpavani_bookings', JSON.stringify(bookingsHistory));
  }, [bookingsHistory]);

  useEffect(() => {
    localStorage.setItem('sankalpavani_donations', JSON.stringify(donationsHistory));
  }, [donationsHistory]);

  // Actions
  const login = (phone) => {
    const user = { phone, name: 'Anand Kumar' };
    setCurrentUser(user);
    resetNavigation('home');
  };

  const logout = () => {
    setCurrentUser(null);
    resetNavigation('login');
  };

  const selectService = (service) => {
    setActiveBooking(prev => ({ ...prev, service }));
    pushScreen('service-detail');
  };

  const selectSlot = (date, slot) => {
    setActiveBooking(prev => ({ ...prev, date, slot }));
    pushScreen('devotee-form');
  };

  const saveDevotees = (devotees) => {
    setActiveBooking(prev => ({ ...prev, devotees }));
    pushScreen('booking-detail');
  };

  const confirmBooking = () => {
    const basePrice = activeBooking.service.price || 0;
    const basePersons = activeBooking.service.persons || 1;
    const extraPersonCost = activeBooking.service.extraPersonCost || 0;
    const totalDevotees = activeBooking.devotees.length || 1;
    const extraDevotees = Math.max(0, totalDevotees - basePersons);
    const calculatedPrice = basePrice + (extraDevotees * extraPersonCost);

    const newBooking = {
      id: 'SV-' + Math.floor(100000 + Math.random() * 900000),
      temple: activeBooking.temple,
      service: activeBooking.service.name,
      date: activeBooking.date.fullDate,
      timeSlot: activeBooking.slot.time,
      price: calculatedPrice,
      devotees: activeBooking.devotees,
      status: 'Upcoming',
      receiptUrl: '#'
    };
    setBookingsHistory(prev => [newBooking, ...prev]);
    return newBooking.id;
  };

  const confirmDonation = () => {
    const newDonation = {
      id: 'DN-' + Math.floor(100000 + Math.random() * 900000),
      cause: activeDonation.cause,
      amount: activeDonation.amount,
      pan: activeDonation.pan,
      name: activeDonation.name,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Successful'
    };
    setDonationsHistory(prev => [newDonation, ...prev]);
    return newDonation.id;
  };

  // Mock Devotional Playlist State
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const playlist = [
    { title: 'Sri Venkateswara Suprabhatam', artist: 'M.S. Subbulakshmi', duration: '20:15', file: 'suprabhatam.mp3' },
    { title: 'Vishnu Sahasranamam', artist: 'Traditional', duration: '28:40', file: 'sahasranamam.mp3' },
    { title: 'Bhaja Govindam', artist: 'M.S. Subbulakshmi', duration: '08:12', file: 'bhajagovindam.mp3' },
    { title: 'Ganesha Pancharatnam', artist: 'S.P. Balasubrahmanyam', duration: '05:30', file: 'ganesha.mp3' }
  ];

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        bookingsHistory,
        donationsHistory,
        currentScreen,
        pushScreen,
        popScreen,
        resetNavigation,
        activeBooking,
        setActiveBooking,
        selectService,
        selectSlot,
        saveDevotees,
        confirmBooking,
        activeDonation,
        setActiveDonation,
        confirmDonation,
        selectedTemple,
        setSelectedTemple,
        
        // Playlist state
        playlist,
        currentTrackIndex,
        setCurrentTrackIndex,
        isPlaying,
        setIsPlaying,
        trackProgress,
        setTrackProgress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
