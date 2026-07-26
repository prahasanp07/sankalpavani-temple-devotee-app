# Detailed Feature & Technical Analysis Report
## Sankalpavani Devotee Mobile Application (v0.2)

---

### Executive Summary

**Sankalpavani Devotee App (v0.2)** is a mobile-first devotional application designed for devotees across India to explore temples, book sacred sevas (puja, abhishekam, kalyanotsavam), stream devotional music and stotras, check daily Panchangam, make tax-exempt donations, and access digital e-passes with QR code verification. Built with React, Tailwind CSS, and Capacitor for Android compilation, it delivers native-level mobile interaction with a custom equirectangular map engine, pinch-to-zoom bounding algorithms, touch interaction scroll locks, and custom audio player pipelines.

---

## 1. Application Architecture & Tech Stack

* **Frontend Framework**: React 18 with Vite fast bundler.
* **Styling Engine**: Tailwind CSS with custom design system tokens (`bg-navy-bg` dark background, `text-gold-primary` gold accents, `bg-navy-surface` dark surfaces, and custom typography curves).
* **Native Mobile Wrapper**: Capacitor JS v8 (`@capacitor/app`) compiling directly to Android native APK (`gradlew assembleDebug`).
* **State Management**: Centralized React Context (`AppContext.jsx`) with `localStorage` fallback persistence.
* **Routing Architecture**: Custom Stack-based Navigation Router (`screenStack`, `pushScreen`, `popScreen`, `resetNavigation`) supporting smooth CSS slide transitions.
* **Desktop Preview Harness**: Responsive mobile mockup frame in `App.jsx` with hardware bezel and camera notch for desktop testing.

---

## 2. Screen-by-Screen Detailed Functional Breakdown

The application features **14 dedicated screens**, providing a streamlined booking and devotional experience:

```
                                  ┌──────────────────┐
                                  │   SplashScreen   │
                                  └────────┬─────────┘
                                           │
                                  ┌────────▼─────────┐
                                  │ OnboardingScreen │
                                  └────────┬─────────┘
                                           │
                                  ┌────────▼─────────┐
                                  │   LoginScreen    │
                                  └────────┬─────────┘
                                           │
  ┌───────────────────┬────────────────────┼────────────────────┬───────────────────┐
  │                   │                    │                    │                   │
┌─▼────────┐ ┌────────▼─────────┐ ┌────────▼──────────┐ ┌───────▼───────────┐ ┌─────▼──────┐
│HomeScreen│ │ServicesListScreen│ │DevotionalAggregator│ │BookingsHistory    │ │DonationPage│
└────┬─────┘ └───────┬─────────┘ └────────────────────┘ └───────────────────┘ └────────────┘
     │               │
┌────▼─────────┐ ┌───▼─────────┐
│TempleDetail  │ │ServiceDetail│
└──────────────┘ └───┬─────────┘
                     │
             ┌───────▼─────────────┐
             │CalendarSelection    │ (With integrated Slot Selection Sheet)
             └───────┬─────────────┘
                     │
             ┌───────▼─────────────┐
             │ DevoteeFormScreen   │
             └───────┬─────────────┘
                     │
             ┌───────▼─────────────┐
             │ BookingDetailScreen │
             └───────┬─────────────┘
                     │
             ┌───────▼─────────────┐
             │    PaymentScreen    │
             └───────┬─────────────┘
                     │
             ┌───────▼─────────────┐
             │PaymentSuccessScreen │
             └─────────────────────┘
```

---

### 2.1. Splash Screen (`SplashScreen.jsx`)
* **Visual Presentation**: Animated glowing gold temple emblem (`pulse-gold`), vertical typography branding (`SANKALPAVANI`), and tagline *"Your Gateway to Divine Grace"*.
* **Automatic Routing Logic**: Reads `localStorage` for `sankalpavani_user`. If user is logged in, auto-navigates to `HomeScreen`; otherwise redirects to `OnboardingScreen` after a 2.5-second timer.

### 2.2. Onboarding Screen (`OnboardingScreen.jsx`)
* **3-Page Feature Carousel**:
  1. *Explore Sacred Shrines*: Interactive map of ancient temples across India.
  2. *Hassle-Free Seva Bookings*: Guaranteed slots, instant e-passes, and live updates.
  3. *Devotional Audio & Panchangam*: Listen to daily Suprabhatam, stotras, and astrological timings.
