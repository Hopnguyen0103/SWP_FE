// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJmWz4VUQdQ-HrL0BVVlPtN0EdNPAfgBk",
  authDomain: "bookstore-a2ba6.firebaseapp.com",
  projectId: "bookstore-a2ba6",
  storageBucket: "bookstore-a2ba6.appspot.com",
  messagingSenderId: "332633416819",
  appId: "1:332633416819:web:41bd1c02f1750509273606",
  measurementId: "G-FSWM297P5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const ggProvider = new GoogleAuthProvider();