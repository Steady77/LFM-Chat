import { format } from 'date-fns';

export const UI_ELEMENTS = {
  SETTINGS_BUTTON: document.querySelector('.chat__settings-button'),
  MODALS_OVERLAYS: document.querySelectorAll('.modal-overlay'),
  CHAT_BODY: document.querySelector('.chat__inner'),
  MY_MESSAGE_TEMPLATE: document.querySelector('#my-message'),
  SEND_MESSAGE_FORM: document.querySelector('.message-form'),
  MESSAGE_INPUT: document.querySelector('.message-form__input'),
  AUTH_EMAIL_INPUT: document.querySelector('.auth-form__input'),
  AUTH_FORM: document.querySelector('.auth-form'),
  CONFIRM_FORM: document.querySelector('.confirm-form'),
  CONFIRM_INPUT: document.querySelector('.confirm-form__input'),
  NAME_FORM: document.querySelector('.name-form'),
  NAME_INPUT: document.querySelector('.name-form__input'),
};

export function addMessage() {
  const messageTemplate = UI_ELEMENTS.MY_MESSAGE_TEMPLATE.content.cloneNode(true);
  const messageText = UI_ELEMENTS.MESSAGE_INPUT.value;

  messageTemplate.querySelector('.my-message__text').textContent = `Я: ${messageText}`;
  messageTemplate.querySelector('.my-message__time').textContent = format(new Date(), 'HH:mm');

  UI_ELEMENTS.CHAT_BODY.prepend(messageTemplate);
}

export function clearInput(target) {
  target.value = '';
}

export function isEmpty(inputValue) {
  return !inputValue;
}
