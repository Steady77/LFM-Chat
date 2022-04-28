import { UI_ELEMENTS } from './view.js';

export const openModal = (i = 0) => {
  UI_ELEMENTS.MODALS_OVERLAYS[i].classList.add('modal-overlay--open');
};

export const closeModal = (i = 0) => {
  UI_ELEMENTS.MODALS_OVERLAYS[i].classList.remove('modal-overlay--open');
};
