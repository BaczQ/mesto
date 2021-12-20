import {
  Card
} from './Card.js';
import {
  FormValidator
} from './FormValidator.js';

const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('.profile-popup');
const profilePopupForm = profilePopup.querySelector('.profile-popup__container');
const profilePopupName = profilePopupForm.querySelector('.profile-popup__form-input_value_name');
const profilePopupJob = profilePopupForm.querySelector('.profile-popup__form-input_value_job');
const profilePopupBtn = document.querySelector('.profile-popup__button');
const placePopupForm = document.querySelector('.place-popup__container');
const placePopup = document.querySelector('.place-popup');
const placePopupName = placePopupForm.querySelector('.place-popup__form-input_value_name');
const placePopupLink = placePopupForm.querySelector('.place-popup__form-input_value_link');
const placePopupBtn = document.querySelector('.place-popup__button');
const imgPopup = document.querySelector('.image-popup');
export const imgPopupPicture = imgPopup.querySelector('.image-popup__picture');
export const imgPopupText = imgPopup.querySelector('.image-popup__text');

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


//Создаём объекты для валидации форм
const formProfile = new FormValidator(validationConfig, '.profile-popup__form');
//Валидируем форму
formProfile.enableValidation();

//Создаём объекты для валидации форм
const formPlace = new FormValidator(validationConfig, '.place-popup__form');
//Валидируем форму
formPlace.enableValidation();




//ВЫПОЛНЕНИЕ СЛУШАТЕЛЕЙ
//Закрывем попап по нажатию клавиши Esc
export function closeByEscape(event) {
  const key = event.key; // const {key} = event; in ES6+
  if (key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//openPopup
export function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  }

//closePopup
export function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//Нажатие кнопки редактирования профиля
export function openProfilePopup() {
  profilePopupName.value = profileTitle.textContent;
  profilePopupJob.value = profileSubTitle.textContent;
  openPopup(profilePopup);
  formProfile.toggleButtonState();
  formProfile.setError();
  }

//Отправка формы попапа profile
export function submitProfileHandler(evt) {
  // Отменяем переход по ссылке
  //evt.preventDefault();
  profileTitle.textContent = profilePopupName.value;
  profileSubTitle.textContent = profilePopupJob.value;
  closePopup(profilePopup);
}

//Нажатие кнопки добавления карточки
export function openPlacePopup() {
  openPopup(placePopup); //открываем попап
  placePopupName.value = '';
  placePopupLink.value = '';
  formPlace.toggleButtonState();
  formPlace.setError();
}

//Отправка формы попапа place
export function submitPlaceHandler(evt) {
  const newcard = new Card(placePopupName.value, placePopupLink.value, '.template-element', '.elements');
  newcard.cardView();
  closePopup(placePopup);
}
