import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhXzv3a2v6m6hNFpbmb9yL1iTXs5ifZ_8",
  authDomain: "iiuc-eventera.firebaseapp.com",
  projectId: "iiuc-eventera",
  storageBucket: "iiuc-eventera.firebasestorage.app",
  messagingSenderId: "401308686777",
  appId: "1:401308686777:web:e4a89e7710d3933a2b3e68",
  measurementId: "G-Z1JYWFC9N1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);