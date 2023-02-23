
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyATDnym2GdGUgJZz6aqe5yia1T1kgNKh2A",
  authDomain: "wheres-wally-1bf0d.firebaseapp.com",
  projectId: "wheres-wally-1bf0d",
  storageBucket: "wheres-wally-1bf0d.appspot.com",
  messagingSenderId: "291852359184",
  appId: "1:291852359184:web:af61987da00b6129329c95"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)