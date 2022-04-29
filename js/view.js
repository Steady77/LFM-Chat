import { format, parseISO } from 'date-fns';

export const UI_ELEMENTS = {
  SETTINGS_BUTTON: document.querySelector('.chat__settings-button'),
  MODALS_OVERLAYS: document.querySelectorAll('.modal-overlay'),
  CHAT_BODY: document.querySelector('.chat__inner'),
  MY_MESSAGE_TEMPLATE: document.querySelector('#my-message'),
  PARTNERS_MESSAGE_TEMPLATE: document.querySelector('#partners-message'),
  SEND_MESSAGE_FORM: document.querySelector('.message-form'),
  MESSAGE_INPUT: document.querySelector('.message-form__input'),
  AUTH_EMAIL_INPUT: document.querySelector('.auth-form__input'),
  AUTH_FORM: document.querySelector('.auth-form'),
  CONFIRM_FORM: document.querySelector('.confirm-form'),
  CONFIRM_INPUT: document.querySelector('.confirm-form__input'),
  NAME_FORM: document.querySelector('.name-form'),
  NAME_INPUT: document.querySelector('.name-form__input'),
};

export function renderMyMessage(messageText) {
  const messageTemplate = UI_ELEMENTS.MY_MESSAGE_TEMPLATE.content.cloneNode(true);

  messageTemplate.querySelector('.my-message__text').textContent = `Я: ${messageText}`;
  messageTemplate.querySelector('.my-message__time').textContent = format(new Date(), 'HH:mm');

  UI_ELEMENTS.CHAT_BODY.prepend(messageTemplate);
}

export function renderPartnersMessages({ text, user, createdAt }) {
  const messageTemplate = UI_ELEMENTS.PARTNERS_MESSAGE_TEMPLATE.content.cloneNode(true);

  messageTemplate.querySelector('.partners-message__text').textContent = `${user.name}: ${text}`;
  messageTemplate.querySelector('.partners-message__time').textContent = format(
    parseISO(createdAt),
    'HH:mm'
  );

  UI_ELEMENTS.CHAT_BODY.prepend(messageTemplate);
}

export function clearInput(target) {
  target.value = '';
}

export function isEmpty(inputValue) {
  return !inputValue;
}
