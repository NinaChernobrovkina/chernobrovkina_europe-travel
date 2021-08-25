document.querySelector('.header__wrapper--nojs').classList.remove('header__wrapper--nojs');
document.querySelector('.header__nav--nojs').classList.remove('header__nav--nojs');
document.querySelector('.header__toggle').addEventListener('click', () => {
  document.querySelector('.header__nav').classList.toggle('header__nav--opened');
})

function activateTab(num) {
  document.querySelector('.tabs__nav-item--active').classList.remove('tabs__nav-item--active');
  document.querySelectorAll('.tabs__nav-item')[num].classList.add('tabs__nav-item--active');
  document.querySelector('.country--active').classList.remove('country--active');
  document.querySelectorAll('.country')[num].classList.add('country--active');
}

document.querySelectorAll('.tabs__nav-item').forEach((item, index) => {
  item.addEventListener('click', () => activateTab(index));
});

document.querySelectorAll('.places__item').forEach((item, index) => {
  item.addEventListener('click', () => activateTab(index));
});

function isEscEvent(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

function openModal(element, params = {}) {
  element.classList.add('modal--open');

  function closeModal() {
    element.classList.remove('modal--open');
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onModalEscKeydown);
    // eslint-disable-next-line no-use-before-define
    params.closeButton.removeEventListener('click', onModalClickClose);
    // eslint-disable-next-line no-use-before-define
    element.removeEventListener('click', onModalClickOverlay);
    if (params.afterClose) {
      params.afterClose();
    }
  }

  function onModalEscKeydown(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }

  function onModalClickClose() {
    closeModal();
  }

  function onModalClickOverlay(evt) {
    if (evt.target === element) {
      closeModal();
    }
  }

  document.addEventListener('keydown', onModalEscKeydown);
  params.closeButton.addEventListener('click', onModalClickClose);
  element.addEventListener('click', onModalClickOverlay);

  return {
    closeModal: closeModal,
  };
}

const tour = document.querySelector('#tour');
const tourForm = tour.querySelector('.modal__form');
let tourModal;

document.querySelectorAll('.country__button, .tariff__button').forEach((button) => {
  button.addEventListener('click', () => {
    tourModal = openModal(tour, {
      closeButton: tour.querySelector('.modal__close')
    });
    tourForm.phone.focus();
  })
});

function onInput(evt) {
  localStorage.setItem(evt.currentTarget.name, evt.currentTarget.value);
}

tourForm.phone.addEventListener('input', onInput);
tourForm.email.addEventListener('input', onInput);

tourForm.querySelectorAll('input').forEach((input) => {
  const value = localStorage.getItem(input.name);
  if (value) {
    input.value = value;
  }
});

const success = document.querySelector('#success');
tourForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  tourModal.closeModal();
  openModal(success, {
    closeButton: success.querySelector('.modal__close')
  });
})
