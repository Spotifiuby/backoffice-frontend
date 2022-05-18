import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {usersService} from "./services/UsersService";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "spotifiuby-2c0b2.firebaseapp.com",
  projectId: "spotifiuby-2c0b2",
  storageBucket: "spotifiuby-2c0b2.appspot.com",
  messagingSenderId: "1055958726450",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-66HGHDF67T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signupWithEmailAndPassword = async (data) => {
  try {
    return await createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(session => {
      usersService.createUser(data, () => window.location.reload());
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logoutFirebase = () => {
  signOut(auth);
};
export {
  auth,
  logInWithEmailAndPassword,
  signupWithEmailAndPassword,
  logoutFirebase,
};
