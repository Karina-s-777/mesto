import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageOpenPopup = this._popup.querySelector(".popup__image-open");
    this._imageOpenPopupText = this._popup.querySelector(".popup__text-open");
  }

  open = (data) => {
    this._imageOpenPopup.src = data.link;
    this._imageOpenPopup.alt = data.nameImage;
    this._imageOpenPopupText.textContent = data.nameImage;
    super.open();
  };
}
