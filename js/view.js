import Cookies from 'js-cookie';
import { allMessages } from './main';
import { setTime } from './utils';

export const UI_ELEMENTS = {
  SETTINGS_BUTTON: document.querySelector('.chat__settings-button'),
  MODALS_OVERLAYS: document.querySelectorAll('.modal-overlay'),
  CHAT_BODY: document.querySelector('.chat__inner'),
  MESSAGE_TEMPLATE: document.querySelector('#message-template'),
  SEND_MESSAGE_FORM: document.querySelector('.message-form'),
  MESSAGE_INPUT: document.querySelector('.message-form__input'),
  EMAIL_INPUT: document.querySelector('.auth-form__input'),
  EMAIL_FORM: document.querySelector('.auth-form'),
  CONFIRM_FORM: document.querySelector('.confirm-form'),
  CONFIRM_INPUT: document.querySelector('.confirm-form__input'),
  NAME_FORM: document.querySelector('.name-form'),
  NAME_INPUT: document.querySelector('.name-form__input'),
  EMAIL_MODAL: document.querySelector('.modal-email'),
  CONFIRM_MODAL: document.querySelector('.modal-cofirm'),
  NAME_MODAL: document.querySelector('.modal-name'),
};

export function renderMessages({ text, user, createdAt }) {
  const messageTemplate = UI_ELEMENTS.MESSAGE_TEMPLATE.content.firstElementChild.cloneNode(true);
  const messageText = messageTemplate.querySelector('.message__text');
  const messageTime = messageTemplate.querySelector('.message__time');
  const isEmailMatch = user.email === Cookies.get('email');

  if (isEmailMatch) {
    messageTemplate.classList.add('my-message');
    messageText.textContent = `Я: ${text}`;
    messageTime.textContent = setTime(createdAt);
  } else {
    messageTemplate.classList.add('partners-message');
    messageText.textContent = `${user.name}: ${text}`;
    messageTime.textContent = setTime(createdAt);
  }

  return messageTemplate;
}

export function clearInput(target) {
  target.value = '';
}

export function loadMessagesHistory(e) {
  const chatBody = e.target;
  const scrolled = chatBody.scrollTop;
  const screenHeight = chatBody.clientHeight;
  const height = chatBody.scrollHeight;
  const threshold = screenHeight - height;
  const position = scrolled - screenHeight;

  if (position <= threshold) {
    const spliced = allMessages.splice(-20);
    if (spliced.length === 0) {
      chatBody.insertAdjacentText('beforeend', 'Вся история загружена');
      chatBody.removeEventListener('scroll', loadMessagesHistory);
    } else {
      spliced.forEach((item) => {
        chatBody.insertAdjacentElement('beforeend', renderMessages(item));
      });
    }
  }
}
