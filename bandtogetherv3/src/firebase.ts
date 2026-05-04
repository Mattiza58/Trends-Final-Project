import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, getAdditionalUserInfo, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
const db = getFirestore(app);
const storage = getStorage(app);
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

const uploadSongImage = async (file: File, songId: string): Promise<string> => {
  const imageRef = ref(storage, `songs/${songId}/${file.name}`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
}

const uploadProfilePicture = async (file: File, userId: string): Promise<string> => {
  const imageRef = ref(storage, `profilePictures/${userId}/avatar`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
}

const signUpWithEmail = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  sessionStorage.setItem('pendingProfileSetup', result.user.uid);
}

const signInWithEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
}

export {
  db,
  auth,
  storage,
  Dates,
  createComponentWithAuth,
  signInWithGoogle,
  signOutFirebase as signOut,
  uploadSongImage,
  uploadProfilePicture,
  signUpWithEmail,
  signInWithEmail,
}
