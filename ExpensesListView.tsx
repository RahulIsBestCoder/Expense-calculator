import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, onSnapshot, query, where, deleteDoc, orderBy, writeBatch, Timestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth & Firestore with explicit databaseId
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Custom Database ID support
const databaseId = firebaseConfig.firestoreDatabaseId;
export const db = databaseId && databaseId !== '(default)' 
  ? getFirestore(app, databaseId) 
  : getFirestore(app);

export {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  deleteDoc,
  orderBy,
  writeBatch,
  Timestamp,
};
export type { User };
