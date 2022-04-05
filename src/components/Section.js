export default class Section {
  constructor({renderer}, containerSelector) {
    //console.log(' - - - - - - - - - - - - - - - - - - - - - - - -');
    //console.log('Работает constructor в class Section.js');
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(items) {
    items.forEach(card => {
      this._renderer(card);
    });
  }

  addItem(element) {
    //console.log('Работает addItem(element) в class Section.js');
    this._container.prepend(element); // в _container добавляем element
  }
}