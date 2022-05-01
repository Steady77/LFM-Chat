import { API } from './api';
import { closeModal, openModal } from './modal';
import { renderMyMessage, renderPartnersMessages, clearInput, UI_ELEMENTS } from './view';
import Cookies from 'js-cookie';
import { isAuth, isEmpty } from './utils';

async function showMessages() {
  try {
    const { messages } = await API.getMessages();
    const slicedMessages = messages.slice(0, 2);

    slicedMessages.forEach((item) => {
      renderPartnersMessages(item);
    });
  } catch (error) {
    alert(error);
  }
}

if (isAuth()) showMessages();

UI_ELEMENTS.MODALS_OVERLAYS.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    const target = e.target;
    const isMatches = target.matches('.modal-overlay') || target.matches('.modal__close');

    if (isMatches) {
      closeModal(UI_ELEMENTS.MODALS_OVERLAYS[i]);
    }
  });
});

UI_ELEMENTS.SEND_MESSAGE_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.MESSAGE_INPUT.value;

  if (isEmpty(inputValue) || !isAuth()) return;

  renderMyMessage(inputValue);
  clearInput(UI_ELEMENTS.MESSAGE_INPUT);
});

UI_ELEMENTS.AUTH_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = UI_ELEMENTS.AUTH_EMAIL_INPUT.value;

  if (isEmpty(inputValue)) return;

  API.sendEmail(inputValue)
    .then((response) => {
      if (response.ok) {
        closeModal(UI_ELEMENTS.EMAIL_MODAL);
        openModal(UI_ELEMENTS.CONFIRM_MODAL);
      } else {
        throw new Error(`Не корректный email, Ошибка ${response.status} ${response.statusText}`);
      }
    })
    .catch(alert);

  clearInput(UI_ELEMENTS.AUTH_EMAIL_INPUT);
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

  API.sendName(inputValue)
    .then((response) => {
      if (response.ok) {
        closeModal(UI_ELEMENTS.NAME_MODAL);
      } else {
        throw new Error(`Ошибка ${response.status} ${response.statusText}`);
      }
    })
    .catch(alert);

  clearInput(UI_ELEMENTS.NAME_INPUT);
});

UI_ELEMENTS.SETTINGS_BUTTON.addEventListener('click', () => {
  if (isAuth()) {
    openModal(UI_ELEMENTS.NAME_MODAL);
  } else {
    openModal(UI_ELEMENTS.EMAIL_MODAL);
  }
});
