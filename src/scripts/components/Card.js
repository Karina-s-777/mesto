

export default class Card {
  constructor(data, selectorTemplate, openPopupImage, openPopupDelete) {
    this._data = data;
    this._link = data.link;
    this._name = data.nameImage;
    this._selectorTemplate = selectorTemplate;
    this._openPopupImage = openPopupImage;
    this._openPopupDelete = openPopupDelete;
    // console.log(this._data)
  }

  // Клонируем разметку тимплея //
  _getCloneTemplate() {
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".elements__element")
      .cloneNode(true);
  }

  //теперь это функция скорее отвечает за открытие попапа удаления //
   _handleDelete = () => {
  this._openPopupDelete(this);
  };

   //а это за удаление карточки в открывшемся попапе //
   deleteCard = () => {
   this._cloneCard.remove();
  this._cloneCard = null;

  };

  _handleLike = () => {
    this._cardHeart.classList.toggle("elements__heart_active");
  };

  _handleOpenPopupImage = () => {
    this._openPopupImage(this._data);
  };
  // Клонируем разметку тимплея, где linkImageTemplate - сама карточка на странице //

  _setEventListener() {
    this._cardHeart.addEventListener("click", this._handleLike);
    this._cardTrash.addEventListener("click", this._handleDelete);
    this._linkImageTemplate.addEventListener(
      "click",
      this._handleOpenPopupImage
    );
  }

  // Создание карточки //
  createCard() {
    this._cloneCard = this._getCloneTemplate();
    this._imageNameTemplate = this._cloneCard.querySelector(
      ".elements__mesto-name"
    );
    this._linkImageTemplate = this._cloneCard.querySelector(
      ".elements__mask-group"
    );
    this._cardTrash = this._cloneCard.querySelector(".elements__trash");
    this._cardHeart = this._cloneCard.querySelector(".elements__heart");
    this._linkImageTemplate.src = this._link;
    this._linkImageTemplate.alt = this._name;
    this._imageNameTemplate.textContent = this._name;
    this._setEventListener();
    return this._cloneCard;
  }
}
