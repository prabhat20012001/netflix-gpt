// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzVnNypMV9nCw9dZZEBxHu6FkL7JtXm08",
  authDomain: "netflix-gpt-a2520.firebaseapp.com",
  projectId: "netflix-gpt-a2520",
  storageBucket: "netflix-gpt-a2520.appspot.com",
  messagingSenderId: "280524648264",
  appId: "1:280524648264:web:e5439a680f99a84d0d0d7d",
  measurementId: "G-Y67EJPRT2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth()