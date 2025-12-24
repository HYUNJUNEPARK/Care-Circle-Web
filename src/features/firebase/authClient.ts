import { initializeApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  //browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBaXoIapJhVHhoW095Av7TM5IY5728R4m8",
    authDomain: "develop-f0f58.firebaseapp.com",
    projectId: "develop-f0f58",
    storageBucket: "develop-f0f58.appspot.com",
    messagingSenderId: "309755861883",
    appId: "1:309755861883:web:22cb84d1b5fed598ff3bde",
    measurementId: "G-CBZCYL2XQB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export async function initAuthPersistence() {
    await setPersistence(auth, browserSessionPersistence);
    //await setPersistence(auth, browserLocalPersistence);
}