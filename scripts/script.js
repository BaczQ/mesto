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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//enableValidation(validationData); 



//profile__title
const profileTitle = document.querySelector('.profile__title');

//profile__subtitle
const profileSubTitle = document.querySelector('.profile__subtitle');

//POPUP
const popup = document.querySelector('.popup');

//PLACE-POPUP
const placePopup = document.querySelector('.place-popup');

const placePopupTitle = placePopup.querySelector('.place-popup__title');

//place-popup__container
const placePopupForm = document.querySelector('.place-popup__container');

//place-popup__form-input_value_name
const placePopupName = placePopupForm.querySelector('.place-popup__form-input_value_name');

//popup__form-input_value_link
const placePopupLink = placePopupForm.querySelector('.place-popup__form-input_value_link');

//PROFILE-POPUP
const profilePopup = document.querySelector('.profile-popup');

const profilePopupTitle = profilePopup.querySelector('.profile-popup__title');

//popup__container
const profilePopupForm = profilePopup.querySelector('.profile-popup__container');

//popup__form-input_value_name
const profilePopupName = profilePopupForm.querySelector('.profile-popup__form-input_value_name');

//popup__form-input_value_job
const profilePopupJob = profilePopupForm.querySelector('.profile-popup__form-input_value_job');

//IMG POPUP
const imgPopup = document.querySelector('.image-popup');

//BUTTONS
//profile__edit-button
const editBtn = document.querySelector('.profile__edit-button');

//profile__add-button
const addBtn = document.querySelector('.profile__add-button');

//popup__close
const popupClose = document.querySelectorAll('.popup__close');


//SECTIONS
//elements
const sectionElements = document.querySelector('.elements');




// 
//Формы
const formProfile = document.querySelector('.profile-popup__form');
const formPlace = document.querySelector('.place-popup__form');

//Инпуты
const inputsProfile = Array.from(formProfile.querySelectorAll('.profile-popup__form-input'));
const inputsPlace = Array.from(formPlace.querySelectorAll('.place-popup__form-input'));

//Кнопки
const buttonProfile = formProfile.querySelector('.profile-popup__button');
const buttonPlace = formPlace.querySelector('.place-popup__button');



// Создание карточки для .element
function addElement(item = {
  name: 'Имя не задано',
  link: 'https://cdn.pixabay.com/photo/2017/05/07/19/32/strawberry-2293337_960_720.jpg'
}) {

  const templateElement = document.querySelector('.template-element').content;

  // клонируем содержимое тега template
  let itemElement = templateElement.querySelector('.element').cloneNode(true);

  const elementTitle = itemElement.querySelector('.element__title');
  const elementImg = itemElement.querySelector('.element__img');

  elementImg.src = item.link;
  elementImg.alt = 'На фото: ' + item.name;
  elementTitle.textContent = item.name;

  //ставлю слушатель на кнопку "лайк"
  setLikeBtnListener(itemElement);

  //ставлю слушатель на кнопку "корзина"
  setTrashBtnListener(itemElement);

  //ставлю слушатель на клик по картинке
  setImgClickListener(itemElement, elementTitle, elementImg);

  return itemElement;
}

//Добавляю 6 карточек
initialCards.forEach(item => sectionElements.append(addElement(item)));

//openPopup
function openPopup(item) {
  item.classList.add('popup_opened');
}

//closePopup
function closePopup(item) {
  item.classList.remove('popup_opened');
}

//Нажатие кнопки редактирования профиля
function openProfilePopup() {
  openPopup(profilePopup);
  profilePopupName.value = profileTitle.textContent;
  profilePopupJob.value = profileSubTitle.textContent;
}

//Нажатие кнопки добавления карточки
function openPlacePopup() {
  openPopup(placePopup);
  placePopupName.value = '';
  placePopupLink.value = '';
  placePopupName.placeholder = 'Название';
  placePopupLink.placeholder = 'Ссылка на картинку';
  toggleButtonState(formPlace, buttonPlace);
}