* **Navigation Controls**: Active dot indicators, "Skip" button to jump directly to login, and "Next / Get Started" CTA button.

### 2.3. Login Screen (`LoginScreen.jsx`)
* **Country Code Prefill**: Fixed `+91` (India) input field with validation (10-digit mobile number requirement).
* **2-Step OTP Authentication**:
  * Step 1: Mobile number entry with "Send OTP" button.
  * Step 2: 4-Digit OTP box inputs with automatic focus advancement, resend timer countdown (30s), and "Verify & Proceed" trigger.
* **Legal Terms Checkbox**: Terms of Service and Privacy Policy confirmation.

### 2.4. Home Screen (`HomeScreen.jsx`) — *Core Hub*
* **Interactive Profile Welcome Bar**:
  - Interactive profile avatar of `"Prahasan P"` on the left. Clicking the photo toggles open the drawer menu layout.
  - Greeting text details `"Welcome Back, Prahasan P"` styled with custom gold headers.
  - Notification button on the right containing a standard bell icon with a glowing pulse red notification dot.
* **Compact Full-Width Search Input**:
  - A slim search input bar spanning the full width of the screen.
  - Features a magnifying glass search icon and compact vertical padding (`py-1.5`) for a tighter header layout.
* **Prominent Brand Hero Card**:
  - Gold-to-amber gradient promotional card titled *"Your Gateway to Divine Blessings"*.
  - Left column: Detailed features description and a clear CTA button redirecting users to the explore temples listing.
  - Right column: Integrates a highly detailed, vector-based custom Temple Gopuram (sacred tower) SVG graphic.
* **Interactive Clean India Map Container**:
  * **Custom Graphic Asset**: `india_map_clean.png` loaded in 1:1 aspect ratio container.
  * **Real Coordinates Engine**: Projects geographical latitude and longitude onto `%` coordinates via:
    $$\text{top} = \frac{\text{North} - \text{Lat}}{\text{North} - \text{South}} \times 100, \quad \text{left} = \frac{\text{Lng} - \text{West}}{\text{East} - \text{West}} \times 100$$
    *(Calibrated bounds: North 39.4, South 6.4, West 65.2, East 93.8)*.
  * **13 Geographically Placed Temples**:
    Tirupati Venkateswara, Somnath Jyotirlinga, Kedarnath Temple, Mysuru Chamundeshwari, Udupi Krishna, Bhatkal Murudeshwar, Hampi Virupaksha, Kollur Mookambika, Kukke Subramanya, Dharmasthala Manjunatha, Belur Chennakeshava, Halebidu Hoysaleswara, Gokarna Mahabaleshwar.
  * **Vector Pin Styling**: Teardrop CSS marker with glowing selection aura, temple icon, and bouncing label tooltip.
  * **Zoom & Pan Engine**: Floating `+` and `-` zoom controls, double-touch pinch-to-zoom support, and mathematically bounded dragging to prevent map borders from exiting the frame.
  * **Selection Centering**: Tapping a pin smooth-pans the map to position the selected pin in the exact center of the container at `scale: 2.2`.
  * **Touch Interaction Scroll Lock**: Non-passive `touchmove` listener (`e.preventDefault()`) toggling `overflow-hidden` on the parent scroll view while interacting with the map, preventing janky page scrolls.
* **Selected Temple Bottom Sheet**: Floating sheet displaying temple photo, location, rating, distance, and quick "Book Seva" action.
* **Side Navigation Drawer**: Quick links to Profile, Booking History, Audio Player, Donations, and Logout.
* **Scrollable Dashboard Sections**:
  * **Featured Banners Carousel**: Horizontally scrolling promo banners with special event tags.
  * **Explore Temples List**: Cards showing star ratings, review counts, distances, and photos.
  * **Popular Sevas Grid**: Seva cards with duration, price, and direct redirection to the Calendar Selection screen.
  * **Mini Audio Player Card**: Play/pause toggle and track progress indicator.
  * **Mantra of the Day**: Daily spiritual quote card.
* **Floating Curved Navigation Dock**:
  - Replaces traditional bottom navigation bars with an elegant, pill-shaped floating capsule container.
  - Floating above the bottom margin with deep shadow casing, translucent borders, and 4 centered action buttons: HOME, BOOKINGS, HUB, and DONATE.

