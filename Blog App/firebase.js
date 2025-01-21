 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

 import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs , updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
     apiKey: "AIzaSyDT-5D1RX58uqBpydBGzSVOHDA1-BuLmIg",
     authDomain: "smit-abdullah-projects.firebaseapp.com",
     projectId: "smit-abdullah-projects",
     storageBucket: "smit-abdullah-projects.firebasestorage.app",
     messagingSenderId: "343383434187",
     appId: "1:343383434187:web:8346a200dd134c24604c4e"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Auth
    const auth = getAuth();

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);


    export {
        app,
        getAuth,
        createUserWithEmailAndPassword,
        auth,
        signInWithEmailAndPassword,
        db,
        doc,
        setDoc,
        getDoc,
        collection,
        onAuthStateChanged,
        addDoc,
        getDocs,
        signOut,
        updateDoc,
        deleteDoc

    }