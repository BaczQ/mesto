import {
    openPopup,
    imgPopupPicture,
    imgPopupText
} from './functions.js';

export class Card {
    constructor(cardTitle, cardLink, cardSelector,  ...args) {
        this._cardTitle = cardTitle;
        this._cardLink = cardLink;
        this._templateCard = document.querySelector(cardSelector).content.querySelector('.element'); //Селектор шаблона
        this._imgPopup = document.querySelector('.image-popup');
    }

    _getTemplate(){
        const templateCard = this._templateCard.cloneNode(true);
        return templateCard;
    }

    //отрисовываем карточку
    cardView() {
        this._element = this._getTemplate();
        this._elementImg = this._element.querySelector('.element__img');
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementTitle.textContent = this._cardTitle;
        this._elementImg.src = this._cardLink;
        this._elementImg.alt = this._cardTitle;
        this._setListeners(); //вешаем слушатели
        return this._element;
    }

    //добавляем слушатели
    _setListeners() {
        this._setLikeBtnListener();
        this._setTrashBtnListener();
        this._setImgClickListener();
    }

    //СЛУШАТЕЛИ
    //ставлю слушатель на кнопку "лайк"
    _setLikeBtnListener() {
        this._likeBtn = this._element.querySelector('.element__like');
        this._likeBtn.addEventListener('click', () => this._likeClick());
    }

    //ставлю слушатель на кнопку "корзина"
    _setTrashBtnListener() {
        this._trashBtn = this._element.querySelector('.element__trash');
        this._trashBtn.addEventListener('click', () => this._trashClick(this._trashBtn));
    }

    //ставлю слушатель на клик по картинке
    _setImgClickListener() {
        this._elementImg.addEventListener('click', () => this._imgClick());
    }

    //НАЖАТИЯ
    //Нажатие на лайк
    _likeClick() {
        this._likeBtn.classList.toggle('element__like_active');
    }

    //Нажатие на корзину
    _trashClick() {
        this._element.remove();
    }

    //нажатие на картинку
    _imgClick() {
        openPopup(this._imgPopup);
        imgPopupPicture.src = this._cardLink;
        imgPopupPicture.alt = this._cardTitle;
        imgPopupText.textContent = this._cardTitle;
    }
}