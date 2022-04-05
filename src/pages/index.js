import './index.css';
import {
    Api
} from '../components/Api.js';

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
    validationConfig,
    confirmPopupSelector
    
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

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38/',
    headers: {
        authorization: '89b6cbde-cdfa-45bb-a264-c62f025ccdad',
        'Content-Type': 'application/json'
    }
});


//----------выводим инфо профиля из api
api.getUserData().then((res) => {
    console.log('api.getUserData()');
    console.log(res);
    userInfo.setUserInfo(res);
    //заполняем переменные для дальнейшей отправки карточек
    api.id = res._id;
    api.cohort = res.cohort;
    api.name = res.name;
    api.about = res.about;
    api.avatar = res.avatar;
    console.log('api._id = ' + api.id);
    console.log('api.cohort = ' + api.cohort);
    console.log('api.name = ' + api.name);
    console.log('api.about = ' + api.about);
});




//----------выводим карточки из api

api.getInitialCards()
    .then((data) => {
        // получаем каждую карточку отдельно
        for (let item in data) {
            
            //проверяем принадлежит ли карточка пользователю
            const isTrash = data[item].owner._id == api.id;
            
            const newCard = createCard(data[item].name, data[item].link, data[item].likes, isTrash);
            cardList.addItem(newCard);

        }
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });



    
    



const cardList = new Section({
    renderer: (name, link, likes) => {
        const newCard = createCard(name, link, likes);
        cardList.addItem(newCard);
    }
}, elementsSelector);

export const imagePopup = new PopupWithImage(imgPopupSelector);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, submitEditForm);
profilePopup.setEventListeners();

const placePopup = new PopupWithForm(placePopupSelector, submitAddForm);
placePopup.setEventListeners();

const confirmPopup = new PopupWithForm(confirmPopupSelector, submitConfirmForm);
confirmPopup.setEventListeners();



const userInfo = new UserInfo({
    name: profileTitle,
    about: profileJob,
    avatar: '.profile__avatar'
});

//СЛУШАТЕЛИ
//Нажатие кнопки редактирования профиля
editBtn.addEventListener('click', () => {
    //console.log('Работает userInfo.getUserInfo() в index.js');
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
const formConfirm = new FormValidator(validationConfig, '.confirm-popup__form');

formProfile.enableValidation();
formPlace.enableValidation();
formConfirm.enableValidation();

//ФУНКЦИИ
//Создаём карточку
function createCard(name, link, likes, isTrash) {
    //console.log('!!!!!!!!!!!!!!!!');
    //console.log(likes);
    const card = new Card(name, link, likes, '.template-element', handleCardClick, isTrash);
    return card.cardView();
}

//Меняем данные юзера после нажатия кнопки на попапе
function submitEditForm(data) {
    profilePopup.close();

    userInfo.setUserInfo(data);
    api.setUserInfo({
        name: data.name,
        about: data.about
    });

    api.name = data.name;
    api.about = data.about;
    api.avatar = data.avatar;

    console.log('Работает function submitEditForm(data) в index.js');
    console.log(data);
    
}

function submitAddForm() {
    console.log('Работает function submitAddForm() в index.js');
    const newCard = createCard(placePopup.getInputValues().submitPlace, placePopup.getInputValues().submitLink, [], true);
    cardList.addItem(newCard);
    api.sendNewCard({
        name: placePopup.getInputValues().submitPlace,
        link: placePopup.getInputValues().submitLink
    }); //отправляем данные карточки на сервер
    placePopup.close();
}


function submitConfirmForm() {

    console.log('Работает function submitConfirmForm() в index.js');
    
    
    confirmPopup.close();
}




function handleCardClick(text, img) {
    //console.log('Работает function handleCardClick(text, img) в index.js');
    imagePopup.open(img, text);
}