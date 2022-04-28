import { API, Email, Name } from './api';
import { closeModal, openModal } from './modal';
import { addMessage, clearInput, isEmpty, UI_ELEMENTS } from './view';
import Cookies from 'js-cookie';

UI_ELEMENTS.MODALS_OVERLAYS.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    const target = e.target;
    const isMatches = target.matches('.modal-overlay') || target.matches('.modal__close');

    if (isMatches) {
      closeModal(i);
    }
  });
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

  API.sendEmail(inputValue);
  clearInput(UI_ELEMENTS.AUTH_EMAIL_INPUT);
  closeModal();
  openModal(1);
});

UI_ELEMENTS.CONFIRM_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.CONFIRM_INPUT.value;

  if (isEmpty(inputValue)) return;

  Cookies.set('auth-key', inputValue);
  clearInput(UI_ELEMENTS.CONFIRM_INPUT);
  closeModal(1);
  openModal(2);
});

UI_ELEMENTS.NAME_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.NAME_INPUT.value;

  if (isEmpty(inputValue)) return;

  API.sendName(inputValue);
  clearInput(UI_ELEMENTS.NAME_INPUT);
  closeModal(2);
});

UI_ELEMENTS.SETTINGS_BUTTON.addEventListener('click', () => {
  openModal();
});
