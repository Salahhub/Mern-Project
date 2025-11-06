import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// src/firebaseConfig.js or app/src/lib/firebase.tsx
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmF9fml0fFEj1ho7zmet8mGi75paPIQvs",
  authDomain: "react-web-app-6bbe1.firebaseapp.com",
  projectId: "react-web-app-6bbe1",
  storageBucket: "react-web-app-6bbe1.firebasestorage.app",
  messagingSenderId: "857142635765",
  appId: "1:857142635765:web:51a058c05f25f6f56f69bc",
  measurementId: "G-6EJEXMWNX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>
);
