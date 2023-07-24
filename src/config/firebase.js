// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIE8aXk5ASeQkGBC_Ta8Ge8H-EOmb84a8",
  authDomain: "fir-test-7a041.firebaseapp.com",
  projectId: "fir-test-7a041",
  storageBucket: "fir-test-7a041.appspot.com",
  messagingSenderId: "840138599585",
  appId: "1:840138599585:web:2f504a8b9fcdf0468194e0",
  measurementId: "G-09H6DEHQGB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