//Отправка формы попапа place
function submitPlaceHandler(evt) {
 
  const itemElement = {
    name: placePopupName.value,
    link: placePopupLink.value
  };
  sectionElements.prepend(addElement(itemElement));
  closePopup(placePopup);
  
}

//Отправка формы попапа profile
function submitProfileHandler(evt) {
  // Отменяем переход по ссылке
  //evt.preventDefault();
  profileTitle.textContent = profilePopupName.value;
  profileSubTitle.textContent = profilePopupJob.value;
  closePopup(profilePopup);
}

//СЛУШАТЕЛИ
//Отправка формы попапа

placePopupForm.addEventListener('submit', submitPlaceHandler);

profilePopupForm.addEventListener('submit', submitProfileHandler);

//Нажатие кнопки редактирования профиля
editBtn.addEventListener('click', openProfilePopup);

//Нажатие кнопки добавления карточки
addBtn.addEventListener('click', openPlacePopup);

//слушатели для крестиков
popupClose.forEach(item => {
  //вешаю слушатель на каждый item
  item.addEventListener('click', () => {
    closePopup(item.parentElement.parentElement);
  });

  //Закрываем по клику на попапе
  item.parentElement.parentElement.addEventListener('click', (evt) => {

    if (String(evt.target.className).startsWith('popup')) {

      closePopup(item.parentElement.parentElement);
    }


  });



});






//Нажатие на лайк
function setLikeBtnListener(elementItem) {
  const likeBtn = elementItem.querySelector('.element__like');
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('element__like_active');
  });
}

//Нажатие на корзину
function setTrashBtnListener(elementItem) {
  const trashBtn = elementItem.querySelector('.element__trash');
  trashBtn.addEventListener('click', () => {
    elementItem.remove();
  });
}

//Нажатие на картинку
function setImgClickListener(elementItem, elementTitle, elementImg) {

  elementImg.addEventListener('click', () => {
    openPopup(imgPopup);
    imgPopup.querySelector('.image-popup__picture').src = elementImg.src;
    imgPopup.querySelector('.image-popup__picture').alt = elementTitle.textContent;
    imgPopup.querySelector('.image-popup__text').textContent = elementTitle.textContent;
  });
}



//Закрываем попапы по нажатию ESC
document.addEventListener('keydown', function (event) {
  const key = event.key; // const {key} = event; in ES6+
  if (key === "Escape") {
    closePopup(placePopup);
    closePopup(profilePopup);
    closePopup(imgPopup);
  }
});







// вешаем слушатели на submit и input
function setEventListeners() {

  

  toggleButtonState(formProfile, buttonProfile);
  toggleButtonState(formPlace, buttonPlace); //возможно надо удалить



  //вешаем слушатель на каждый input для Profile
  inputsProfile.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      //Проверяем Input на валидность
      checkInputValidity(formProfile, inputElement);
      toggleButtonState(formProfile, buttonProfile);
    });
  });

  //вешаем слушатель на каждый input для Place
  inputsPlace.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      //Проверяем Input на валидность
      checkInputValidity(formPlace, inputElement);
      toggleButtonState(formPlace, buttonPlace);
    });
  });



  //отменяем стандартный submit
  noSubmitDefault(formProfile);
  noSubmitDefault(formPlace);

}


//Проверяем Input на валидность
const checkInputValidity = (formElement, inputElement) => {

  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
}

//Активировать/Деактивировать кнопки
function toggleButtonState(formElement, buttonElement) {
  const isFormValid = formElement.checkValidity();
  buttonElement.classList.toggle('popup__button_disabled', !isFormValid);
  buttonElement.disabled = !isFormValid;
}


//отменяем стандартный submit
function noSubmitDefault(formElement) {
  formElement.addEventListener('submit', e => {
    e.preventDefault();
  });
}

//прячем сообщение об ошибке
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = "\u00A0";
}

//Показываем сообщение об ошибке
function showInputError(formElement, inputElement, errorMessage) {
  console.log(4);
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  console.log(5);
  errorElement.textContent = errorMessage;
}


setEventListeners();

console.log(1);