import { db } from './firebase-config.js';
import { ref, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging.js";

const messaging = getMessaging();
navigator.serviceWorker.register('firebase-messaging-sw.js')
  .then((registration) => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, {
          vapidKey: 'BFuseE_VdrOkvs8cnNqZWvT1vf0n96OimhNV1yQRlZsVFCLdaINX2MK73y3WF9Gw_dpPmJwppgYPi0_FlY5zams',
          serviceWorkerRegistration: registration
        }).then((currentToken) => {
          if (currentToken) {
            console.log('Token de notificação:', currentToken);
          }
        });
      }
    });
  });

const form = document.getElementById('afericaoForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const agora = new Date().toISOString();
  const usuario = document.getElementById('usuario').value;
  const pas = document.getElementById('pas').value;
  const pad = document.getElementById('pad').value;
  const fc = document.getElementById('fc').value;
  const sintomas = document.getElementById('sintomas').value;

  const afericao = {
    usuario,
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
