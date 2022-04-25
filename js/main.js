import { UI_ELEMENTS } from './view.js';

const modalOpen = () => {
  UI_ELEMENTS.MODAL_OVERLAY.classList.add('modal-overlay--open');
};

const modalClose = () => {
  UI_ELEMENTS.MODAL_OVERLAY.classList.remove('modal-overlay--open');
};

UI_ELEMENTS.MODAL_OVERLAY.addEventListener('click', (e) => {
  const target = e.target;
  const isMatches = target.matches('.modal-overlay') || target.matches('.modal__close');

  if (isMatches) {
    modalClose();
  }
});

UI_ELEMENTS.SETTINGS_BUTTON.addEventListener('click', modalOpen);