### 2.5. Services List Screen (`ServicesListScreen.jsx`)
* **Real-time Search Bar**: Instant filtering by seva name or keyword.
* **Category Pill Filters**: "All", "Abhishekam", "Puja", "Kalyanotsavam", "Special".
* **Seva Item Cards**: Title, duration, timing, price badge, short description, and "Book Seva" CTA.

### 2.6. Service Detail Screen (`ServiceDetailScreen.jsx`)
* **Hero Banner**: Full-width temple photo with gradient overlay and back navigation.
* **Metadata Badges**: Duration, Timing, and Attire requirement.
* **Inclusions List**: Prasadam details, sanctum access level, Vedic chanting specifics.
* **Prerequisites & Guidelines**: Entry gate rules, ID requirements, photography restrictions.
* **Fixed Bottom Bar**: Seva price display and "Select Date & Time" CTA.

### 2.7. Calendar Selection Screen (`CalendarSelectionScreen.jsx`)
* **Calendar Date grid**: Renders full grid for current and upcoming months.
* **Past Date Lockout**: Previous dates are fully greyed out (opacity 30%), disabled, and locked from booking or selecting to prevent historical reservations.
* **Validation Error Improvements**: Alert messages/toasts styled with bold, high-contrast black fonts (`text-black font-bold`) for high legibility.
* **Integrated Slide-up Slot Sheet**: 
  - Selecting an active date opens a premium slide-up bottom sheet modal directly on the calendar screen.
  - Bypasses the need for a separate slot selection screen, going directly to Devotee Details afterward.
  - Groups slots into Morning, Afternoon, and Evening.
  - Displays remaining slot availability ratios (e.g. `15 / 20` slots filled) and colors them according to availability (red for filling fast, green for open).

### 2.8. Devotee Form Screen (`DevoteeFormScreen.jsx`)
* **Primary Pilgrim Form**: Full Name, Gotram (dropdown/free text), Nakshatram (dropdown), Phone, Age, Gender.
* **Multi-Pilgrim Generator**: "Add Additional Pilgrim" button supporting up to 4 pilgrims per booking.
* **Form Validation**: Real-time required field checks before enabling submission.
* **Calculated Price Bar**: Multiplies single ticket price by total pilgrims count.

### 2.9. Booking Detail Screen (`BookingDetailScreen.jsx`)
* **Summary Pass Card**: Visual recap of Temple, Seva, Date, Time Slot, and list of all registered pilgrims.
* **Price & Fare Breakdown**: Base Seva Fee, admin conv fee, GST, and Total Payable Amount.
* **Terms Agreement Checkbox**: Cancellation and refund policy consent.
* **Fixed Bottom Bar**: "Confirm & Pay" button.

### 2.10. Payment Screen (`PaymentScreen.jsx`)
* **Payment Method Tabs**: UPI, Credit/Debit Cards, Net Banking, and Wallets.
* **Simulated Payment Trigger**: Processing modal animation leading to confirmation.

### 2.11. Payment Success Screen (`PaymentSuccessScreen.jsx`)
* **Success Checkmark Animation**: Celebratory visual feedback.
* **Generated Booking ID**: Unique ticket reference code (e.g., `SV-849231`).
* **Digital QR Code Pass**: Scannable QR code generated for fast-track entry scanning at temple gates.
* **Action Buttons**: "Download e-Pass (PDF)", "Add to Google Calendar", and "Return to Home".

### 2.12. Bookings History Screen (`BookingsHistoryScreen.jsx`)
* **Tab Selection**: "Upcoming Bookings" vs "Completed / Past Bookings".
* **Booking Cards**: Status badges (*Confirmed*, *Completed*, *Cancelled*), Date, Time, Seva Name, Total Pilgrims.
* **QR Code Overlay Modal**: Allows opening the digital entry ticket anytime.
* **Floating Bottom Navigation Dock**: Renders the identical floating capsule-style bottom navigation pill for interface consistency.

### 2.13. Donation Screen (`DonationScreen.jsx`)
* **Cause Selection**: Annadanam, Goshala, Veda Pathashala, and Temple Renovation.
* **Preset Amount Chips**: ₹501, ₹1008, ₹5001, ₹10008, or Custom Amount input.
* **80G Tax Exemption Module**: Checkbox enabling PAN card number and donor name fields for tax receipt generation.

