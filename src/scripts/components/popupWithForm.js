import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  // метод _getInputValues, который собирает данные всех полей формы
  _getInputValues() {
    // создаем некий пока пустой объект, в который потом попадут все инпуты с указанными значениями
    this._formData = {};
    // проходим по всем инпутам и для каждого из них добавляем его же в массив, передавая ему определенное значение
    this._inputList.forEach((input) => {
      this._formData[input.name] = input.value;
    });
    return this._formData;
  }

  setInputValues(userData) {
    this._inputList.forEach((input) => {
      input.value = userData[input.name];
    });
  }

  // Перезаписывает родительский метод setEventListeners.
  // Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
  // но и добавлять обработчик сабмита формы.

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close = () => {
    super.close();
    this._form.reset();
  };
}
