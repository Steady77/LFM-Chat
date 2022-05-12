import Cookies from 'js-cookie';
import { API } from './api';
import { setTime } from './utils';

export const UI_ELEMENTS = {
  SETTINGS_BUTTON: document.querySelector('.chat__settings-button') as HTMLButtonElement,
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
};

export interface IUserData {
  createdAt: string;
  text: string;
  updateAt?: string;
  user: {
    email: string;
    name: string;
  };
  _id?: string;
  __v?: number;
}

let allMessages: IUserData[];

export async function showMessages(): Promise<void> {
  try {
    const { messages }: { messages: Array<IUserData> } = await API.getMessages();
    allMessages = messages;
    const slicedMessages = messages.slice(-20);

    slicedMessages.forEach((item) => {
      UI_ELEMENTS.CHAT_BODY.insertAdjacentElement('afterbegin', renderMessages(item));
    });
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

export function loadMessagesHistory(e: Event) {
  const chatBody = e.target as Element;
  const scrolled: number = chatBody.scrollTop;
  const screenHeight: number = chatBody.clientHeight;
  const height: number = chatBody.scrollHeight;
  const threshold: number = screenHeight - height;
  const position: number = scrolled - screenHeight;

  if (position <= threshold) {
    const spliced: Array<IUserData> = allMessages.splice(-20);
    if (spliced.length === 0) {
      chatBody.insertAdjacentText('beforeend', 'Вся история загружена');
      chatBody.removeEventListener('scroll', loadMessagesHistory);
    } else {
      spliced.forEach((item) => {
        chatBody.insertAdjacentElement('beforeend', renderMessages(item));
      });
    }
  }
}
