import { format, parseISO } from 'date-fns';
import Cookies from 'js-cookie';
import { allMessages } from './main';

export const UI_ELEMENTS = {
  SETTINGS_BUTTON: document.querySelector('.chat__settings-button'),
  MODALS_OVERLAYS: document.querySelectorAll('.modal-overlay'),
  CHAT_BODY: document.querySelector('.chat__inner'),
  MY_MESSAGE_TEMPLATE: document.querySelector('#my-message'),
  PARTNERS_MESSAGE_TEMPLATE: document.querySelector('#partners-message'),
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

export function renderMyMessage(messageText, position) {
  const messageTemplate = UI_ELEMENTS.MY_MESSAGE_TEMPLATE.content.cloneNode(true);

  messageTemplate.querySelector('.my-message__text').textContent = `Я: ${messageText}`;
  messageTemplate.querySelector('.my-message__time').textContent = format(new Date(), 'HH:mm');

  position === 'append'
    ? UI_ELEMENTS.CHAT_BODY.append(messageTemplate)
    : UI_ELEMENTS.CHAT_BODY.prepend(messageTemplate);
}

export function renderPartnerMessage({ text, user, createdAt }, position) {
  const messageTemplate = UI_ELEMENTS.PARTNERS_MESSAGE_TEMPLATE.content.cloneNode(true);

  messageTemplate.querySelector('.partners-message__text').textContent = `${user.name}: ${text}`;
  messageTemplate.querySelector('.partners-message__time').textContent = format(
    parseISO(createdAt),
    'HH:mm'
  );

  position === 'append'
    ? UI_ELEMENTS.CHAT_BODY.append(messageTemplate)
    : UI_ELEMENTS.CHAT_BODY.prepend(messageTemplate);
}

export function renderMessages(data, position) {
  if (data.user.email === Cookies.get('email')) {
    renderMyMessage(data.text, position);
  } else {
    renderPartnerMessage(data, position);
  }
}

export function clearInput(target) {
  target.value = '';
}

export function loadMessagesHistory(e) {
  const body = e.target;
  const scrolled = body.scrollTop;
  const screenHeight = body.clientHeight;
  const height = body.scrollHeight;
  const threshold = screenHeight - height;
  const position = scrolled - screenHeight;

  if (position <= threshold) {
    const spliced = allMessages.splice(-20);
    if (spliced.length === 0) {
      body.insertAdjacentText('beforeend', 'Вся история загружена');
      body.removeEventListener('scroll', loadMessagesHistory);
    } else {
      spliced.forEach((item) => {
        renderMessages(item, 'append');
      });
    }
  }
}
