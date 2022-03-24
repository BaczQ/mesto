export class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  }

  setUserInfo(setUserName, setUserJob) {
    this._name.textContent = setUserName;
    this._job.textContent = setUserJob;
  }
}