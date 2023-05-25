import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._buttonSubmit = this._form.querySelector(".popup__button-retention");
    //  console.log(this._buttonSubmit);
    /* зафиксировали первоначальное значение текстконтент кнопок */
    this._buttonDefaultValueText = this._buttonSubmit.textContent;
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
      /* настраиваем UX кнопок самбита всех форм. Сперва мы добавляем тексконтенту всех кнопок "..." при нажатии на кнопку.
       Далее создадим функцию, чтобы вернуть первоначальное значение  revertDefaultValue */
      this._buttonSubmit.textContent = `${this._buttonSubmit.textContent}...`;
      this._handleFormSubmit(this._getInputValues());
    });
  }

  /* функция возвращения первоначального значение тексконтент кнопки */
  revertDefaultValue() {
    this._buttonSubmit.textContent = this._buttonDefaultValueText;
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close = () => {
    super.close();
    this._form.reset();
  };
}
