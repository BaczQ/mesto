const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__error'
};

const elementsSelector = '.elements'; // класс секции, в которую вставляем карточки
const elementImgSelector = '.element__img';
const elementTitleSelector = '.element__title';
const elementLikeSelector = '.element__like';
const activeLikeSelector = 'element__like_active';
const elementTrushSelector = '.element__trash';
const imgPopupSelector = '.image-popup';
const inputErrSelector = '.popup__input_error';

//PROFILE
const profilePopupSelector = '.profile-popup';
const profilePopupFormSelector = '.profile-popup__form';
const editBtn = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); //кнопка добавления карточки
const profilePopupForm = document.querySelector('.profile-popup__container'); //Попап контейнер для редактирования профиля
const profilePopupInputName = '.profile-popup__form-input_value_name';
const profilePopupInputJob = '.profile-popup__form-input_value_job';
const profilePopupJob = profilePopupForm.querySelector('.profile-popup__form-input_value_job');
const profileTitle = '.profile__title';
const profileJob = '.profile__subtitle';
const profileSubTitle = document.querySelector('.profile__subtitle');
const profilePopupName = profilePopupForm.querySelector('.profile-popup__form-input_value_name');

//ВСЕ ПОПАПЫ
const popups = document.querySelectorAll('.popup'); //Все попапы
const popupImgLinkSelector ='.image-popup__picture'; 
const popupImgTextSelector ='.image-popup__text';
const popupInputSelector = '.popup__input';

//PLACE-POPUP
const placePopupSelector = '.place-popup';
const placePopupForm = document.querySelector('.place-popup__container'); //Попап контейнер для добавления карточки
const placePopupName = placePopupForm.querySelector('.place-popup__form-input_value_name');
const placePopupLink = placePopupForm.querySelector('.place-popup__form-input_value_link');
const imgPopup = document.querySelector('.image-popup');
const placePopupButton = placePopupForm.querySelector('.place-popup__button');
const imgPopupText = imgPopup.querySelector('.image-popup__text');
const section = document.querySelector('.elements');

export {
    elementsSelector,
    imgPopupSelector,
    editBtn,
    addBtn,
    profilePopupForm,
    profilePopupInputName,
    profilePopupInputJob,
    profilePopupJob,
    profileTitle,
    profileJob,
    profileSubTitle,
    profilePopupName,
    popups,
    placePopupForm,
    placePopupName,
    placePopupLink,
    imgPopup,
    elementImgSelector,
    elementTitleSelector,
    elementLikeSelector,
    elementTrushSelector,
    activeLikeSelector,
    popupInputSelector,
    popupImgLinkSelector,
    popupImgTextSelector,
    inputErrSelector,
    placePopupButton,
    profilePopupSelector,
    placePopupSelector,
    profilePopupFormSelector,
    validationConfig,
    imgPopupText,
    section
};