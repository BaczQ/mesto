import {
    openPopup,
    closePopup,
    closeByEscape,
    openProfilePopup,
    submitProfileHandler,
    openPlacePopup,
    submitPlaceHandler
} from './functions.js';

export class Card {
    constructor(cardTitle, cardLink, cardSelector, section, ...args) {
        this._cardTitle = cardTitle;
        this._cardLink = cardLink;
        this._templateCard = document.querySelector(cardSelector).content; //Селектор шаблона
        this._section = document.querySelector(section); //Куда вставляем шаблон
        this._imgPopup = document.querySelector('.image-popup');
    }

    //отрисовываем карточку
    _cardView() {
        this._templateElement = this._templateCard.cloneNode(true);
        this._templateElement.querySelector('.element__title').textContent = this._cardTitle;
        this._templateElement.querySelector('.element__img').src = this._cardLink;
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
        this._likeBtn = this._templateElement.querySelector('.element__like');
        this._likeBtn.addEventListener('click', () => this._likeClick());
    }

    //ставлю слушатель на кнопку "корзина"
    _setTrashBtnListener() {
        this._trashBtn = this._templateElement.querySelector('.element__trash');
        this._trashBtn.addEventListener('click', () => this._trashClick(this._trashBtn));
    }

    //ставлю слушатель на клик по картинке
    _setImgClickListener() {
        this.elementImg = this._templateElement.querySelector('.element__img');
        this.elementImg.addEventListener('click', () => this._imgClick());
    }

    //НАЖАТИЯ
    //Нажатие на лайк
    _likeClick() {
        this._likeBtn.classList.toggle('element__like_active');
    }

    //Нажатие на корзину
    _trashClick(item) {
        item.parentElement.parentElement.remove();
    }

    //нажатие на картинку
    _imgClick() {
        openPopup(this._imgPopup);
        this._imgPopup.querySelector('.image-popup__picture').src = this._cardLink;
        this._imgPopup.querySelector('.image-popup__picture').alt = this._cardTitle;
        this._imgPopup.querySelector('.image-popup__text').textContent = this._cardTitle;
    }

    renderCard() {
        this._cardView(); //отрисовываем карточку
        this._setListeners(); //вешаем слушатели
        this._section.prepend(this._templateElement); //добавляем в DOM
    }
}
