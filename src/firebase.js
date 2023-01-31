import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWqMG6TUfU0HX3sh2KqW75rg-NRYROzRU",
  authDomain: "todo-app-34ab4.firebaseapp.com",
  projectId: "todo-app-34ab4",
  storageBucket: "todo-app-34ab4.appspot.com",
  messagingSenderId: "621584056843",
  appId: "1:621584056843:web:b0d00dc049c9b05ef0bd0e",
  measurementId: "G-XYG3JTCGG3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;