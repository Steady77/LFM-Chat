import Cookies from 'js-cookie';
import { isAuth } from './utils';
import { renderMessages } from './view';

const URL = 'ws://mighty-cove-31255.herokuapp.com/websockets';
const TOKEN = Cookies.get('auth-key');

const socket = new WebSocket(`${URL}?${TOKEN}`);

export function sendMessage(messageText) {
  socket.send(
    JSON.stringify({
      text: messageText,
    })
  );
}

socket.addEventListener('message', (e) => {
  if (!isAuth()) return;

  const message = JSON.parse(e.data);

  renderMessages(message);
});

socket.addEventListener('error', (error) => {
  alert(`[error] ${error.message}`);
});

socket.addEventListener('close', (event) => {
  if (event.wasClean) {
    alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    alert('[close] Соединение прервано');
  }
});
