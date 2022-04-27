import { Email, sendEmail } from './auth.js';
import { closeModal, openModal } from './modal.js';
import { addMessage, clearEmailInput, clearMessageInput, isEmpty, UI_ELEMENTS } from './view.js';

UI_ELEMENTS.MODAL_OVERLAY.addEventListener('click', (e) => {
  const target = e.target;
  const isMatches = target.matches('.modal-overlay') || target.matches('.modal__close');

  if (isMatches) {
    closeModal();
  }
});

UI_ELEMENTS.SEND_MESSAGE_FORM.addEventListener('submit', (e) => {
  e.preventDefault();

  if (isEmpty(UI_ELEMENTS.MESSAGE_INPUT)) return;

  addMessage();
  clearMessageInput();
});

UI_ELEMENTS.AUTH_FORM.addEventListener('submit', (e) => {
  e.preventDefault();

  if (isEmpty(UI_ELEMENTS.AUTH_EMAIL_INPUT)) return;

  sendEmail(new Email(UI_ELEMENTS.AUTH_EMAIL_INPUT.value));
  clearEmailInput();
});

UI_ELEMENTS.SETTINGS_BUTTON.addEventListener('click', openModal);
