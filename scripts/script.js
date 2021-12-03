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

//profile__title
const profileTitle = document.querySelector('.profile__title');

//profile__subtitle
const profileSubTitle = document.querySelector('.profile__subtitle');

//POPUP
const popup = document.querySelector('.popup');

//PLACE-POPUP
const placePopup = document.querySelector('.place-popup');

//place-popup__title
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

//.place-popup__button
const placePopupBtn = document.querySelector('.place-popup__button');

//.profile-popup__button
const profilePopupBtn = document.querySelector('.profile-popup__button');

//SECTIONS
//elements
const sectionElements = document.querySelector('.elements');

//Все попапы
const popups = document.querySelectorAll('.popup')








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
  document.addEventListener('keydown', closeByEscape);
}

//closePopup
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//Закрывем попап по нажатию клавиши Esc
function closeByEscape(event) {
  const openedPopup = document.querySelector('.popup_opened');
  const key = event.key; // const {key} = event; in ES6+
  if (key === "Escape") {
    closePopup(openedPopup);
  }
}





//Нажатие кнопки редактирования профиля
function openProfilePopup() {
  openPopup(profilePopup);
  profilePopupName.value = profileTitle.textContent;
  profilePopupJob.value = profileSubTitle.textContent;
  profilePopupBtn.classList.remove('popup__button_disabled');
  
}

//Нажатие кнопки добавления карточки
function openPlacePopup() {
  openPopup(placePopup); //открываем попап
  placePopupName.value = '';
  placePopupLink.value = '';
  placePopupBtn.classList.add('popup__button_disabled');
  
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