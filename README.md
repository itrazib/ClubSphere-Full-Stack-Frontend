# ClubSphere – Frontend (Client)

## 🌐 Project Overview

ClubSphere Frontend is the client-side application of the ClubSphere platform. It allows users to explore clubs and events, join clubs, register for events, and access role-based dashboards (Admin, Club Manager, Member) with a modern and responsive UI.

---

## 🚀 Live Site

https://club-sphere-full-stack-frontend.vercel.app/

---

## ✨ Key Features

* Public pages: Home, Clubs, Events
* Firebase Authentication (Email/Password + Google)
* Role-based dashboards (Admin / Club Manager / Member)
* Club & Event browsing with search and filter
* Membership & Event registration
* Stripe payment UI integration
* Responsive design for mobile, tablet, and desktop
* Smooth animations using Framer Motion

---

## 🛠 Tech Stack

* React
* React Router DOM
* Firebase Authentication
* @tanstack/react-query
* React Hook Form
* Tailwind CSS + DaisyUI
* Framer Motion
* Axios
* Stripe JS

---

## 📁 Folder Structure (Simplified)

```
src/
 ┣ components/
 ┣ pages/
 ┣ dashboard/
 ┣ hooks/
 ┣ routes/
 ┣ services/
 ┣ utils/
 ┣ App.jsx
 ┗ main.jsx
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=your_backend_api_url
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx
```

---

## ▶️ Run Locally

```
npm install
npm run dev
```

---

## 📦 Important NPM Packages

* react
* react-router-dom
* firebase
* @tanstack/react-query
* react-hook-form
* framer-motion
* axios

---

## 👤 Test Admin Account

```
Email: razib.work12@gmail.com
Password: Admin12@
```

---

## 📄 Notes

* Firebase authorized domains must include deployed client domain
* All private routes preserve authentication state on reload
