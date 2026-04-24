// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzmUqhExlB3wGry6bX5C0xoU4WJu-Bg4A",
  authDomain: "bandtogether-d9c5f.firebaseapp.com",
  projectId: "bandtogether-d9c5f",
  storageBucket: "bandtogether-d9c5f.firebasestorage.app",
  messagingSenderId: "42893087101",
  appId: "1:42893087101:web:fb0c76fb91fbf803e73c14",
  measurementId: "G-2NM8GYRT2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);