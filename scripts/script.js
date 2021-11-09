let editBtn = document.querySelector('.profile__edit-button');
let popupCloseBtn = document.querySelector('.popup__close-btn');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');

let nameInput = formElement.querySelector('.popup__form-input_value_name');
let jobInput = formElement.querySelector('.popup__form-input_value_job');

let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');

function editBtnClick() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubTitle.textContent;
}

function popupCloseBtnClick() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;
    popupCloseBtnClick();
}

formElement.addEventListener('submit', formSubmitHandler);
editBtn.addEventListener('click', editBtnClick);
popupCloseBtn.addEventListener('click', popupCloseBtnClick);