# 🏎️ CARONBAR — Doorstep High-Performance Car Detailing

[![Live Demo](https://img.shields.io/badge/Live%20Demo-carcare.web.app-E05638?style=for-the-badge&logo=firebase)](https://carcare.web.app)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)

**CARONBAR** is a premium, high-performance doorstep car wash and detailing web application. Built with modern web standards, custom 3D interactive process carousels, strict Firebase authentication, and real-time Cloud Firestore database synchronization.

---

## 🔥 Key Features

### 1. 🌐 Interactive 3D Process Carousel
* Custom 3D cylindrical stage featuring smooth 60fps continuous auto-rotation and touch/drag interactions.
* Tailored multi-breakpoint responsive dimensions (`< 450px`, `450px - 600px`, `600px - 800px`, `800px - 1300px`, `1300px - 1800px`, `>= 1800px`).

### 2. 🔐 Strict Firebase Authentication & Protected Admin Portal
* Secured Admin Control Operations desk accessible strictly via Firebase Authentication (`signInWithEmailAndPassword`).
* Invalid route protection with automatic redirection to `/login` for unauthenticated visitors.

### 3. ⚡ Real-Time Cloud Firestore Data Engine
* **Doorstep Bookings & Queries**: Full real-time synchronization (`onSnapshot`) for new bookings, status updates, detailer assignments, and customer inquiries.
* Permanent, non-expiring security rules configured in `firestore.rules`.

### 4. 🎨 Glassmorphism & High-Octane Design System
* Curated dark studio theme featuring neon coral accents (`#E05638`), glassmorphism panels, custom SVG brand favicons, and dedicated 404 error routes.
* Mobile-first responsive card views for all screen dimensions.

---

## 🏗️ Project Architecture

```
carwash/
├── public/                     # Brand SVG favicon & high-res static images
├── src/
│   ├── components/             # Reusable UI & 3D components
│   │   ├── 3d/                 # CarWash3DCarousel (3D Cylindrical Stage)
│   │   └── common/             # Navbar, Footer, AdminRoute, VehicleSelector, SEOHead
│   ├── config/                 # Firebase SDK initialization (firebase.js)
│   ├── context/                # AuthContext & BookingContext providers
│   ├── data/                   # Production service catalog & package data
│   ├── pages/                  # Route views (Home, Services, Packages, Booking, AdminDashboard, Login, NotFound)
│   ├── services/               # Production Firebase Cloud Firestore CRUD (firebaseService.js)
│   └── utils/                  # Currency & date formatters
├── firebase.json               # Firebase Hosting & Firestore rules configuration
├── firestore.rules             # Permanent Cloud Firestore Security Rules
├── package.json                # Project dependencies
└── vite.config.js              # Vite build setup
```

---

## 🚀 Quick Start

### 1. Prerequisites
* **Node.js**: v18.0 or higher
* **npm**: v9.0 or higher

### 2. Installation & Local Development
```bash
# 1. Clone the repository
git clone https://github.com/your-username/carwash.git
cd carwash

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

## 🔑 Environment Variables Configuration

Create a `.env` file in the project root directory with your Firebase Web App credentials:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## ☁️ Deployment

Deploy to Firebase Hosting and Firestore rules using the Firebase CLI:

```bash
# Build production bundle & deploy to Firebase Hosting
npm run build
npx firebase-tools deploy --only hosting,firestore:rules --project carwashservice-b7df8
```

* **Live URL**: [https://carcare.web.app](https://carcare.web.app)
* **Firebase Project Console**: [carwashservice-b7df8](https://console.firebase.google.com/project/carwashservice-b7df8/overview)

---

## 📜 License
Developed with perfection for **CARONBAR**. All rights reserved.
