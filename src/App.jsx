import React, { useContext, useEffect } from 'react';
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

function AppContent() {
  const { currentScreen, popScreen, currentScreenStack } = useContext(AppContext);

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
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-navy-bg text-on-surface overflow-hidden font-sans pt-[max(env(safe-area-inset-top),1.5rem)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto relative bg-navy-bg">
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
