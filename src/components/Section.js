export default class Section {
  constructor({
    items,
    renderer
  }, containerSelector) {
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item.name, item.link);
    });
  }

  addItem(element) {
    this._container.append(element); // в _container добавляем element
  }
}