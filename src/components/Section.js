export default class Section {
  constructor({renderer}, containerSelector) {
    //console.log(' - - - - - - - - - - - - - - - - - - - - - - - -');
    //console.log('Работает constructor в class Section.js');
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(items) {
console.log('items');
console.log(items);

    items.forEach(card => {
      this._renderer(card);
    });
  }

  addItem(element) {
    this._container.prepend(element); // в _container добавляем element
  }
}