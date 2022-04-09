import {
  Popup
} from './Popup.js';

import {
  popupInputSelector
} from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupSubmit = popupSubmit;
    this._inputs = this._popup.querySelectorAll(popupInputSelector); //все импуты попапа
    this._form = this._popup.querySelector('.popup__form');
  }

  getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((inputItem) => {
      this._inputValues[inputItem.name] = inputItem.value;
    });
    return this._inputValues;
  }

  setInputValues(valueList) {
    if (valueList != undefined || null) {
      this._inputs.forEach((item, i) => {
        item.value = valueList[i];
      });
    } else {
      this._inputs.forEach((item) => {
        item.value = '';
      });
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._popupSubmit(this.getInputValues());
    });
  }


}