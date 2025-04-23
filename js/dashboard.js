import { db } from './firebase-config.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const hoje = new Date().toISOString().substr(0,10);
const select = document.getElementById('usuarioSelect');
const graficoDiv = document.getElementById('grafico');

get(ref(db, 'afericoes/' + hoje)).then(snapshot => {
  const data = snapshot.val();
  if (!data) {
    graficoDiv.innerHTML = 'Nenhuma aferição registrada para hoje.';
    return;
  }

  const registros = Object.values(data);
  const usuarios = [...new Set(registros.map(item => item.usuario))];

  usuarios.forEach(nome => {
    const option = document.createElement('option');
    option.value = nome;
    option.textContent = nome;
    select.appendChild(option);
  });

  select.addEventListener('change', () => desenharGrafico(select.value));
  desenharGrafico("");
});

function desenharGrafico(usuarioSelecionado) {
  graficoDiv.innerHTML = '';
  get(ref(db, 'afericoes/' + hoje)).then(snapshot => {
    const data = snapshot.val();
    if (!data) return;

    const registros = Object.values(data).filter(item => {
      return !usuarioSelecionado || item.usuario === usuarioSelecionado;
    });

    let labels = [], dadosPAS = [], dadosPAD = [], dadosFC = [];
    registros.forEach(item => {
      const hora = new Date(item.dataHora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      labels.push(hora);
      dadosPAS.push(item.pas);
      dadosPAD.push(item.pad);
      dadosFC.push(item.fc);
    });

    const canvas = document.createElement('canvas');
    graficoDiv.appendChild(canvas);
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          { label: 'PAS', data: dadosPAS, borderColor: '#d63384', fill: false },
          { label: 'PAD', data: dadosPAD, borderColor: '#2a9d8f', fill: false },
          { label: 'FC',  data: dadosFC,  borderColor: '#f4a261', fill: false }
        ]
      },
      options: { responsive: true }
    });
  });
}
