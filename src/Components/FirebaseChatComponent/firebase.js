// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKUgfYrW23I_lfpBDiUbiNymAESsZB_NQ",
  authDomain: "chatapp-d1b7f.firebaseapp.com",
  projectId: "chatapp-d1b7f",
  storageBucket: "chatapp-d1b7f.appspot.com",
  messagingSenderId: "983295532574",
  appId: "1:983295532574:web:020eba03c3b5c26e0d180f",
  measurementId: "G-Z89SJYN4R7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app}