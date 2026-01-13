import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmWmlyBFeU7PzM9n93FKEWStGxkNsOs9Q",
  authDomain: "sinhala-learning.firebaseapp.com",
  projectId: "sinhala-learning",
  storageBucket: "sinhala-learning.firebasestorage.app",
  messagingSenderId: "1006618593468",
  appId: "1:1006618593468:web:eb21e3810946ebc60728b9",
  measurementId: "G-EWF1MT6YNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
