import { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User } from '../lib/firebase';
import { UserProfile } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserProfile({
          uid: currentUser.uid,
          displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      // If popup blocked or cancelled
      if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError(err.message || 'Failed to sign in with Google');
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Logout Error:', err);
    }
  };

  return {
    user,
    userProfile,
    loading,
    authError,
    loginWithGoogle,
    logout,
  };
}
