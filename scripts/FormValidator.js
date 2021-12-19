import {
    openPopup,
    closePopup,
    closeByEscape,
    openProfilePopup,
    submitProfileHandler,
    openPlacePopup,
    submitPlaceHandler
} from './functions.js';

export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = document.querySelector(formElement);
        this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
        this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
        this._inactiveButtonClass = config.inactiveButtonClass;
    }

    enableValidation() {
        this._noSubmitDefault(); //отменяем стандартные submit'ы
        this._setListeners(); //устанавливаем слушатели
    }

    //отменяем стандартные submit'ы
    _noSubmitDefault() {
        this._formElement.addEventListener('submit', e => {
            e.preventDefault();
        });
    }

    //устанавливаем слушатели
    _setListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._ValidityState(inputElement); //Проверяем input, чтобы вывести/убрать сообщение об ошибке
                this._toggleButtonState(inputElement); //Меняем стиль кнопки попапов
            });
        });
    }

    //Проверяем input, чтобы вывести/убрать сообщение об ошибке
    _ValidityState(inputElement) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);

        if (inputElement.validity.valid) {
            this._hideInputError(inputElement); //прячем сообщение об ошибке
        } else {
            this._showInputError(inputElement); //Показываем сообщение об ошибке
        }
    }

    //прячем сообщение об ошибке
    _hideInputError(inputElement) {
        this._errorElement.textContent = "\u00A0";
    }

    //Показываем сообщение об ошибке
    _showInputError(inputElement) {
        this._errorElement.textContent = inputElement.validationMessage;
    }

    //Меняем стиль кнопки попапов
    _toggleButtonState() {
        const isFormValid = this._formElement.checkValidity();
        this._buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid);
        this._buttonElement.disabled = !isFormValid;
    }
}
