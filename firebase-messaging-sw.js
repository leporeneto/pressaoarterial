importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyChlqEl1IWWbqeA6Wv4cOfyMvFGhAaSmVU",
  authDomain: "pressaoarterial-7d703.firebaseapp.com",
  projectId: "pressaoarterial-7d703",
  messagingSenderId: "279191885401",
  appId: "1:279191885401:web:d69a9a4c292c321acbc348"
});

const messaging = firebase.messaging();
