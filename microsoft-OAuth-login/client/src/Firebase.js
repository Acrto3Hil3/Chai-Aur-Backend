// Import the functions you need from the SDKs you need
import { getAuth, OAuthProvider } from 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAihI0tcPdnFL3S_4KhkpDZN1ha5OBbtLc",
    authDomain: "filofax-webapp-10ca2.firebaseapp.com",
    projectId: "filofax-webapp-10ca2",
    storageBucket: "filofax-webapp-10ca2.firebasestorage.app",
    messagingSenderId: "661447320286",
    appId: "1:661447320286:web:3f670373fd26638624d84f",
    measurementId: "G-F0CXRNY65J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new OAuthProvider('microsoft.com')

export { auth, provider }