import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTpQpYObCYQAMmi4mFJSD1Yayxut-GltA",
  authDomain: "mentorconnect-ab0d3.firebaseapp.com",
  projectId: "mentorconnect-ab0d3",
  storageBucket: "mentorconnect-ab0d3.firebasestorage.app",
  messagingSenderId: "378861851555",
  appId: "1:378861851555:web:e7c98394911846c287c016",
  measurementId: "G-2YKFJ6CFWE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
