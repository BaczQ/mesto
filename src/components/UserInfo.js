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
      this.setAvatar(data.avatar);
    }
    this._id = data._id; //присвоили id
  }

  setAvatar(link){
    this._avatar.src = link; // заменили аватар на аватар из сервера
  }
}