import { closeModal, openModal } from './modal';
import Cookies from 'js-cookie';
import { API } from './api';
import { UI_ELEMENTS } from './view';

export async function emailAuth(email: string): Promise<void> {
  try {
    const response = await API.sendEmail(email);

    if (response.ok) {
      Cookies.set('email', email);
      closeModal(UI_ELEMENTS.EMAIL_MODAL);
      openModal(UI_ELEMENTS.CONFIRM_MODAL);
    } else {
      throw new Error(`Не корректный email, Ошибка ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    alert(error);
  }
}

export async function nameAuth(name: string): Promise<void> {
  try {
    const response = await API.sendName(name);

    if (response.ok) {
      closeModal(UI_ELEMENTS.NAME_MODAL);
    } else {
      throw new Error(`Ошибка ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    alert(error);
  }
}
