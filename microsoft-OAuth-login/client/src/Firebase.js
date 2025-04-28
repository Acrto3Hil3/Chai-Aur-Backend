// Import the functions you need from the SDKs you need
import { getAuth, OAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "myproject01-8e844.firebaseapp.com",
    projectId: "myproject01-8e844",
    storageBucket: "myproject01-8e844.firebasestorage.app",
    messagingSenderId: "299541214110",
    appId: "1:299541214110:web:3aa4b00c7fea57a060dc8f",
    measurementId: "G-5G86KJGMXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new OAuthProvider('microsoft.com')

export { auth, provider }