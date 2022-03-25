import {
  Popup
} from './Popup.js';

import {
  popupImgLinkSelector,
  popupImgTextSelector
} from '../utils/constants.js';

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this.imgPopupPhotoSrc = document.querySelector(popupImgLinkSelector);
    this.imgPopupPhotoTitle = document.querySelector(popupImgTextSelector);

  }

  open(src, title) {
    this.imgPopupPhotoSrc.src = src;
    this.imgPopupPhotoSrc.alt = title;
    this.imgPopupPhotoTitle.textContent = title;
    super.open();
  }

}