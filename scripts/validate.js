const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const setEventListeners = (formElement, {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    ...rest
}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, rest);
            toggleButtonState(formElement, buttonElement, inactiveButtonClass);
        });
    });
};

const enableValidation = ({
    formSelector,
    ...rest
}) => {
    const getFormList = Array.from(document.querySelectorAll(formSelector));
    getFormList.forEach((formElement) => {
        //отменяем стандартные submit'ы
        noSubmitDefault(formElement);

        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest);
    });
};

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