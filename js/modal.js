import { UI_ELEMENTS } from './view.js';

export const openModal = () => {
  UI_ELEMENTS.MODAL_OVERLAY.classList.add('modal-overlay--open');
};

export const closeModal = () => {
  UI_ELEMENTS.MODAL_OVERLAY.classList.remove('modal-overlay--open');
};
