import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0mlfLTZpQtGyrcXe9Kjvwmt8U1_YVb_8",
  authDomain: "sistema-provedor-f44ea.firebaseapp.com",
  projectId: "sistema-provedor-f44ea",
  storageBucket: "sistema-provedor-f44ea.firebasestorage.app",
  messagingSenderId: "591629001330",
  appId: "1:591629001330:web:950bdaf7dc60741b2958eb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);