# Detailed Feature & Technical Analysis Report
## Sankalpavani Devotee Mobile Application (v0.2)

---

### Executive Summary

**Sankalpavani Devotee App (v0.2)** is a mobile-first and tablet-responsive devotional application designed for devotees across India to explore temples, book sacred sevas (puja, abhishekam, kalyanotsavam, homam), stream devotional music and stotras, check daily Panchangam, make tax-exempt donations, and access digital e-passes. Built with React, Tailwind CSS, and Capacitor for Android compilation, it delivers native-level mobile interaction with a custom equirectangular map engine, real-time multi-attribute search filtering, category taxonomy management, dynamic calendar constraint locking, rich Sthala Mahime mythological narratives, precise pilgrim capacity surcharge calculations, full hardware safe-area status bar compliance, and fluid responsive multi-column layouts across mobile and tablet form factors.

---

## 1. Application Architecture & Tech Stack

* **Frontend Framework**: React 18 with Vite fast bundler.
* **Styling Engine**: Tailwind CSS with custom design system tokens (`bg-navy-bg` dark background, `text-gold-primary` gold accents, `bg-navy-surface` dark surfaces, and custom typography curves).
* **Native Mobile Wrapper**: Capacitor JS v8 (`@capacitor/app`, `@capacitor/haptics`, `@capacitor/keyboard`, `@capacitor/status-bar`) compiling directly to Android native APK (`gradlew assembleDebug`).
* **State Management**: Centralized React Context (`AppContext.jsx`) with `localStorage` fallback persistence and synchronization across devotee and admin datasets.
* **Routing Architecture**: Custom Stack-based Navigation Router (`screenStack`, `pushScreen`, `popScreen`, `resetNavigation`) supporting smooth CSS slide transitions.
* **Viewport & Safe Area Architecture**: Dynamic Viewport Height (`min-h-[100dvh]`), `viewport-fit=cover` meta configuration, and dynamic safe-area insets (`pt-[max(env(safe-area-inset-top),1.5rem)]`, `pb-[env(safe-area-inset-bottom)]`, `pl-[env(safe-area-inset-left)]`, `pr-[env(safe-area-inset-right)]`) ensuring zero collision with native device status bars, pinhole cameras, or landscape camera notches.
* **Responsive Breakpoint Strategy**: Fluid mobile-to-tablet/desktop layout transitions using Tailwind responsive grid layouts (`sm:`, `md:`, `lg:`, `xl:`), constrained form wrappers (`max-w-xl mx-auto`), 2-column checkout reviews, and centered floating navigation docks (`max-w-md mx-auto`).

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
             │ BookingDetailScreen │ (2-Column Responsive Checkout on larger screens)
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
* **Status Bar & Text Overlap Resolution**: Restructured with a natural vertical flex layout, eliminating absolute positioning text collisions between the loading indicator and brand typography.
* **Automatic Routing Logic**: Reads `localStorage` for `sankalpavani_user`. If user is logged in, auto-navigates to `HomeScreen`; otherwise redirects to `OnboardingScreen` after a 2.5-second timer.

### 2.2. Onboarding Screen (`OnboardingScreen.jsx`)
* **Dynamic Centering & Responsive Scaling**: Outermost container uses `min-h-[100dvh] flex flex-col justify-center items-center px-6 py-12` with responsive hero imagery (`w-52 h-52 md:w-72 md:h-72`) preventing button-text overlaps on compact screens and excess whitespace on tablets.
* **3-Page Feature Carousel**:
  1. *Explore Sacred Shrines*: Interactive map of ancient temples across India.
  2. *Hassle-Free Seva Bookings*: Guaranteed slots, instant e-passes, and live updates.
  3. *Devotional Audio & Panchangam*: Listen to daily Suprabhatam, stotras, and astrological timings.
* **Navigation Controls**: Active dot indicators, "Skip" button to jump directly to login, and "Next / Get Started" CTA button.

### 2.3. Login Screen (`LoginScreen.jsx`)
* **Vertical Viewport Centering & Constrained Width**: Centered within `min-h-[100dvh]` and constrained to `w-full max-w-md mx-auto` preventing wide stretching on tablets.
* **Country Code Prefill**: Fixed `+91` (India) input field with validation (10-digit mobile number requirement).
* **2-Step OTP Authentication**:
  * Step 1: Mobile number entry with "Send OTP" button.
  * Step 2: 4-Digit OTP box inputs with automatic focus advancement, resend timer countdown (30s), and "Verify & Proceed" trigger.
* **Legal Terms Checkbox**: Terms of Service and Privacy Policy confirmation.

