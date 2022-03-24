import {
    elementImgSelector,
    elementTitleSelector,
    imgPopupSelector,
    elementLikeSelector,
    elementTrushSelector,
    activeLikeSelector
} from '../utils/constants.js';

export class Card {
    constructor(cardTitle, cardLink, cardSelector, handleCardClick, ...args) {
        this._cardTitle = cardTitle;
        this._cardLink = cardLink;
        this._handleCardClick = handleCardClick;
        this._templateCard = document.querySelector(cardSelector).content.querySelector('.element'); //Селектор шаблона
        this._imgPopup = document.querySelector(imgPopupSelector);
    }

    _getTemplate() {
        const templateCard = this._templateCard.cloneNode(true);
        return templateCard;
    }

    //отрисовываем карточку
    cardView() {
        this._element = this._getTemplate();
        this._elementImg = this._element.querySelector(elementImgSelector);
        this._elementTitle = this._element.querySelector(elementTitleSelector);
        this._elementTitle.textContent = this._cardTitle;
        this._elementImg.src = this._cardLink;
        this._elementImg.alt = this._cardTitle;
        this._setListeners(); //вешаем слушатели
        return this._element;
    }

    //добавляем слушатели
    _setListeners() {
        this._elementImg.addEventListener('click', this._handleCardClick);
        this._setLikeBtnListener();
        this._setTrashBtnListener();
        }

    //СЛУШАТЕЛИ
    //ставлю слушатель на кнопку "лайк"
    _setLikeBtnListener() {
        this._likeBtn = this._element.querySelector(elementLikeSelector);
        this._likeBtn.addEventListener('click', () => this._likeClick());
    }

    //ставлю слушатель на кнопку "корзина"
    _setTrashBtnListener() {
        this._trashBtn = this._element.querySelector(elementTrushSelector);
        this._trashBtn.addEventListener('click', () => this._trashClick(this._trashBtn));
    }

    //Нажатие на лайк
    _likeClick() {
        this._likeBtn.classList.toggle(activeLikeSelector);
    }

    //Нажатие на корзину
    _trashClick() {
        this._element.remove();
    }
}