import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyChlqEl1IWWbqeA6Wv4cOfyMvFGhAaSmVU",
  authDomain: "pressaoarterial-7d703.firebaseapp.com",
  databaseURL: "https://pressaoarterial-7d703-default-rtdb.firebaseio.com",
  projectId: "pressaoarterial-7d703",
  storageBucket: "pressaoarterial-7d703.firebasestorage.app",
  messagingSenderId: "279191885401",
  appId: "1:279191885401:web:d69a9a4c292c321acbc348",
  measurementId: "G-GDLBGSC971"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