### 2.14. Devotional Aggregator Screen (`DevotionalAggregatorScreen.jsx`)
* **Dedicated Music Hub**: Audio player interface with album art, track duration slider, volume controls, play/pause, next/previous.
* **Vedic Audio Playlist**: Sri Venkateswara Suprabhatam, Vishnu Sahasranamam, Bhaja Govindam, Ganesha Pancharatnam.
* **Daily Panchangam Widget**: Today's Tithi, Nakshatra, Rahu Kalam, Yamagandam, and Sunrise/Sunset.
* **Floating Bottom Navigation Dock**: Shares the floating capsule-style bottom navigation pill.

### 2.15. Temple Detail Screen (`TempleDetailScreen.jsx`)
* **Heritage Overview**: Hero header, founding century, deity, history narratives, and travel guides.
* **Redesigned Darshan Timings Accordion**:
  - Replaced uppercase accordions with structured Title Case headings (e.g., "Normal Days", "Weekends", "Dhanur Masa Season").
  - Placed morning and evening times inside high-contrast timing cards using bold black text.
  - Enclosed weather/timing indicators inside circular gold backdrops (`wb_sunny` for morning, `bedtime` for evening).
  - Replaced the low-contrast cream background (`#FAFAEB`) with navy gradient card panels.
* **Header Optimization**: Removed the irrelevant "Search" and "Cart" buttons from the transparent top bar, leaving only the primary back arrow.

---

## 3. Core Minute Technical & UX Functionalities Matrix

| Functionality | Implementation & Architecture Details |
| :--- | :--- |
| **Clean India SVG/PNG Map Engine** | Aspect-ratio locked 1:1 container with custom `india_map_clean.png` asset. |
| **Real Google Lat/Lng Projection** | Equirectangular formula mapping real latitude & longitude coordinates to `%` pin offsets inside map container. |
| **Bounded Map Panning** | Boundary math (`getBoundedPosition`) keeping map edge overflow inside frame regardless of zoom level. |
| **Pinch & Touch Zoom** | Multi-touch distance calculation (`Math.hypot`) scaling map between 1.0x and 4.0x. |
| **Pin Center UX** | Tapping any temple pin smoothly translates map center directly onto pin coordinates at 2.2x scale. |
| **Touchmove Scroll Lock** | Non-passive `touchmove` event listener calling `e.preventDefault()` and toggling `overflow-hidden` on parent container during map drag. |
| **Global Navigation Router** | Stack-based state router (`pushScreen`, `popScreen`, `resetNavigation`) with slide animations. |
| **Persistent Audio Player** | Context-driven audio state (`isPlaying`, `currentTrackIndex`, `trackProgress`) accessible across all screens. |
| **Date Exclusions** | Disables selection of dates falling before the current system date inside the calendar grid. |
| **Live Slot Capacities** | Computes allowed vs booked capacities inside the integrated slot bottom sheet modal. |
| **Multi-Pilgrim Booking Engine** | Dynamic array state builder allowing up to 4 pilgrims per booking with individual Gotram/Nakshatram entries. |
| **80G Tax Exemption Receipt Generator** | PAN card input validation and tax receipt log creation inside `donationsHistory`. |
| **Digital QR Pass Generator** | Auto-generates unique `SV-XXXXXX` booking reference IDs and renders scannable QR ticket graphics. |
| **Floating Curved Navigation Dock** | A curved capsule pill container floating above the bottom margin, sharing HOME, BOOKINGS, HUB, and DONATE. |
| **Desktop Bezel Container** | Responsive max-width wrapper with curved corners and camera notch mimicking an iPhone/Android device on wide desktop screens. |

---

## 4. Native APK Build & Packaging Summary

* **Build Tooling**: Android Studio SDK & Gradle Wrapper.
* **Web Distribution Path**: `dist/`
* **Capacitor Asset Sync**: `android/app/src/main/assets/public/`
* **Compiled Output File**: [sankalpavani-devotee-debug.apk](file:///c:/Users/praha/Documents/Shree%20PM%20Consultancy%20Services/SankalpaVaniApp/sankalpavani-devotee-v0.2/sankalpavani-devotee-debug.apk) *(Size: ~4.7 MB)*.
