import { API, Email, Name } from './api';
import { closeModal, openModal } from './modal';
import { addMessage, clearInput, isEmpty, UI_ELEMENTS } from './view';
import Cookies from 'js-cookie';

UI_ELEMENTS.MODAL_OVERLAY.addEventListener('click', (e) => {
  const target = e.target;
  const isMatches = target.matches('.modal-overlay') || target.matches('.modal__close');

  if (isMatches) {
    closeModal();
  }
});

UI_ELEMENTS.SEND_MESSAGE_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.MESSAGE_INPUT.value;

  if (isEmpty(inputValue)) return;

  addMessage();
  clearInput(UI_ELEMENTS.MESSAGE_INPUT);
});

UI_ELEMENTS.AUTH_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.AUTH_EMAIL_INPUT.value;

  if (isEmpty(inputValue)) return;

  API.sendEmail(new Email(inputValue));
  clearInput(UI_ELEMENTS.AUTH_EMAIL_INPUT);
});

UI_ELEMENTS.CONFIRM_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.CONFIRM_INPUT.value;

  if (isEmpty(inputValue)) return;

  Cookies.set('auth-key', inputValue);
  clearInput(UI_ELEMENTS.CONFIRM_INPUT);
});

UI_ELEMENTS.NAME_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.NAME_INPUT.value;

  if (isEmpty(inputValue)) return;

  API.sendName(new Name(inputValue));
  clearInput(UI_ELEMENTS.NAME_INPUT);
});

UI_ELEMENTS.SETTINGS_BUTTON.addEventListener('click', openModal);
