# Detailed Feature & Technical Analysis Report
## Sankalpavani Devotee Mobile Application (v0.2)

---

### Executive Summary

**Sankalpavani Devotee App (v0.2)** is a mobile-first devotional application designed for devotees across India to explore temples, book sacred sevas (puja, abhishekam, kalyanotsavam, homam), stream devotional music and stotras, check daily Panchangam, make tax-exempt donations, and access digital e-passes. Built with React, Tailwind CSS, and Capacitor for Android compilation, it delivers native-level mobile interaction with a custom equirectangular map engine, real-time multi-attribute search filtering, category taxonomy management, dynamic calendar constraint locking, rich Sthala Mahime mythological narratives, and precise pilgrim capacity surcharge calculations.

---

## 1. Application Architecture & Tech Stack

* **Frontend Framework**: React 18 with Vite fast bundler.
* **Styling Engine**: Tailwind CSS with custom design system tokens (`bg-navy-bg` dark background, `text-gold-primary` gold accents, `bg-navy-surface` dark surfaces, and custom typography curves).
* **Native Mobile Wrapper**: Capacitor JS v8 (`@capacitor/app`, `@capacitor/haptics`, `@capacitor/keyboard`, `@capacitor/status-bar`) compiling directly to Android native APK (`gradlew assembleDebug`).
* **State Management**: Centralized React Context (`AppContext.jsx`) with `localStorage` fallback persistence and synchronization across devotee and admin datasets.
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
             │CalendarSelection    │ (With dynamic Seva Type locking & Slot Selection Sheet)
             └───────┬─────────────┘
                     │
             ┌───────▼─────────────┐
             │ DevoteeFormScreen   │ (With dynamic pilgrim surcharge floating bar)
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
  - Profile avatar toggling the side drawer menu layout.
  - Greeting text details `"Welcome Back, Prahasan P"` styled with custom gold headers.
  - Notification button with glowing pulse red notification dot.
* **Real-time Multi-Condition Search Engine**:
  - Live filtering input with a magnifying glass search icon, real-time debounce, and an instant clear (`close`) button.
  - Searches dynamically across **Temple Name**, **Locality/Address**, and **Associated Seva Names**.
  - Renders an active search result indicator showing total matching counts with a 1-tap "Clear / Reset" action.
* **Prominent Brand Hero Card**:
  - Gold-to-amber gradient promotional card titled *"Your Gateway to Divine Blessings"*.
  - Left column: Detailed features description and a clear CTA button redirecting users to the About SankalpaVani screen.
  - Right column: Custom vector Temple Gopuram SVG graphic.
* **Explore Temples Dynamic Grid**:
  - 2-column grid rendering matching temples (or top 8 when query is empty).
  - Displays star ratings, review counts, distances, location tags, and quick redirection to `TempleDetailScreen`.
  - Built-in empty state displaying helpful guidance if no temples match the query.
* **Sacred Offers & Updates Section**:
  - Horizontally scrolling auto-looping promotional banners with special event tags.
* **Popular Sevas Interactive Carousel**:
  - Auto-scrolling carousel displaying popular rituals and pujas.
  - Filters in real-time when the devotee enters a search query.
  - "Quick Book" direct navigation to Calendar Selection.
* **Devotional Music Quick Player & Insights**:
  - Background chant audio player widget with animated rotating disc.
  - Mantra of the Day Upanishadic reflection card.
* **Floating Curved Navigation Dock**:
  - Elegant pill-shaped floating capsule container with 4 action buttons: `HOME`, `BOOKINGS`, `HUB`, and `DONATE`.

### 2.5. Temples List Screen (`TemplesListScreen.jsx`)
* **Locality Search Bar**: Filter temples instantly by name or specific location matching the search term.
* **Anti-Collapse Region Chips**: Horizontally scrollable capsule-shaped selector chips (`All`, `Basavanagudi`, `Malleswaram`, `Gavipuram`, `Ulsoor`, `Jayanagar`) styled with `shrink-0` layout flags.
* **Double-Column Grid Layout**: Premium cards displaying rating badges, location address, relative distance, and active hover scales.

### 2.6. Services List Screen (`ServicesListScreen.jsx`)
* **Real-time Search Bar**: Instant filtering of temple services by name or keyword.
* **Expanded Category Taxonomy**: Fully aligned with the Admin Portal taxonomy:
  `['All', 'Daily', 'Weekly', 'Monthly', 'Annually', 'Special', 'Dhanur Masa']`.
  Horizontal selector pills filter the catalog dynamically.

