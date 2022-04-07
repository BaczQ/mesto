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
    profileAvatar,
    profilePopupSelector,
    placePopupSelector,
    profilePopupFormSelector,
    validationConfig,
    confirmPopupSelector

} from '../utils/constants.js';

import {
    initialCards

} from '../utils/dataCards.js';

import {
    PopupWithForm
} from '../components/PopupWithForm.js';

import {
    PopupWithImage
} from '../components/PopupWithImage.js';

import {
    UserInfo
} from '../components/UserInfo.js';

const userInfo = new UserInfo({
    name: profileTitle,
    about: profileJob,
    avatar: profileAvatar
});

//---------- объявляем переменные
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38/',
    headers: {
        authorization: '89b6cbde-cdfa-45bb-a264-c62f025ccdad',
        'Content-Type': 'application/json'
    }
});

const cardList = new Section({
    renderer: (data) => {
        const newCard = createCard(data);
        cardList.addItem(newCard);
    }
}, elementsSelector);

//----------получаем инфо профиля из сервера

api.getUserData().then((res) => {
    console.log('api.getUserData().then((res) => {');
    console.log(res);
    userInfo.setUserInfo(res);
    //заполняем переменные для дальнейшей отправки карточек
    api.id = res._id;
}).catch((err) => {
    console.log(`Ошибка чтения профиля пользователя. ${err}.`);
});

//----------получаем инфо для создания карточек из сервера



api.getInitialCards()
    .then((data) => {
        // получаем каждую карточку отдельно
        console.log("!!!!!!!");
        console.log(data);

        //проверяем принадлежит ли карточка пользователю
        for (let item in data) {
            const isTrash = data[item].owner._id == api.id;
            data[item].isTrash = isTrash;
        }

        cardList.renderItems(data);


    })
    .catch((err) => {
        console.log(`Ошибка чтения карточек с сервера. ${err}.`); // выведем ошибку в консоль
        for (let item in initialCards) {
            const newCard = createCard(initialCards[item]);
            cardList.addItem(newCard);
        }
    });

















export const imagePopup = new PopupWithImage(imgPopupSelector);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, submitEditForm);
profilePopup.setEventListeners();

const placePopup = new PopupWithForm(placePopupSelector, submitAddForm);
placePopup.setEventListeners();

const confirmPopup = new PopupWithForm(confirmPopupSelector, submitConfirmForm);
confirmPopup.setEventListeners();





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
const formConfirm = new FormValidator(validationConfig, '.confirm-popup__form');

formProfile.enableValidation();
formPlace.enableValidation();
formConfirm.enableValidation();

//ФУНКЦИИ
//Создаём карточку


function createCard(data, selectors, functions, ...args) {

    console.log('##################################################################');

    const cardSelector = '.template-element';

    const card = new Card(data, userInfo._id, {
        cardSelector
    }, {
        handleCardClick,
        setLike: (data) => {
            console.log(data);
            api.setLike(data)
                .then((data) => {
                    card.setLikeCounter(data.likes);

                })
                .catch((err) => {
                    console.log(err);
                });
        },
        deleteLike: (data) => {
            api.deleteLike(data)
                .then((data) => {
                    card.setLikeCounter(data.likes);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });
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
}

function submitAddForm() {

    api.sendNewCard({ //отправляем данные карточки на сервер
            name: placePopup.getInputValues().submitPlace,
            link: placePopup.getInputValues().submitLink
        })
        .then((res) => {
            const data = {
                likes: [],
                _id: res._id,
                name: placePopup.getInputValues().submitPlace,
                link: placePopup.getInputValues().submitLink,
                isTrash: true,
                owner: {
                    id: res.owner._id
                }
            };
            const cardSelector = '.template-element';
            const newCard = createCard(data, {
                cardSelector
            }, true);
            cardList.addItem(newCard);
        }); 












    placePopup.close();

}

function submitConfirmForm() {
    confirmPopup.close();
}

function handleCardClick(text, img) {
    imagePopup.open(img, text);
}