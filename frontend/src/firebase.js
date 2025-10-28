// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-mernhem.firebaseapp.com",
  projectId: "realestate-mernhem",
  storageBucket: "realestate-mernhem.appspot.com",
  messagingSenderId: "229379313220",
  appId: "1:229379313220:web:f21a56823fab05fdd6b611"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);