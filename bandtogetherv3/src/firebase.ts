
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseConfig = {
  apiKey: "AIzaSyAzmUqhExlB3wGry6bX5C0xoU4WJu-Bg4A",
  authDomain: "bandtogether-d9c5f.firebaseapp.com",
  projectId: "bandtogether-d9c5f",
  storageBucket: "bandtogether-d9c5f.firebasestorage.app",
  messagingSenderId: "42893087101",
  appId: "1:42893087101:web:fb0c76fb91fbf803e73c14",
  measurementId: "G-2NM8GYRT2C"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const providers = {
  googleProvider: new GoogleAuthProvider()
};

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
})

const signInWithGoogle = () => {
  signInWithPopup(auth, providers.googleProvider);
}

const signOutFirebase = () => {
  signOut(auth)
}

export {
  db,
  auth,
  createComponentWithAuth,
  signInWithGoogle,
  signOutFirebase as signOut
}
