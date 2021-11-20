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


//POPUP
const popup = document.querySelector('.popup');
const popupTitle = popup.querySelector('.popup__title');

//popup__container
const formElement = popup.querySelector('.popup__container');

//popup__form-input_value_name
const nameInput = formElement.querySelector('.popup__form-input_value_name');

//popup__form-input_value_job
const jobInput = formElement.querySelector('.popup__form-input_value_job');

//profile__title
const profileTitle = document.querySelector('.profile__title');

//profile__subtitle
const profileSubTitle = document.querySelector('.profile__subtitle');


//IMG POPUP
const imgPopup = document.querySelector('.image-popup');


//BUTTONS
//profile__edit-button
const editBtn = document.querySelector('.profile__edit-button');

//profile__add-button
const addBtn = document.querySelector('.profile__add-button');

//popup__close-btn
const popupCloseBtn = popup.querySelector('.popup__close-btn');

//image-popup__close-btn
const imgPopupCloseBtn = imgPopup.querySelector('.image-popup__close-btn');

//SECTIONS
//elements
const sectionElements = document.querySelector('.elements');


// Добавляю 6 карточек
const CreateHTMLString = (item) => {
  const markup = `
    <article class="element animation-popup">

    <div class="element__top">
    <img class="element__img" src="1" alt="1" onerror = "alert('Ошибка во время загрузки изображения');">
    <button type="button" class="element__trash animation-elements"></button>
        </div>
    
    <div class="element__bottom">
        <h2 class="element__title">1</h2>
        <button type="button" class="element__like animation-elements"></button>
    </div>
    </article>
 `;

  const tempContainer = document.createElement('article');
  tempContainer.insertAdjacentHTML('afterbegin', markup);

  const elementItem = tempContainer.firstElementChild;
  const elementTitle = elementItem.querySelector('.element__title');
  const elementImg =  elementItem.querySelector('.element__img');

  

  elementTitle.textContent = item.name;
  elementImg.alt = item.name;
  elementImg.src = item.link;

  //ставлю слушатель на кнопку "лайк"
  setLikeBtnListener(elementItem);

  //ставлю слушатель на кнопку "корзина"
  setTrashBtnListener(elementItem);

  //ставлю слушатель на клик по картинке
  setImgClickListener(elementItem, elementTitle, elementImg);


  return elementItem;
};

initialCards.forEach(element => sectionElements.append(CreateHTMLString(element)));

//Нажатие кнопки редактирования профиля
function editBtnClick() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubTitle.textContent;
  popup.classList.add('editBtn');
}

//Нажатие кнопки добавления карточки
function addBtnClick() {
  popup.classList.add('popup_opened');
  nameInput.value = '';
  jobInput.value = '';
  nameInput.placeholder = 'Название';
  jobInput.placeholder = 'Ссылка на картинку';
  popupTitle.textContent = 'Новое место';
  popup.classList.add('addBtn');
}

//Нажатие на крестик попапа
function ClosePopupBtnClick() {
  popup.classList.remove('popup_opened');
  popup.classList.remove('addBtn');
  popup.classList.remove('editBtn');
}

//Нажатие на крестик попапа картинки
function CloseImgPopupBtnClick() {
  imgPopup.classList.remove('image-popup_opened');
}

//Отправка формы попапа
function formSubmitHandler(evt) {

  // Отменяем переход по ссылке
  evt.preventDefault();

  //отрабатываем добавление новых карточек
  if (popup.classList[popup.classList.length - 1].includes('addBtn')) {
    //готовим item для функции CreateHTMLString
    const itemElement = {
      name: nameInput.value,
      link: jobInput.value
    };

    sectionElements.prepend(CreateHTMLString(itemElement));

  }

  //отрабатываем изменение профиля
  else {
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;
  }

  ClosePopupBtnClick();
}

//СЛУШАТЕЛИ
//Отправка формы попапа
formElement.addEventListener('submit', formSubmitHandler);

//Нажатие кнопки редактирования профиля
editBtn.addEventListener('click', editBtnClick);

//Нажатие кнопки добавления карточки
addBtn.addEventListener('click', addBtnClick);

//Нажатие на крестик попапа
popupCloseBtn.addEventListener('click', ClosePopupBtnClick);

//Нажатие на крестик попапа с картинкой
imgPopupCloseBtn.addEventListener('click', CloseImgPopupBtnClick);


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

    imgPopup.classList.add('image-popup_opened');
    imgPopup.querySelector('.image-popup__picture').src = elementImg.src;
    imgPopup.querySelector('.image-popup__text').textContent = elementTitle.textContent;

  });
}