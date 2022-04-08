export class Api {
  constructor({
    baseUrl,
    headers
  }) {
    //console.log(' - - - - - - - - - - - - - - - - - - - - - - - -');
    //console.log('Работает constructor в class Api');
    this._baseUrl = baseUrl;
    this._headers = headers;
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
    //console.log('Работает getUserData() в class Api');
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

  setUserAvatar(link) {
    console.log('userData');
    console.log(link.avatar);

    return fetch(this._baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    }).then((res) => this._getStatus(res));
  }

  //Проверяем все статусы запросов
  _getStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Ошибка:' + res.status);
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
    }).then((res) => this._getStatus(res));
  }

  deleteCard(data) {
    //console.log('deleteCard(data) in api');
    return fetch(this._baseUrl + 'cards/' + data._id, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => this._getStatus(res));
  }

  setLike(data) {
    //console.log('setLike(data) in api');
    return fetch(this._baseUrl + 'cards/' + data._id + '/likes', {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._getStatus(res));
  }

  deleteLike(data) {
    //console.log('deleteLike(data) in api');
    return fetch(this._baseUrl + 'cards/' + data._id + '/likes', {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._getStatus(res));
  }
}