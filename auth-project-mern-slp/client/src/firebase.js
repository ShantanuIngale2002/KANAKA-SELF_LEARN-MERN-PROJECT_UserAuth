// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-oauth-de898.firebaseapp.com",
    projectId: "mern-oauth-de898",
    storageBucket: "mern-oauth-de898.appspot.com",
    messagingSenderId: "825978184528",
    appId: "1:825978184528:web:b358edf3694aae235a8255",
};

//console.log(import.meta.env);
//console.log(firebaseConfig.apiKey);

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
