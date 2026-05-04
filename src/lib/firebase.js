// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVlFMJgKpoOa7xX7rx6VNpbC_Qw3IPhOo",
  authDomain: "omp-church.firebaseapp.com",
  projectId: "omp-church",
  storageBucket: "omp-church.firebasestorage.app",
  messagingSenderId: "250519642190",
  appId: "1:250519642190:web:0103b32cfd7954ca1e631f",
  measurementId: "G-YFPYPLDY4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);