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
  }

  _getInputValues() {
    this._inputValues = [];
    this._inputs.forEach((inputItem) => {
      this._inputValues[inputItem.name] = inputItem.value;
    });
    return this._inputValues;
  }

  setInputValues(valuesList = ['', '']) {
    this._inputs[0].value = valuesList[0];
    this._inputs[1].value = valuesList[1];
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => this._popupSubmit(event));
  }

  close() {
    super.close();
  }
}