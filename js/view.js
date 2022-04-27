import { format } from 'date-fns';

export const UI_ELEMENTS = {
  SETTINGS_BUTTON: document.querySelector('.chat__settings-button'),
  MODAL_OVERLAY: document.querySelector('.modal-overlay'),
  CHAT_BODY: document.querySelector('.chat__inner'),
  MY_MESSAGE_TEMPLATE: document.querySelector('#my-message'),
  SEND_MESSAGE_FORM: document.querySelector('.chat-form'),
  MESSAGE_INPUT: document.querySelector('.chat-form__input'),
  AUTH_EMAIL_INPUT: document.querySelector('.auth-form__input'),
  AUTH_FORM: document.querySelector('.auth-form'),
};

export function addMessage() {
  const messageTemplate = UI_ELEMENTS.MY_MESSAGE_TEMPLATE.content.cloneNode(true);
  const messageText = UI_ELEMENTS.MESSAGE_INPUT.value;

  messageTemplate.querySelector('.my-message__text').textContent = `Я: ${messageText}`;
  messageTemplate.querySelector('.my-message__time').textContent = format(new Date(), 'HH:mm');

  UI_ELEMENTS.CHAT_BODY.prepend(messageTemplate);
}

export function clearMessageInput() {
  UI_ELEMENTS.MESSAGE_INPUT.value = '';
}

export function clearEmailInput() {
  UI_ELEMENTS.AUTH_EMAIL_INPUT.value = '';
}

export function isEmpty(inputElem) {
  return !inputElem.value;
}
