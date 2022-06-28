import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAFRDdulXX4rSl-BD2yoOEE9EXFenfm6uU',
  authDomain: 'crown-clothing-c134b.firebaseapp.com',
  projectId: 'crown-clothing-c134b',
  storageBucket: 'crown-clothing-c134b.appspot.com',
  messagingSenderId: '663948063129',
  appId: '1:663948063129:web:d94412cd37baf361372308',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// You might need multiple providers, so that's why we use the "new" keyword
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  // Anytime a user interacts with GoogleAuthProvider we ask them
  // to select their account
  prompt: 'select_account',
});

// You won't need more than one authenticator, so we don't use the "new" keyword
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore(); // This points to our database inside our console

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid); // doc(database, collection, unique ID)

  const userSnapShot = await getDoc(userDocRef);

  // check if user data exists
  // if it does, return userDocRef and don't do anything else
  // if it doesn't, create/set the document with the data from userAuth in our collection

  // If userSnapShot doesn't exist
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  // If userSnapShot exists
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
