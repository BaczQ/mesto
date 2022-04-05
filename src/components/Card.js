import {
    elementImgSelector,
    elementTitleSelector,
    imgPopupSelector,
    elementLikeSelector,
    elementTrushSelector,
    activeLikeSelector
} from '../utils/constants.js';

export class Card {
    constructor(cardTitle, cardLink, cardLikes, cardSelector, handleCardClick, isTrash, handleTrashClick, ...args) {
        this._cardLikes = cardLikes;
        this._cardTitle = cardTitle;
        this._cardLink = cardLink;
        this._templateCard = document.querySelector(cardSelector).content.querySelector('.element'); //Селектор шаблона
        this._imgPopup = document.querySelector(imgPopupSelector);
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleCardClick;
        this._isTrash = isTrash;
        


        console.log(this._cardTrash);
        //console.log(' - - - - - - - - - - - - - - - - - - - - - - - -');
        //console.log('Работает constructor в class Card.js');
        //console.log('this._cardLikes');
        //console.log(this._cardLikes);
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
        this._likeCounter.textContent = this._cardLikes.length;
        
        //this._cardTrash.classList.add('111');
        

        
        this._setListeners(); //вешаем слушатели
        

        //проверяем нужен ли значок корзины
        if (!this._isTrash){
            this._element.querySelector('.element__trash').remove();
        }
        


        return this._element;
    }

    //добавляем слушатели
    _setListeners() {
        //console.log('Работает _setListeners() в class Card.js');
        this._elementImg.addEventListener('click', () => this._handleCardClick(this._cardTitle, this._cardLink));
        this._setLikeBtnListener();
        this._setTrashBtnListener();
    }

    //СЛУШАТЕЛИ
    //ставлю слушатель на кнопку "лайк"
    _setLikeBtnListener() {
        //console.log('Работает _setLikeBtnListener() в class Card.js');
        this._likeBtn.addEventListener('click', () => this._likeClick());
    }

    //ставлю слушатель на кнопку "корзина"
    _setTrashBtnListener() {
        //console.log('Работает _setTrashBtnListener() в class Card.js');
        this._trashBtn = this._element.querySelector(elementTrushSelector);
        this._trashBtn.addEventListener('click', () => this._trashClick(this._trashBtn));
    }

    //Нажатие на лайк
    _likeClick() {
        //console.log('Работает _likeClick() в class Card.js');
        this._likeBtn.classList.toggle(activeLikeSelector);
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