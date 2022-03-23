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
    imgPopup,
    placePopupButton,
    popupImgLinkSelector,
    popupImgTextSelector,
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

export const imgPopupPicture = imgPopup.querySelector(popupImgLinkSelector);
export const imgPopupText = imgPopup.querySelector(popupImgTextSelector);
export const section = document.querySelector(elementsSelector);

const cardList = new Section({
    items: initialCards,
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
    profilePopup.open();
    profilePopup.setInputValues(Object.values(userInfo.getUserInfo())); //обновляю инпуты в попапе профиля при его открытии

});

//Нажатие кнопки добавления карточки
addBtn.addEventListener('click', () => {
    placePopup.open();
    placePopup.setInputValues(); //обновляю инпуты в попапе добавления карточек при его открытии
    formPlace._disableButton(placePopupButton, validationConfig.inactiveButtonClass);
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

function submitEditForm() {
    userInfo.setUserInfo(profilePopup._getInputValues().submitName,
        profilePopup._getInputValues().submitJob);
    profilePopup.close();
}

function submitAddForm() {
    const newCard = createCard(placePopup._getInputValues().submitPlace, placePopup._getInputValues().submitLink);
    cardList.addItem(newCard);
    placePopup.close();
}

function handleCardClick(evt) {
    const src = evt.target.src;
    const alt = evt.target.alt;
    imagePopup.open(src, alt);
}