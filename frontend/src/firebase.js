// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-authapp-007.firebaseapp.com",
  projectId: "mern-authapp-007",
  storageBucket: "mern-authapp-007.appspot.com",
  messagingSenderId: "95315531200",
  appId: "1:95315531200:web:7cdb4d637923db23086425"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);