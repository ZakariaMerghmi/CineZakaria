
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnyhHdVCVhi-TNnFpADCmflHl0JFGtmyc",
  authDomain: "movie-app-5167e.firebaseapp.com",
  projectId: "movie-app-5167e",
  storageBucket: "movie-app-5167e.firebasestorage.app",
  messagingSenderId: "876577236963",
  appId: "1:876577236963:web:2feb5a2f1cd64f1541a2d6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
