import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyChlqEl1IWWbqeA6Wv4cOfyMvFGhAaSmVU",
  authDomain: "pressaoarterial-7d703.firebaseapp.com",
  databaseURL: "https://pressaoarterial-7d703-default-rtdb.firebaseio.com",
  projectId: "pressaoarterial-7d703",
  storageBucket: "pressaoarterial-7d703.appspot.com",
  messagingSenderId: "279191885401",
  appId: "1:279191885401:web:d69a9a4c292c321acbc348"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

window.entrar = () => {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  signInWithEmailAndPassword(auth, email, senha)
    .then(() => location.href = "inicio.html")
    .catch(e => alert("Erro ao entrar: " + e.message));
};

window.criarConta = () => {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  createUserWithEmailAndPassword(auth, email, senha)
    .then(userCred => {
      set(ref(db, 'usuarios/' + userCred.user.uid), { apelido: "" });
      alert("Conta criada com sucesso!");
    })
    .catch(e => alert("Erro ao criar conta: " + e.message));
};

window.esqueceuSenha = () => {
  const email = document.getElementById('email').value;
  sendPasswordResetEmail(auth, email)
    .then(() => alert("E-mail de redefinição enviado!"))
    .catch(e => alert("Erro ao enviar e-mail: " + e.message));
};
