export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this); //привязываем контекст через bind, чтобы зафиксировать this
  }

  _handleEscClose(event) {
    const key = event.key;
    if (key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (event.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }
}