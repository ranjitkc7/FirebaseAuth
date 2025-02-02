// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { getDatabase} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwkoH2wm6b7Y7D8mp47SClTWEMIXEhzk8",
  authDomain: "expo-firebase-14ca6.firebaseapp.com",
  projectId: "expo-firebase-14ca6",
  storageBucket: "expo-firebase-14ca6.firebasestorage.app",
  messagingSenderId: "307017158113",
  appId: "1:307017158113:web:5e2b48530d5698159096a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestoreDB = getFirestore(app);