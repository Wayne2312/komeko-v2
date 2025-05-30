
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBBVnouvKBlZlgbB315RtJqUEx-_rJCl8I",
    authDomain: "komeko-v2.firebaseapp.com",
    projectId: "komeko-v2",
    storageBucket: "komeko-v2.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:0987654321",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };