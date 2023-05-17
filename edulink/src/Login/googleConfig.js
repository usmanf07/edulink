// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDuh1nSDLI1OarsGy_hmWfL9eTfEXryEBI",
  authDomain: "edulink2-1684130217071.firebaseapp.com",
  projectId: "edulink2-1684130217071",
  storageBucket: "edulink2-1684130217071.appspot.com",
  messagingSenderId: "1015619153252",
  appId: "1:1015619153252:web:266bb9833d2b2236251e71",
  measurementId: "G-MVKG1P75S1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};