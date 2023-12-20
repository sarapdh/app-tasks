// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClKARNidb-qezaiLOviqZyg7C6eJnQCWs",
  authDomain: "todo-tasks-1f060.firebaseapp.com",
  projectId: "todo-tasks-1f060",
  storageBucket: "todo-tasks-1f060.appspot.com",
  messagingSenderId: "591827604800",
  appId: "1:591827604800:web:ce046265d5a7a37fb3d6a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)