import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0e9H8je2neX8seSV6HybY8ewvqVLPMgI",
  authDomain: "spotifiuby-2c0b2.firebaseapp.com",
  projectId: "spotifiuby-2c0b2",
  storageBucket: "spotifiuby-2c0b2.appspot.com",
  messagingSenderId: "1055958726450",
  appId: "1:1055958726450:web:cc9127d2695285ca92892b",
  measurementId: "G-66HGHDF67T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  logInWithEmailAndPassword,
  logout,
};
