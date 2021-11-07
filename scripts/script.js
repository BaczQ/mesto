let editBtn = document.querySelector('.profile__edit-button');
let popupCloseBtn = document.querySelector('.popup__x');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');

let nameInput = formElement.querySelector('.popup__person-name');
let jobInput = formElement.querySelector('.popup__person-job');

let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');



function formSubmitHandler(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;

    popupCloseBtnClick();
}

function editBtnClick() {
    popup.className = 'popup popup_opened';
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubTitle.textContent;
}

function popupCloseBtnClick() {
    popup.className = 'popup';
}

formElement.addEventListener('submit', formSubmitHandler);
editBtn.addEventListener('click', editBtnClick);
popupCloseBtn.addEventListener('click', popupCloseBtnClick);