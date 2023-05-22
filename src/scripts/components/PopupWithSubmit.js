import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".popup__form");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction(this._element)
    });
  }

  /* при открытии/срабатывании метода он создаст в экземпляре этого класса свойство element с полученным аргементом */
   open = (element) => {
    super.open()
    this._element = element;
  }
}
