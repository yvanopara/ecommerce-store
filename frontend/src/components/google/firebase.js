// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyBrXmETWQ2AqOE245zLjrzOECmPrePjw90",
  // apiKey: import.meta.env.FIREBASE_API_KEY, 
  authDomain: "k-mystore.firebaseapp.com",
  projectId: "k-mystore",
  storageBucket: "k-mystore.firebasestorage.app",
  messagingSenderId: "232340614634",
  appId: "1:232340614634:web:f3f7dd1b766c26df969693",
  measurementId: "G-4KJ45JTS17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);