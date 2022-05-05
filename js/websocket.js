import Cookies from 'js-cookie';
import { isAuth } from './utils';
import { renderMessages, UI_ELEMENTS } from './view';
import ReconnectingWebSocket from 'reconnecting-websocket';

const URL = 'ws://mighty-cove-31255.herokuapp.com/websockets';
const TOKEN = Cookies.get('auth-key');

const socket = new ReconnectingWebSocket(`${URL}?${TOKEN}`);

export function sendMessage(messageText) {
  if (!socket.readyState) {
    return;
  } else {
    socket.send(
      JSON.stringify({
        text: messageText,
      })
    );
  }
}

socket.addEventListener('open', () => {
  console.log('[open] Соединение установлено');
});

socket.addEventListener('message', (e) => {
  if (!isAuth()) return;
  let message;

  try {
    message = JSON.parse(e.data);
  } catch (error) {
    console.error(error);
  }

  UI_ELEMENTS.CHAT_BODY.insertAdjacentElement('afterbegin', renderMessages(message));
});

socket.addEventListener('error', (error) => {
  console.log(`[error] ${error.message}`);
});

socket.addEventListener('close', (e) => {
  if (e.wasClean) {
    console.log(`[close] Соединение закрыто чисто, код: ${e.code} причина: ${e.reason}`);
  } else {
    console.log('[close] Соединение прервано');
  }
  console.log(`Код: ${e.code} Причина: ${e.reason}`);
});
