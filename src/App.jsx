import React, { useContext, useEffect, useRef } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { App as CapacitorApp } from '@capacitor/app';

// Import Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import TempleDetailScreen from './screens/TempleDetailScreen';
import ServicesListScreen from './screens/ServicesListScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import CalendarSelectionScreen from './screens/CalendarSelectionScreen';
import DevoteeFormScreen from './screens/DevoteeFormScreen';
import BookingDetailScreen from './screens/BookingDetailScreen';
import PaymentScreen from './screens/PaymentScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
import BookingsHistoryScreen from './screens/BookingsHistoryScreen';
import DevotionalAggregatorScreen from './screens/DevotionalAggregatorScreen';
import DonationScreen from './screens/DonationScreen';
import TemplesListScreen from './screens/TemplesListScreen';
import ProfileScreen from './screens/ProfileScreen';

function AppContent() {
  const { currentScreen, popScreen, screenStack, selectedTemple } = useContext(AppContext);
  const scrollContainerRef = useRef(null);

  // Automatically scroll to the top of the new screen on every navigation
  useEffect(() => {
    const scrollToTop = () => {
      // 1. Reset main app container scroll position
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
        scrollContainerRef.current.scrollLeft = 0;
      }

      // 2. Reset window and root document scroll position
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }

      // 3. Reset any nested scrollable elements inside the mounted screen
      const scrollables = document.querySelectorAll(
        '.overflow-y-auto, main, [class*="overflow-y-auto"]'
      );
      scrollables.forEach((el) => {
        el.scrollTop = 0;
      });
    };

    scrollToTop();
    const animId = requestAnimationFrame(scrollToTop);
    const timerId = setTimeout(scrollToTop, 20);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timerId);
    };
  }, [currentScreen, screenStack?.length, selectedTemple?.id]);

  // Hook into Capacitor native back button for Android
  useEffect(() => {
    let backButtonListener = null;

    try {
      backButtonListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        // If we are not on root screens, pop the screen
        if (currentScreen !== 'home' && currentScreen !== 'login' && currentScreen !== 'splash') {
          popScreen();
        } else {
          // Minimize the app or exit if at home/login root
          CapacitorApp.minimizeApp();
        }
      });
    } catch (e) {
      // Capacitor not running in web browser environment
      console.log('Capacitor App listener not active (running in web browser).');
    }

    return () => {
      if (backButtonListener) {
        backButtonListener.then((h) => h.remove());
      }
    };
  }, [currentScreen, popScreen]);

  // Map string screens to components
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'login':
        return <LoginScreen />;
      case 'home':
        return <HomeScreen />;
      case 'temples-list':
        return <TemplesListScreen />;
      case 'temple-detail':
        return <TempleDetailScreen />;
      case 'services-list':
        return <ServicesListScreen />;
      case 'service-detail':
        return <ServiceDetailScreen />;
      case 'calendar-selection':
        return <CalendarSelectionScreen />;
      case 'devotee-form':
        return <DevoteeFormScreen />;
      case 'booking-detail':
        return <BookingDetailScreen />;
      case 'payment':
        return <PaymentScreen />;
      case 'payment-success':
        return <PaymentSuccessScreen />;
      case 'bookings-history':
        return <BookingsHistoryScreen />;
      case 'devotional-aggregator':
        return <DevotionalAggregatorScreen />;
      case 'donation':
        return <DonationScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-navy-bg text-on-surface overflow-hidden font-sans pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div 
        ref={scrollContainerRef}
        key={`${screenStack?.length || 1}-${currentScreen}`}
        className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto relative bg-navy-bg"
      >
        {renderScreen()}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
