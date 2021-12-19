import {
  FormValidator
} from './FormValidator.js';
import {
  Card
} from './Card.js';
import {
  openPopup,
  closePopup,
  closeByEscape,
  openProfilePopup,
  submitProfileHandler,
  openPlacePopup,
  submitPlaceHandler
} from './functions.js';

// Карточки
const initialCards = [{
    name: 'о. Бора-Бора',
    link: './images/element/__img/bora-bora.jpg'
  },
  {
    name: 'о. Ява',
    link: './images/element/__img/jawa.jpg'
  },
  {
    name: 'о. Закинтос',
    link: './images/element/__img/zakintos.jpg'
  },
  {
    name: 'город Венеция',
    link: './images/element/__img/venice.jpg'
  },
  {
    name: 'о. Фуэртевентура',
    link: './images/element/__img/fuer.jpg'
  },
  {
    name: 'о. Корсика',
    link: './images/element/__img/korsika.jpg'
  }
];

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

//ВЫПОЛНЕНИЕ СЛУШАТЕЛЕЙ




//ВЫВОЖУ КАРТОЧКИ
function renderCards(initialCards) {
  let i = 1;
  initialCards.forEach(item => {
    window["card" + i] = new Card(item.name, item.link, '.template-element', '.elements');
    window["card" + i++].renderCard();
  });
}



const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Выводим карточки
renderCards(initialCards);

//Создаём объекты для валидации форм
const form1 = new FormValidator(validationConfig, '.profile-popup__form');
//Валидируем форму
form1.enableValidation();

//Создаём объекты для валидации форм
const form2 = new FormValidator(validationConfig, '.place-popup__form');
//Валидируем форму
form2.enableValidation();
