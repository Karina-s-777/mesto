export default class Popup {
  //Принимает в конструктор единственный параметр — селектор попапа.
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupButtonClose = this._popup.querySelector(".popup__button-close");
  }

  // метод _closePopupByClickOnEscape, который содержит логику закрытия попапа клавишей Esc.//
  _closePopupByClickOnEscape = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _closePopupByClickOnButton = () => {
    this.close();
  };

  _closePopupByClickOnOverlay = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  //публичные методы open и close, которые отвечают за открытие и закрытие попапа. В т.ч. закрытие на esc через функцию handleEscClose
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closePopupByClickOnEscape);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closePopupByClickOnEscape);
  }

  // метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
  // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._popup.addEventListener("click", this._closePopupByClickOnOverlay);
    this._popupButtonClose.addEventListener(
      "click",
      this._closePopupByClickOnButton
    );
  }
}
