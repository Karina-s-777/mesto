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
      /* ранее мы передавали this._element, теперь меняем функцию, чтобы настроить удаление карточки через api.
       Теперь мы получим сюда не карточку, а объект с двумя свойствами - сама карточка и её id*/
      this._submitFunction({ element: this._element, cardId: this._cardId });
    });
  }

  /* при открытии/срабатывании метода он создаст в экземпляре этого класса свойство element с полученным аргементом + id карточки */
  open = ({ element, cardId }) => {
    super.open();
    this._element = element; /* card в _handleDelete - сама карточка */
    this._cardId = cardId; /* cardId в _handleDelete - её id */
  };
}


