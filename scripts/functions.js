import {
  Card
} from './Card.js';

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
  openPopup(profilePopup);
  profilePopupName.value = profileTitle.textContent;
  profilePopupJob.value = profileSubTitle.textContent;
  profilePopupBtn.classList.remove('popup__button_disabled');
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
  placePopupBtn.classList.add('popup__button_disabled');
}

//Отправка формы попапа place
export function submitPlaceHandler(evt) {
  const newcard = new Card(placePopupName.value, placePopupLink.value, '.template-element', '.elements');
  newcard.renderCard();
  closePopup(placePopup);
}
