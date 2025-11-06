import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// src/firebaseConfig.js or app/src/lib/firebase.tsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // **IMPORTANT:** Get this from your Firebase project settings (Project settings > General > Web app)
  authDomain: "react-web-app-6bbe1.firebaseapp.com",
  projectId: "react-web-app-6bbe1",
  storageBucket: "react-web-app-6bbe1.appspot.com", // This uses .appspot.com for storageBucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // **IMPORTANT:** Get this from your Firebase project settings
  appId: "YOUR_APP_ID" // **IMPORTANT:** Get this from your Firebase project settings
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
