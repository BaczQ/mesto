export class UserInfo {
  constructor(userData) {
    //console.log('Работает constructor class UserInfo');
    //console.log(userData);
    this._name = document.querySelector(userData.name);
    this._job = document.querySelector(userData.about);
    this._avatar = document.querySelector(userData.avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name; // заменили имя профиля значениями из сервера
    this._job.textContent = data.about; // заменили инфо профиля значениями из сервера
    if (data.avatar) {
      this._avatar.src = data.avatar; // заменили аватар на аватар из сервера
    }
    this._id = data._id; //присвоили id
  }
}