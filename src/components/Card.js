import {
    elementImgSelector,
    elementTitleSelector,
    imgPopupSelector,
    elementLikeSelector,
    elementTrushSelector,
    activeLikeSelector
} from '../utils/constants.js';

export class Card {
    
    constructor(cardData, userId, cardSelectors, cardFunctions, ...args) {

        /*console.log(' ');
        console.log('------------------------------------');
        console.log('     Работает constructor в class Card.js');*/

        //переменные из cardData
        this._cardData = cardData;
        this._cardLikes = cardData.likes;
        this._cardId = cardData._id;
        this._cardTitle = cardData.name;
        this._cardLink = cardData.link;
        this._ownerId = cardData.owner._id;
        this._isTrash = cardData.isTrash;

        //переменные из cardSelectors
        this._cardSelector = cardSelectors.cardSelector;

        //переменные из cardFunctions
        this._handleCardClick = cardFunctions.handleCardClick;
        this._setLike = cardFunctions.setLike;
        this._deleteLike = cardFunctions.deleteLike;
        this._handleTrashClick = cardFunctions.handleTrashClick;

        //другие переменные
        this._imgPopup = document.querySelector(imgPopupSelector);
        this._templateCard = document.querySelector(cardSelectors.cardSelector).content.querySelector('.element'); //Селектор шаблона 
        this._userId = userId;
    }

    _getTemplate() {
        //console.log('Работает _getTemplate() в class Card.js');
        const templateCard = this._templateCard.cloneNode(true);
        return templateCard;
    }

    //отрисовываем карточку
    cardView() {
        //console.log('Работает cardView() в class Card.js');
        this._element = this._getTemplate();
        this._elementImg = this._element.querySelector(elementImgSelector);
        this._elementTitle = this._element.querySelector(elementTitleSelector);
        this._likeBtn = this._element.querySelector(elementLikeSelector);
        this._elementTitle.textContent = this._cardTitle;
        this._elementImg.src = this._cardLink;
        this._elementImg.alt = this._cardTitle;
        this._likeCounter = this._element.querySelector('.element__likes-count');
        this._setListeners(); //вешаем слушатели
        this.setLikeCounter(this._cardLikes);
        this.setLikeStatus(this._cardLikes);

        //проверяем нужен ли значок корзины
        if (!this._isTrash) {
            this._element.querySelector('.element__trash').remove();
        }
        return this._element;
    }

    //отображаем количество лайков на страничке
    setLikeCounter(arr) {
        this._likeCounter.textContent = arr.length;
    }

    //отображаем текущее состояние кнопки лайк
    setLikeStatus(arr){
        // Проверка на лайк от себя самого
        arr.forEach((item) => {
            if (item._id == this._userId) {
                this._likeBtn.classList.add('element__like_active');
            }
        });
    }

    //добавляем слушатели
    _setListeners() {
        this._setImageListener(); //слушатель картинки
        this._setLikeBtnListener(); //слушатель лайка
        this._setTrashBtnListener(); //слушатель корзины
    }

    //СЛУШАТЕЛИ
    //ставлю слушатель на кнопку "лайк"

    _setImageListener() {
        this._elementImg.addEventListener('click', () => this._handleCardClick(this._cardTitle, this._cardLink));
    }


    _setLikeBtnListener() {
        this._likeBtn.addEventListener('click', () => this._likeClick(this._cardData));
    }

    //ставлю слушатель на кнопку "корзина"
    _setTrashBtnListener() {
        this._trashBtn = this._element.querySelector(elementTrushSelector);
        this._trashBtn.addEventListener('click', () => this._trashClick(this._trashBtn));
    }

    //Нажатие на лайк
    _likeClick(data) {
        //здесь надо описывать логику снимать лайк или ставить его
        (this._likeBtn.classList.contains('element__like_active')) ? this._deleteLike(data) : this._setLike(data);
        this._likeBtn.classList.toggle(activeLikeSelector);
    }

    //Нажатие на корзину
    _trashClick(evt) {
        this._element.remove();
    }
}