export default class Section {
  constructor({renderer}, containerSelector) {
    //console.log(' - - - - - - - - - - - - - - - - - - - - - - - -');
    //console.log('Работает constructor в class Section.js');
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  /*renderItems(items) {
    console.log('Работает renderItems(items) в class Section.js');
    items.forEach(item => {
      this._renderer(item)
    })

  }*/

  addItem(element) {
    //console.log('Работает addItem(element) в class Section.js');
    this._container.prepend(element); // в _container добавляем element
  }
}