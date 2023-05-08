// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2MhpzCWdk7M4EA-y6SJyMcWH-dowlHiw",
  authDomain: "spotify-top-99.firebaseapp.com",
  projectId: "spotify-top-99",
  storageBucket: "spotify-top-99.appspot.com",
  messagingSenderId: "176873703935",
  appId: "1:176873703935:web:5efb44e26e3a9df1a53fca",
  measurementId: "G-W17V1FZ92R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);