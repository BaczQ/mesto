import {
  closePopup,
  openProfilePopup,
  submitProfileHandler,
  openPlacePopup,
  submitPlaceHandler,
  createCard,
  section
} from './functions.js';
import {
  initialCards
} from './dataCards.js';

//PROFILE
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

//ВСЕ ПОПАПЫ
const popups = document.querySelectorAll('.popup');

//PROFILE-POPUP
const profilePopup = document.querySelector('.profile-popup');
const profilePopupForm = profilePopup.querySelector('.profile-popup__container');

//PLACE-POPUP
const placePopupForm = document.querySelector('.place-popup__container');

//СЛУШАТЕЛИ
//Нажатие кнопки редактирования профиля
editBtn.addEventListener('click', openProfilePopup);

//отправка попапа Profile
profilePopupForm.addEventListener('submit', submitProfileHandler);

//Нажатие кнопки добавления карточки
addBtn.addEventListener('click', openPlacePopup);

//Отправка формы попапа
placePopupForm.addEventListener('submit', submitPlaceHandler);

//слушатели для нажатия крестиков и для клика на попапе
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

//ВЫВОЖУ КАРТОЧКИ
function renderCards(initialCards) {
  initialCards.forEach(item => {
    const card = createCard(item.name, item.link);
    section.prepend(card); //добавляем в DOM
  });
}

//Выводим карточки
renderCards(initialCards);