# Playo Project Architecture & Documentation

## 📌 Project Overview
Playo is a mobile-first, professional-grade React application designed for booking sports venues (Grounds/Boxes). The application features a modern, dark-themed UI with green accents, supporting user authentication, venue browsing, real-time booking simulations, and a user dashboard.

---

## 🛠 Technology Stack
- **Frontend Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS v4 (with custom design tokens)
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **Mock Backend**: LocalStorage & Service Layer

---

## 📂 Project Structure

```text
playo/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Media assets (images, icons, videos)
│   ├── components/         # Reusable UI components
│   │   ├── cards/          # Entity-specific cards (GroundCard, BookingCard)
│   │   ├── common/         # Atomic UI components (Button, Navbar, Footer)
│   │   └── layouts/        # Page layout wrappers (MainLayout, AuthLayout)
│   ├── context/            # Global state (Auth, Bookings, Grounds)
│   ├── data/               # Mock JSON datasets for the application
│   ├── hooks/              # Custom React hooks (useContexts)
│   ├── pages/              # Route-level page components
│   │   ├── Auth/           # Login & Registration pages
│   │   ├── Dashboard/      # User booking management
│   │   ├── Grounds/        # Search, Details, and Booking flow
│   │   └── Home/           # Landing page
│   ├── routes/             # Navigation & Access Control (Protected Routes)
│   ├── services/           # Business logic & API simulation (Mock Backend)
│   ├── styles/             # (Optional) Custom CSS modules
│   ├── utils/              # (Optional) Helper functions
│   ├── App.jsx             # Main App entry point
│   ├── index.css           # Global styles & Tailwind configuration
│   └── main.jsx            # React DOM mounting
├── architecture.md         # This documentation
├── package.json            # Dependencies & Scripts
└── vite.config.js          # Vite build configuration
```

---

## 🧩 Core Module Analysis

### 1. Components & UI
The UI is built using a component-driven approach:
- **Common Components**: Shared elements like `Navbar.jsx` and `Button.jsx` ensure visual consistency.
- **Layouts**: `MainLayout.jsx` wraps standard pages with a header/footer, while `AuthLayout.jsx` provides a specialized view for login/register flows.
- **Cards**: `GroundCard.jsx` handles the display of venue information in lists, while `BookingCard.jsx` is used in the dashboard.

### 2. State Management (Context API)
The application uses three primary contexts to manage global state:
- **AuthContext**: Manages user session, login/logout status, and user profile data.
- **GroundContext**: Handles the listing, filtering, and retrieval of sports venues.
- **BookingContext**: Orchestrates the booking flow, from selection to confirmation and history management.

### 3. Services (The Mock Backend)
To keep logic separate from UI, all "data-heavy" operations are in the `services/` directory:
- **`authService.js`**: Simulates user authentication and local session persistence.
- **`groundService.js`**: Handles searching and fetching venue details.
- **`bookingService.js`**: Manages CRUD operations for bookings using `localStorage`.

### 4. Routing & Protection
Navigation is centralized in `AppRoutes.jsx`. 
- **Protected Routes**: The `ProtectedRoute.jsx` component wraps sensitive pages (Payment, Dashboard). If a user is not logged in, they are automatically redirected to the login page.

---

## 🎨 Styling Strategy
The project utilizes **Tailwind CSS v4** with a custom design system defined in `index.css`.

**Primary Design Tokens:**
- `primary`: `#22C55E` (Vibrant Green)
- `bgDark`: `#0B0F19` (Deep Blue/Black Background)
- `cardBg`: `#111827` (Slightly lighter dark for cards)
- `textGray`: `#D1D5DB` (Soft gray for secondary text)

**Layout**: Mobile-first responsive design, ensuring a premium experience on both handheld devices and desktops.

---

## 🔄 Data Flow
1. **User Action**: User clicks "Book Now" on a Ground Card.
2. **Service Call**: UI triggers a function in `bookingService.js`.
3. **Storage Update**: Service updates `localStorage` and returns the new state.
4. **Context Update**: `BookingContext` receives the data and updates the global state.
5. **UI Re-render**: All components listening to the context (e.g., Dashboard) automatically update.

---

## 🚀 Setup & Installation
1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Run local server: `npm run dev`
4. Build for production: `npm run build`
