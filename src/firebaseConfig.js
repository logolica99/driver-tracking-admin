// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ_9PsnjE5Nuwj0_U00hALA44ELBycXh4",
  authDomain: "driver-tracking-c7772.firebaseapp.com",
  databaseURL: "https://driver-tracking-c7772-default-rtdb.firebaseio.com",
  projectId: "driver-tracking-c7772",
  storageBucket: "driver-tracking-c7772.appspot.com",
  messagingSenderId: "84321027090",
  appId: "1:84321027090:web:36b5124099cd57977bc4cb",
  measurementId: "G-P6QY6TPEMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);