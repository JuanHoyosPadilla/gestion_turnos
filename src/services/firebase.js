// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEh6rjALK_cgSuLAFvLIpb4gRXYkGXoQ8",
  authDomain: "db-turnos.firebaseapp.com",
  projectId: "db-turnos",
  storageBucket: "db-turnos.appspot.com",
  messagingSenderId: "20265997255",
  appId: "1:20265997255:web:cdc19cbbf45d3065a3bfe2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}