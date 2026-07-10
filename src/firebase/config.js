// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU9-1KH33fbJI3cs9VH2yGg6H9DwUqRhg",
  authDomain: "ecommerce-gcba-73a33.firebaseapp.com",
  projectId: "ecommerce-gcba-73a33",
  storageBucket: "ecommerce-gcba-73a33.firebasestorage.app",
  messagingSenderId: "249586962385",
  appId: "1:249586962385:web:430e51fbe367dd03749af0",
  measurementId: "G-RP1TQ6YJY8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
