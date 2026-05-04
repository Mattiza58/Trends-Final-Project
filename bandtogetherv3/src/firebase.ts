import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, getAdditionalUserInfo, signInWithPopup, signOut } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const Dates = collection(db, "Dates");

const providers = {
  googleProvider: new GoogleAuthProvider()
};

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
})

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, providers.googleProvider);
  const info = getAdditionalUserInfo(result);
  if (info?.isNewUser) {
    sessionStorage.setItem('pendingProfileSetup', result.user.uid);
  }
}

const signOutFirebase = () => {
  signOut(auth)
}

export {
  db,
  auth,
  Dates,
  createComponentWithAuth,
  signInWithGoogle,
  signOutFirebase as signOut,
}
