// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD-c726XYi9XHDL-bRUizrH1pqeaW98luM",
    authDomain: "mytestapp-da0ed.firebaseapp.com",
    projectId: "mytestapp-da0ed",
    storageBucket: "mytestapp-da0ed.appspot.com",
    messagingSenderId: "470257069882",
    appId: "1:470257069882:web:23181e29a7350f7b30ea03",
    measurementId: "G-P7RD2BX7G5"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };