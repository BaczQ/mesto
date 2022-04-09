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
    avatarBtn,
    addBtn,
    avatarPopupBtn,
    profileTitle,
    profileJob,
    profileAvatar,
    profilePopupSelector,
    placePopupButton,
    placePopupSelector,
    profilePopupFormSelector,
    validationConfig,
    confirmPopupSelector,
    avatarPopupSelector,
    profileSaveBtn,
    confirmPopupBtn

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
    PopupConfirm
} from '../components/PopupConfirm.js';

import {
    UserInfo
} from '../components/UserInfo.js';

window.alert = function () {}; //чтобы алерты браузера не мешали

//---------- объявляем переменные
const userInfo = new UserInfo({
    name: profileTitle,
    about: profileJob,
    avatar: profileAvatar
});


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38/',
    headers: {
        authorization: '89b6cbde-cdfa-45bb-a264-c62f025ccdad',
        'Content-Type': 'application/json'
    }
});


let currentCard = null;
let id = null;

const cardList = new Section({
    renderer: (data) => {
        const newCard = createCard(data);
        cardList.addItem(newCard);
    }
}, elementsSelector);


Promise.all([ //в Promise.all передаем массив промисов которые нужно выполнить
    api.getUserData(),
    api.getInitialCards()
]).then((values) => {
    userInfo.setUserInfo(values[0]);
    id = values[0]._id;
    // получаем каждую карточку отдельно
    //проверяем принадлежит ли карточка пользователю
    for (let item in values[1]) {
        const isTrash = values[1][item].owner._id == id;
        values[1][item].isTrash = isTrash;
    }
    cardList.renderItems(values[1]);
}).catch((err) => {
    console.log(`Ошибка в работе с Api. ${err}.`);
});

const imagePopup = new PopupWithImage(imgPopupSelector);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, submitEditForm);
profilePopup.setEventListeners();

const placePopup = new PopupWithForm(placePopupSelector, submitAddForm);
placePopup.setEventListeners();

const avatarPopup = new PopupWithForm(avatarPopupSelector, submitAvatarForm);
avatarPopup.setEventListeners();

//СЛУШАТЕЛИ
//Нажатие кнопки редактирования профиля
editBtn.addEventListener('click', () => {
    profilePopup.setInputValues(Object.values(userInfo.getUserInfo())); //обновляю инпуты в попапе профиля при его открытии
    formProfile.clearError();
    profilePopup.open();
    formProfile.toggleButtonState();
});

//Нажатие кнопки добавления аватара
avatarBtn.addEventListener('click', () => {
    formAvatar.clearError();
    avatarPopup.open();
    formAvatar.toggleButtonState();
});

function submitAvatarForm() {
    avatarPopupBtn.textContent = 'Сохранение...';
    const avatarLink = avatarPopup.getInputValues().avatar;

    api.setUserAvatar({
            avatar: avatarLink
        })
        .then(() => {
            userInfo.setAvatar(avatarLink);
        }).catch((err) => {
            console.log(`Ошибка при сохранении аватара на сервере.  ${err}.`);
}).finally(()=> {
    avatarPopupBtn.textContent = 'Сохранить';
    avatarPopup.close();
    formAvatar.toggleButtonState();
});
}

//Нажатие кнопки добавления карточки
addBtn.addEventListener('click', () => {
    placePopup.setInputValues(); //обновляю инпуты в попапе добавления карточек при его открытии

    formPlace.clearError();
    placePopup.open();
    formPlace.toggleButtonState();
});

//Создаём объекты для валидации форм и валидируем форму
const formProfile = new FormValidator(validationConfig, profilePopupFormSelector);
const formPlace = new FormValidator(validationConfig, '.place-popup__form');
const formAvatar = new FormValidator( validationConfig, '.avatar-popup__form');

formProfile.enableValidation();
formPlace.enableValidation();
formAvatar.enableValidation();

//ФУНКЦИИ
//Создаём карточку
function createCard(data) {
    const cardSelector = '.template-element';

    const newcard = new Card(data, userInfo._id, {
        cardSelector
    }, {
        handleCardClick, //клик по картинке на карте
        setLike, //клик по лайку
        deleteLike, //клик по лайку
        handleTrashClick // клик по корзине
    });
    return newcard.cardView();
}

const confirmPopup = new PopupConfirm(confirmPopupSelector, {
    popupSubmit: (data) => {
        confirmPopupBtn.textContent = 'Удаление...';
        api.deleteCard(data)
            .then(() => {
                
                currentCard.deleteCard();
                
            })
            .then(() => {
                confirmPopup.close();
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                confirmPopupBtn.textContent = 'Да';
            });
    }
});
confirmPopup.setEventListeners(); //вешаем слушатели при открытии

//Меняем данные юзера после нажатия кнопки на попапе
function submitEditForm(data) {
    userInfo.setUserInfo(data);
    profileSaveBtn.textContent = 'Сохранение...';
    api.setUserInfo({
        name: data.name,
        about: data.about
    }).then(() => {
        
    }).catch((err) => {
        console.log(`Ошибка при сохранении профиля на сервере.  ${err}.`);
    }).finally(() => {
        profileSaveBtn.textContent = 'Сохранить';
        profilePopup.close();
    });
}

//нажатие кнопки отправления карточки
function submitAddForm() {
    placePopupButton.textContent = 'Сохранение...';
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
        }).catch((err) => {
            console.log(`Ошибка при сохранении карточки на сервере.  ${err}.`);
        })
        .finally(() => {
            placePopup.close();
            placePopupButton.textContent = 'Создать';
        });
}

//Функции для работы const newcard
function handleCardClick(text, img) {
    imagePopup.open(img, text);
    
}

function setLike(data) {
    api.setLike(data)
        .then((data) => {
            this.setLikeCounter(data.likes);
        });
}

function deleteLike(data) {
    api.deleteLike(data)
        .then((data) => {
            this.setLikeCounter(data.likes);
        }).catch((err) => {
            console.log(`Ошибка удаления карточки. ${err}.`);
        });
}

function handleTrashClick(data, thisCard) {
    currentCard = thisCard;
    confirmPopup.open(data);
}
