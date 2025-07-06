// src/firebase.js

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1hZKATYR3wh0DXSTWEv2PKggeRmcHWLM",
  authDomain: "greenlearn-220e5.firebaseapp.com",
  projectId: "greenlearn-220e5",
  storageBucket: "greenlearn-220e5.appspot.com", // fix storageBucket domain
  messagingSenderId: "981482683614",
  appId: "1:981482683614:web:f4bbd0691b3ece39a5964f",
  measurementId: "G-5STNXEGL0R"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize analytics (optional)
//const analytics = getAnalytics(app);

// Export auth and firestore instances linked to the initialized app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;