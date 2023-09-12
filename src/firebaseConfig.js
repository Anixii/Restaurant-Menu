// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import {getFirestore} from "@firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8zE24QfiC7gInitCUo5HXurzUL5KZN3I",
  authDomain: "restaurant-menu-481e6.firebaseapp.com",
  projectId: "restaurant-menu-481e6",
  storageBucket: "restaurant-menu-481e6.appspot.com",
  messagingSenderId: "805449995560",
  appId: "1:805449995560:web:503ab679cdbee0a9f52c1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app)   