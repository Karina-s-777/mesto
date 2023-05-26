export default class Card {
  constructor(
    data,
    selectorTemplate,
    openPopupImage,
    openPopupDelete,
    changeLike
  ) {
    //console.log(data);
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._ownerId = data.owner._id;
    this._myPersonalId = data.mypersonalid;
    this._cardId = data._id;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._selectorTemplate = selectorTemplate;
    this._openPopupImage = openPopupImage;
    this._openPopupDelete = openPopupDelete;
    this._changeLike = changeLike;
    /* перенесли сюда значения, чтобы обратиться к кнопке мусорки и изменить её видимость */
    this._cloneCard = this._getCloneTemplate();
    this._imageNameTemplate = this._cloneCard.querySelector(
      ".elements__mesto-name"
    );
    this._linkImageTemplate = this._cloneCard.querySelector(
      ".elements__mask-group"
    );
    this._cardTrash = this._cloneCard.querySelector(".elements__trash");
    this._cardHeart = this._cloneCard.querySelector(".elements__heart");
    this._numberLike = this._cloneCard.querySelector(".elements__number-like");
    // console.log(this._myPersonalId);
    // console.log(this._ownerId);
  }

  // Клонируем разметку тимплея //
  _getCloneTemplate() {
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".elements__element")
      .cloneNode(true);
  }

  /* теперь это функция отвечает за открытие попапа удаления. openPopupDelete = deleteCardPopup.open в случае работы с попапом удаления карточки.
  deleteCardPopup.open = срабатываение функции open из PopupWithSubmit.  */

  _handleDelete = () => {
    this._openPopupDelete({ element: this, cardId: this._cardId });
  };

  //а это за удаление карточки в открывшемся попапе //
  deleteCard = () => {
    this._cloneCard.remove();
    this._cloneCard = null;
  };

  _changeDeleteCardButton() {
    if (this._ownerId !== this._myPersonalId) {
      this._cardTrash.remove();
    }
  }

  // проходимся по каждому элементу массива спользователями, лайкнувшими карточку. И, если id элемента = моему id, то лайк становится активным, т.к. мы поставили лайк //
  _displayNumberOfLikes() {
    this._likes.forEach((element) => {
      if (element._id === this._myPersonalId) {
        this._cardHeart.classList.add("elements__heart_active");
        return;
      }
    });
    // программируем кол-во выводимых лайков на страницу = длинне массива //
    this._numberLike.textContent = this._likesLength;
  }

  // программируем функцию постановки лайка нами и изменение кол-во лайков в общем от нашего лайка //
  setLikes(likes) {
    this._cardHeart.classList.toggle("elements__heart_active");
    this._numberLike.textContent = likes.length;
  }

  _handleLike = () => {
    this._changeLike(this._cardHeart, this._cardId);
    // this._cardHeart.classList.toggle("elements__heart_active");
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
    this._linkImageTemplate.src = this._link;
    this._linkImageTemplate.alt = this._name;
    this._imageNameTemplate.textContent = this._name;
    this._changeDeleteCardButton();
    this._displayNumberOfLikes();
    this._setEventListener();
    return this._cloneCard;
  }
}
