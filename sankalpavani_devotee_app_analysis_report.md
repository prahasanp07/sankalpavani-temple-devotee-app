# Detailed Feature & Technical Analysis Report
## Sankalpavani Devotee Mobile Application (v0.2)

---

### Executive Summary

**Sankalpavani Devotee App (v0.2)** is a mobile-first devotional application designed for devotees across India to explore temples, book sacred sevas (puja, abhishekam, kalyanotsavam), stream devotional music and stotras, check daily Panchangam, make tax-exempt donations, and access digital e-passes with QR code verification. Built with React, Tailwind CSS, and Capacitor for Android compilation, it delivers native-level mobile interaction with a custom equirectangular map engine, pinch-to-zoom bounding algorithms, touch interaction scroll locks, and custom audio player pipelines.

---

## 1. Application Architecture & Tech Stack

* **Frontend Framework**: React 18 with Vite fast bundler.
* **Styling Engine**: Tailwind CSS with custom design system tokens (`#90D5FF` celestial sky-blue primary background, `#dcb06b` gold accents, `#0c1322` dark surfaces, and custom typography curves).
* **Native Mobile Wrapper**: Capacitor JS v8 (`@capacitor/app`) compiling directly to Android native APK (`gradlew assembleDebug`).
* **State Management**: Centralized React Context (`AppContext.jsx`) with `localStorage` fallback persistence.
* **Routing Architecture**: Custom Stack-based Navigation Router (`screenStack`, `pushScreen`, `popScreen`, `resetNavigation`) supporting smooth CSS slide transitions (`screen-transition-enter`).
* **Desktop Preview Harness**: Responsive mobile mockup frame in `App.jsx` with hardware bezel and camera notch for desktop testing.

---

## 2. Screen-by-Screen Detailed Functional Breakdown

The application features **15 dedicated screens**, each providing specific functionality:

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
 ┌───────────────────┬─────────────────────┼─────────────────────┬───────────────────┐
 │                   │                     │                     │                   │
┌▼─────────┐ ┌───────▼─────────┐ ┌─────────▼───────────┐ ┌───────▼───────────┐ ┌─────▼──────┐
│HomeScreen│ │ServicesListScreen│ │DevotionalAggregator│ │BookingsHistory    │ │AccountTab  │
└────┬─────┘ └───────┬─────────┘ └─────────────────────┘ └───────────────────┘ └────────────┘
     │               │
┌────▼─────────┐ ┌───▼─────────┐
│TempleDetail  │ │ServiceDetail│
└──────────────┘ └───┬─────────┘
                     │
             ┌───────▼─────────────┐
             │ SlotSelectionScreen │
             └───────┬─────────────┘
                     │
             ┌───────▼─────────────┐
             │ DevoteeFormScreen   │
             └───────┬─────────────┘
             
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
* **Top Navigation Bar**: Brand logo, side menu toggle, and notification bell icon with active alert dot.
* **Interactive Clean India Map Container**:
  * **Custom Graphic Asset**: `india_map_clean.png` loaded in 1:1 aspect ratio container.
  * **Real Coordinates Engine**: Projects geographical latitude and longitude onto `%` coordinates via:
    $$\text{top} = \frac{\text{North} - \text{Lat}}{\text{North} - \text{South}} \times 100, \quad \text{left} = \frac{\text{Lng} - \text{West}}{\text{East} - \text{West}} \times 100$$
    *(Calibrated bounds: North 39.4, South 6.4, West 65.2, East 93.8)*.
  * **13 Geographically Placed Temples**:
    1. Sri Venkateswara Temple (Tirupati, AP)
    2. Somnath Jyotirlinga (Gujarat)
    3. Kedarnath Temple (Uttarakhand)
    4. Chamundeshwari Temple (Mysuru, KA)
    5. Udupi Sri Krishna Temple (Udupi, KA)
    6. Murudeshwar Shiva Temple (Bhatkal, KA)
    7. Virupaksha Temple (Hampi, KA)
    8. Kollur Mookambika Temple (Kollur, KA)
    9. Kukke Subramanya Temple (Subramanya, KA)
    10. Dharmasthala Manjunatha Temple (Dharmasthala, KA)
    11. Belur Chennakeshava Temple (Belur, KA)
    12. Halebidu Hoysaleswara Temple (Halebidu, KA)
    13. Gokarna Mahabaleshwar Temple (Gokarna, KA)
  * **Vector Pin Styling**: Teardrop CSS marker with glowing selection aura, temple icon, and bouncing label tooltip.
  * **Zoom & Pan Engine**: Floating `+` and `-` zoom controls, double-touch pinch-to-zoom support, and mathematically bounded dragging to prevent map borders from exiting the frame.
  * **Selection Centering**: Tapping a pin smooth-pans the map to position the selected pin in the exact center of the container at `scale: 2.2`.
  * **Touch Interaction Scroll Lock**: Non-passive `touchmove` listener (`e.preventDefault()`) toggling `overflow-hidden` on the parent scroll view while interacting with the map, preventing janky page scrolls.
