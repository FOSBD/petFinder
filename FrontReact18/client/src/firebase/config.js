// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeWNTrzCDzcZZ5CqTzp3l9NI95bly7qSA",
  authDomain: "petfinder-5815c.firebaseapp.com",
  projectId: "petfinder-5815c",
  storageBucket: "petfinder-5815c.appspot.com",
  messagingSenderId: "499024801831",
  appId: "1:499024801831:web:078d4de7c06378e65bde02",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
