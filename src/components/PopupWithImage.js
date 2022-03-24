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
  }

  open(src, title) {
    const imgPopupPhotoSrc = document.querySelector(popupImgLinkSelector);
    const imgPopupPhotoTitle = document.querySelector(popupImgTextSelector);
    imgPopupPhotoSrc.src = src;
    imgPopupPhotoSrc.alt = title;
    imgPopupPhotoTitle.textContent = title;
    super.open();
  }

}