### 2.7. Temple Detail Screen (`TempleDetailScreen.jsx`)
* **Strict Hero Banner Styling**:
  - Clean `h-64 overflow-hidden` container sizing.
  - `w-full h-full object-cover` image formatting, stripping out blurred background fallbacks.
  - Dark gradient overlays ensuring high title readability.
* **Darshan Timings**: High-contrast timing cards with gold solar/lunar icons (`wb_sunny`, `bedtime`).
* **2-Line Seva Type Category Filters**:
  - Renders horizontally scrollable selector pills (`All`, `Daily`, `Weekly`, `Monthly`, `Annually`, `Special`, `Dhanur Masa`).
  - Selecting `All` dynamically compiles all offerings of the temple.

### 2.8. Service Detail Screen (`ServiceDetailScreen.jsx`)
* **Strict Hero Banner Integration**:
  - Displays selected temple hero banner with `h-64 overflow-hidden` and `w-full h-full object-cover`.
  - Gradient overlays for back navigation button and Seva title.
* **About Seva (Sthala Mahime) Narrative**:
  - High-visibility descriptive section rendering the mythological background, significance, and history provided by temple authorities.
* **Instructions & Arrival Guidelines Card**:
  - High-visibility container framed with a gold accent border (`border-gold-primary/30`) and info icon.
  - Outlines dress codes (e.g. Traditional Dhoti/Saree), reporting times, and sanctum rules.
* **Prasadam Delivery Option**:
  - Detects if the Seva includes physical Prasadam, providing a toggle for **"In-Person Attendance"** vs. **"Deliver Prasadam to Home"**.
* **Fixed Bottom Action Bar**: Live pricing and "Select Date & Time" CTA.

### 2.9. Calendar Selection Screen (`CalendarSelectionScreen.jsx`)
* **Dynamic Calendar Locking by Seva Type**:
  - **Daily**: All future dates are open and selectable.
  - **Weekly**: Checks `selectedDays` (e.g. `['Friday']`), disabling and greying out (`opacity-30 cursor-not-allowed`) all dates that do not fall on permitted weekdays.
  - **Monthly, Annually, Special**: Locks calendar strictly to the exact fixed `selectedDate` string, greying out all other days.
  - **Dhanur Masa**: Restricts selection strictly to the seasonal range (`dateFrom` to `dateTo`).
* **Auto-Centering Calendar State**:
  - Initial `currentDate` automatically centers the calendar to the target month of `selectedDate` or `dateFrom`.
* **Integrated Slide-up Slot Sheet**:
  - Selecting an active date opens the bottom sheet modal with real-time remaining slot capacity ratios (e.g. `15 / 20` slots).
  - Flags fully booked slots with a prominent badge.

### 2.10. Devotee Form Screen (`DevoteeFormScreen.jsx`)
* **Primary Devotee Sourcing**: Sourced strictly from the user's signup/session context (`currentUser?.age` and `currentUser?.gender`). Age and Gender input fields are omitted to comply with the devotee details schema rules.
* **Strict Gotram & Nakshatram Selectors**: Dropdown lists for both primary and family members.
* **Family Members Multi-Entry**: Collects only Name, Gotram, and Nakshatram for family members.
* **Dynamic Capacity & Surcharge Calculation**:
  - Dynamically fetches `personsPerSeva || persons` for base ticket allowance.
  - Applies `extraPersonCost` only to pilgrims exceeding the base allowance:
    $$\text{Total Fare} = \text{Base Price} + \max(0, \text{Total Devotees} - \text{Base Allowance}) \times \text{Extra Person Fee}$$
* **Dynamic Floating Summary Bar**:
  - Real-time price display showing clear breakdown (e.g., `Base: ₹500 for 2 + 1 extra @ ₹100/each`).
* **Prasadam Shipping Panel**: Full address form if home delivery is selected.

### 2.11. Booking Detail Screen (`BookingDetailScreen.jsx`)
* **Seva & Temple Summary Card**: Visual recap of Temple, Seva, Date, and Time Slot.
* **Devotees Roster**: Lists all registered devotees (with primary devotee age/gender details).
* **Itemized Fare Breakdown**:
  - Base Seva Fare (for base allowance)
  - Extra Pilgrim Surcharge (when extra family members are registered)
  - Convenience Fee (`₹45`)
  - GST (`18%`)
  - Total Payable Amount
* **Terms Agreement**: Checkbox confirmation for temple rules and booking terms.

### 2.12. Payment & Confirmation Flow (`PaymentScreen.jsx` & `PaymentSuccessScreen.jsx`)
* **Payment Methods**: UPI, Credit/Debit Cards, Net Banking, and Wallets with animated loading feedback.
* **Digital Seva Confirmation Receipt**:
  - Clean text-based confirmation card with reference ID (`SV-XXXXXX`), primary devotee name/gotram, reporting time (30 mins before slot), and sanctum entry gate assignment.
  - Direct navigation to "My Bookings" and "Home".

### 2.13. Bookings History Screen (`BookingsHistoryScreen.jsx`)
* **Tab Selection**: "Upcoming Sevas" vs "Past Sevas".
* **E-Ticket Receipt Modal**: Displays full digital receipt details without requiring QR codes.

### 2.14. Devotional Aggregator (`DevotionalAggregatorScreen.jsx`) & Donations (`DonationScreen.jsx`)
* **Vedic Audio Hub**: Player with audio controls and stotra playlists.
* **Daily Panchangam**: Tithi, Nakshatra, Rahu Kalam, Yamagandam, and Sunrise/Sunset.
* **80G Tax Donations**: Preset and custom donation amounts with 80G tax receipt PAN collection.

---

## 3. Core Technical & Architectural Features Matrix

| Feature | Implementation & Architecture Details |
| :--- | :--- |
| **Real-time Search Filter** | Multi-attribute search across temple names, localities, and seva names with instant count indicators and clear button in `HomeScreen.jsx`. |
| **Dynamic Calendar Locking** | Seva category constraints enforcement (`Daily`, `Weekly`, `Monthly`, `Annually`, `Special`, `Dhanur Masa`) greying out locked dates in `CalendarSelectionScreen.jsx`. |
| **Calendar Auto-Centering** | Auto-snaps calendar month view to fixed `selectedDate` or `dateFrom` seasonal range. |
| **Expanded Taxonomy** | Standardized category filter pills (`All`, `Daily`, `Weekly`, `Monthly`, `Annually`, `Special`, `Dhanur Masa`) across `ServicesListScreen` & `TempleDetailScreen`. |
| **Sthala Mahime Narrative** | Rich descriptive section rendering mythological and historical context on `ServiceDetailScreen.jsx`. |
| **Arrival Guidelines Card** | High-visibility card with accent icon and gold border (`border-gold-primary/30`) for dress codes and entry guidelines. |
| **Strict Hero Banner Sizing** | Containers locked to `h-64 overflow-hidden` with `w-full h-full object-cover` on images, removing blurred background fallbacks. |
| **Dynamic Pilgrim Pricing** | Dynamic base allowance (`personsPerSeva || persons`) and extra pilgrim surcharges computed in `DevoteeFormScreen`, `BookingDetailScreen`, and `AppContext`. |
| **Strict Devotee Schema** | Primary devotee Age/Gender sourced from `currentUser`; family members collect only Name, Gotram, Nakshatram (no age/gender fields). |
| **Equirectangular Map Engine** | Mathematical latitude & longitude projection on custom SVG/PNG India map asset with pinch-to-zoom and touchmove scroll lock. |
| **Digital Seva Confirmation Receipt** | Text-based confirmation receipts with calculated reporting times (30 min prior) and entry gate details. |
| **Capacitor Mobile Wrapper** | Native bridge compiling web assets to Android APK via Gradle wrapper. |

---

## 4. Native Android APK Build & Testing Summary

* **Build Tooling**: Android SDK & Gradle Wrapper (`gradlew.bat assembleDebug`).
* **Capacitor Asset Sync**: Web assets synced from `dist/` to `android/app/src/main/assets/public/`.
* **Output APK Paths**:
  - Root Distribution Path: [SankalpaVani-Devotee-App.apk](file:///c:/Users/praha/Documents/Shree%20PM%20Consultancy%20Services/SankalpaVaniApp/sankalpavani-devotee-v0.2/SankalpaVani-Devotee-App.apk) *(Size: ~4.87 MB)*
  - Android Build Output: [app-debug.apk](file:///c:/Users/praha/Documents/Shree%20PM%20Consultancy%20Services/SankalpaVaniApp/sankalpavani-devotee-v0.2/android/app/build/outputs/apk/debug/app-debug.apk)
