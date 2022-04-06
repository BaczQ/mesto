import {
    elementImgSelector,
    elementTitleSelector,
    imgPopupSelector,
    elementLikeSelector,
    elementTrushSelector,
    activeLikeSelector
} from '../utils/constants.js';

export class Card {
    //constructor(cardTitle, cardLink, cardLikes, cardSelector, handleCardClick, isTrash, handleTrashClick, ...args) {
    constructor(cardData, userId, cardSelectors, cardFunctions, ...args) {

        console.log(' ');
        console.log('------------------------------------');
        console.log('     Работает constructor в class Card.js');

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
        this._handleTrashClick = cardFunctions.handleTrashClick;

        //другие переменные
        this._imgPopup = document.querySelector(imgPopupSelector);
        this._templateCard = document.querySelector(cardSelectors.cardSelector).content.querySelector('.element'); //Селектор шаблона 
        this._userId = userId;


        console.log('-----Переменные из cardData');
        console.log(this._cardTitle);
        console.log(this._cardLink);
        console.log(this._cardLikes);
        console.log(this._ownerId);
        console.log(this._isTrash);
        console.log('-----Переменные из cardSelectors');
        console.log(this._cardSelector);
        console.log(this._imgPopup);
        console.log(this._templateCard);
        console.log('-----Переменные из cardFunctions');
        console.log(this._handleCardClick);
        console.log(this._handleTrashClick);

        console.log('     Конец constructor в class Card.js');
        console.log('------------------------------------');

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
        //this._likeCounter.textContent = this._cardLikes.length;
        this._setListeners(); //вешаем слушатели

        this.setLikes(this._cardLikes);

        //проверяем нужен ли значок корзины
        if (!this._isTrash) {
            this._element.querySelector('.element__trash').remove();
        }


        console.log('this._element');
        console.log(this._element);
        return this._element;
    }

    //отображаем количество лайков на страничке
    setLikes(arr) {
        console.log('setLikes(arr) in Card.js');
        this._likeCounter.textContent = arr.length;
        this._setLikeStatus(arr);
    }


    _setLikeStatus(arr){

        // Проверка на лайк от себя самого
        arr.forEach((item) => {
            if (item._id == this._userId) {
                console.log('проверка на лайки');
                this._likeBtn.classList.add('element__like_active');
            }
        });

    }

    


    //добавляем слушатели
    _setListeners() {
        //console.log('Работает _setListeners() в class Card.js');
        this._setImageListener(); //слушатель картинки
        this._setLikeBtnListener(); //слушатель лайка
        this._setTrashBtnListener(); //слушатель корзины
    }



    //СЛУШАТЕЛИ
    //ставлю слушатель на кнопку "лайк"

    _setImageListener() {
        //        console.log('отработал слушатель по картинке');
        this._elementImg.addEventListener('click', () => this._handleCardClick(this._cardTitle, this._cardLink));
    }


    _setLikeBtnListener() {
        //console.log('Работает _setLikeBtnListener() в class Card.js');
        this._likeBtn.addEventListener('click', () => this._likeClick(this._cardData));
    }

    //ставлю слушатель на кнопку "корзина"
    _setTrashBtnListener() {
        //console.log('Работает _setTrashBtnListener() в class Card.js');
        this._trashBtn = this._element.querySelector(elementTrushSelector);
        this._trashBtn.addEventListener('click', () => this._trashClick(this._trashBtn));
    }

    //Нажатие на лайк
    _likeClick(data) {

        //здесь надо описывать логику снимать лайк или ставить его

        console.log('Работает _likeClick() в class Card.js');
        console.log('data');
        console.log(data);
        this._likeBtn.classList.toggle(activeLikeSelector);
        this._setLike(data);
    }

    //Нажатие на корзину
    _trashClick(evt) {
        //console.log('Работает _trashClick() в class Card.js');
        this._element.remove();
        // this._handleTrashClick(evt);
        console.log('EVT = ');
        console.log(evt);

    }
}