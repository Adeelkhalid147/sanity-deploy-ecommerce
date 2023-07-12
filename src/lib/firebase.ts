// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYGw6BsS_9B1jsqeYIEVADnZ9p7_r8V9Q",
  authDomain: "e-commerce-1e98f.firebaseapp.com",
  projectId: "e-commerce-1e98f",
  storageBucket: "e-commerce-1e98f.appspot.com",
  messagingSenderId: "923627552854",
  appId: "1:923627552854:web:8f798d72b1a229790d7bf7",
  measurementId: "G-JW24X802LF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()