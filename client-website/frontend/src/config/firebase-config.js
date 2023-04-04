// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfvsQHI4_hZ74RxaKnL43SCiEYOiVvaB8",
  authDomain: "invex-aac15.firebaseapp.com",
  projectId: "invex-aac15",
  storageBucket: "invex-aac15.appspot.com",
  messagingSenderId: "480840271984",
  appId: "1:480840271984:web:a00e00abdd92c3729c0cb5",
  measurementId: "G-LZ7SWM9MX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);