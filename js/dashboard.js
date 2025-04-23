import { db } from './firebase-config.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const hoje = new Date().toISOString().substr(0,10);
get(ref(db, 'afericoes/' + hoje)).then(snapshot => {
  const data = snapshot.val();
  if (!data) {
    document.getElementById('grafico').innerHTML = 'Nenhuma aferição registrada para hoje.';
    return;
  }
  let labels = [], dadosPAS = [], dadosPAD = [], dadosFC = [];
  Object.values(data).forEach(item => {
    const hora = new Date(item.dataHora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    labels.push(hora);
    dadosPAS.push(item.pas);
    dadosPAD.push(item.pad);
    dadosFC.push(item.fc);
  });
  const canvas = document.createElement('canvas');
  document.getElementById('grafico').appendChild(canvas);
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
}).catch(error => console.error('Erro ao carregar dados:', error));
