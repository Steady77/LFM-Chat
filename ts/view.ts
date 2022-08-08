import { IUserData } from './websocket';
import Cookies from 'js-cookie';
import { API } from './api';
import { hidePreloader, setTime, showPreloader } from './utils';

export const UI_ELEMENTS = {
  SETTINGS_BUTTON: document.querySelector('.chat__settings-button') as HTMLButtonElement,
  EXIT_BUTTON: document.querySelector('.chat__exit-button') as HTMLButtonElement,
  MODALS_OVERLAYS: document.querySelectorAll('.modal-overlay') as NodeListOf<HTMLDivElement>,
  CHAT_BODY: document.querySelector('.chat__inner') as HTMLDivElement,
  MESSAGE_TEMPLATE: document.querySelector('#message-template') as HTMLTemplateElement,
  SEND_MESSAGE_FORM: document.querySelector('.message-form') as HTMLFormElement,
  MESSAGE_INPUT: document.querySelector('.message-form__input') as HTMLInputElement,
  EMAIL_INPUT: document.querySelector('.auth-form__input') as HTMLInputElement,
  EMAIL_FORM: document.querySelector('.auth-form') as HTMLFormElement,
  CONFIRM_FORM: document.querySelector('.confirm-form') as HTMLFormElement,
  CONFIRM_INPUT: document.querySelector('.confirm-form__input') as HTMLInputElement,
  NAME_FORM: document.querySelector('.name-form') as HTMLFormElement,
  NAME_INPUT: document.querySelector('.name-form__input') as HTMLInputElement,
  EMAIL_MODAL: document.querySelector('.modal-email') as HTMLDivElement,
  CONFIRM_MODAL: document.querySelector('.modal-cofirm') as HTMLDivElement,
  NAME_MODAL: document.querySelector('.modal-name') as HTMLDivElement,
  PRELOADER: document.querySelector('.scaling-circle') as HTMLDivElement,
  OBSERVABLE: document.querySelector('#observable'),
};

let allMessages: IUserData[] = [];

export async function showInitialMessages(): Promise<void> {
  showPreloader(UI_ELEMENTS.PRELOADER);
  try {
    const { messages }: { messages: Array<IUserData> } = await API.getMessages();
    allMessages = messages;
    const slicedMessages = messages.slice(-20);

    slicedMessages.forEach((item) => {
      UI_ELEMENTS.CHAT_BODY.insertAdjacentElement('afterbegin', renderMessages(item));
    });
    hidePreloader(UI_ELEMENTS.PRELOADER);
  } catch (error) {
    alert(error);
  }
}

export function renderMessages({ text, user, createdAt }: IUserData): HTMLDivElement {
  const messageTemplate = UI_ELEMENTS.MESSAGE_TEMPLATE.content.firstElementChild.cloneNode(
    true
  ) as HTMLDivElement;
  const messageText = messageTemplate.querySelector('.message__text') as HTMLParagraphElement;
  const messageTime = messageTemplate.querySelector('.message__time') as HTMLParagraphElement;
  const isEmailMatch = user.email === Cookies.get('email');

  if (isEmailMatch) {
    messageTemplate.classList.add('my-message');
    messageText.textContent = `Я: ${text}`;
    messageTime.textContent = setTime(createdAt);
  } else {
    messageTemplate.classList.add('partners-message');
    messageText.textContent = `${user.name}: ${text}`;
    messageTime.textContent = setTime(createdAt);
  }

  return messageTemplate;
}

export function clearInput(target: HTMLInputElement) {
  target.value = '';
}

export function loadMessagesHistory() {
  const spliced: Array<IUserData> = allMessages.splice(-20);
  spliced.forEach((item) => {
    UI_ELEMENTS.MESSAGE_TEMPLATE.insertAdjacentElement('beforebegin', renderMessages(item));
  });
}
