import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCjUN2sxa9eKlI2Z20lP6PCma-sYSuCJJ4",
  authDomain: "coldchainguard-f2066.firebaseapp.com",
  databaseURL: "https://coldchainguard-f2066-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "coldchainguard-f2066",
  storageBucket: "coldchainguard-f2066.appspot.com",
  messagingSenderId: "223914967900",
  appId: "1:223914967900:web:8cb4566f39840a11b07799"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
