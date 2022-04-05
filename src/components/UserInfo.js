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
    console.log(data);
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    if (data.avatar) {
      this._avatar.src = data.avatar;
    }
    
  }
}