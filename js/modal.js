export const openModal = (modalElement) => {
  modalElement.classList.add('modal-overlay--open');
};

export const closeModal = (modalElement) => {
  modalElement.classList.remove('modal-overlay--open');
};