* **Selected Temple Bottom Sheet**: Floating sheet displaying temple photo, location, rating, distance, and quick "Book Seva" action.
* **Side Navigation Drawer**: Quick links to Profile, Booking History, Audio Player, Donations, and Logout.
* **Scrollable Dashboard Sections**:
  * **Featured Banners Carousel**: Horizontally scrolling promo banners with special event tags.
  * **Explore Temples List**: Cards showing star ratings, review counts, distances, and photos.
  * **Popular Sevas Grid**: Seva cards with duration, price, and instant booking CTA.
  * **Mini Audio Player Card**: Play/pause toggle and track progress indicator.
  * **Mantra of the Day**: Daily spiritual quote card.

### 2.5. Services List Screen (`ServicesListScreen.jsx`)
* **Real-time Search Bar**: Instant filtering by seva name or keyword.
* **Category Pill Filters**: "All", "Abhishekam", "Puja", "Kalyanotsavam", "Special".
* **Seva Item Cards**: Title, duration, timing, price badge, short description, and "Book Seva" CTA.

### 2.6. Service Detail Screen (`ServiceDetailScreen.jsx`)
* **Hero Banner**: Full-width temple photo with gradient overlay and back navigation.
* **Metadata Badges**: Duration (e.g. 45 mins), Timing (e.g. Morning 06:00 AM), Attire requirement (e.g. Traditional Dhoti/Saree).
* **Inclusions List**: Prasadam details, sanctum access level, Vedic chanting specifics.
* **Prerequisites & Guidelines**: Entry gate rules, ID requirements, photography restrictions.
* **Fixed Bottom Bar**: Seva price display and "Select Date & Time" CTA.

### 2.7. Slot Selection Screen (`SlotSelectionScreen.jsx`)
* **Horizontal Date Picker**: Scrollable day/date cards for the next 14 days with weekday names and month labels.
* **Time Slot Categorization**:
  * Morning Slots (e.g., 06:00 AM Suprabhatam, 08:30 AM Archana).
  * Afternoon Slots (e.g., 12:00 PM Nitya Anna Danam).
  * Evening Slots (e.g., 06:30 PM Unjal Seva, 08:00 PM Ekanta Seva).
* **Live Slot Availability Indicator**: Remaining seat counters (e.g., *"12 slots left"* vs *"Filling Fast"*).
* **Fixed Bottom Action**: Selected slot summary and "Continue to Devotee Details".

### 2.8. Devotee Form Screen (`DevoteeFormScreen.jsx`)
* **Primary Pilgrim Form**: Full Name, Gotram (dropdown/free text), Nakshatram (astrological star dropdown), Phone, Age, Gender.
* **Multi-Pilgrim Generator**: "Add Additional Pilgrim" button supporting up to 4 pilgrims per booking.
* **Form Validation**: Real-time required field checks before enabling submission.
* **Calculated Price Bar**: Multiplies single ticket price by total pilgrims count.

### 2.9. Booking Detail Screen (`BookingDetailScreen.jsx`)
* **Summary Pass Card**: Visual recap of Temple, Seva, Date, Time Slot, and list of all registered pilgrims.
* **Price & Fare Breakdown**:
  * Base Seva Fee.
  * Temple Administrative / Convenience Fee.
  * GST / Taxes.
  * Total Payable Amount.
* **Terms Agreement Checkbox**: Cancellation and refund policy consent.
* **Fixed Bottom Bar**: "Confirm & Pay" button.

### 2.10. Payment Screen (`PaymentScreen.jsx`)
* **Payment Method Tabs**:
  1. *UPI*: Instant apps (GPay, PhonePe, Paytm, BHIM) or VPA input field.
  2. *Credit / Debit Cards*: Card number, expiry month/year, CVV, and cardholder name fields.
  3. *Net Banking*: Popular banks grid (SBI, HDFC, ICICI, Axis).
  4. *Wallets*: Amazon Pay, Mobikwik.
