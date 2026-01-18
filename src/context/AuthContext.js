import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

const AuthContext = createContext();

// Helper function to get user-friendly error messages
function getErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please login instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed. Please try again.";
    default:
      return "An error occurred. Please try again.";
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Always set up the Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Real user logged in - clear any guest user
        localStorage.removeItem('guestUser');
        setUser(firebaseUser);
      } else {
        // No Firebase user - check for guest user
        const guestUser = localStorage.getItem('guestUser');
        if (guestUser) {
          setUser(JSON.parse(guestUser));
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  const loginAsGuest = () => {
    // Check if there's an existing guest user to preserve their progress
    const existingGuest = localStorage.getItem('guestUser');
    let guestUser;

    if (existingGuest) {
      guestUser = JSON.parse(existingGuest);
    } else {
      guestUser = {
        uid: 'guest-user',
        email: 'guest@local',
        displayName: 'Guest',
        isGuest: true,
      };
      localStorage.setItem('guestUser', JSON.stringify(guestUser));
    }

    setUser(guestUser);
    return guestUser;
  };

  const logout = async () => {
    setError(null);
    try {
      // Check if guest user
      if (user?.isGuest) {
        localStorage.removeItem('guestUser');
        setUser(null);
        return;
      }
      await signOut(auth);
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    loginAsGuest,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
