// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "stackoverflow-clone-f00d0.firebaseapp.com",
  projectId: "stackoverflow-clone-f00d0",
  storageBucket: "stackoverflow-clone-f00d0.appspot.com",
  messagingSenderId: "62868186475",
  appId: "1:62868186475:web:13ecf33ff3adfe739ed82e",
  measurementId: "G-EN21764PMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
