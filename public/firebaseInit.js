import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, getDocs, collection, query, where, addDoc, serverTimestamp, getDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyAi9neqoH67SXQ2JRxkVY_bl9xGCoHeYUI",
    authDomain: "rad-tjw.firebaseapp.com",
    projectId: "rad-tjw",
    storageBucket: "rad-tjw.appspot.com",
    messagingSenderId: "574586917129",
    appId: "1:574586917129:web:a6242e4bc8621a6bcf83d8",
    measurementId: "G-QW1W8CBYVT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, doc, getDocs, collection, query, where, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, addDoc, deleteDoc, serverTimestamp, sendPasswordResetEmail, getDoc, updateDoc };