### 2.4. Home Screen (`HomeScreen.jsx`) — *Core Hub*
* **Status-Bar-Safe Welcome Header**:
  - Integrated dynamic top padding `pt-[max(env(safe-area-inset-top),1rem)] pb-3` on the fixed top header.
  - Profile avatar toggles side drawer menu; greeting text `"Welcome Back, Prahasan P"` with gold typography; notification button with unread indicator.
* **Real-time Multi-Condition Search Engine**:
  - Live filtering input with search icon, real-time debounce, and an instant clear (`close`) button.
  - Searches dynamically across **Temple Name**, **Locality/Address**, and **Associated Seva Names**.
  - Renders an active search result indicator showing total matching counts with a 1-tap "Clear / Reset" action.
* **Prominent Brand Hero Card**:
  - Gold-to-amber gradient promotional card titled *"Your Gateway to Divine Blessings"*.
  - Left column: Detailed features description and a clear CTA button redirecting users to the About SankalpaVani screen.
  - Right column: Custom vector Temple Gopuram SVG graphic.
* **Fluid Multi-Column Explore Temples Grid**:
  - Responsive multi-column layout (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6`) dynamically adapting from single-column on mobile to 2, 3, or 4 columns on tablets and landscape mode.
  - Displays star ratings, review counts, distances, location tags, and quick redirection to `TempleDetailScreen`.
* **Sacred Offers & Updates Section**:
  - Horizontally scrolling auto-looping promotional banners with special event tags.
* **Popular Sevas Interactive Carousel**:
  - Auto-scrolling carousel displaying popular rituals and pujas.
  - Filters in real-time when the devotee enters a search query with direct "Quick Book" navigation to Calendar Selection.
* **Devotional Music Quick Player & Insights**:
  - Background chant audio player widget with animated rotating disc and Mantra of the Day Upanishadic reflection card.
* **Centered Floating Navigation Dock**:
  - Constrained curved floating pill navigation dock (`fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md mx-auto z-50`) maintaining optimal touch ergonomics without stretching across widescreen tablets.
* **Fixed Viewport Modals & Drawers**:
  - Notifications modal and Side Drawer use `fixed inset-0 bg-black/80 backdrop-blur-sm z-50` with backdrop click dismissals.

### 2.5. Temples List Screen (`TemplesListScreen.jsx`)
* **Status-Bar-Safe Fixed Header**: Fixed top header uses `pt-[max(env(safe-area-inset-top),1.5rem)] pb-3` and content uses `pt-24`.
* **Locality Search Bar**: Filter temples instantly by name or specific location matching the search term.
* **Anti-Collapse Region Chips**: Horizontally scrollable capsule-shaped selector chips (`All`, `Basavanagudi`, `Malleswaram`, `Gavipuram`, `Ulsoor`, `Jayanagar`) styled with `shrink-0` layout flags.
* **Fluid Multi-Column Grid**: Responsive `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6` with `aspect-video` card preview imagery.

### 2.6. Services List Screen (`ServicesListScreen.jsx`)
* **Status-Bar-Safe Fixed Header**: Fixed top bar with `pt-[max(env(safe-area-inset-top),1.5rem)] pb-3` and `pt-24` main container.
* **Real-time Search Bar**: Instant filtering of temple services by name or keyword.
* **Expanded Category Taxonomy**: Standardized category filter pills aligned with the Admin Portal:
  `['All', 'Daily', 'Weekly', 'Monthly', 'Annually', 'Special', 'Dhanur Masa']`.
* **Fluid Multi-Column Sevas Grid**: Responsive `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6`.
* **Centered Floating Navigation Dock**: Uses `max-w-md mx-auto` floating pill dock.

### 2.7. Temple Detail Screen (`TempleDetailScreen.jsx`)
* **Cinematic Widescreen Hero Banner**:
  - Upgraded from fixed heights to cinematic aspect ratio: `aspect-video md:aspect-[21/9] max-h-[380px] overflow-hidden` with `w-full h-full object-cover`.
  - Overlaid top navigation controls use `pt-[max(env(safe-area-inset-top),1.5rem)]` so the back button sits safely below the status bar while maintaining full-bleed hero aesthetics.
* **Darshan Timings**: High-contrast timing cards with gold solar/lunar icons (`wb_sunny`, `bedtime`).
* **2-Line Seva Type Category Filters**:
  - Horizontally scrollable selector pills (`All`, `Daily`, `Weekly`, `Monthly`, `Annually`, `Special`, `Dhanur Masa`).
* **Centered Modal Sheets**:
  - Modal sheets transformed to centered dialogs on tablets (`max-w-lg mx-auto bg-navy-surface rounded-t-3xl md:rounded-3xl md:mb-8`).

### 2.8. Service Detail Screen (`ServiceDetailScreen.jsx`)
* **Cinematic Widescreen Hero Banner & Safe Overlays**:
  - Full-bleed banner with `aspect-video md:aspect-[21/9] max-h-[380px]` and `pt-[max(env(safe-area-inset-top),1.5rem)]` overlay padding for the back button.
* **About Seva (Sthala Mahime) Narrative**:
  - High-visibility descriptive section rendering the mythological background, significance, and history provided by temple authorities.
* **Instructions & Arrival Guidelines Card**:
  - High-visibility container framed with a gold accent border (`border-gold-primary/30`) and info icon.
  - Outlines dress codes (e.g. Traditional Dhoti/Saree), reporting times, and sanctum rules.
* **Prasadam Delivery Option**:
  - Detects if the Seva includes physical Prasadam, providing a toggle for **"In-Person Attendance"** vs. **"Deliver Prasadam to Home"**.
* **Fixed Bottom Action Bar**: Live pricing and "Select Date & Time" CTA.

### 2.9. Calendar Selection Screen (`CalendarSelectionScreen.jsx`)
* **Status-Bar-Safe Fixed Header**: Fixed top header with `pt-[max(env(safe-area-inset-top),1.5rem)] pb-3` and `pt-24` main container.
* **Dynamic Calendar Locking by Seva Type**:
  - **Daily**: All future dates are open and selectable.
  - **Weekly**: Checks `selectedDays` (e.g. `['Friday']`), disabling and greying out (`opacity-30 cursor-not-allowed`) all dates that do not fall on permitted weekdays.
  - **Monthly, Annually, Special**: Locks calendar strictly to the exact fixed `selectedDate` string, greying out all other days.
  - **Dhanur Masa**: Restricts selection strictly to the seasonal range (`dateFrom` to `dateTo`).
* **Auto-Centering Calendar State**:
  - Initial `currentDate` automatically centers the calendar to the target month of `selectedDate` or `dateFrom`.
* **Centered Slot Selection Dialog on Tablets**:
  - Bottom sheet behaves as a bottom sheet on mobile and transforms into a centered dialog modal on tablets (`w-full max-w-lg mx-auto bg-card rounded-t-3xl md:rounded-3xl`).
  - Displays remaining slot capacity ratios (e.g. `15 / 20` slots) with sold-out indicator badges.

### 2.10. Devotee Form Screen (`DevoteeFormScreen.jsx`)
* **Status-Bar-Safe Fixed Header**: Header padded with `pt-[max(env(safe-area-inset-top),1.5rem)] pb-3` and main content offset by `pt-24`.
* **Constrained Form Width & Responsive Family Grid**:
  - Form container constrained to `w-full max-w-xl mx-auto md:p-8 md:border md:border-white-muted/10 md:rounded-2xl md:bg-navy-surface md:shadow-sm md:mt-6`.
  - Family members list renders in a 2-column grid on tablets (`grid grid-cols-1 md:grid-cols-2 gap-4`).
* **Strict Devotee Schema Compliance**:
  - Primary Devotee Age and Gender sourced directly from `currentUser` session context (input fields omitted).
  - Family members collect only Name, Gotram, and Nakshatram without collecting Age or Gender.
* **Dynamic Capacity & Surcharge Calculation**:
  - Computes base ticket allowance (`personsPerSeva || persons`) and applies `extraPersonCost` only to pilgrims exceeding the base allowance:
    $$\text{Total Fare} = \text{Base Price} + \max(0, \text{Total Devotees} - \text{Base Allowance}) \times \text{Extra Person Fee}$$
* **Dynamic Floating Summary Bar**: Real-time breakdown of base fare and extra person surcharges.
* **Prasadam Shipping Panel**: Full address form if home delivery is selected.

### 2.11. Booking Detail Screen (`BookingDetailScreen.jsx`)
* **Status-Bar-Safe Fixed Header**: Header padded with `pt-[max(env(safe-area-inset-top),1.5rem)] pb-3` and `pt-24` main container.
* **2-Column Responsive Checkout Layout**:
  - Implements a modern responsive 2-column layout on larger screens (`flex flex-col lg:flex-row gap-6 w-full max-w-5xl mx-auto items-start`).
  - Left column (`flex-1`): Seva summary, devotees roster, and shipping details.
  - Right column (`w-full lg:w-96`): Itemized fare breakdown, terms agreement, and "Proceed to Pay" CTA.
* **Itemized Fare Breakdown**: Base Seva Fare, Extra Pilgrim Surcharge, Convenience Fee (`₹45`), GST (`18%`), and Total Payable Amount.

### 2.12. Payment & Confirmation Flow (`PaymentScreen.jsx` & `PaymentSuccessScreen.jsx`)
* **Status-Bar-Safe Fixed Header**: Header padded with `pt-[max(env(safe-area-inset-top),1.5rem)] pb-3` and `pt-24` body clearance.
* **Constrained Payment Form**: Form wrapper constrained to `max-w-xl mx-auto`.
* **Fixed Viewport Transaction Loader**: Animated spinner uses `fixed inset-0 bg-black/85 backdrop-blur-sm z-50`.
* **Digital Seva Confirmation Receipt**:
  - Clean text-based confirmation card with reference ID (`SV-XXXXXX`), primary devotee name/gotram, reporting time (30 mins before slot), and sanctum entry gate assignment.
  - Direct navigation to "My Bookings" and "Home".

### 2.13. Bookings History Screen (`BookingsHistoryScreen.jsx`)
* **Status-Bar-Safe Fixed Header**: Header padded with `pt-[max(env(safe-area-inset-top),1.5rem)] pb-3` and `pt-24` scroll offset.
* **Tab Selection**: "Upcoming Sevas" vs "Past Sevas".
* **Fixed Viewport Sacred E-Receipt Modal**:
  - Modal overlay updated to `fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto` with backdrop click dismissal.
  - Renders instantly in the visible viewport without requiring scrolling through the screen.
  - Internal receipt body constrained with `max-h-[80vh] overflow-y-auto` for smooth scrolling of multi-pilgrim bookings.
* **Centered Floating Navigation Dock**: Uses `max-w-md mx-auto` floating pill dock.

### 2.14. Devotional Aggregator (`DevotionalAggregatorScreen.jsx`) & Donations (`DonationScreen.jsx`)
* **Status-Bar-Safe Fixed Headers**: Headers padded with `pt-[max(env(safe-area-inset-top),1.5rem)] pb-3` and containers with `pt-24`.
* **Constrained Donation Form**: Form container constrained to `max-w-xl mx-auto md:p-8 md:border md:rounded-2xl md:bg-navy-surface`.
* **Vedic Audio Hub**: Audio player with controls and stotra playlists.
* **Daily Panchangam**: Tithi, Nakshatra, Rahu Kalam, Yamagandam, and Sunrise/Sunset.
* **80G Tax Donations**: Preset and custom donation amounts with 80G tax receipt PAN collection.
* **Centered Floating Navigation Dock**: Uses `max-w-md mx-auto` floating pill dock.

---

## 3. Core Technical & Architectural Features Matrix

| Feature | Implementation & Architecture Details |
| :--- | :--- |
| **Safe-Area Status Bar Clearance** | Universal `pt-[max(env(safe-area-inset-top),1.5rem)]` on fixed headers and overlay controls ensuring zero status bar collision on Android/iOS native builds. |
| **Dynamic Viewport Height (`100dvh`)** | Replaced rigid `h-screen` with `min-h-[100dvh]` in `App.jsx`, `LoginScreen.jsx`, and `OnboardingScreen.jsx` to handle software keyboards and orientation shifts. |
| **Tablet & Landscape Fluid Grids** | Responsive CSS grids (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) for temple listings and seva catalogs. |
| **Cinematic Hero Banners** | Upgraded hero containers to `aspect-video md:aspect-[21/9] max-h-[380px]` with `object-cover` across detail screens. |
| **Constrained Form Architecture** | Forms across login, devotee details, payment, and donations constrained to `max-w-xl mx-auto` (or `max-w-md`) with tablet card styling. |
| **2-Column Responsive Checkout** | `BookingDetailScreen.jsx` uses `flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto` separating seva info and payment action. |
| **Centered Floating Navigation Dock** | Curved floating dock constrained to `w-[calc(100%-2rem)] max-w-md mx-auto z-50` centered at the bottom of the viewport. |
| **Fixed Viewport Modals & Dialogs** | Modals across bookings history, calendar slot sheets, notifications, and loaders updated to `fixed inset-0 bg-black/80 backdrop-blur-sm z-50` with backdrop click dismissals. |
| **Real-time Multi-Attribute Search** | Multi-attribute search across temple names, localities, and seva names with instant count indicators and clear button in `HomeScreen.jsx`. |
| **Dynamic Calendar Locking** | Seva category constraints enforcement (`Daily`, `Weekly`, `Monthly`, `Annually`, `Special`, `Dhanur Masa`) greying out locked dates in `CalendarSelectionScreen.jsx`. |
| **Calendar Auto-Centering** | Auto-snaps calendar month view to fixed `selectedDate` or `dateFrom` seasonal range. |
| **Expanded Taxonomy** | Standardized category filter pills (`All`, `Daily`, `Weekly`, `Monthly`, `Annually`, `Special`, `Dhanur Masa`) across `ServicesListScreen` & `TempleDetailScreen`. |
| **Sthala Mahime Narrative** | Rich descriptive section rendering mythological and historical context on `ServiceDetailScreen.jsx`. |
| **Arrival Guidelines Card** | High-visibility card with accent icon and gold border (`border-gold-primary/30`) for dress codes and entry guidelines. |
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