* **Trust Badges**: 256-bit SSL Encryption and PCI-DSS compliance assurance.
* **Simulated Payment Trigger**: Processing modal animation leading to confirmation.

### 2.11. Payment Success Screen (`PaymentSuccessScreen.jsx`)
* **Success Checkmark Animation**: Celebratory visual feedback.
* **Generated Booking ID**: Unique ticket reference code (e.g., `SV-849231`).
* **Digital QR Code Pass**: Scannable QR code generated for fast-track entry scanning at temple gates.
* **Action Buttons**:
  * "Download e-Pass (PDF)".
  * "Add to Google Calendar".
  * "Return to Home".

### 2.12. Bookings History Screen (`BookingsHistoryScreen.jsx`)
* **Tab Selection**: "Upcoming Bookings" vs "Completed / Past Bookings".
* **Booking Cards**: Status badges (*Confirmed*, *Completed*, *Cancelled*), Date, Time, Seva Name, Total Pilgrims.
* **QR Code Overlay Modal**: Allows opening the digital entry ticket anytime.
* **Action Buttons**: "Download Receipt", "Cancel Booking", "Rebook Seva".

### 2.13. Donation Screen (`DonationScreen.jsx`)
* **Cause Selection**:
  * *Annadanam*: Free meals for pilgrims.
  * *Goshala*: Cow protection & shelter.
  * *Veda Pathashala*: Vedic education support.
  * *Temple Renovation*: Heritage preservation.
* **Preset Amount Chips**: ₹501, ₹1008, ₹5001, ₹10008, or Custom Amount input.
* **80G Tax Exemption Module**: Checkbox enabling PAN card number and full donor name fields for tax receipt generation.

### 2.14. Devotional Aggregator Screen (`DevotionalAggregatorScreen.jsx`)
* **Dedicated Music Hub**: Full audio player interface with album art, track duration slider, volume controls, play/pause, next/previous track.
* **Vedic Audio Playlist**:
  1. *Sri Venkateswara Suprabhatam* (M.S. Subbulakshmi)
  2. *Vishnu Sahasranamam* (Traditional)
  3. *Bhaja Govindam* (M.S. Subbulakshmi)
  4. *Ganesha Pancharatnam* (S.P. Balasubrahmanyam)
* **Daily Panchangam Widget**: Today's Tithi, Nakshatra, Rahu Kalam, Yamagandam, and Sunrise/Sunset times.
* **E-Booklets**: Downloadable PDF stotras and spiritual literature.

### 2.15. Temple Detail Screen (`TempleDetailScreen.jsx`)
* **Heritage Overview**: High-definition hero header, founding century, architectural style (e.g., Dravidian, Hoysala, Vijayanagara), main deity.
* **Detailed History & Legends**: In-depth narrative about the shrine's origin.
* **Temple Specific Sevas List**: Direct booking links for rituals offered at this specific shrine.
* **Travel Guide**: How to reach by Air, Train, or Road, best months to visit, and opening hours.

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
| **Multi-Pilgrim Booking Engine** | Dynamic array state builder allowing up to 4 pilgrims per booking with individual Gotram/Nakshatram entries. |
| **80G Tax Exemption Receipt Generator** | PAN card input validation and tax receipt log creation inside `donationsHistory`. |
| **Digital QR Pass Generator** | Auto-generates unique `SV-XXXXXX` booking reference IDs and renders scannable QR ticket graphics. |
| **LocalStorage State Fallback** | Automatic JSON serialization of `sankalpavani_user`, `sankalpavani_bookings`, and `sankalpavani_donations`. |
| **Native Capacitor Packaging** | Capacitor Android bridge configured for Android SDK, compiling clean native APK packages via Gradle (`gradlew.bat assembleDebug`). |
| **Desktop Bezel Container** | Responsive max-width wrapper with curved corners and camera notch mimicking an iPhone/Android device on wide desktop screens. |

---

## 4. Native APK Build & Packaging Summary

* **Build Tooling**: Android Studio SDK & Gradle Wrapper.
* **Web Distribution Path**: `dist/`
* **Capacitor Asset Sync**: `android/app/src/main/assets/public/`
* **Compiled Output File**: [sankalpavani-devotee-debug.apk](file:///c:/Users/praha/Documents/Shree%20PM%20Consultancy%20Services/SankalpaVaniApp/sankalpavani-devotee-v0.2/sankalpavani-devotee-debug.apk) *(Size: ~4.7 MB)*.
