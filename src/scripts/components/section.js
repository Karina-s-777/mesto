export default class Section {
  //Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
  // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице
  //Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._initialCards = items;
    //Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице
    this.renderer = renderer;
  }

  // Содержит публичный метод, который отвечает за отрисовку всех элементов.
  // Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
  renderItems() {
    this._initialCards.forEach((data) => {
      // renderer(data) в конечном счете в index.js создает/отрисовывает сущность card по шаблону класса Card
      // и возвращает для неё функцию createCard, которая описана внутри Card
      // и тут ниже мы говорим "создай карточку по шаблону и вставь её в разметку ul её в разметку"
      this.addItem(this.renderer(data));
    });
  }

  // метод addItem, который принимает DOM-элемент и добавляет его в контейнер
  addItem(domElement) {
    this._container.prepend(domElement);
  }
}
