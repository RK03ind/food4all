// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC8pa25IdXutcenzxFtFwdNOq1CtstsFuU",
  authDomain: "realtime-chat-rk03.firebaseapp.com",
  projectId: "realtime-chat-rk03",
  storageBucket: "realtime-chat-rk03.appspot.com",
  messagingSenderId: "842978395154",
  appId: "1:842978395154:web:285a885106c2998bd004cb",
  measurementId: "G-PRCVYLK7FJ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getFirestore();

export default db;
