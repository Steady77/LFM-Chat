import { closeModal, openModal } from './modal';
import { clearInput, UI_ELEMENTS, showInitialMessages, loadMessagesHistory } from './view';
import Cookies from 'js-cookie';
import { isEmailAuth, isEmpty, isTokenAuth, throttle } from './utils';
import { sendMessage } from './websocket';
import { emailAuth, nameAuth } from './auth';

if (isEmailAuth() && isTokenAuth()) showInitialMessages();

UI_ELEMENTS.MODALS_OVERLAYS.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const isMatches = target.matches('.modal-overlay') || target.matches('.modal__close');

    if (isMatches) {
      closeModal(UI_ELEMENTS.MODALS_OVERLAYS[i]);
    }
  });
});

UI_ELEMENTS.SEND_MESSAGE_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.MESSAGE_INPUT.value;

  if (isEmpty(inputValue) || !isTokenAuth()) {
    alert('Вы не авторизованы');
  }

  sendMessage(inputValue);
  clearInput(UI_ELEMENTS.MESSAGE_INPUT);
});

UI_ELEMENTS.EMAIL_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.EMAIL_INPUT.value;

  if (isEmpty(inputValue)) return;

  emailAuth(inputValue);
  clearInput(UI_ELEMENTS.EMAIL_INPUT);
});

UI_ELEMENTS.CONFIRM_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.CONFIRM_INPUT.value;

  if (isEmpty(inputValue)) return;

  Cookies.set('auth-key', inputValue);
  clearInput(UI_ELEMENTS.CONFIRM_INPUT);
  closeModal(UI_ELEMENTS.CONFIRM_MODAL);
  openModal(UI_ELEMENTS.NAME_MODAL);
});

UI_ELEMENTS.NAME_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.NAME_INPUT.value;

  if (isEmpty(inputValue)) return;

  nameAuth(inputValue);
  clearInput(UI_ELEMENTS.NAME_INPUT);
});

UI_ELEMENTS.SETTINGS_BUTTON.addEventListener('click', () => {
  if (isTokenAuth() && isEmailAuth()) {
    openModal(UI_ELEMENTS.NAME_MODAL);
  } else if (isEmailAuth()) {
    openModal(UI_ELEMENTS.CONFIRM_MODAL);
  } else {
    openModal(UI_ELEMENTS.EMAIL_MODAL);
  }
});

UI_ELEMENTS.EXIT_BUTTON.addEventListener('click', () => {
  const isLogout = confirm('Вы уверены что хотите выйти? Данные авторизации будут удалены');
  if (isLogout) {
    Cookies.remove('auth-key');
    Cookies.remove('email');
  }
});

const callback = function (entries: any) {
  if (entries[0].isIntersecting) {
    loadMessagesHistory();
  }
};

const observer = new IntersectionObserver(callback);
const elem = document.querySelector('#observable');
observer.observe(elem);
