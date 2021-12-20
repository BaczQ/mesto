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

    setError(){ //включаем/выключаем ошибки
        this._inputList.forEach((inputElement) => {
                this._validityState(inputElement); //Проверяем input, чтобы вывести/убрать сообщение об ошибке
        });
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
                this._validityState(inputElement); //Проверяем input, чтобы вывести/убрать сообщение об ошибке
                this.toggleButtonState(inputElement); //Меняем стиль кнопки попапов
            });
        });
    }

    //Проверяем input, чтобы вывести/убрать сообщение об ошибке
    _validityState(inputElement) {
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
        inputElement.classList.remove("popup__input_error");
    }

    //Показываем сообщение об ошибке
    _showInputError(inputElement) {
        this._errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add("popup__input_error");
    }

    //Меняем стиль кнопки попапов
    toggleButtonState() {
        const isFormValid = this._formElement.checkValidity();
        this._buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid);
        this._buttonElement.disabled = !isFormValid;
    }
}
