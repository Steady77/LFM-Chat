import Cookies from 'js-cookie';
import { isEmailAuth, isTokenAuth } from './utils';
import { renderMessages, UI_ELEMENTS, IUserData } from './view';
import ReconnectingWebSocket from 'reconnecting-websocket';

const URL = 'ws://mighty-cove-31255.herokuapp.com/websockets';
const TOKEN: string = Cookies.get('auth-key');

const socket = new ReconnectingWebSocket(`${URL}?${TOKEN}`);

export function sendMessage(messageText: string) {
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
  if (!isEmailAuth() && !isTokenAuth()) return;

  try {
    const message: IUserData = JSON.parse(e.data);

    UI_ELEMENTS.CHAT_BODY.insertAdjacentElement('afterbegin', renderMessages(message));
  } catch (error) {
    console.log(error);
  }
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
