import { format } from 'date-fns';
import { closeModal, openModal } from './modal.js';
import { UI_ELEMENTS } from './view.js';

UI_ELEMENTS.MODAL_OVERLAY.addEventListener('click', (e) => {
  const target = e.target;
  const isMatches = target.matches('.modal-overlay') || target.matches('.modal__close');

  if (isMatches) {
    closeModal();
  }
});

function sendMessage() {
  const messageTemplate = UI_ELEMENTS.MY_MESSAGE_TEMPLATE.content.cloneNode(true);
  const messageText = UI_ELEMENTS.MESSAGE_INPUT.value;

  messageTemplate.querySelector('.my-message__text').textContent = `Я: ${messageText}`;
  messageTemplate.querySelector('.my-message__time').textContent = format(new Date(), 'HH:m');

  UI_ELEMENTS.CHAT_BODY.prepend(messageTemplate);
}

UI_ELEMENTS.SEND_MESSAGE_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const isMessageEmpty = !UI_ELEMENTS.MESSAGE_INPUT.value;

  if (isMessageEmpty) return;

  sendMessage();
  UI_ELEMENTS.MESSAGE_INPUT.value = '';
});

UI_ELEMENTS.SETTINGS_BUTTON.addEventListener('click', openModal);
