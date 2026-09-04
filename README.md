# 🏎️ CARONBAR — Doorstep High-Performance Car Detailing

[![Live Demo](https://img.shields.io/badge/Live%20Demo-caronbar.com-8B182B?style=for-the-badge&logo=firebase)](https://caronbar.com)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment%20Gateway-0C2340?style=for-the-badge&logo=razorpay)](https://razorpay.com)

**CARONBAR** is a premium, high-performance doorstep car wash, bike care, and detailing web application. Built with modern web standards, interactive packages and vehicle selector, strict Firebase authentication, real-time Cloud Firestore database synchronization, and seamless Razorpay online payment integration.

---

## 🔥 Key Features

### 1. 🌐 Interactive Vehicle & Package Selector
* Multi-vehicle dynamic switcher (Hatchback / Sedan, SUV, 2-Wheeler) with real-time price calculations and savings percentages.
* Responsive, center-aligned package cards across mobile, tablet, and desktop viewports.

### 2. 💳 Seamless Razorpay Online Payments & Cash on Delivery
* Integrated Razorpay payment checkout for instant UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, and NetBanking.
* Built-in sandbox simulator fallback for instant testing.

### 3. 🔐 Strict Firebase Authentication & Protected Admin Portal
* Secured Admin Operations desk strictly via Firebase Authentication (`signInWithEmailAndPassword`).
* Invalid route protection with automatic redirection to `/login` for unauthenticated visitors.

### 4. ⚡ Real-Time Cloud Firestore Data Engine
* **Doorstep Bookings & Orders**: Full real-time synchronization (`onSnapshot`) for new bookings, status updates, detailer assignments, and customer inquiries.
* Permanent, non-expiring security rules configured in `firestore.rules`.

### 5. 🎨 Burgundy Studio Theme & SEO Optimization
* Curated luxury dark/light studio theme featuring burgundy accents (`#8B182B`), custom brand favicons, and dedicated 404 error routes.
* Comprehensive search engine optimization with Open Graph, JSON-LD structured business data, and dynamic robots meta directives.

---

## 🏗️ Project Architecture

```
carwash/
├── public/                     # Brand favicon suite, static assets, sitemap.xml, robots.txt
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── booking/            # Multi-step booking flow (Vehicle, Service, Contact, Payment)
│   │   └── common/             # Navbar, Footer, AdminRoute, VehicleSelector, SEOHead
│   ├── config/                 # Firebase SDK initialization (firebase.js)
│   ├── context/                # AuthContext & BookingContext providers
│   ├── data/                   # Service catalog, packages, and vehicle types data
│   ├── pages/                  # Route views (Home, Services, Packages, Booking, AdminDashboard, Login, NotFound)
│   ├── services/               # Production Firebase Cloud Firestore CRUD (firebaseService.js)
│   └── utils/                  # Currency and date formatters
├── firebase.json               # Firebase Hosting headers, rewrites & Firestore rules configuration
├── firestore.rules             # Permanent Cloud Firestore Security Rules
├── package.json                # Project dependencies
└── vite.config.js              # Vite build setup with Razorpay dev middleware
```

---

## 🚀 Quick Start

### 1. Prerequisites
* **Node.js**: v18.0 or higher
* **npm**: v9.0 or higher

### 2. Installation & Local Development
```bash
# 1. Clone the repository
git clone https://github.com/CodeWithAkashsharma/caronbar.git
cd caronbar

# 2. Install dependencies
npm install

# 3. Start local Vite development server
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🔑 Environment Variables Configuration (.env)

Create a `.env` file in the project root directory with your Firebase Web App and Razorpay credentials:

```env
# ═════════════════════════════════════════════════════════
# 1. FIREBASE CONFIGURATION (Frontend & Firestore Sync)
# ═════════════════════════════════════════════════════════
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# ═════════════════════════════════════════════════════════
# 2. RAZORPAY PAYMENT GATEWAY CONFIGURATION
# ═════════════════════════════════════════════════════════
# Public Key ID (Used in Vite frontend checkout & dev server middleware)
VITE_RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_id
RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_id

# Secret Key (Used strictly by backend / dev server order verification)
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

---

## ☁️ Deployment

Deploy to Firebase Hosting and Firestore rules using the Firebase CLI:

```bash
# Build production bundle & deploy to Firebase Hosting
npm run build
npx firebase deploy --only hosting
```

* **Live Domain**: [https://caronbar.com](https://caronbar.com)
* **Firebase Web App**: [https://carwashservice-b7df8.web.app](https://carwashservice-b7df8.web.app)
* **Firebase Console**: [carwashservice-b7df8](https://console.firebase.google.com/project/carwashservice-b7df8/overview)

---

## 📜 License
Developed with perfection for **CARONBAR**. All rights reserved.
