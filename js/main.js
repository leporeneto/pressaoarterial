import { db } from './firebase-config.js';
import { ref, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const form = document.getElementById('afericaoForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const agora = new Date().toISOString();
  const pas = document.getElementById('pas').value;
  const pad = document.getElementById('pad').value;
  const fc = document.getElementById('fc').value;
  const sintomas = document.getElementById('sintomas').value;

  const afericao = {
    dataHora: agora,
    pas: Number(pas),
    pad: Number(pad),
    fc: Number(fc),
    sintomas: sintomas || null
  };

  const dataKey = agora.substr(0,10);
  push(ref(db, 'afericoes/' + dataKey), afericao)
    .then(() => {
      alert('Aferição registrada com sucesso!');
      form.reset();
    })
    .catch((error) => {
      console.error('Erro ao salvar a aferição:', error);
    });
});
