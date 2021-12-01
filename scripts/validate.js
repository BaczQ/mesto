const validationConfig = {
    formProfile: '.profile-popup__form',
    formPlace: '.place-popup__form',
    inputsProfile: '.profile-popup__form-input',
    inputsPlace: '.place-popup__form-input',
    buttonProfile: '.profile-popup__button',
    buttonPlace: '.place-popup__button',
    buttonDisabled: 'popup__button_disabled'
};

function enableValidation(validationConfig) {

    //ОБЪЯВЛЯЮ КОНСТАНТЫ
    //Формы
    const formProfile = document.querySelector(validationConfig.formProfile);
    const formPlace = document.querySelector(validationConfig.formPlace);

    //Инпуты
    const inputsProfile = Array.from(formProfile.querySelectorAll(validationConfig.inputsProfile));
    const inputsPlace = Array.from(formPlace.querySelectorAll(validationConfig.inputsPlace));

    //Кнопки
    const buttonProfile = formProfile.querySelector(validationConfig.buttonProfile);
    const buttonPlace = formPlace.querySelector(validationConfig.buttonPlace);

    //Другое
    const classBtnDissabled = validationConfig.buttonDisabled;

    //Меняем стиль кнопки попапов в зависимости от валидности
    toggleButtonState(formProfile, buttonProfile, classBtnDissabled);
    toggleButtonState(formPlace, buttonPlace, classBtnDissabled);

    //Вешаем слушатель на каждый input для Profile
    inputsProfile.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            //Проверяем Input на валидность
            checkInputValidity(formProfile, inputElement);
            toggleButtonState(formProfile, buttonProfile, classBtnDissabled);
        });
    });

    //вешаем слушатель на каждый input для Place
    inputsPlace.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {

            //Проверяем Input на валидность
            checkInputValidity(formPlace, inputElement);
            toggleButtonState(formPlace, buttonPlace, classBtnDissabled);
        });
    });

    //отменяем стандартные submit'ы
    noSubmitDefault(formProfile);
    noSubmitDefault(formPlace);
}


//Меняем стиль кнопки попапов
function toggleButtonState(formElement, buttonElement, classBtnDissabled) {
    const isFormValid = formElement.checkValidity();
    buttonElement.classList.toggle(classBtnDissabled, !isFormValid);
    buttonElement.disabled = !isFormValid;
}

//Проверяем input, чтобы вывести/убрать сообщение об ошибке
function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }

}

//прячем сообщение об ошибке
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = "\u00A0";
}

//Показываем сообщение об ошибке
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = errorMessage;
}

//отменяем стандартный submit
function noSubmitDefault(formElement) {
    formElement.addEventListener('submit', e => {
        e.preventDefault();
    });
}

enableValidation(validationConfig);