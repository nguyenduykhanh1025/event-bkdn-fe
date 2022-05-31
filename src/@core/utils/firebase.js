// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrVutXNoTXDcxTNhHnio-ihRiS8j0cYC0",
    authDomain: "event-bkdn.firebaseapp.com",
    projectId: "event-bkdn",
    storageBucket: "event-bkdn.appspot.com",
    messagingSenderId: "743368512476",
    appId: "1:743368512476:web:af03d9612e6f6e5e3db519",
    measurementId: "G-97BCHLR0J4"
};

let analytics; let firestore; let storage;
if (firebaseConfig?.projectId) {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    if (app.name && typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }

    // Access Firebase services using shorthand notation
    firestore = getFirestore();
    storage = getStorage(app);
}
console.log('storage', storage);

export { analytics, firestore, storage };