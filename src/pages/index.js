import './index.css';


import {
    initialCards
} from '../utils/dataCards.js';

import Section from '../components/Section.js';

import {
    Card
} from '../components/Card.js';

import {
    FormValidator
} from '../components/FormValidator.js';

import {
    elementsSelector,
    imgPopupSelector,
    editBtn,
    addBtn,
    profileTitle,
    profileJob,
    profilePopupSelector,
    placePopupSelector,
    profilePopupFormSelector,
    validationConfig
} from '../utils/constants.js';

import {
    PopupWithForm
} from '../components/PopupWithForm.js';

import {
    PopupWithImage
} from '../components/PopupWithImage.js';

import {
    UserInfo
} from '../components/UserInfo.js';

//---------- объявляем переменные

const cardList = new Section({
    items: initialCards.reverse(),
    renderer: (name, link) => {
        const newCard = createCard(name, link);
        cardList.addItem(newCard);
    }
}, elementsSelector);

export const imagePopup = new PopupWithImage(imgPopupSelector);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, submitEditForm);
profilePopup.setEventListeners();

const placePopup = new PopupWithForm(placePopupSelector, submitAddForm);
placePopup.setEventListeners();

const userInfo = new UserInfo(profileTitle, profileJob);

//ДЕЙСТВИЯ
cardList.renderItems(); //отрисовываем первоначальные карточки

//СЛУШАТЕЛИ
//Нажатие кнопки редактирования профиля
editBtn.addEventListener('click', () => {
    profilePopup.setInputValues(Object.values(userInfo.getUserInfo())); //обновляю инпуты в попапе профиля при его открытии
    profilePopup.open();

});

//Нажатие кнопки добавления карточки
addBtn.addEventListener('click', () => {
    placePopup.setInputValues(); //обновляю инпуты в попапе добавления карточек при его открытии
    placePopup.open();
    formPlace.toggleButtonState();
});

//Создаём объекты для валидации форм и валидируем форму
const formProfile = new FormValidator(validationConfig, profilePopupFormSelector);
const formPlace = new FormValidator(validationConfig, '.place-popup__form');

formProfile.enableValidation();
formPlace.enableValidation();

//ФУНКЦИИ
//Создаём карточку
function createCard(name, link) {
    const card = new Card(name, link, '.template-element', handleCardClick);
    return card.cardView();
}

function submitEditForm(data) {
    userInfo.setUserInfo(data);
    profilePopup.close(); 
}

function submitAddForm() {
    const newCard = createCard(placePopup.getInputValues().submitPlace, placePopup.getInputValues().submitLink);
    cardList.addItem(newCard);
    placePopup.close();
}

function handleCardClick(text, img) {
    imagePopup.open(img, text);
}