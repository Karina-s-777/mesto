// класс работы с карточками (фото) на странице
export default class Card {
  constructor (data, selectorTemplate, openPopupImage) {
    this._data = data;
    this._link = data.link;
    this._name = data.nameImage;
    this._selectorTemplate = selectorTemplate;
    this._openPopupImage = openPopupImage;
  }

// Клонируем разметку тимплея //
  _getCloneTemplate () {
    return document.querySelector(this._selectorTemplate).content.querySelector('.elements__element').cloneNode(true);
  }

  //т.к мы делаем через this, evt не нужен. Удаление карточек через мусорку //
 _handleDelete = () => {
  this._cloneCard.remove();
  }

  _handlelike = () => {
    this._cardHeart.classList.toggle('elements__heart_active');
}

_handlOpenPopupImage = () => {
  this._openPopupImage(this._data)
}
  // Клонируем разметку тимплея, где linkImageTemplate - сама карточка на странице //

  _setEventListener () {
    this._cardHeart.addEventListener('click', this._handlelike);
    this._cardTrash.addEventListener('click', this._handleDelete);
    this._linkImageTemplate.addEventListener('click', this._handlOpenPopupImage);
  }

// Создание карточки //
  createCard() {
    this._cloneCard = this._getCloneTemplate();
    this._imageNameTemplate = this._cloneCard.querySelector(".elements__mesto-name");
    this._linkImageTemplate =  this._cloneCard.querySelector(".elements__mask-group");
    this._cardTrash =  this._cloneCard.querySelector('.elements__trash');
    this._cardHeart = this._cloneCard.querySelector('.elements__heart');
    this._linkImageTemplate.src = this._link;
    this._linkImageTemplate.alt = this._name;
    this._imageNameTemplate.textContent = this._name;
    this._setEventListener()
    return this._cloneCard;
  }
}
