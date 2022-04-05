export class Api {
  constructor({
    baseUrl,
    headers
  }) {
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('Работает constructor в class Api');

    this._baseUrl = baseUrl;
    this._headers = headers;
    //this.id = '';
    this.cohort = '';
    this.name = '';
    this.about = '';
    this.avatar = '';
  }

  //получаем карточки из api
  getInitialCards() {
    //console.log('Работает getInitialCards() в class Api');
    return fetch(this._baseUrl + 'cards', {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._getStatus(res));
  }


  getUserData() {
    console.log('Работает getUserData() в class Api');
    return fetch('https://mesto.nomoreparties.co/v1/cohort-38/users/me', {
      method: 'GET',
      headers: this._headers,
    }).then(data => this._getStatus(data));
  }


  //отправляем данные на сервер
  setUserInfo(userData) {
    console.log('userData');
    console.log(userData);

    return fetch(this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about
        })
      })
      .then((res) => this._getStatus(res));
  }


  //Проверяем все статусы запросов
  _getStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Добавляем новую карточку
  sendNewCard(newCard) {
    console.log('Сработал addNewCard(newCard)');
    //console.log('ID = ' + this.id);

    return fetch(this._baseUrl + 'cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({

        likes: [],
        //_id: this.id,

        name: newCard.name,
        link: newCard.link,

        owner: {
          name: this.name,
          about: this.about,
          avatar: this.avatar,
          _id: this.id,
          cohort: this.cohort
        },

        createdAt: new Date()

      }),
      headers: this._headers,
    });
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + 'cards/'+ cardId, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => this._getStatus(res));
  }




}