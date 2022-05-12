export const openModal = (modalElement: HTMLElement) => {
  modalElement.classList.add('modal-overlay--open');
};

export const closeModal = (modalElement: HTMLElement) => {
  modalElement.classList.remove('modal-overlay--open');
};
