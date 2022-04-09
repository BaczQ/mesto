import {
  Popup
} from './Popup.js';

export class PopupConfirm extends Popup {
  constructor(popupSelector, {
    popupSubmit
  }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitEvtHandler = this._submitEvtHandler.bind(this);
    this._popupSubmit = popupSubmit;
  }

  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._popupSubmit(this._data);
    this._form.removeEventListener('submit', this._submitEvtHandler);
  }

  setEventListeners() {
    //console.log(' setEventListeners(element) ');
    this._form.addEventListener('submit', this._submitEvtHandler);
    super.setEventListeners();
  }

  open(data) {
    //console.log('Работает this.open(data) PopupConfirm.js');
    this._data = data;
    super.open();

  }
}